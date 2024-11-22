import { Request, Response } from 'express';
import {
  getAllUsersService,
  deleteUserService,
  getOneUserService,
  createUserService,
  updateUserService,
} from '../services/_instances.js';
import { HttpCode } from '../../../constants/httpCode.enum.js';

class UserController {
  static async findAll(request: Request, response: Response): Promise<void> {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const result = await getAllUsersService.perform(page, limit);

    response.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Dados obtidos com sucesso',
      data: result,
    });
  }

  static async findOne(request: Request, response: Response): Promise<void> {
    const result = await getOneUserService.perform(request.params.id);

    response.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Dados obtidos com sucesso',
      data: result ?? {},
    });
  }

  static async create(request: Request, response: Response): Promise<void> {
    const user = request.body;

    const result = await createUserService.perform(user);

    response.status(HttpCode.CREATED).json({
      response: 'success',
      message: 'Usuário criado com sucesso',
      data: result ?? {},
    });
  }

  static async update(request: Request, response: Response): Promise<void> {
    const updateDto = request.body;

    const result = await updateUserService.perform(request.params.id, updateDto);

    response.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Usuário atualizado com sucesso',
      data: result ?? {},
    });
  }

  static async remove(request: Request, response: Response): Promise<void> {
    await deleteUserService.perform(request.params.id);

    response.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Usuário removido com sucesso',
    });
  }
}

export default UserController;
