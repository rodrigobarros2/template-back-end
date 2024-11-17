import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../shared/enum/roles.enum';
import { HttpCode } from '../../shared/enum/httpCode.enum';

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      res.status(HttpCode.UNAUTHORIZED).json({ error: 'Não autorizado' });
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(HttpCode.FORBIDDEN).json({ error: 'Você não tem permissão para acessar essa rota' });
      return;
    }

    next();
  };
};
