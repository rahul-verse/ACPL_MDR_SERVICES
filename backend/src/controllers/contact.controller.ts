import type { Request, Response } from "express";

import { EnquiryService } from "../services/enquiry.service.js";
import { contactSchema } from "../validators/validation.js";

const enquiryService = new EnquiryService();

export async function createContact(req: Request, res: Response) {
  const payload = contactSchema.parse(req.body);
  const enquiry = await enquiryService.create(payload);
  res.status(201).json({
    message: "Enquiry submitted",
    data: {
      id: enquiry._id,
      status: enquiry.status,
    },
  });
}
