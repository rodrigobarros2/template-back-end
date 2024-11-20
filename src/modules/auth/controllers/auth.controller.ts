import { Request, Response } from 'express';
import { HttpCode } from '../../../constants/httpCode.enum';
import { LoginService } from '../services/login.service';
import { RefreshTokenService } from '../services/refreshToken.service';
import { UsersDBRepository } from '../../user/repositories/user.repository';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const userService = new LoginService(new UsersDBRepository());

    const { email, password } = req.body;

    const result = await userService.perform(email, password);

    res.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Login realisado com sucesso',
      data: result ?? {},
    });
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    const userService = new RefreshTokenService(new UsersDBRepository());

    const { refreshToken } = req.body;

    const result = await userService.perform(refreshToken);

    res.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Login realisado com sucesso',
      data: result ?? {},
    });
  }
}
