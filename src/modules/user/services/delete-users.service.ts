import { HttpCode } from '../../../constants/httpCode.enum';
import { UsersRepository } from '../models/user.model';

export class DeleteUserService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform(id: string): Promise<void> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw { status: HttpCode.NOT_FOUND, message: 'Usuário não encontrado' };
    }

    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw {
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: 'Falha ao deletar usuário',
      };
    }
  }
}
