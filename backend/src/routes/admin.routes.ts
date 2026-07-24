import { Router } from "express";

import { listEnquiries, updateEnquiryStatus } from "../controllers/admin.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/async-handler.js";

export const adminRouter = Router();

adminRouter.use(requireAuth);
adminRouter.get("/enquiries", asyncHandler(listEnquiries));
adminRouter.patch("/enquiries/:id/status", asyncHandler(updateEnquiryStatus));
