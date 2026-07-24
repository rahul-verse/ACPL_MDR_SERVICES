import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(4000),
    MONGODB_URI: z.string().min(1).default("mongodb://127.0.0.1:27017/acpl-mdr"),
    JWT_SECRET: z.string().min(24).default("development-secret-change-before-production"),
    ADMIN_EMAIL: z.string().email().default("admin@acplsystems.com"),
    ADMIN_PASSWORD: z.string().min(8).default("change-this-password"),
    ADMIN_PASSWORD_HASH: z.string().optional(),
    CORS_ORIGIN: z.string().default("http://localhost:3000"),
    TRUST_PROXY: z.coerce.boolean().default(false),
  })
  .superRefine((value, context) => {
    if (value.NODE_ENV !== "production") {
      return;
    }

    if (value.JWT_SECRET === "development-secret-change-before-production") {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["JWT_SECRET"],
        message: "JWT_SECRET must be changed in production.",
      });
    }

    if (!value.ADMIN_PASSWORD_HASH && value.ADMIN_PASSWORD === "change-this-password") {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ADMIN_PASSWORD"],
        message: "Use ADMIN_PASSWORD_HASH or a strong ADMIN_PASSWORD in production.",
      });
    }
  });

export const env = envSchema.parse(process.env);
export const allowedCorsOrigins = env.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
