export type EnquiryStatus = "new" | "qualified" | "in-review" | "closed";

export type Enquiry = {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedEnquiries = {
  data: Enquiry[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
