import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../shared/utils/jwt';
import { UserRole } from '../../constants/roles.enum';
import { HttpCode } from '../../constants/httpCode.enum';
import prisma from '../../database/prismaClient';

interface DecodedToken {
  id: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(HttpCode.UNAUTHORIZED).json({ error: 'Token não fornecido' });
    return;
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      res.status(HttpCode.UNAUTHORIZED).json({ error: 'Usuário não encontrado' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
    };

    next();
  } catch {
    res.status(HttpCode.UNAUTHORIZED).json({ error: 'Invalid or expired token' });
  }
};
