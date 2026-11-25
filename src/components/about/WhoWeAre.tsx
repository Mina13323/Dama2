import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Layers, Users } from "lucide-react";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Accent } from "../motion/Lines";
import { buttonClass } from "@/components/ui";

/** Arch glyph for the Heritage pillar (no equivalent in the icon set). */
function ArchIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 29V15a11 11 0 0 1 22 0v14" />
      <path d="M11 29V16a5 5 0 0 1 10 0v13" />
    </svg>
  );
}
const pillarIcons = [ArchIcon, Gem, Layers, Users];

export function WhoWeAre({ dict }: { dict: Dictionary }) {
  const t = dict.about.who;
  return (
    <section id="who-we-are" aria-labelledby="who-title" className="relative scroll-mt-24 overflow-hidden bg-cream py-section sm:py-section-lg">
      <div className="mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-8 lg:grid-cols-13 lg:items-center lg:gap-10 lg:px-14">
        {/* Copy */}
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2.5 text-small font-bold tracking-[0.16em] text-red-primary uppercase rtl:tracking-normal">
            <span aria-hidden className="h-[2px] w-5 bg-red-primary" />
            {t.eyebrow}
          </p>
          <h2 id="who-title" className="mt-5 font-display text-[clamp(2.5rem,4.2vw,4.4rem)] leading-[1.08] text-ink">
            {t.titleLines.map((line) => (
              <span key={line} className="block">
                <Accent text={line} />
              </span>
            ))}
          </h2>
          <p className="mt-7 max-w-xl text-body leading-[1.8] text-muted">{t.body}</p>
          <Link href="#story" className={`${buttonClass("red", "md")} mt-9`}>
            {t.cta}
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>

          <ul aria-label={t.pillarsLabel} className="mt-12 grid max-w-xl grid-cols-4">
            {t.pillars.map((label, i) => {
              const Icon = pillarIcons[i] ?? Layers;
              return (
                <li key={label} className={`flex flex-col items-center text-center ${i > 0 ? "border-s border-ink/12" : ""}`}>
                  <Icon aria-hidden className="size-9 text-red-primary" strokeWidth={1.5} />
                  <span className="mt-3 font-display text-body-sm font-semibold text-ink sm:text-lead">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Arched photograph, red arch behind, inset detail */}
        <div data-reveal="card" className="relative mx-auto w-full max-w-[860px] pb-10 lg:col-span-8 lg:pe-16 rtl:lg:pe-0 rtl:lg:ps-16">
          <div aria-hidden className="pointer-events-none absolute end-6 top-2 -z-0 h-[62%] w-[38%] rounded-t-full bg-gradient-to-b from-red-primary to-red-deep" />

          <div className="relative aspect-[5/5.2] w-[86%] overflow-hidden rounded-b-card rounded-t-full border-[5px] border-white bg-stone shadow-lift sm:aspect-[6/5.6]">
            <Image src={images.about.who} alt={t.imageAlt} fill sizes="(min-width:1024px) 46vw, 90vw" className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]" />
          </div>

          <div className="absolute bottom-0 end-0 aspect-[4/5] w-[34%] overflow-hidden rounded-card border-[6px] border-white bg-stone shadow-card">
            <Image src={images.about.whoDetail} alt={t.detailAlt} fill sizes="(min-width:1024px) 18vw, 34vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
