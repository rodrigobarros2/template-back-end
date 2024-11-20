import { HttpCode } from '../../../constants/httpCode.enum';
import { UserProps, UsersRepository } from '../models/user.model';

export class UpdateUserService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform(id: string, user: Partial<UserProps>): Promise<{ id: string }> {
    const existingUser = await this.userRepository.getById(id);

    if (!existingUser) {
      throw { status: HttpCode.NOT_FOUND, message: 'Usuário não encontrado' };
    }

    const updatedUserProps: UserProps = {
      ...existingUser,
      ...user,
    };

    const updatedUser = await this.userRepository.update(id, updatedUserProps);

    if (!updatedUser) {
      throw {
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: 'Falha na atualização do usuário',
      };
    }
    return updatedUser;
  }
}
