import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { createApp } from "./app.js";
import { logger } from "./utils/logger.js";
import mongoose from "mongoose";

async function bootstrap() {
  await connectDatabase();
  const app = createApp();
  const server = app.listen(env.PORT, () => {
    logger.info(`ACPL MDR API listening on port ${env.PORT}`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Closing ACPL MDR API.`);
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

bootstrap().catch((error) => {
  logger.error("Failed to start ACPL MDR API", error);
  process.exit(1);
});
