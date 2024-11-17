import bcrypt from 'bcrypt';
import prisma from '../../../database/prismaClient';
import redisClient from '../../../main/config/redis';
import { UserRole } from '../../../shared/enum/roles.enum';
import { logger } from '../../../shared/utils/logger';
import { generateToken } from '../../../shared/utils/jwt';
import { RegisterResponse } from '../models/auth.model';

const CACHE_TTL_IN_SECONDS = 3600;

export class RegisterService {
  static async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: UserRole.USER },
    });

    await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
      EX: CACHE_TTL_IN_SECONDS,
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    logger.info('Usuário registrado e armazenado no cache:', user);

    return {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
