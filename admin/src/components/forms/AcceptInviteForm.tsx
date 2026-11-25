"use client";

import { useActionState } from "react";
import { acceptInvite } from "@/actions/auth";
import type { FormState } from "@/lib/forms";
import { btn, Field, inputCls, Notice } from "@/components/ui";

export function AcceptInviteForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(acceptInvite, {});
  const err = state.errors ?? {};
  const aria = (k: string) => ({ "aria-invalid": !!err[k] || undefined, "aria-describedby": err[k] ? `${k}-error` : undefined });
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="token" value={token} />
      {state.message && <Notice tone="error">{state.message}</Notice>}
      <Field id="name" label="Full name" error={err.name}>
        <input id="name" name="name" autoComplete="name" required autoFocus className={inputCls} {...aria("name")} />
      </Field>
      <Field id="password" label="Password" hint="At least 10 characters. A short sentence is easy to remember and hard to guess." error={err.password}>
        <input id="password" name="password" type="password" autoComplete="new-password" required className={inputCls} {...aria("password")} />
      </Field>
      <Field id="confirm" label="Confirm password" error={err.confirm}>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" required className={inputCls} {...aria("confirm")} />
      </Field>
      <button type="submit" disabled={pending} className={`${btn.primary} w-full`}>
        {pending ? "Creating your account…" : "Create account"}
      </button>
    </form>
  );
}
