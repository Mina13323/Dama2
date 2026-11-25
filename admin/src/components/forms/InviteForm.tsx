"use client";

import { useActionState, useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { createInvite } from "@/actions/users";
import type { FormState } from "@/lib/forms";
import { ROLES, roleDescription, roleLabel } from "@/lib/roles";
import { btn, Field, inputCls, Notice } from "@/components/ui";

export function InviteForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createInvite, {});
  const err = state.errors ?? {};
  return (
    <div className="space-y-5">
      <form action={action} className="grid gap-4 sm:grid-cols-[1.618fr_1fr_auto] sm:items-end" noValidate>
        <Field id="invite-email" label="Email" error={err.email}>
          <input id="invite-email" name="email" type="email" required placeholder="name@damadevelopments.com" className={inputCls} aria-invalid={!!err.email || undefined} aria-describedby={err.email ? "invite-email-error" : undefined} />
        </Field>
        <Field id="invite-role" label="Role" error={err.role}>
          <select id="invite-role" name="role" defaultValue="EDITOR" className={inputCls}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {roleLabel[r]}
              </option>
            ))}
          </select>
        </Field>
        <button type="submit" disabled={pending} className={btn.primary}>
          <Send aria-hidden className="size-4" />
          {pending ? "Creating…" : "Create invitation"}
        </button>
      </form>
      <ul className="grid gap-2 text-caption text-muted sm:grid-cols-3">
        {ROLES.map((r) => (
          <li key={r}>
            <strong className="text-ink">{roleLabel[r]}:</strong> {roleDescription[r]}
          </li>
        ))}
      </ul>
      {state.message && !state.ok && <Notice tone="error">{state.message}</Notice>}
      {state.ok && state.reveal && <InviteLink message={state.message} link={state.reveal} />}
    </div>
  );
}

function InviteLink({ message, link }: { message?: string; link: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Notice tone="success">
      <p>{message}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input readOnly value={link} onFocus={(e) => e.currentTarget.select()} className="min-w-0 flex-1 rounded-full border border-emerald-200 bg-white px-4 py-2 font-mono text-caption text-ink" aria-label="Invitation link" />
        <button
          type="button"
          className={btn.secondary}
          onClick={async () => {
            await navigator.clipboard.writeText(link);
            setCopied(true);
          }}
        >
          {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className="mt-2 text-caption">This link is shown only once. If it is lost, create a new invitation.</p>
    </Notice>
  );
}
