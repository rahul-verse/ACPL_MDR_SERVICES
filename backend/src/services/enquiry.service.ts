import type { FilterQuery } from "mongoose";

import type { EnquiryStatus } from "../constants/enquiry.js";
import { EnquiryModel, type EnquiryDocument } from "../models/enquiry.model.js";
import type { ContactInput } from "../validators/validation.js";

function escapeTextSearch(value: string) {
  return value.replace(/[^\w\s@.-]/g, " ").trim();
}

export class EnquiryService {
  async create(input: ContactInput) {
    return EnquiryModel.create({ ...input, source: "website" });
  }

  async list({
    page,
    limit,
    search,
    status,
  }: {
    page: number;
    limit: number;
    search?: string;
    status?: EnquiryStatus;
  }) {
    const filter: FilterQuery<EnquiryDocument> = {};

    if (status) {
      filter.status = status;
    }

    const sanitizedSearch = search ? escapeTextSearch(search) : "";
    if (sanitizedSearch.length >= 2) {
      filter.$text = { $search: sanitizedSearch };
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      EnquiryModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      EnquiryModel.countDocuments(filter),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        pages: Math.max(Math.ceil(total / limit), 1),
      },
    };
  }

  async updateStatus(id: string, status: EnquiryStatus) {
    return EnquiryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    ).lean();
  }
}
