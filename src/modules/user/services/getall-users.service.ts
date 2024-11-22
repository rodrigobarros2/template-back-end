import { HttpCode } from '../../../constants/httpCode.enum';
import { getCache, setCache } from '../../../shared/utils/cache';
import { logger } from '../../../shared/utils/logger';
import { UserProps, UsersRepository } from '../models/user.model';

export class GetAllUsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform(page: number, limit: number): Promise<UserProps[]> {
    const cacheKey = `users:all:${page}:${limit}`;

    const cachedUsers = await getCache(cacheKey);
    if (cachedUsers) {
      logger.info('Usuários servidos do cache');
      return cachedUsers as UserProps[];
    }

    const users = await this.userRepository.getAll(page, limit);
    if (!users.length) {
      throw {
        status: HttpCode.NOT_FOUND,
        message: 'Nenhum usuário encontrado',
      };
    }

    await setCache(cacheKey, users, 3600);

    return users;
  }
}
