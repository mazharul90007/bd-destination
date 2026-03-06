import { createClient } from "redis";
import config from "../app/config";

const redisClient = createClient({
  url: config.redis_url,
  //   database: 0,
  disableOfflineQueue: true,
  pingInterval: 30000,
  socket: {
    connectTimeout: 10000,
    reconnectStrategy: () => 10000,
  },
});

redisClient.on("error", (error) => {
  if (error.code !== "ECONNREFUSED") {
    console.log("REDIS_ERROR:", error.message);
  }
});
redisClient.on("connect", () => console.log("Redis Connected Successfully!"));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;
