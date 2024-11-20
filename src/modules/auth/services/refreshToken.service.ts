import redisClient from '../../../main/config/redis';
import { HttpCode } from '../../../constants/httpCode.enum';
import { generateToken, generateRefreshToken } from '../../../shared/utils/jwt';
import { logger } from '../../../shared/utils/logger';
import { UsersRepository } from '../../user/models/user.model';

const REFRESH_TOKEN_TTL_IN_SECONDS = 7 * 24 * 3600; // 7 dias

export class RefreshTokenService {
  constructor(private readonly userRepository: UsersRepository) {}

  async perform(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw {
        status: HttpCode.UNAUTHORIZED,
        message: 'Refresh token é obrigatório',
      };
    }

    const cachedToken = await redisClient.get(`refreshToken:${refreshToken}`);
    if (!cachedToken) {
      throw {
        status: HttpCode.UNAUTHORIZED,
        message: 'Refresh token inválido ou expirado',
      };
    }

    const userId = cachedToken;
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw {
        status: HttpCode.NOT_FOUND,
        message: 'Usuário não encontrado',
      };
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

    if (!user.id) {
      throw {
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: 'User ID is undefined',
      };
    }

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
