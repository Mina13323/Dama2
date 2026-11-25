import type { Prisma } from "@prisma/client";
import { prisma } from "./db";
import { clientIp } from "./request";

/** Everything the audit log records. Keep names stable: they are stored and filtered on. */
export type AuditAction =
  | "auth.login"
  | "auth.login_failed"
  | "auth.login_blocked"
  | "auth.logout"
  | "auth.password_changed"
  | "invite.created"
  | "invite.revoked"
  | "invite.accepted"
  | "user.role_changed"
  | "user.disabled"
  | "user.enabled"
  | "user.created_cli";

export async function audit(
  action: AuditAction,
  opts: { userId?: string | null; entity?: string; entityId?: string; meta?: Prisma.InputJsonValue } = {},
) {
  await prisma.auditLog.create({
    data: {
      action,
      userId: opts.userId ?? null,
      entity: opts.entity,
      entityId: opts.entityId,
      meta: opts.meta,
      ip: await clientIp(),
    },
  });
}
