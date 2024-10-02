import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const ClientsFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  d_o_b: z.coerce.date(),
  gender: z.enum(["male", "female", "trans"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  family_member_contact_name: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  family_member_contact_number: z
    .string()
    .refine(
      (family_member_contact_number) =>
        /^\+\d{10,15}$/.test(family_member_contact_number),
      "Invalid phone number"
    ),
  primary_counsel_or_lawyer: z.string().min(2, "Select at least one Lawyer!"),
  past_criminal_record: z.boolean().optional(), //Took out the {}
  past_criminal_record_details: z.string().optional(),
  identification_type: z.string().optional(),
  identification_number: z.string().optional(),
  identification_document_url: z.string().optional(),
  identification_document: z.custom<File[]>().optional(),
  privacy_and_consent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message:
        "You must consent to RLF privacies and consent in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  primary_counsel_or_lawyer: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellation_reason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primary_counsel_or_lawyer: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellation_reason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primary_counsel_or_lawyer: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellation_reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
