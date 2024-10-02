import { z } from "zod";

export const RLLP_UserValidation = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Username must be at most 20 characters."),

  email: z.string().email().includes("@").includes("."),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number!!"),
});
