import type { NextFunction, Request, Response } from "express";

const prohibitedKeyPattern = /[$.]/g;

export function sanitizeRequest(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    sanitizeValue(req.body);
  }
  next();
}

function sanitizeValue(value: unknown): unknown {
  if (!value || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    value.forEach(sanitizeValue);
    return value;
  }

  const record = value as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    const sanitizedKey = key.replace(prohibitedKeyPattern, "");

    if (sanitizedKey !== key) {
      record[sanitizedKey] = record[key];
      delete record[key];
    }

    sanitizeValue(record[sanitizedKey]);
  }

  return value;
}
