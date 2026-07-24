import { Router } from "express";
import rateLimit from "express-rate-limit";

import { createContact } from "../controllers/contact.controller.js";
import { getFaq, getServices } from "../controllers/content.controller.js";
import { asyncHandler } from "../utils/async-handler.js";

export const publicRouter = Router();
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many contact attempts. Please try again later." },
});

publicRouter.post("/contact", contactLimiter, asyncHandler(createContact));
publicRouter.get("/services", getServices);
publicRouter.get("/faq", getFaq);
