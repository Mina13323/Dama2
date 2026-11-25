"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Layers, Leaf } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { splitInTwo } from "@/lib/text";
import { buttonClass } from "@/components/ui";

/**
 * Hero. On lg+ every shape is placed in frame units (--u, see globals.css)
 * measured from the reference mockup; the frame spans the full screen width; the section is 69.5u tall, so it always fits the screen height:
 *   red dome   32 → 57.4u × 7.7 → 39u     (behind panel and image)
 *   panel      4.4 → 39u  × 13.5 → 68u    (rounded top-right corner cuts the dome)
 *   image      41.5 → 98.9u × 11.4 → 68u  (sweeping 20.6u top-left corner)
 *   red pill   93.4 → 98.9u × 29.4 → 50.4u (over the image's right edge)
 */
/** Arch glyph (no equivalent in the icon set): the Heritage pillar. */
function ArchIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 29V15a12 12 0 0 1 24 0v14" />
      <path d="M10 29V16a6 6 0 0 1 12 0v13" />
    </svg>
  );
}
const pillarIcons = [ArchIcon, Layers, Leaf];

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const slides = images.heroSlides;
  const [active, setActive] = useState(0);
  const [eyebrowA, eyebrowB] = splitInTwo(t.eyebrow);

  const go = (step: number) => setActive((i) => (i + step + slides.length) % slides.length);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-sand px-4 pb-10 pt-24 sm:px-8 lg:h-[calc(var(--hu)*69.5)] lg:p-0"
    >
      {/* Stone shapes (lg) */}
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*25)] -top-[calc(var(--hu)*2)] -z-10 hidden h-[calc(var(--hu)*36)] w-[calc(var(--u)*47)] rounded-[calc(var(--hu)*5)] bg-[#ECEAE6] lg:block" />
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*44)] top-[calc(var(--hu)*5.5)] -z-10 hidden h-[calc(var(--hu)*22)] w-[calc(var(--u)*26.6)] rounded-t-[calc(var(--hu)*13)] bg-[#E3E1DC] lg:block" />
      <div aria-hidden className="pointer-events-none absolute end-0 top-[calc(var(--hu)*10.5)] -z-10 hidden h-[calc(var(--hu)*18)] w-[calc(var(--u)*15.5)] rounded-ss-[calc(var(--hu)*5)] bg-[#E9E7E3] lg:block" />
      <div aria-hidden className="pointer-events-none absolute start-0 top-[calc(var(--hu)*43.5)] -z-10 hidden h-[calc(var(--hu)*25)] w-[calc(var(--u)*4)] rounded-se-[calc(var(--hu)*4)] border-y border-e border-[#E1DFDA] bg-[#EFEDE9] lg:block" />

      {/* Red dome, partly hidden by the panel and the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute start-[calc(var(--u)*32)] top-[calc(var(--hu)*7.7)] hidden h-[calc(var(--hu)*31.3)] w-[calc(var(--u)*25.4)] rounded-b-[calc(var(--hu)*3)] rounded-t-full bg-gradient-to-br from-red-bright via-red-primary to-red-deep lg:block"
      />

      {/* Panel step: below the dome the panel widens to run under the image's curved edge */}
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*30)] top-[calc(var(--hu)*37)] z-10 hidden h-[calc(var(--hu)*31)] w-[calc(var(--u)*14)] rounded-[calc(var(--hu)*3)] bg-canvas lg:block" />

      {/* Text panel */}
      <div className="relative z-10 overflow-hidden rounded-card bg-canvas px-6 py-10 shadow-lift sm:px-10 lg:absolute lg:start-[calc(var(--u)*4.4)] lg:top-[calc(var(--hu)*13.5)] lg:flex lg:h-[calc(var(--hu)*54.5)] lg:w-[calc(var(--u)*34.6)] lg:flex-col lg:rounded-[calc(var(--hu)*3)] lg:rounded-se-[calc(var(--hu)*7.4)] lg:px-[calc(var(--u)*2.7)] lg:pb-[calc(var(--hu)*4)] lg:pt-[calc(var(--hu)*3.2)]">
        {/* Soft arcade motif in the panel's top corner (decorative, drawn, not a photo) */}
        <svg aria-hidden viewBox="0 0 200 260" fill="none" className="pointer-events-none absolute -end-10 top-0 hidden h-[calc(var(--hu)*15)] w-auto text-[#EEEAE4] sm:block rtl:scale-x-[-1]">
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${20 + i * 14} 260V${110 + i * 22}a${80 - i * 14} ${80 - i * 14} 0 0 1 ${160 - i * 28} 0V260`} stroke="currentColor" strokeWidth="2" opacity={1 - i * 0.18} />
          ))}
        </svg>

        <div className="enter-fade relative text-caption font-medium tracking-[0.26em] text-ink/75 uppercase rtl:tracking-normal" style={{ animationDelay: "100ms" }}>
          <p className="flex items-center gap-3">
            <span className="h-[3px] w-5 rounded-full bg-red-primary" aria-hidden />
            {eyebrowA}
          </p>
          <p className="mt-2 flex items-center gap-3">
            {eyebrowB}
            <span className="h-px w-5 bg-red-primary" aria-hidden />
          </p>
        </div>

        <h1
          id="hero-title"
          className="enter-line mt-6 font-display text-[clamp(2rem,calc(var(--hu)*3.2),3.9rem)] font-normal leading-[1.06] tracking-[-0.01em] text-ink lg:mt-[calc(var(--hu)*2.4)]"
          style={{ animationDelay: "200ms" }}
        >
          <span className="block">{t.titleLines[0]}</span>
          <span className="mt-1 block italic text-red-primary">{t.titleLines[1]?.replace(/\*/g, "")}</span>
        </h1>

        <p className="enter-up mt-6 max-w-[23rem] text-body-sm leading-[1.75] text-muted lg:mt-[calc(var(--hu)*2.4)]" style={{ animationDelay: "380ms" }}>
          {t.body}
        </p>

        <span aria-hidden className="mt-8 block h-[2px] w-14 rounded-full bg-gradient-to-r from-red-primary to-transparent rtl:bg-gradient-to-l lg:mt-[calc(var(--hu)*3)]" />
        <ul className="enter-up mt-6 grid grid-cols-3 lg:mt-[calc(var(--hu)*2.2)]" style={{ animationDelay: "440ms" }}>
          {t.pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <li key={p.title} className={`min-w-0 ${i > 0 ? "border-s border-ink/10 ps-3 sm:ps-5 lg:ps-[calc(var(--u)*1.5)]" : "pe-2"}`}>
                <Icon aria-hidden className="size-8 text-bronze lg:size-[calc(var(--hu)*3.4)]" strokeWidth={1.4} />
                <p className="mt-2 font-display text-lead leading-tight text-ink lg:text-[clamp(1.1rem,calc(var(--hu)*2),1.6rem)]">{p.title}</p>
                <p className="mt-1.5 text-micro font-medium leading-[1.6] tracking-[0.2em] text-muted uppercase rtl:tracking-normal sm:text-micro">{p.caption}</p>
              </li>
            );
          })}
        </ul>

        <div className="enter-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-auto lg:flex-nowrap lg:gap-x-[calc(var(--u)*2.4)]" style={{ animationDelay: "500ms" }}>
          <Link
            href={`/${locale}/developments`}
            className={`${buttonClass("red", "md")} shrink-0 whitespace-nowrap lg:min-h-[max(52px,calc(var(--hu)*4.6))] lg:px-[calc(var(--u)*2.2)] lg:text-small`}
          >
            <span>{t.cta}</span>
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>

          <Link href={`/${locale}/about`} className="group inline-flex shrink-0 items-center gap-4 whitespace-nowrap text-small font-semibold text-ink">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink/80 transition-colors group-hover:border-red-primary group-hover:text-red-primary">
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </span>
            <span className="border-b border-red-primary/60 pb-1 transition-colors group-hover:text-red-primary">{t.secondary}</span>
          </Link>
        </div>
      </div>

      {/* Image (wrapper only positions the small-screen dome; static on lg) */}
      <div className="relative mt-14 lg:static lg:mt-0">
        <div aria-hidden className="pointer-events-none absolute -top-8 start-[12%] h-56 w-[62%] rounded-t-full bg-red-primary lg:hidden" />

        <div className="enter-mask relative z-20 h-[440px] overflow-hidden rounded-card rounded-ss-[140px] bg-stone shadow-lift sm:h-[540px] lg:absolute lg:start-[calc(var(--u)*41.5)] lg:top-[calc(var(--hu)*11.4)] lg:h-[calc(var(--hu)*56.6)] lg:w-[calc(var(--u)*57.4)] lg:rounded-[calc(var(--hu)*1.5)] lg:rounded-es-[calc(var(--hu)*9.9)] lg:rounded-se-[calc(var(--hu)*7)] lg:rounded-ss-[calc(var(--hu)*20.6)]">
          {slides.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === 0 ? t.imageAlt : ""}
              aria-hidden={i !== active}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) calc(var(--u)*58), calc(var(--u)*100)"
              className={`object-cover object-[45%_center] transition-opacity duration-700 ease-soft ${i === active ? "kenburns opacity-100" : "opacity-0"}`}
            />
          ))}

          {/* Slide controls */}
          <div className="absolute bottom-4 end-4 z-10 flex items-center justify-between gap-4 rounded-card bg-white/95 p-2 shadow-soft backdrop-blur sm:gap-6 lg:bottom-[calc(var(--hu)*0.6)] lg:end-[calc(var(--u)*3.7)] lg:w-[calc(var(--u)*18.4)] lg:rounded-[calc(var(--hu)*2.4)] lg:p-[calc(var(--u)*0.8)]">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={dict.a11y.prev}
              className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-red-primary hover:text-red-primary lg:size-[max(40px,calc(var(--hu)*3.6))]"
            >
              <ArrowLeft aria-hidden className="flip-rtl size-4" />
            </button>
            <span dir="ltr" className="text-small font-semibold tracking-wider text-ink" aria-live="polite">
              {pad(active + 1)} <span className="text-ink/35">/ {pad(slides.length)}</span>
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={dict.a11y.next}
              className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-red-primary hover:text-red-primary lg:size-[max(40px,calc(var(--hu)*3.6))]"
            >
              <ArrowRight aria-hidden className="flip-rtl size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Red pill over the image's right edge */}
      <div aria-hidden className="pointer-events-none absolute start-[calc(var(--u)*93.4)] top-[calc(var(--hu)*29.4)] z-30 hidden h-[calc(var(--hu)*21)] w-[calc(var(--u)*5.5)] rounded-e-[calc(var(--hu)*1)] rounded-s-[calc(var(--hu)*3.4)] bg-gradient-to-b from-red-bright to-red-deep lg:block" />

      {/* Vertical badge */}
      <div className="absolute start-[calc(var(--u)*89.4)] top-[calc(var(--hu)*13.4)] z-30 hidden items-start gap-[calc(var(--u)*1.4)] rounded-lg bg-white/60 py-2 pe-3 ps-3 backdrop-blur-sm lg:flex">
        <span className="h-[calc(var(--hu)*5)] w-[2px] bg-red-primary" aria-hidden />
        <ul className="text-micro font-medium leading-[1.8] tracking-[0.2em] text-ink/80 uppercase rtl:tracking-normal">
          {t.badgeLines?.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>
    </section>
  );
}
