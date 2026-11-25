import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Role, User } from "@prisma/client";
import { prisma } from "./db";
import { randomToken, sha256 } from "./crypto";
import { clientIp, userAgent } from "./request";

export const SESSION_COOKIE = "dama_admin_session";

const DAY = 24 * 60 * 60 * 1000;
/** Signed out after 7 days without activity … */
const IDLE_TTL = 7 * DAY;
/** … and after 30 days in any case. */
const ABSOLUTE_TTL = 30 * DAY;

export type SafeUser = Pick<User, "id" | "email" | "name" | "role" | "active" | "lastLoginAt">;

export async function createSession(userId: string) {
  const token = randomToken();
  const now = Date.now();
  await prisma.session.create({
    data: { id: sha256(token), userId, expiresAt: new Date(now + IDLE_TTL), ip: await clientIp(), userAgent: await userAgent() },
  });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(now + ABSOLUTE_TTL),
  });
}

/** Current signed-in user, or null. Cached per request. Extends the idle timeout as the user works. */
export const getCurrentUser = cache(async (): Promise<SafeUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { id: sha256(token) },
    include: { user: { select: { id: true, email: true, name: true, role: true, active: true, lastLoginAt: true } } },
  });
  if (!session) return null;
  const now = Date.now();
  const expired = session.expiresAt.getTime() < now || session.createdAt.getTime() + ABSOLUTE_TTL < now;
  if (expired || !session.user.active) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  // Slide the idle window at most once an hour to keep writes low.
  if (session.expiresAt.getTime() - now < IDLE_TTL - 60 * 60 * 1000) {
    await prisma.session.update({ where: { id: session.id }, data: { expiresAt: new Date(now + IDLE_TTL) } }).catch(() => {});
  }
  return session.user;
});

export async function destroyCurrentSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { id: sha256(token) } });
  jar.delete(SESSION_COOKIE);
}

/** Signs a user out everywhere (password change keeps the current session via `except`). */
export async function revokeUserSessions(userId: string, except?: string) {
  await prisma.session.deleteMany({ where: { userId, ...(except ? { NOT: { id: except } } : {}) } });
}

export async function currentSessionId(): Promise<string | undefined> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? sha256(token) : undefined;
}

/** For pages and layouts: sends signed-out visitors to the login page, and others away from pages their role cannot see. */
export async function requireUser(roles?: Role[]): Promise<SafeUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (roles && !roles.includes(user.role)) redirect("/?denied=1");
  return user;
}
