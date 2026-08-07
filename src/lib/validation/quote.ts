import { z } from "zod";

/**
 * Shared quote-request schema. Imported by both the client form (React Hook
 * Form resolver) and the server action, so validation rules can never drift
 * between the browser and the server.
 */
export const PROJECT_TYPES = [
  "Frameless shower enclosure",
  "Shower door",
  "Glass railing",
  "Custom glass installation",
  "Not sure yet",
] as const;

export const CONTACT_METHODS = ["Phone", "Text", "Email"] as const;

export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "That name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on.")
    .max(30, "That phone number is too long.")
    .regex(/^[0-9+()\-.\s]+$/, "Use digits, spaces, and + ( ) - only."),
  email: z.email("Please enter a valid email address.").max(200),
  projectType: z.enum(PROJECT_TYPES, {
    message: "Please choose a project type.",
  }),
  location: z
    .string()
    .trim()
    .min(2, "Please enter your city or ZIP code.")
    .max(100, "That location is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please add a sentence or two about the project.")
    .max(2000, "Please keep the description under 2000 characters."),
  contactMethod: z.enum(CONTACT_METHODS, {
    message: "Please choose how you'd like to be contacted.",
  }),
  consent: z.literal(true, {
    message: "Please confirm LA Glass can contact you about this project.",
  }),
  /** Honeypot — must stay empty. Real people never see this field. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export type QuoteResult =
  | { ok: true }
  | { ok: false; error: string };
