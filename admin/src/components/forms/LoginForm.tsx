"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { login } from "@/actions/auth";
import type { FormState } from "@/lib/forms";
import { btn, Field, inputCls, Notice } from "@/components/ui";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});
  const err = state.errors ?? {};
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="next" value={next} />
      {state.message && <Notice tone="error">{state.message}</Notice>}
      <Field id="email" label="Email" error={err.email}>
        <input id="email" name="email" type="email" autoComplete="username" required autoFocus className={inputCls} aria-invalid={!!err.email || undefined} aria-describedby={err.email ? "email-error" : undefined} />
      </Field>
      <Field id="password" label="Password" error={err.password}>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputCls} aria-invalid={!!err.password || undefined} aria-describedby={err.password ? "password-error" : undefined} />
      </Field>
      <button type="submit" disabled={pending} className={`${btn.primary} w-full`}>
        {pending ? "Signing in…" : "Sign in"}
        <ArrowRight aria-hidden className="size-4" />
      </button>
    </form>
  );
}
