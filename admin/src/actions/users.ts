"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { audit } from "@/lib/audit";
import { randomToken, sha256 } from "@/lib/crypto";
import { emailSchema, fieldErrors, type FormState } from "@/lib/forms";
import { can, ROLES } from "@/lib/roles";
import { getCurrentUser, revokeUserSessions } from "@/lib/session";

const INVITE_TTL_DAYS = 7;
const roleSchema = z.enum(ROLES as [Role, ...Role[]]);

/** Every user-management action re-checks the caller on the server. */
async function requireAdmin() {
  const me = await getCurrentUser();
  if (!me || !can.manageUsers(me.role)) throw new Error("Not allowed.");
  return me;
}

/** At least one active admin must remain, or nobody could manage users again. */
async function wouldRemoveLastAdmin(userId: string) {
  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target || target.role !== "ADMIN" || !target.active) return false;
  return (await prisma.user.count({ where: { role: "ADMIN", active: true } })) <= 1;
}

export async function createInvite(_: FormState, formData: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const parsed = z.object({ email: emailSchema, role: roleSchema }).safeParse({ email: formData.get("email"), role: formData.get("role") });
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };
  const { email, role } = parsed.data;

  if (await prisma.user.findUnique({ where: { email } })) return { errors: { email: "This person already has an account." } };

  // A new invite replaces any earlier unused one for the same email.
  await prisma.invite.updateMany({ where: { email, acceptedAt: null, revokedAt: null }, data: { revokedAt: new Date() } });
  const token = randomToken();
  const invite = await prisma.invite.create({
    data: { email, role, tokenHash: sha256(token), invitedById: me.id, expiresAt: new Date(Date.now() + INVITE_TTL_DAYS * 86400000) },
  });
  await audit("invite.created", { userId: me.id, entity: "invite", entityId: invite.id, meta: { email, role } });
  revalidatePath("/users");

  const base = (process.env.APP_URL || "").replace(/\/$/, "");
  return {
    ok: true,
    message: `Invitation created for ${email}. Send them this link; it works once and expires in ${INVITE_TTL_DAYS} days.`,
    reveal: `${base}/accept-invite?token=${token}`,
  };
}

export async function revokeInvite(formData: FormData) {
  const me = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const invite = await prisma.invite.findUnique({ where: { id } });
  if (!invite || invite.acceptedAt || invite.revokedAt) return;
  await prisma.invite.update({ where: { id }, data: { revokedAt: new Date() } });
  await audit("invite.revoked", { userId: me.id, entity: "invite", entityId: id, meta: { email: invite.email } });
  revalidatePath("/users");
}

export async function changeRole(_: FormState, formData: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const parsed = z.object({ userId: z.string().min(1), role: roleSchema }).safeParse({ userId: formData.get("userId"), role: formData.get("role") });
  if (!parsed.success) return { message: "Choose a valid role." };
  const { userId, role } = parsed.data;
  if (userId === me.id) return { message: "You cannot change your own role. Ask another admin." };
  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target) return { message: "User not found." };
  if (target.role === role) return { ok: true };
  if (role !== "ADMIN" && (await wouldRemoveLastAdmin(userId))) return { message: "Keep at least one active admin." };

  await prisma.user.update({ where: { id: userId }, data: { role } });
  await audit("user.role_changed", { userId: me.id, entity: "user", entityId: userId, meta: { email: target.email, from: target.role, to: role } });
  revalidatePath("/users");
  return { ok: true, message: `${target.name} is now ${role.toLowerCase()}.` };
}

export async function setActive(_: FormState, formData: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const active = formData.get("active") === "true";
  if (userId === me.id) return { message: "You cannot disable your own account." };
  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target) return { message: "User not found." };
  if (!active && (await wouldRemoveLastAdmin(userId))) return { message: "Keep at least one active admin." };

  await prisma.user.update({ where: { id: userId }, data: { active } });
  if (!active) await revokeUserSessions(userId); // signed out everywhere, immediately
  await audit(active ? "user.enabled" : "user.disabled", { userId: me.id, entity: "user", entityId: userId, meta: { email: target.email } });
  revalidatePath("/users");
  return { ok: true, message: `${target.name} ${active ? "can sign in again" : "is disabled and signed out"}.` };
}
