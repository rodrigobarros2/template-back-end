import { createClient } from 'redis';
import { logger } from '../../shared/utils/logger';
import env from './env';

const redisClient = createClient({
  url: env.redisUrl,
  password: env.redisPassword,
});

redisClient.on('connect', () => {
  logger.info('Conectado ao Redis!');
});

redisClient.on('error', (err) => {
  logger.info('Erro no Redis:', err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.info('Erro ao conectar ao Redis:', error);
  }
})();

export default redisClient;
