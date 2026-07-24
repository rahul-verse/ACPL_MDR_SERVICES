import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { allowedCorsOrigins, env } from "./config/env.js";
import { adminRouter } from "./routes/admin.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { publicRouter } from "./routes/public.routes.js";
import { errorHandler } from "./middleware/error-handler.js";
import { sanitizeRequest } from "./middleware/sanitize.js";
import { HttpError } from "./utils/http-error.js";

export function createApp() {
  const app = express();
  app.set("trust proxy", env.TRUST_PROXY);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedCorsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(null, false);
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "32kb" }));
  app.use(sanitizeRequest);
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 80,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
  const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 12,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many login attempts. Please try again later." },
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app.use(publicRouter);
  app.use("/auth", authLimiter, authRouter);
  app.use("/admin", adminRouter);

  app.use((_req, _res, next) => {
    next(new HttpError(404, "Route not found"));
  });

  app.use(errorHandler);

  return app;
}
