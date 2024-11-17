import { Request, Response, NextFunction } from 'express';
import { getCache, setCache } from '../../shared/utils/cache';
import { logger } from '../../shared/utils/logger';

const cacheMiddleware = (prefix: string, ttl: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cacheKey = `${prefix}:${req.originalUrl}`;

    try {
      const cachedData = await getCache(cacheKey);

      if (cachedData) {
        logger.info('Resposta servida pelo cache');
        res.json(cachedData);
        return;
      }

      const originalJson = res.json.bind(res);

      res.json = (body: unknown) => {
        setCache(cacheKey, body, ttl).catch((error) => {
          logger.error('Erro ao salvar no cache:', error);
        });
        return originalJson(body);
      };

      next();
    } catch (error) {
      logger.error('Erro no middleware de cache:', error);
      next();
    }
  };
};

export default cacheMiddleware;
