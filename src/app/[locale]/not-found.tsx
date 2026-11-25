"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Home } from "lucide-react";
import { getDictionary, isLocale } from "@/content";
import { buttonClass } from "@/components/ui";

export default function LocalizedNotFound() {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] ?? "en";
  const locale = isLocale(segment) ? segment : "en";
  const dict = getDictionary(locale);
  const t = dict.errors.notFound;

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-canvas px-4 py-32 sm:py-40">
      {/* Decorative red organic arch drop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 end-10 -z-10 h-72 w-52 rounded-t-full rounded-bl-[140px] bg-gradient-to-b from-red-primary to-red-dark opacity-90 hidden sm:block shadow-lg"
      />

      <div className="frame-wide max-w-xl text-center">
        <p className="inline-block rounded-full border border-red-border/60 bg-red-soft px-4 py-1.5 text-caption font-semibold tracking-wider text-red-primary uppercase shadow-2xs">
          {t.eyebrow}
        </p>

        <h1 className="mt-6 font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-normal leading-tight text-ink">
          {t.titleLines.join(" ").replace(/\*/g, "")}
        </h1>

        <p className="mt-5 text-body font-normal leading-golden text-ink-soft sm:text-base">
          {t.body}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}`}
            className={`${buttonClass("red", "sm")}`}
          >
            <Home aria-hidden className="size-4" />
            <span>{t.backHome}</span>
          </Link>

          <Link
            href={`/${locale}/developments`}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border bg-white px-7 text-small font-semibold text-ink shadow-xs transition-colors hover:border-red-primary hover:text-red-primary"
          >
            <Building2 aria-hidden className="size-4" />
            <span>{t.viewProjects}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
