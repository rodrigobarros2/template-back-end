import { HttpCode } from '../../../constants/httpCode.enum';
import { Request, Response } from 'express';

import {
  createPostService,
  deletePostService,
  getAllPostsService,
  getOnePostService,
  updatePostService,
} from '../services/_instances';

export class PostController {
  static async create(req: Request, res: Response): Promise<void> {
    const post = req.body;
    const result = await createPostService.perform(post);

    res.status(HttpCode.CREATED).json({
      response: 'success',
      message: 'Post criado com sucesso',
      data: result,
    });
  }

  static async update(req: Request, res: Response): Promise<void> {
    const post = req.body;
    const result = await updatePostService.perform(req.params.id, post);

    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Post atualizado com sucesso',
      data: result,
    });
  }

  static async findOne(req: Request, res: Response): Promise<void> {
    const result = await getOnePostService.perform(req.params.id);

    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Dados obtidos com sucesso',
      data: result ?? {},
    });
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    const result = await getAllPostsService.perform();

    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Dados obtidos com sucesso',
      data: result,
    });
  }

  static async remove(req: Request, res: Response): Promise<void> {
    await deletePostService.perform(req.params.id);

    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Post removido com sucesso',
    });
  }
}
