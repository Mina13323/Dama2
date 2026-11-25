"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  CircleAlert,
  CircleCheck,
  Compass,
  GraduationCap,
  HeartHandshake,
  Link2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { careerPillars, careerPositions, type CareerPosition } from "@/content/careers";
import { Accent, stagger } from "../motion/Lines";
import { validateLead, type LeadErrors, type LeadInput } from "@/lib/leads";
import { buttonClass } from "@/components/ui";

const pillarIcons = [Compass, Sparkles, HeartHandshake, GraduationCap];

/** Label + leading icon + control + error: one layout for every field. Top level, so inputs keep focus while typing. */
function FormField({ htmlFor, label, icon: Icon, required, optionalLabel, span, error, children }: { htmlFor: string; label: string; icon: LucideIcon; required?: boolean; optionalLabel?: string; span?: boolean; error?: ReactNode; children: ReactNode }) {
  return (
    <div className={span ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="flex items-baseline gap-1.5 text-small font-semibold text-ink">
        {label}
        {required && <span aria-hidden className="text-red-primary">*</span>}
        {optionalLabel && <span className="text-caption font-normal text-subtle">({optionalLabel})</span>}
      </label>
      <div className="relative mt-2">
        <Icon aria-hidden className="pointer-events-none absolute start-4 top-[1.15rem] size-4 text-subtle" />
        {children}
      </div>
      {error}
    </div>
  );
}

export function CareersView({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Dictionary["careersPage"];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState<LeadInput>({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    message: "",
    consent: false,
    project: "careers",
    position: "",
    locale,
  });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "not-configured">("idle");
  const formId = useId();
  const firstField = useRef<HTMLInputElement>(null);

  const openApply = (role?: CareerPosition) => {
    setValues((v) => ({
      ...v,
      position: role ? role.copy[locale].title : labels.applyModal.generalRole,
    }));
    setModalOpen(true);
  };

  const closeApply = () => {
    setModalOpen(false);
    setStatus("idle");
    setErrors({});
  };

  // Escape closes the application dialog and the page behind it stays put while it is open.
  useEffect(() => {
    if (!modalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setStatus("idle");
        setErrors({});
      }
    };
    window.addEventListener("keydown", onKey);
    // Start typing straight away: focus the first field once the sheet has entered.
    const focus = window.setTimeout(() => firstField.current?.focus(), 120);
    return () => {
      window.clearTimeout(focus);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  const set = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof LeadErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateLead(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }

    // GitHub Pages is static: a separately hosted, CORS-enabled endpoint is required.
    const endpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;
    if (!endpoint) {
      // Say plainly that nothing was sent, instead of a generic failure.
      setStatus("not-configured");
      return;
    }
    setStatus("sending");
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          project: "careers",
          subject: values.position || "General Career Application",
          website: form.get("website"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setValues((v) => ({
          ...v,
          name: "",
          email: "",
          phone: "",
          portfolio: "",
          message: "",
          consent: false,
        }));
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const m = labels.applyModal;
  const inputCls =
    "peer block w-full rounded-tile border border-border bg-canvas px-11 py-3.5 text-body-sm text-ink outline-none transition-all duration-200 placeholder:text-subtle/70 hover:border-stone focus:border-red-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,30,40,0.1)] aria-[invalid=true]:border-red-primary aria-[invalid=true]:bg-red-soft/40";
  const errorCls = (key: keyof LeadErrors) =>
    errors[key] && (
      <p id={`${formId}-${key}-error`} className="mt-2 flex items-center gap-1.5 text-small text-red-primary">
        <CircleAlert aria-hidden className="size-3.5 shrink-0" />
        {m.errors[key]}
      </p>
    );

  const pillars = careerPillars[locale];

  return (
    <div className="pb-24 sm:pb-32">
      {/* Culture & Pillars Section — hidden until DAMA approves the copy */}
      {pillars.length > 0 && (
      <section aria-labelledby="careers-culture-title" className="frame-wide pb-20 sm:pb-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
            <p className="text-micro font-medium tracking-[0.28em] text-muted uppercase rtl:tracking-normal">
              {labels.culture.eyebrow}
            </p>
          </div>
          <h2 id="careers-culture-title" className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.25rem)] font-normal leading-tight text-ink">
            {labels.culture.titleLines.map((line) => <Accent key={line} text={line + " "} />)}
          </h2>
          <p className="mt-4 text-body font-normal leading-golden text-ink-soft">
            {labels.culture.body}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[i % pillarIcons.length];
            return (
              <div
                key={pillar.title}
                data-reveal="card"
                style={stagger(i)}
                className="group rounded-card border border-white bg-white/85 backdrop-blur-md p-7 shadow-card transition-all hover:border-red-primary/40 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-red-primary/35 bg-red-soft text-red-primary transition-transform group-hover:scale-105">
                  <Icon aria-hidden strokeWidth={1.8} className="size-5" />
                </span>
                <h3 className="mt-5 font-serif text-lead font-normal leading-tight text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-body-sm font-normal leading-golden text-ink-soft">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* Open Positions Section */}
      <section id="positions" aria-labelledby="careers-positions-title" className=" bg-cream py-section sm:py-section-lg">
        <div className="frame-wide">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
                <p className="text-micro font-medium tracking-[0.28em] text-muted uppercase rtl:tracking-normal">
                  {labels.positions.eyebrow}
                </p>
              </div>
              <h2 id="careers-positions-title" className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.25rem)] font-normal leading-tight text-ink">
                {labels.positions.titleLines.map((line) => <Accent key={line} text={line + " "} />)}
              </h2>
              <p className="mt-4 text-body font-normal leading-golden text-ink-soft">
                {labels.positions.body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openApply()}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-white px-7 text-small font-semibold text-ink shadow-xs transition-colors hover:border-red-primary hover:text-red-primary"
            >
              <span>{labels.applyModal.generalRole}</span>
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </button>
          </div>

          <div className="mt-12 space-y-6">
            {careerPositions.length === 0 && (
              <div className="rounded-card border border-dashed border-[#D9D6CF] bg-white p-8 text-center sm:p-12">
                <h3 className="font-display text-2xl text-ink">
                  {locale === "ar" ? "لا توجد وظائف معلنة حاليًا." : "No approved vacancies published yet."}
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-body-sm leading-golden text-muted">
                  {locale === "ar"
                    ? "ستُنشر الوظائف المعتمدة من داما هنا. يمكنك إرسال طلب توظيف عام من خلال النموذج أعلاه."
                    : "DAMA-approved roles will be published here. You are welcome to submit a general application using the button above."}
                </p>
              </div>
            )}
            {careerPositions.map((pos, idx) => {
              const copy = pos.copy[locale];
              return (
                <div
                  key={pos.slug}
                  data-reveal="card"
                  style={stagger(idx)}
                  className="rounded-card border border-white bg-white/85 backdrop-blur-md p-7 sm:p-10 shadow-card transition-all hover:border-red-primary/40 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-red-soft border border-red-border/60 px-3.5 py-1 text-caption font-semibold text-red-primary">
                          {copy.department}
                        </span>
                        <span className="flex items-center gap-1 text-small text-muted">
                          <MapPin aria-hidden className="size-3.5 text-red-primary" />
                          <span>{copy.location}</span>
                        </span>
                        <span className="flex items-center gap-1 text-small text-muted">
                          <Briefcase aria-hidden className="size-3.5 text-red-primary" />
                          <span>{copy.type}</span>
                        </span>
                      </div>

                      <h3 className="mt-4 font-serif text-2xl font-normal text-ink">
                        {copy.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-body-sm font-normal leading-golden text-ink-soft">
                        {copy.summary}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => openApply(pos)}
                        className={`${buttonClass("red", "sm")}`}
                      >
                        <span>{labels.positions.applyForRole}</span>
                        <ArrowRight aria-hidden className="flip-rtl size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="mt-8 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
                    <div>
                      <h4 className="text-small font-semibold tracking-wider text-ink uppercase">
                        {labels.positions.responsibilities}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {copy.responsibilities.map((item, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5 text-body-sm text-ink-soft leading-golden">
                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-red-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-small font-semibold tracking-wider text-ink uppercase">
                        {labels.positions.qualifications}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {copy.qualifications.map((item, qIdx) => (
                          <li key={qIdx} className="flex items-start gap-2.5 text-body-sm text-ink-soft leading-golden">
                            <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-red-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application sheet: fixed header and footer, only the fields scroll. Bottom sheet on phones. */}
      {modalOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby={`${formId}-modal-title`} className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <div className="enter-fade fixed inset-0 bg-ink/70 backdrop-blur-md" onClick={closeApply} />

          <div className="enter-up relative z-10 flex max-h-[94svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-panel bg-white shadow-lift sm:max-h-[min(90svh,880px)] sm:rounded-panel">
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden border-b border-border bg-canvas px-6 pb-5 pt-4 sm:px-10 sm:pb-6 sm:pt-9">
              <span aria-hidden className="mx-auto mb-5 block h-1 w-10 rounded-full bg-stone sm:hidden" />
              <div aria-hidden className="pointer-events-none absolute -end-16 -top-20 size-56 rounded-full bg-gradient-to-br from-red-soft to-transparent" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
                    <p className="text-micro font-semibold tracking-[0.24em] text-red-primary uppercase rtl:tracking-normal">{m.eyebrow}</p>
                  </div>
                  <h3 id={`${formId}-modal-title`} className="mt-3 font-display text-title-lg leading-tight text-ink">
                    <Accent text={m.titleLines.join(" ")} />
                  </h3>
                  <p className="mt-2 hidden max-w-md text-body-sm leading-golden text-ink-soft sm:block">{m.body}</p>
                </div>
                <button
                  type="button"
                  onClick={closeApply}
                  aria-label={m.close}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors hover:border-red-primary hover:text-red-primary"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
              {/* The role is set by the button that opened the sheet. */}
              <div className="relative mt-4 inline-flex max-w-full sm:mt-5 items-center gap-2.5 rounded-full border border-red-primary/15 bg-white px-4 py-2 shadow-soft">
                <Briefcase aria-hidden className="size-4 shrink-0 text-red-primary" />
                <span className="hidden text-caption font-semibold text-subtle sm:inline">{m.roleLabel}</span>
                <span className="truncate text-body-sm font-semibold text-ink">{values.position}</span>
              </div>
            </div>

            <form noValidate onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
              <input type="hidden" name="position" value={values.position} />
              <div className="grid min-h-0 flex-1 gap-5 overflow-y-auto overscroll-contain px-6 py-7 [scrollbar-width:thin] sm:grid-cols-2 sm:px-10">
                <FormField htmlFor={`${formId}-name`} error={errorCls("name")} label={m.name} icon={UserRound} required>
                  <input
                    ref={firstField}
                    id={`${formId}-name`}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                    aria-required
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls}
                  />
                </FormField>
                <FormField htmlFor={`${formId}-email`} error={errorCls("email")} label={m.email} icon={Mail} required>
                  <input
                    id={`${formId}-email`}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                    aria-required
                    name="email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="name@example.com"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls}
                  />
                </FormField>
                <FormField htmlFor={`${formId}-phone`} error={errorCls("phone")} label={m.phone} icon={Phone} required>
                  <input
                    id={`${formId}-phone`}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                    aria-required
                    name="phone"
                    type="tel"
                    dir="ltr"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+20"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={inputCls}
                  />
                </FormField>
                <FormField htmlFor={`${formId}-portfolio`} label={m.portfolio} icon={Link2} optionalLabel={m.optional}>
                  <input
                    id={`${formId}-portfolio`}
                    name="portfolio"
                    type="url"
                    dir="ltr"
                    autoComplete="url"
                    inputMode="url"
                    placeholder="https://"
                    value={values.portfolio}
                    onChange={(e) => set("portfolio", e.target.value)}
                    className={inputCls}
                  />
                </FormField>
                <FormField htmlFor={`${formId}-message`} error={errorCls("message")} label={m.message} icon={MessageSquareText} span optionalLabel={m.optional}>
                  <textarea
                    id={`${formId}-message`}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={`${formId}-message-count${errors.message ? ` ${formId}-message-error` : ""}`}
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${inputCls} min-h-32 resize-y pt-3.5`}
                  />
                  <span id={`${formId}-message-count`} className={`pointer-events-none absolute bottom-3 end-4 text-caption tabular-nums ${values.message.length > 2000 ? "text-red-primary" : "text-subtle"}`} dir="ltr">
                    {values.message.length}/2000
                  </span>
                </FormField>

                {/* Honeypot */}
                <div aria-hidden className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
              </div>

              {/* Footer: consent, submit and status stay in view */}
              <div className="shrink-0 space-y-4 border-t border-border bg-canvas px-6 py-5 sm:px-10">
                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-small leading-golden text-muted">
                    <input
                      id={`${formId}-consent`}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      className="mt-0.5 size-5 shrink-0 cursor-pointer accent-red-primary"
                    />
                    <span>
                      {m.consent}{" "}
                      <Link href={`/${locale}/privacy-policy`} className="font-medium text-red-primary underline underline-offset-4">
                        {m.privacy}
                      </Link>
                    </span>
                  </label>
                  {errorCls("consent")}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div aria-live="polite" role="status" className="text-small sm:order-2 sm:max-w-xs">
                    {status === "success" && (
                      <p className="flex items-start gap-2 text-emerald-700">
                        <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
                        {m.success}
                      </p>
                    )}
                    {(status === "error" || status === "not-configured") && (
                      <p className="flex items-start gap-2 text-red-700">
                        <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
                        {status === "not-configured" ? m.notConfigured : m.failed}
                      </p>
                    )}
                  </div>
                  <button type="submit" disabled={status === "sending"} className={`${buttonClass("red", "md")} w-full sm:order-1 sm:w-auto`}>
                    {status === "sending" ? m.sending : m.submit}
                    <ArrowRight aria-hidden className="flip-rtl size-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
