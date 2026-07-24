import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { HttpError } from "../utils/http-error.js";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    next(new HttpError(401, "Missing authorization token"));
    return;
  }

  try {
    jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    next(new HttpError(401, "Invalid authorization token"));
  }
}
