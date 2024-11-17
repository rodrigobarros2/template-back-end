import bcrypt from 'bcrypt';
import prisma from '../../../database/prismaClient';
import redisClient from '../../../main/config/redis';
import { UserRole } from '../../../shared/enum/roles.enum';
import { logger } from '../../../shared/utils/logger';
import { User } from '@prisma/client';

const CACHE_TTL_IN_SECONDS = 3600;

export class RegisterService {
  static async register(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: UserRole.USER },
    });

    await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
      EX: CACHE_TTL_IN_SECONDS,
    });

    logger.info('Usuário registrado e armazenado no cache:', user);

    return user;
  }
}
