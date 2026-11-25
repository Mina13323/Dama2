"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";
import { hashPassword, timingSafeDummyHash, verifyPassword } from "@/lib/crypto";
import { findUsableInvite } from "@/lib/invites";
import { emailSchema, fieldErrors, nameSchema, passwordSchema, type FormState } from "@/lib/forms";
import { loginBlocked, recordLoginAttempt } from "@/lib/rate-limit";
import { clientIp, safeNext } from "@/lib/request";
import { createSession, destroyCurrentSession, getCurrentUser } from "@/lib/session";

const GENERIC_FAIL = "That email and password do not match an active account.";

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = z.object({ email: emailSchema, password: z.string().min(1, "Enter your password.").max(200) }).safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };
  const { email, password } = parsed.data;
  const ip = await clientIp();

  if (await loginBlocked(email, ip)) {
    await audit("auth.login_blocked", { meta: { email } });
    return { message: "Too many attempts. Wait 15 minutes, then try again." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  // Always run one Argon2 verification so response time does not reveal whether the email exists.
  const valid = await verifyPassword(user?.passwordHash ?? (await timingSafeDummyHash()), password);

  if (!user || !valid || !user.active) {
    await recordLoginAttempt(email, ip, false);
    await audit("auth.login_failed", { userId: user?.id, meta: { email, reason: !user ? "unknown_email" : !valid ? "bad_password" : "disabled" } });
    return { message: GENERIC_FAIL };
  }

  await recordLoginAttempt(email, ip, true);
  await createSession(user.id);
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await audit("auth.login", { userId: user.id });
  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  const user = await getCurrentUser();
  await destroyCurrentSession();
  if (user) await audit("auth.logout", { userId: user.id });
  redirect("/login");
}

export async function acceptInvite(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = z
    .object({ token: z.string().min(1), name: nameSchema, password: passwordSchema, confirm: z.string() })
    .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "The passwords do not match." })
    .safeParse({ token: formData.get("token"), name: formData.get("name"), password: formData.get("password"), confirm: formData.get("confirm") });
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const invite = await findUsableInvite(parsed.data.token);
  if (!invite) return { message: "This invitation link is no longer valid. Ask an admin for a new one." };
  if (await prisma.user.findUnique({ where: { email: invite.email } })) {
    return { message: "An account with this email already exists. Sign in instead." };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({ data: { email: invite.email, name: parsed.data.name, role: invite.role, passwordHash } });
    await tx.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
    return created;
  });
  await audit("invite.accepted", { userId: user.id, entity: "invite", entityId: invite.id, meta: { role: invite.role } });
  await createSession(user.id);
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  redirect("/");
}
