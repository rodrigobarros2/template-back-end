import { NextFunction, Request, Response } from "express";
import { UsersDBRepository } from "../repositories/user.repository";
import { GetAllUsersService } from "../services/getall-users.service";
import { DeleteUserService } from "../services/delete-users.service";
import { GetOneUserService } from "../services/getone-users.service";
import { CreateUserService } from "../services/create-users.service";
import { UpdateUserService } from "../services/update-users.service";
import { HttpCode } from "../../../shared/enum/httpCode.enum";

class UserController {
  static async findAll(request: Request, response: Response) {
    const userService = new GetAllUsersService(new UsersDBRepository());

    const result = await userService.perform();

    response.status(HttpCode.OK).json({
      response: "successfull",
      message: "Dados obtidos com sucesso",
      data: result,
    });
  }

  static async findOne(request: Request, response: Response) {
    const userService = new GetOneUserService(new UsersDBRepository());

    const result = await userService.perform(request.params.id);

    response.status(HttpCode.OK).json({
      response: "successfull",
      message: "Dados obtidos com sucesso",
      data: result ?? {},
    });
  }

  static async create(request: Request, response: Response, next: NextFunction) {
    const userService = new CreateUserService(new UsersDBRepository());
    const user = request.body;

    const result = await userService.perform(user);

    response.status(HttpCode.CREATED).json({
      response: "success",
      message: "Usuário criado com sucesso",
      data: result ?? {},
    });
  }

  static async update(request: Request, response: Response) {
    const userService = new UpdateUserService(new UsersDBRepository());

    const updateDto = request.body;

    const result = await userService.perform(request.params.id, updateDto);

    response.status(HttpCode.OK).json({
      response: "successfull",
      message: "Usuário atualizado com sucesso",
      data: result ?? {},
    });
  }

  static async remove(request: Request, response: Response) {
    const userService = new DeleteUserService(new UsersDBRepository());

    await userService.perform(request.params.id);

    response.status(HttpCode.OK).json({
      response: "successfull",
      message: "Usuário removido com sucesso",
    });
  }
}

export default UserController;
