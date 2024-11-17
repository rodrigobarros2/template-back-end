import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HttpCode } from "../../../shared/enum/httpCode.enum";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const result = await AuthService.register(name, email, password);

    res.status(HttpCode.CREATED).json({
      response: "successfull",
      message: "Usuário registrado com sucesso",
      data: result ?? {},
    });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    res.status(HttpCode.OK).json({
      response: "successfull",
      message: "Login realisado com sucesso",
      data: result ?? {},
    });
  }
}
