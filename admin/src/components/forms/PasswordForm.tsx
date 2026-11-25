"use client";

import { useActionState } from "react";
import { changePassword } from "@/actions/account";
import type { FormState } from "@/lib/forms";
import { btn, Field, inputCls, Notice } from "@/components/ui";

export function PasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, {});
  const err = state.errors ?? {};
  const aria = (k: string) => ({ "aria-invalid": !!err[k] || undefined, "aria-describedby": err[k] ? `${k}-error` : undefined });
  return (
    <form action={action} className="space-y-5" noValidate key={state.ok ? "done" : "form"}>
      {state.message && <Notice tone={state.ok ? "success" : "error"}>{state.message}</Notice>}
      <Field id="current" label="Current password" error={err.current}>
        <input id="current" name="current" type="password" autoComplete="current-password" className={inputCls} {...aria("current")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="password" label="New password" hint="At least 10 characters." error={err.password}>
          <input id="password" name="password" type="password" autoComplete="new-password" className={inputCls} {...aria("password")} />
        </Field>
        <Field id="confirm" label="Confirm new password" error={err.confirm}>
          <input id="confirm" name="confirm" type="password" autoComplete="new-password" className={inputCls} {...aria("confirm")} />
        </Field>
      </div>
      <button type="submit" disabled={pending} className={btn.primary}>
        {pending ? "Saving…" : "Change password"}
      </button>
    </form>
  );
}
