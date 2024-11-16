import { HttpCode } from "../../../shared/utils/httpCode";
import { UsersRepository } from "../models/user.model";

export class GetAllUsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform() {
    const users = await this.userRepository.getAll();
    if (!users) {
      throw { status: HttpCode.NOT_FOUND, message: "Nenhum usuário encontrado" };
    }
    return users;
  }
}
