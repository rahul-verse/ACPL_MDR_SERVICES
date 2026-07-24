import { env } from "../config/env.js";

export const logger = {
  info(message: string, meta?: unknown) {
    console.info(message, meta ?? "");
  },
  error(message: string, error?: unknown) {
    if (env.NODE_ENV === "test") {
      return;
    }

    console.error(message, error ?? "");
  },
};
