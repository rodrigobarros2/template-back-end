import prisma from "../../database/prismaClient";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../shared/utils/jwt";
import { UserRole } from "../../shared/enum/roles.enum";
import { HttpCode } from "../../shared/enum/httpCode.enum";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(HttpCode.UNAUTHORIZED).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = verifyToken(token) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({ error: "Usuário não encontrado" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
    };

    next();
  } catch (error) {
    return res.status(HttpCode.UNAUTHORIZED).json({ error: "Invalid or expired token" });
  }
};
