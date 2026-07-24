import { z } from "zod";

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,18}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid business email address")
    .max(120, "Email cannot exceed 120 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(120, "Company name cannot exceed 120 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(phoneRegex, "Enter a valid phone number (e.g. +91 98765 43210)"),
  service: z.string().trim().min(2, "Select a service interest"),
  message: z
    .string()
    .trim()
    .min(20, "Please provide at least 20 characters describing your security goals")
    .max(1200, "Message cannot exceed 1,200 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid admin email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
