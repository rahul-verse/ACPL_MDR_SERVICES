import mongoose from "mongoose";

import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export async function connectDatabase() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection failed", error);
    throw error;
  }
}
