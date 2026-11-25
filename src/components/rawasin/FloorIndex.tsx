import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/content";
import { rawasinMall } from "@/content/projects/rawasin/mall";
import { rawasinHref } from "@/content/projects/rawasin/links";

/** Floor Plans landing: one card per level, each linking to its own Floor Details page. */
export function FloorIndex({ locale }: { locale: Locale }) {
  const t = rawasinMall[locale].floors;
  return (
    <section className="bg-cream py-section sm:py-section-lg">
      <ul className="frame-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...t.list].reverse().map((f) => (
          <li key={f.id}>
            <Link href={rawasinHref("mall-floor", locale, f.id)} className="group flex h-full flex-col rounded-card border border-white bg-white/85 backdrop-blur-md p-7 shadow-card transition-colors hover:border-red-primary/50">
              <h2 className="font-display text-2xl text-ink">{f.label}</h2>
              <p className="mt-2 text-body-sm font-semibold text-red-primary">{f.headline}</p>
              <p className="mt-3 flex-1 text-body-sm leading-golden text-muted">{f.intro}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-small font-semibold text-ink group-hover:text-red-primary">
                {f.officialLabel}
                <ArrowRight aria-hidden className="flip-rtl size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
