import { Request, Response } from 'express';
import { HttpCode } from '../../../shared/enum/httpCode.enum';
import { RegisterService } from '../services/register.service';
import { LoginService } from '../services/login.service';
import { RefreshTokenService } from '../services/refreshToken.service';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const result = await RegisterService.register(name, email, password);

    res.status(HttpCode.CREATED).json({
      response: 'successfull',
      message: 'Usuário registrado com sucesso',
      data: result ?? {},
    });
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await LoginService.login(email, password);

    res.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Login realisado com sucesso',
      data: result ?? {},
    });
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(HttpCode.NOT_FOUND).json({ error: 'No refresh token provided' });
      return;
    }

    const tokens = await RefreshTokenService.refresh(refreshToken);

    res.status(HttpCode.OK).json({
      response: 'successfull',
      message: 'Login realisado com sucesso',
      data: tokens ?? {},
    });
  }
}
