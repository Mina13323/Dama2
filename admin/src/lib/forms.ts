import { z } from "zod";
import { PASSWORD_MAX, PASSWORD_MIN } from "./crypto";

/** Result every form action returns to its page (useActionState). */
export type FormState = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
  /** One-time value to show the user, e.g. a new invite link. */
  reveal?: string;
};

export const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address.").max(191);

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN, `Use at least ${PASSWORD_MIN} characters.`)
  .max(PASSWORD_MAX, `Use at most ${PASSWORD_MAX} characters.`);

export const nameSchema = z.string().trim().min(2, "Enter your full name.").max(120);

/** zod issues → { field: first message } */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
