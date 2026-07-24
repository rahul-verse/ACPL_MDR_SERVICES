import { z } from "zod";

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,18}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name cannot exceed 80 characters"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(120, "Email cannot exceed 120 characters"),
  company: z.string().trim().min(2, "Company name is required").max(120, "Company name cannot exceed 120 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(phoneRegex, "Enter a valid phone number format"),
  service: z.string().trim().min(2, "Service selection is required").max(120),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(1200, "Message cannot exceed 1,200 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(["new", "qualified", "in-review", "closed"]),
});

export const listEnquiriesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  search: z.string().trim().max(120).optional(),
  status: z.enum(["new", "qualified", "in-review", "closed"]).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
