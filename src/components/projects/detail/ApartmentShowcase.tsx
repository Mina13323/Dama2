"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import { ArrowRight, BedDouble } from "lucide-react";
import { SectionIntro } from "../../ui";
import { buttonClass } from "@/components/ui";

export type ShowcaseModel = {
  id: string;
  type: string;
  name: string;
  bedrooms: number;
  bedroomsLabel: string;
  area: string;
  description: string;
  highlights: string[];
  plan: string;
  /** Numeric area range for the size bar (from the published figures). */
  min: number;
  max: number;
};

/**
 * Apartment layouts as stacked cards. On desktop each card sticks under the chapter
 * bar and the next one slides over it while the previous recedes (scale + dim); the
 * floor plan drifts with a light parallax. Mobile and reduced motion get plain
 * stacked cards. Every card keeps its anchor (#<section>-<model id>).
 */
export function ApartmentShowcase({
  idBase,
  models,
  labels,
  enquireHref,
}: {
  idBase: string;
  models: ShowcaseModel[];
  labels: { eyebrow: string; lines: string[]; body?: string; area: string; highlights: string; enquire: string; planNote: string; planAlt: string };
  enquireHref: string;
}) {
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const plans = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const reset = () =>
      cards.current.forEach((c, i) => {
        if (c) c.style.transform = c.style.filter = "";
        const p = plans.current[i];
        if (p) p.style.transform = "";
      });
    const update = () => {
      raf = 0;
      if (!desktop.matches || reduce.matches) return reset();
      const vh = window.innerHeight;
      cards.current.forEach((card, i) => {
        if (!card) return;
        const next = cards.current[i + 1];
        const rect = card.getBoundingClientRect();
        // How far the next card has slid over this one (0 → 1).
        let p = 0;
        if (next) {
          const nr = next.getBoundingClientRect();
          p = Math.min(1, Math.max(0, (rect.bottom - nr.top) / rect.height));
        }
        card.style.transform = p ? `scale(${1 - p * 0.06})` : "";
        card.style.filter = p ? `brightness(${1 - p * 0.18})` : "";
        // Plan parallax: drifts against the scroll while the card crosses the viewport.
        const plan = plans.current[i];
        if (plan) {
          const centre = rect.top + rect.height / 2 - vh / 2;
          plan.style.transform = `translate3d(0, ${Math.max(-40, Math.min(40, centre * -0.08))}px, 0)`;
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
    };
  }, []);

  const lo = Math.floor(Math.min(...models.map((m) => m.min)) / 20) * 20 - 20;
  const hi = Math.ceil(Math.max(...models.map((m) => m.max)) / 20) * 20 + 20;
  const pct = (v: number) => ((v - lo) / (hi - lo)) * 100;

  return (
    <section aria-labelledby={`${idBase}-title`} className="bg-sand py-section sm:py-section-lg">
      <div className="frame-wide">
        <div className="grid gap-6 lg:grid-cols-13 lg:items-end">
          <div className="lg:col-span-8">
            <SectionIntro id={`${idBase}-title`} eyebrow={labels.eyebrow} lines={labels.lines} />
          </div>
          {labels.body && <p className="max-w-md text-body-sm leading-golden text-muted lg:col-span-5 lg:justify-self-end">{labels.body}</p>}
        </div>

        <div className="mt-10 space-y-6 sm:mt-14 lg:space-y-10 lg:pb-[8vh]">
          {models.map((m, i) => (
            // Cards are siblings in one container so each can stay stuck while the next slides over it.
            <Fragment key={m.id}>
              {/* Anchor sits in normal flow: sticky cards report their stuck position, not their place in the page. */}
              <div id={`${idBase}-${m.id}`} className="scroll-mt-40" aria-hidden />
              <div
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className="origin-top overflow-hidden rounded-card border border-white bg-white shadow-lift will-change-transform sm:rounded-panel lg:sticky"
                // Desktop: the card fits the viewport below the header and chapter bar, whatever the screen height.
                style={{ top: `${136 + i * 12}px`, ["--card-top" as string]: `${136 + i * 12}px` }}
              >
                <article aria-label={`${m.type} · ${m.name}`} className="grid lg:h-[calc(100svh-var(--card-top)-20px)] lg:max-h-[720px] lg:min-h-[460px] lg:grid-cols-13">
                  {/* Copy */}
                  <div className="flex flex-col p-7 sm:p-9 lg:col-span-5 lg:overflow-hidden lg:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-[clamp(2.6rem,4vw,4rem)] leading-[0.85] text-transparent [-webkit-text-stroke:1.5px_var(--color-red-primary)]" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-2 flex items-center gap-1.5 rounded-full bg-red-soft px-3 py-1.5 text-small font-semibold text-red-primary">
                        <span className="flex gap-0.5" aria-hidden>
                          {Array.from({ length: m.bedrooms }, (_, k) => (
                            <BedDouble key={k} className="size-3.5" strokeWidth={1.8} />
                          ))}
                        </span>
                        {m.bedroomsLabel}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight text-ink">{m.type}</h3>
                    <p className="mt-1 text-body-sm text-muted">{m.name}</p>

                    {/* Size among all layouts */}
                    <div className="mt-5">
                      <p className="text-caption font-bold tracking-[0.16em] text-subtle uppercase rtl:tracking-normal">{labels.area}</p>
                      <p className="mt-1 font-display text-title-sm text-red-primary">{m.area}</p>
                      <div className="relative mt-3 h-2.5 rounded-full bg-sand" aria-hidden>
                        {models.map((o) => (
                          <span key={o.id} className={`absolute inset-y-0 rounded-full ${o.id === m.id ? "z-10 bg-gradient-to-r from-red-bright to-red-deep rtl:bg-gradient-to-l" : "bg-stone"}`} style={{ insetInlineStart: `${pct(o.min)}%`, width: `${pct(o.max) - pct(o.min)}%` }} />
                        ))}
                      </div>
                    </div>

                    {/* Highlights are not repeated here: bedrooms, area and the plan are already on the card. */}
                    <p className="mt-5 text-body-sm leading-golden text-ink-soft">{m.description}</p>
                    <Link href={enquireHref} className={`${buttonClass("red", "sm")} mt-6 self-start lg:mt-auto`}>
                      {labels.enquire}
                      <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </Link>
                  </div>

                  {/* Plan */}
                  <div className="relative overflow-hidden bg-[#FBF8F4] lg:col-span-8">
                    <div
                      ref={(el) => {
                        plans.current[i] = el;
                      }}
                      className="relative h-[320px] will-change-transform sm:h-[420px] lg:absolute lg:-inset-y-10 lg:inset-x-0 lg:h-auto"
                    >
                      <Image src={m.plan} alt={`${m.type} — ${labels.planAlt}`} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-contain p-6 sm:p-8 lg:px-12 lg:py-16" />
                    </div>
                    <p className="absolute inset-x-6 bottom-4 text-caption text-subtle sm:inset-x-10">{labels.planNote}</p>
                  </div>
                </article>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
