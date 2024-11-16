import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { HttpCode } from "../../shared/utils/httpCode";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("Erro detectado:", err);

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(HttpCode.CONFLICT).json({
          error: { message: "Usuário já cadastrado", field: err.meta?.target },
        });
      case "P2003":
        return res.status(HttpCode.BAD_REQUEST).json({
          error: { message: "Erro de chave estrangeira", details: err.meta?.target },
        });
      case "P2025":
        return res.status(HttpCode.NOT_FOUND).json({
          error: { message: "Registro não encontrado", details: err.meta?.cause },
        });
      default:
        return res.status(HttpCode.BAD_REQUEST).json({
          error: { message: "Erro no banco de dados", details: err.message },
        });
    }
  }

  if (err instanceof PrismaClientValidationError) {
    return res.status(HttpCode.BAD_REQUEST).json({
      error: { message: "Erro de validação do Prisma", details: err.message },
    });
  }

  const status = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const message = err.message || "Erro interno do servidor";

  res.status(status).json({
    error: { message },
  });

  next();
}
