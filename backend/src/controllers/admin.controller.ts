import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { EnquiryService } from "../services/enquiry.service.js";
import { HttpError } from "../utils/http-error.js";
import { enquiryStatusSchema, listEnquiriesQuerySchema } from "../validators/validation.js";

const enquiryService = new EnquiryService();

export async function listEnquiries(req: Request, res: Response) {
  const query = listEnquiriesQuerySchema.parse(req.query);

  const result = await enquiryService.list({
    page: query.page,
    limit: query.limit,
    search: query.search,
    status: query.status,
  });

  res.json(result);
}

export async function updateEnquiryStatus(req: Request, res: Response) {
  if (!isValidObjectId(req.params.id)) {
    throw new HttpError(400, "Invalid enquiry id");
  }

  const payload = enquiryStatusSchema.parse(req.body);
  const enquiry = await enquiryService.updateStatus(req.params.id, payload.status);

  if (!enquiry) {
    throw new HttpError(404, "Enquiry not found");
  }

  res.json({ data: enquiry });
}
