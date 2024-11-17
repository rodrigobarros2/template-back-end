import { HttpCode } from '../../../shared/enum/httpCode.enum';
import { UserProps, UsersRepository } from '../models/user.model';

export class CreateUserService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform(user: UserProps) {
    const createdUser = await this.userRepository.create(user);

    if (!createdUser) {
      throw {
        status: HttpCode.NOT_FOUND,
        message: 'A criação do usuário falhou',
      };
    }

    return createdUser;
  }
}
