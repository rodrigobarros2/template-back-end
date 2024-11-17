import redisClient from '../../main/config/redis';
import { logger } from './logger';

export const setCache = async <T>(key: string, value: T, ttl: number = 3600): Promise<void> => {
  try {
    const data = JSON.stringify(value);
    await redisClient.setEx(key, ttl, data);
    logger.info(`Cache definido para a chave: ${key}`);
  } catch (error) {
    logger.error(`Erro ao definir cache para a chave ${key}:`, error);
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error(`Erro ao obter cache para a chave ${key}:`, error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
    logger.info(`Cache limpo para a chave: ${key}`);
  } catch (error) {
    logger.error(`Erro ao limpar cache para a chave ${key}:`, error);
  }
};
