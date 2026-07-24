import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";

import { env } from "../config/env.js";
import { HttpError } from "../utils/http-error.js";
import { logger } from "../utils/logger.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      issues: error.flatten(),
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: "Validation failed",
      issues: Object.fromEntries(
        Object.entries(error.errors).map(([key, value]) => [key, value.message]),
      ),
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "Invalid resource identifier" });
    return;
  }

  if (isDuplicateKeyError(error)) {
    res.status(409).json({ message: "Resource already exists" });
    return;
  }

  logger.error("Unhandled API error", error);
  res.status(500).json({
    message: "Internal server error",
    ...(env.NODE_ENV === "development" ? { error: String(error) } : {}),
  });
};

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: number }).code === 11000
  );
}
