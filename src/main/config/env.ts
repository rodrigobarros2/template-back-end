export default {
  port: process.env.PORT || 3333,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  redisUrl: process.env.REDIS_URL,
  redisPassword: process.env.REDIS_PASSWORD,
};
