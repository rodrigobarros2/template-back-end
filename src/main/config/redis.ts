import { createClient } from "redis";
import { logger } from "../../shared/utils/logger";

const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  logger.info("Conectado ao Redis!");
});

redisClient.on("error", (err) => {
  console.error("Erro no Redis:", err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Erro ao conectar ao Redis:", error);
  }
})();

export default redisClient;
