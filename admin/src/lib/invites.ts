import { prisma } from "./db";
import { sha256 } from "./crypto";

/** Finds an invite that can still be used, from the raw token in the link. */
export async function findUsableInvite(token: string) {
  if (!token || token.length > 100) return null;
  const invite = await prisma.invite.findUnique({ where: { tokenHash: sha256(token) } });
  if (!invite || invite.acceptedAt || invite.revokedAt || invite.expiresAt < new Date()) return null;
  return invite;
}
