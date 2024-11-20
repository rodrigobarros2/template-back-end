import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { HttpCode } from '../../constants/httpCode.enum';

const validate =
  (schema: AnyZodObject): ((request: Request, response: Response, next: NextFunction) => Promise<void>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const res = await schema.parseAsync({
        body: request.body,
        query: request.query,
        params: request.params,
      });
      Object.assign(request, res);

      return next();
    } catch (error) {
      response.status(HttpCode.UNPROCESSABLE_ENTITY).json({
        response: 'error',
        message: 'A solicitação não pôde ser compreendida pelo servidor. Verifique a tipagem e parametros.',
        data: error,
      });
      return next(error);
    }
  };

export default validate;
