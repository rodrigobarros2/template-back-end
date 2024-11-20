import bcrypt from 'bcrypt';
import redisClient from '../../../main/config/redis';
import { generateToken, generateRefreshToken } from '../../../shared/utils/jwt';
import { logger } from '../../../shared/utils/logger';
import { LoginResponse, User } from '../models/auth.model';
import { UsersRepository } from '../../user/models/user.model';
import { HttpCode } from '../../../constants/httpCode.enum';

const CACHE_TTL_IN_SECONDS = 3600; // 1 hora
const REFRESH_TOKEN_TTL_IN_SECONDS = 7 * 24 * 3600; // 7 dias

export class LoginService {
  constructor(private readonly userRepository: UsersRepository) {}

  async perform(email: string, password: string): Promise<LoginResponse> {
    logger.info(`Tentativa de login para o email: ${email}`);

    const cachedUser = await redisClient.get(`user:${email}`);

    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      logger.info('Resposta servida do cache:', user);
    } else {
      logger.info('Usuário não encontrado no cache, buscando no banco de dados...');
    }

    const user: User = cachedUser ? JSON.parse(cachedUser) : await this.userRepository.getByEmail(email);

    if (!user) {
      throw {
        status: HttpCode.NOT_FOUND,
        message: 'Usuário não encontrado',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw {
        status: HttpCode.UNAUTHORIZED,
        message: 'Senha inválida',
      };
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await redisClient.set(`refreshToken:${refreshToken}`, user.id, {
      EX: REFRESH_TOKEN_TTL_IN_SECONDS,
    });

    await redisClient.set(`user:${email}`, JSON.stringify(user), {
      EX: CACHE_TTL_IN_SECONDS,
    });

    logger.info(`Token gerado e armazenado no cache para o usuário ${user.email}: ${token}`);

    return {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
