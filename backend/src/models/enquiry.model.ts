import { Schema, model, type InferSchemaType } from "mongoose";

import { ENQUIRY_STATUSES } from "../constants/enquiry.js";

const enquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120, index: true },
    company: { type: String, required: true, trim: true, minlength: 2, maxlength: 120, index: true },
    phone: { type: String, trim: true, maxlength: 32, default: "" },
    service: { type: String, required: true, trim: true, minlength: 2, maxlength: 120, index: true },
    message: { type: String, required: true, trim: true, minlength: 20, maxlength: 1200 },
    status: {
      type: String,
      enum: ENQUIRY_STATUSES,
      default: "new",
      index: true,
    },
    source: { type: String, default: "website", immutable: true },
  },
  { timestamps: true },
);

enquirySchema.index({
  name: "text",
  email: "text",
  company: "text",
  service: "text",
  message: "text",
});
enquirySchema.index({ status: 1, createdAt: -1 });

export type EnquiryDocument = InferSchemaType<typeof enquirySchema>;
export const EnquiryModel = model("Enquiry", enquirySchema);
