import bcrypt from "bcrypt";
import prisma from "../../../database/prismaClient";
import redisClient from "../../../main/config/redis";
import { generateToken, generateRefreshToken } from "../../../shared/utils/jwt";
import { logger } from "../../../shared/utils/logger";

const CACHE_TTL_IN_SECONDS = 3600; // 1 hora
const REFRESH_TOKEN_TTL_IN_SECONDS = 7 * 24 * 3600; // 7 dias

export class LoginService {
  static async login(email: string, password: string) {
    logger.info(`Tentativa de login para o email: ${email}`);

    const cachedUser = await redisClient.get(`user:${email}`);

    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      logger.info("Resposta servida do cache:", user);
    } else {
      logger.info("Usuário não encontrado no cache, buscando no banco de dados...");
    }

    const user = cachedUser ? JSON.parse(cachedUser) : await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Credenciais inválidas");

    const token = generateToken({ id: user.id, email: user.email, name: user.name, role: user.role });
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await redisClient.set(`refreshToken:${refreshToken}`, user.id, { EX: REFRESH_TOKEN_TTL_IN_SECONDS });

    await redisClient.set(`user:${email}`, JSON.stringify(user), { EX: CACHE_TTL_IN_SECONDS });

    logger.info(`Token gerado e armazenado no cache para o usuário ${user.email}: ${token}`);

    return { token, refreshToken, user };
  }
}
