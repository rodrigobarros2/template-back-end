import 'dotenv/config';
import env from './config/env';
import { logger } from '../shared/utils/logger';
import { setupApp } from './config/app';
import { createHttpTerminator } from 'http-terminator';

export const app = setupApp();

export const server = app.listen(env.port, () => {
  logger.info(`Server running at: http://localhost:${env.port}`);
});

export const httpTerminator = createHttpTerminator({
  server,
});
