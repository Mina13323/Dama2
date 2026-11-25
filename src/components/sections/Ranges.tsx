import Link from "next/link";
import { ArrowRight, BedDouble } from "lucide-react";
import type { Locale } from "@/content";
import type { Block } from "@/content/blocks";
import { linkHref } from "@/lib/routes";
import { stagger } from "../motion/Lines";
import { SectionIntro } from "../ui";

type RangesBlock = Extract<Block, { kind: "ranges" }>;

/**
 * Range comparison: each row is a bar on one shared scale, so differences in size
 * read at a glance. Bars grow in on reveal; positions use logical insets, so the
 * scale mirrors in RTL.
 */
export function Ranges({ block: b, locale }: { block: RangesBlock; locale: Locale }) {
  const lo = Math.floor(Math.min(...b.rows.map((r) => r.min)) / 20) * 20 - 20;
  const hi = Math.ceil(Math.max(...b.rows.map((r) => r.max)) / 20) * 20 + 20;
  const pct = (v: number) => ((v - lo) / (hi - lo)) * 100;
  const ticks = Array.from({ length: (hi - lo) / 20 + 1 }, (_, i) => lo + i * 20);
  const fmt = (n: number) => n.toLocaleString(locale === "ar" ? "ar-EG" : "en-US");

  return (
    <section id={b.id} aria-labelledby={`${b.id}-title`} className="scroll-mt-36 bg-canvas py-section sm:py-section-lg">
      <div className="frame-wide">
        <div className="grid gap-6 lg:grid-cols-13 lg:items-end">
          <div className="lg:col-span-8">
            <SectionIntro id={`${b.id}-title`} eyebrow={b.eyebrow} lines={b.lines} />
          </div>
          {b.body && <p className="max-w-md text-body-sm leading-golden text-muted lg:col-span-5 lg:justify-self-end">{b.body}</p>}
        </div>

        <div className="mt-10 rounded-card border border-white bg-white/90 p-5 shadow-lift sm:mt-12 sm:p-8">
          <ul className="divide-y divide-border">
            {b.rows.map((r, i) => (
              <li key={r.label} data-reveal="up" style={stagger(Math.min(i, 6))} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-5 first:pt-1 last:pb-1 md:grid-cols-[180px_1fr_auto] md:gap-x-8">
                <div className="col-start-1 row-start-1">
                  <p className="font-display text-title-sm leading-none text-ink">{r.label}</p>
                  {r.count && (
                    <p className="mt-2 flex items-center gap-1.5 text-small text-muted">
                      <span className="flex gap-0.5 text-red-primary" aria-hidden>
                        {Array.from({ length: r.count.n }, (_, k) => (
                          <BedDouble key={k} className="size-4" strokeWidth={1.7} />
                        ))}
                      </span>
                      {r.count.label}
                    </p>
                  )}
                </div>

                {/* Bar on the shared scale */}
                <div className="col-span-2 col-start-1 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
                  <div className="relative h-11">
                    <div aria-hidden className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-sand" />
                    <div
                      className="range-bar absolute top-1/2 h-3.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-red-bright to-red-deep shadow-red rtl:bg-gradient-to-l"
                      style={{ insetInlineStart: `${pct(r.min)}%`, width: `${pct(r.max) - pct(r.min)}%`, animationDelay: `${150 + i * 90}ms` }}
                    />
                    <span className="absolute -top-0.5 whitespace-nowrap text-small font-semibold text-ink" style={{ insetInlineStart: `${pct(r.min)}%` }}>
                      {r.display}
                    </span>
                  </div>
                </div>

                {r.link && (
                  <Link href={linkHref(r.link, locale)} className="group col-start-2 row-start-1 inline-flex min-h-10 items-center gap-1.5 justify-self-end rounded-full border border-border px-4 text-small font-semibold text-red-primary transition-colors hover:border-red-primary hover:bg-red-primary hover:text-white md:col-start-3">
                    {r.link.label}
                    <ArrowRight aria-hidden className="flip-rtl size-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Scale */}
          <div aria-hidden className="mt-2 hidden grid-cols-[180px_1fr_auto] gap-x-8 md:grid">
            <span />
            <div className="relative h-6 border-t border-border">
              {ticks.map((v) => (
                <span key={v} className="absolute top-1.5 -translate-x-1/2 text-caption tabular-nums text-subtle rtl:translate-x-1/2" style={{ insetInlineStart: `${pct(v)}%` }}>
                  {fmt(v)}
                </span>
              ))}
            </div>
            <span className="text-caption text-subtle">{b.unit}</span>
          </div>
        </div>
        {b.footnote && <p className="mt-5 text-small text-subtle">{b.footnote}</p>}
      </div>
    </section>
  );
}
