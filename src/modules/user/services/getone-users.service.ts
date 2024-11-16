import { HttpCode } from "../../../shared/utils/httpCode";
import { UsersRepository } from "../models/user.model";

export class GetOneUserService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw { status: HttpCode.NOT_FOUND, message: "Usuário não encontrado" };
    }
    return user;
  }
}
