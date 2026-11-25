"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { fieldErrors, passwordSchema, type FormState } from "@/lib/forms";
import { currentSessionId, getCurrentUser, revokeUserSessions } from "@/lib/session";

export async function changePassword(_: FormState, formData: FormData): Promise<FormState> {
  const me = await getCurrentUser();
  if (!me) return { message: "Your session has ended. Sign in again." };

  const parsed = z
    .object({ current: z.string().min(1, "Enter your current password."), password: passwordSchema, confirm: z.string() })
    .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "The passwords do not match." })
    .refine((v) => v.password !== v.current, { path: ["password"], message: "Choose a password different from the current one." })
    .safeParse({ current: formData.get("current"), password: formData.get("password"), confirm: formData.get("confirm") });
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const user = await prisma.user.findUniqueOrThrow({ where: { id: me.id } });
  if (!(await verifyPassword(user.passwordHash, parsed.data.current))) return { errors: { current: "That is not your current password." } };

  await prisma.user.update({ where: { id: me.id }, data: { passwordHash: await hashPassword(parsed.data.password) } });
  // Other devices are signed out; this one stays signed in.
  await revokeUserSessions(me.id, await currentSessionId());
  await audit("auth.password_changed", { userId: me.id });
  return { ok: true, message: "Password changed. You were signed out on your other devices." };
}
