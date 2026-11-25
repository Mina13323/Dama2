import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { revokeInvite } from "@/actions/users";
import { roleLabel } from "@/lib/roles";
import { Badge, Card, PageTitle, btn, formatDateTime } from "@/components/ui";
import { InviteForm } from "@/components/forms/InviteForm";
import { UserRow } from "@/components/forms/UserRow";

export const metadata: Metadata = { title: "Users & access" };

export default async function UsersPage() {
  const me = await requireUser(["ADMIN"]);
  const [users, invites] = await Promise.all([
    prisma.user.findMany({ orderBy: [{ active: "desc" }, { name: "asc" }], select: { id: true, name: true, email: true, role: true, active: true, lastLoginAt: true } }),
    prisma.invite.findMany({
      where: { acceptedAt: null, revokedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
      include: { invitedBy: { select: { name: true } } },
    }),
  ]);

  return (
    <>
      <PageTitle eyebrow="Administration" title="Users & access" description="Invite DAMA staff, choose what each person can do, and disable access when someone leaves." />
      <div className="space-y-6">
        <Card title="Invite someone" description="They receive a one-time link to set their name and password. Links expire after 7 days.">
          <InviteForm />
        </Card>

        <Card title={`Team (${users.length})`}>
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[640px] text-start text-small">
              <thead>
                <tr className="border-b border-border text-caption text-subtle">
                  <th className="px-2 py-2 text-start font-semibold">Person</th>
                  <th className="px-2 py-2 text-start font-semibold">Role</th>
                  <th className="px-2 py-2 text-start font-semibold">Last sign-in</th>
                  <th className="px-2 py-2 text-start font-semibold">Status</th>
                  <th className="px-2 py-2" />
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <UserRow key={u.id} user={{ ...u, lastLogin: formatDateTime(u.lastLoginAt) }} isMe={u.id === me.id} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={`Pending invitations (${invites.length})`}>
          {invites.length === 0 ? (
            <p className="text-small text-muted">No pending invitations.</p>
          ) : (
            <ul className="divide-y divide-border">
              {invites.map((i) => (
                <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-semibold text-ink">{i.email}</p>
                    <p className="text-caption text-subtle">
                      Invited by {i.invitedBy.name} · expires {formatDateTime(i.expiresAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge>{roleLabel[i.role]}</Badge>
                    <form action={revokeInvite}>
                      <input type="hidden" name="id" value={i.id} />
                      <button type="submit" className={btn.danger}>
                        Revoke
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
