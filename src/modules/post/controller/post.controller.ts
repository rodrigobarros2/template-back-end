import { HttpCode } from '../../../shared/enum/httpCode.enum';
import { Request, Response } from 'express';
import { PostsDBRepository } from '../repositories/post.repository';
import { CreatePostService } from '../services/create-post.service';
import { UpdatePostService } from '../services/update-post.service';
import { GetAllPostService } from '../services/getall-post.service';
import { GetOnePostService } from '../services/getone-post.service';
import { DeletePostService } from '../services/delete-post.service';

export class PostController {
  static async create(req: Request, res: Response): Promise<void> {
    const userService = new CreatePostService(new PostsDBRepository());

    const post = req.body;
    const result = await userService.perform(post);

    res.status(HttpCode.CREATED).json({
      response: 'success',
      message: 'Post criado com sucesso',
      data: result,
    });
  }

  static async update(req: Request, res: Response): Promise<void> {
    const userService = new UpdatePostService(new PostsDBRepository());

    const post = req.body;
    const result = await userService.perform(req.params.id, post);

    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Post atualizado com sucesso',
      data: result,
    });
  }

  static async findOne(req: Request, res: Response): Promise<void> {
    const userService = new GetOnePostService(new PostsDBRepository());

    const result = await userService.perform(req.params.id);

    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Dados obtidos com sucesso',
      data: result ?? {},
    });
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    const userService = new GetAllPostService(new PostsDBRepository());

    const result = await userService.perform();

    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Dados obtidos com sucesso',
      data: result,
    });
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const userService = new DeletePostService(new PostsDBRepository());

    await userService.perform(req.params.id);

    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Post removido com sucesso',
    });
  }
}
