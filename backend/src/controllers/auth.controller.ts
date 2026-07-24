import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { HttpError } from "../utils/http-error.js";
import { loginSchema } from "../validators/validation.js";

export async function login(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);
  const emailMatches = payload.email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
  const passwordMatches = env.ADMIN_PASSWORD_HASH
    ? await bcrypt.compare(payload.password, env.ADMIN_PASSWORD_HASH)
    : payload.password === env.ADMIN_PASSWORD;

  if (!emailMatches || !passwordMatches) {
    throw new HttpError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    {
      sub: env.ADMIN_EMAIL,
      role: "admin",
    },
    env.JWT_SECRET,
    { expiresIn: "8h" },
  );

  res.json({ token });
}
