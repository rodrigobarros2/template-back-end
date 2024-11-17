import prisma from '../../../database/prismaClient';
import redisClient from '../../../main/config/redis';
import { generateToken, generateRefreshToken } from '../../../shared/utils/jwt';
import { logger } from '../../../shared/utils/logger';

const REFRESH_TOKEN_TTL_IN_SECONDS = 7 * 24 * 3600; // 7 dias

export class RefreshTokenService {
  static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('Refresh token é obrigatório');
    }

    const cachedToken = await redisClient.get(`refreshToken:${refreshToken}`);
    if (!cachedToken) {
      throw new Error('Refresh token inválido ou expirado');
    }

    const userId = cachedToken;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    logger.info('Usuário encontrado para renovação de token:', {
      id: user.id,
      email: user.email,
    });

    const newAccessToken = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const newRefreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await redisClient.set(`refreshToken:${newRefreshToken}`, user.id, {
      EX: REFRESH_TOKEN_TTL_IN_SECONDS,
    });

    await redisClient.del(`refreshToken:${refreshToken}`);

    logger.info('Novo token gerado com sucesso:', {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
