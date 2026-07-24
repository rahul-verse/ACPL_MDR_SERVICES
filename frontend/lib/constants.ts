import type { EnquiryStatus } from "@/types/admin";

export const ENQUIRY_STATUSES = [
  "new",
  "qualified",
  "in-review",
  "closed",
] as const satisfies readonly EnquiryStatus[];

export const ENQUIRY_STATUS_OPTIONS = ["all", ...ENQUIRY_STATUSES] as const;
