import { HttpCode } from '../../../shared/enum/httpCode.enum';
import { getCache, setCache } from '../../../shared/utils/cache'; // Supondo que essas funções estão implementadas em algum lugar
import { logger } from '../../../shared/utils/logger';
import { UsersRepository } from '../models/user.model';

export class GetOneUserService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform(id: string) {
    const cacheKey = `user:${id}`;

    const cachedUser = await getCache(cacheKey);
    if (cachedUser) {
      logger.info('Usuário servido do cache');
      return cachedUser;
    }

    const user = await this.userRepository.getById(id);
    if (!user) {
      throw { status: HttpCode.NOT_FOUND, message: 'Usuário não encontrado' };
    }

    await setCache(cacheKey, user, 3600);

    return user;
  }
}
