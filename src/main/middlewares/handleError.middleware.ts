import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { HttpCode } from '../../constants/httpCode.enum';
import { logger } from '../../shared/utils/logger';

interface CustomError extends Error {
  status?: number;
}

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction): void {
  logger.error('Erro detectado:', err);

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        res.status(HttpCode.CONFLICT).json({
          error: { message: 'Usuário já cadastrado', field: err.meta?.target },
        });
        return;
      case 'P2003':
        res.status(HttpCode.BAD_REQUEST).json({
          error: {
            message: 'Erro de chave estrangeira',
            details: err.meta?.target,
          },
        });
        return;
      case 'P2025':
        res.status(HttpCode.NOT_FOUND).json({
          error: {
            message: 'Registro não encontrado',
            details: err.meta?.cause,
          },
        });
        return;
      default:
        res.status(HttpCode.BAD_REQUEST).json({
          error: { message: 'Erro no banco de dados', details: err.message },
        });
        return;
    }
  }

  if (err instanceof PrismaClientValidationError) {
    res.status(HttpCode.BAD_REQUEST).json({
      error: { message: 'Erro de validação do Prisma', details: err.message },
    });
    return;
  }

  const status = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    error: { message },
  });

  next();
}
