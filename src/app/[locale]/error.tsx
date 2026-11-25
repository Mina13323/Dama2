"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { getDictionary, isLocale } from "@/content";
import { buttonClass } from "@/components/ui";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] ?? "en";
  const locale = isLocale(segment) ? segment : "en";
  const dict = getDictionary(locale);
  const t = dict.errors.serverError;

  useEffect(() => {
    console.error("[APPLICATION_ERROR]", error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-canvas px-4 py-32">
      <div className="frame-wide max-w-lg text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-red-soft border border-red-border/60 text-red-primary">
          <AlertTriangle aria-hidden className="size-6" />
        </span>

        <p className="mt-6 text-caption font-semibold tracking-wider text-red-primary uppercase">{t.eyebrow}</p>

        <h1 className="mt-3 font-serif text-[clamp(2rem,3.5vw,2.75rem)] font-normal text-ink">
          {t.titleLines.join(" ").replace(/\*/g, "")}
        </h1>

        <p className="mt-4 text-body-sm font-normal leading-golden text-ink-soft">
          {t.body}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className={`${buttonClass("red", "sm")}`}
          >
            <RotateCcw aria-hidden className="size-4" />
            <span>{t.retry}</span>
          </button>

          <Link
            href={`/${locale}`}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border bg-white px-7 text-small font-semibold text-ink shadow-xs transition-colors hover:border-red-primary hover:text-red-primary"
          >
            <Home aria-hidden className="size-4" />
            <span>{t.backHome}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
