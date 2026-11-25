import type { ReactNode } from "react";

/** Small component kit for the admin, in the website's visual language. */

export const btn = {
  primary:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-red-primary px-6 text-small font-semibold text-white shadow-red transition-colors hover:bg-red-dark disabled:pointer-events-none disabled:opacity-60",
  secondary:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-small font-semibold text-ink transition-colors hover:border-red-primary hover:text-red-primary disabled:opacity-60",
  ghost: "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-small font-semibold text-muted transition-colors hover:bg-sand hover:text-ink",
  danger: "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-small font-semibold text-red-primary transition-colors hover:bg-red-soft",
};

export const inputCls =
  "block w-full rounded-tile border border-border bg-canvas px-4 py-3 text-body-sm text-ink outline-none transition placeholder:text-subtle/70 hover:border-stone focus:border-red-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,30,40,0.1)] aria-[invalid=true]:border-red-primary";

export function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-small text-red-primary">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-caption text-subtle">{hint}</p>
      ) : null}
    </div>
  );
}

export function Card({ title, description, actions, children }: { title?: string; description?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-card border border-white bg-white/90 p-6 shadow-card sm:p-8">
      {(title || actions) && (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            {title && <h2 className="font-display text-title-sm text-ink">{title}</h2>}
            {description && <p className="mt-1 max-w-2xl text-body-sm text-muted">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="flex items-center gap-2.5 text-micro font-semibold tracking-[0.2em] text-red-primary uppercase">
          <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 font-display text-title-lg text-ink sm:text-[2.2rem]">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-body-sm leading-golden text-muted">{description}</p>}
    </header>
  );
}

export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "red" | "green" | "dark"; children: ReactNode }) {
  const tones = {
    neutral: "bg-sand text-ink-soft",
    red: "bg-red-soft text-red-primary",
    green: "bg-emerald-50 text-emerald-700",
    dark: "bg-charcoal text-white",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-caption font-semibold ${tones[tone]}`}>{children}</span>;
}

export function Notice({ tone, children }: { tone: "error" | "success" | "info"; children: ReactNode }) {
  const tones = {
    error: "border-red-primary/20 bg-red-soft text-red-dark",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    info: "border-border bg-sand/60 text-ink-soft",
  };
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-tile border px-4 py-3 text-small ${tones[tone]}`}>
      {children}
    </div>
  );
}

export const formatDateTime = (d: Date | null | undefined) =>
  d ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Cairo" }).format(d) : "—";
