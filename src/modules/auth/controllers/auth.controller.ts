import { Request, Response } from 'express';
import { HttpCode } from '../../../constants/httpCode.enum';
import { loginService, refreshTokenService } from '../services/_instances';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const result = await loginService.perform(email, password);

    res.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Login realisado com sucesso',
      data: result ?? {},
    });
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;

    const result = await refreshTokenService.perform(refreshToken);

    res.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Login realisado com sucesso',
      data: result ?? {},
    });
  }
}
