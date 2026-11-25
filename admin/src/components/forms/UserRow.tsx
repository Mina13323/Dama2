"use client";

import { useActionState } from "react";
import type { Role } from "@prisma/client";
import { changeRole, setActive } from "@/actions/users";
import type { FormState } from "@/lib/forms";
import { ROLES, roleLabel } from "@/lib/roles";
import { Badge, btn } from "@/components/ui";

type Row = { id: string; name: string; email: string; role: Role; active: boolean; lastLogin: string };

export function UserRow({ user, isMe }: { user: Row; isMe: boolean }) {
  const [roleState, roleAction, rolePending] = useActionState<FormState, FormData>(changeRole, {});
  const [activeState, activeAction, activePending] = useActionState<FormState, FormData>(setActive, {});
  const note = (!roleState.ok && roleState.message) || (!activeState.ok && activeState.message) || roleState.message || activeState.message;
  const failed = (roleState.message && !roleState.ok) || (activeState.message && !activeState.ok);

  return (
    <>
      <tr className={`border-b border-border align-middle ${user.active ? "" : "opacity-60"}`}>
        <td className="px-2 py-3">
          <p className="font-semibold text-ink">
            {user.name} {isMe && <span className="text-caption font-normal text-subtle">(you)</span>}
          </p>
          <p className="text-caption text-subtle">{user.email}</p>
        </td>
        <td className="px-2 py-3">
          {isMe ? (
            <Badge tone="dark">{roleLabel[user.role]}</Badge>
          ) : (
            <form action={roleAction}>
              <input type="hidden" name="userId" value={user.id} />
              <select
                name="role"
                defaultValue={user.role}
                disabled={rolePending || !user.active}
                aria-label={`Role for ${user.name}`}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="rounded-full border border-border bg-white px-3 py-1.5 text-small"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {roleLabel[r]}
                  </option>
                ))}
              </select>
            </form>
          )}
        </td>
        <td className="px-2 py-3 text-muted">{user.lastLogin}</td>
        <td className="px-2 py-3">{user.active ? <Badge tone="green">Active</Badge> : <Badge>Disabled</Badge>}</td>
        <td className="px-2 py-3 text-end">
          {!isMe && (
            <form action={activeAction}>
              <input type="hidden" name="userId" value={user.id} />
              <input type="hidden" name="active" value={user.active ? "false" : "true"} />
              <button type="submit" disabled={activePending} className={user.active ? btn.danger : btn.ghost}>
                {user.active ? "Disable" : "Re-enable"}
              </button>
            </form>
          )}
        </td>
      </tr>
      {note && (
        <tr>
          <td colSpan={5} className={`px-2 pb-3 text-caption ${failed ? "text-red-primary" : "text-emerald-700"}`}>
            {note}
          </td>
        </tr>
      )}
    </>
  );
}
