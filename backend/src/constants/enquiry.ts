export const ENQUIRY_STATUSES = ["new", "qualified", "in-review", "closed"] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];
