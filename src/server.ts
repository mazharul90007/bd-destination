import { Server } from "http";
import app from "./app";
import config from "./app/config";
import { connectRedis } from "./lib/redis";

const port = config.port || 5173;

let server: Server;

async function startServer() {
  try {
    //Connect Redis
    connectRedis().catch((err) => {
      console.error(
        "Initial Redis connection failed, but server is starting...",
      );
    });

    //Connect Server
    server = app.listen(port as number, "0.0.0.0", () => {
      console.log("BD-DESTINATION Server is running on port: ", port);
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
  }
}

startServer();
