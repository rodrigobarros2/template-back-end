import { HttpCode } from '../../../shared/enum/httpCode.enum';
import { getCache, setCache } from '../../../shared/utils/cache';
import { logger } from '../../../shared/utils/logger';
import { UsersRepository } from '../models/user.model';

export class GetAllUsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform() {
    const cacheKey = 'users:all';

    const cachedUsers = await getCache(cacheKey);
    if (cachedUsers) {
      logger.info('Usuários servidos do cache');
      return cachedUsers;
    }

    const users = await this.userRepository.getAll();
    if (!users) {
      throw {
        status: HttpCode.NOT_FOUND,
        message: 'Nenhum usuário encontrado',
      };
    }

    await setCache(cacheKey, users, 3600);

    return users;
  }
}
