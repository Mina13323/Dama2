import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Layers, Leaf } from "lucide-react";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Lines } from "../motion/Lines";
import { VisionVideo } from "./VisionVideo";
import { buttonClass } from "@/components/ui";

const pillarIcons = [Building2, Leaf, Layers];

export function AboutHero({ dict }: { dict: Dictionary }) {
  const t = dict.about.hero;
  return (
    <section aria-labelledby="about-hero-title" className="relative isolate overflow-hidden bg-cream">
      <div className="relative flex flex-col lg:block lg:min-h-[min(100svh,900px)]">
        {/* Soft concentric arcs behind the copy */}
        <div aria-hidden className="pointer-events-none absolute -top-[30%] start-[30%] -z-10 hidden aspect-square w-[70vw] rounded-full border border-stone lg:block" />
        <div aria-hidden className="pointer-events-none absolute -top-[22%] start-[36%] -z-10 hidden aspect-square w-[64vw] rounded-full bg-gradient-to-br from-white/70 to-transparent lg:block" />

        {/* Red disc peeking around the curved edge */}
        <div aria-hidden className="pointer-events-none absolute start-[43.5%] top-[19%] hidden aspect-square w-[30vw] max-w-[560px] rounded-full bg-gradient-to-br from-red-bright to-red-deep lg:block" />

        {/* Photograph: full-bleed on the trailing side, curved leading edge */}
        <div className="enter-fade relative order-2 mx-4 mb-12 h-[420px] overflow-hidden rounded-card sm:mx-8 sm:h-[520px] about-hero-photo lg:absolute lg:bottom-0 lg:end-0 lg:top-[88px] lg:order-none lg:m-0 lg:mb-0 lg:h-auto lg:w-[60%] lg:rounded-none" style={{ animationDelay: "300ms" }}>
          <Image src={images.about.hero} alt={t.imageAlt} fill priority sizes="(min-width: 1024px) 56vw, 100vw" className="kenburns object-cover" />
          <div aria-hidden className="absolute inset-y-0 start-0 hidden w-1/4 bg-gradient-to-r from-cream/70 to-transparent rtl:bg-gradient-to-l lg:block" />
        </div>

        {/* Copy */}
        <div className="relative z-10 order-1 px-4 pb-10 pt-28 sm:px-8 sm:pt-32 lg:flex lg:min-h-[min(100svh,900px)] lg:w-[45%] lg:flex-col lg:justify-center lg:pb-16 lg:ps-[5.5vw] lg:pt-32">
          <div className="enter-fade flex items-center gap-3 text-red-primary" style={{ animationDelay: "100ms" }}>
            <span className="h-[2px] w-6 bg-red-primary" aria-hidden />
            <p className="text-small font-semibold tracking-[0.16em] uppercase rtl:tracking-normal">{t.eyebrow}</p>
            <span className="h-[2px] w-6 bg-red-primary" aria-hidden />
          </div>

          <Lines as="h1" id="about-hero-title" mode="enter" lines={t.titleLines} className="mt-6 font-display text-[clamp(2.6rem,4.1vw,4.6rem)] font-normal leading-[1.08] tracking-tight text-ink" />

          <p className="enter-up mt-6 max-w-[34rem] text-body leading-golden text-muted sm:text-lead" style={{ animationDelay: "450ms" }}>
            {t.body}
          </p>

          <div className="enter-up mt-9 flex flex-wrap items-center gap-x-10 gap-y-5" style={{ animationDelay: "600ms" }}>
            <Link href="#who-we-are" className={`${buttonClass("red", "md")}`}>
              <span>{t.cta}</span>
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/20">
                <ArrowRight aria-hidden className="flip-rtl size-3.5" />
              </span>
            </Link>
            <VisionVideo label={t.watch} closeLabel={t.watchClose} />
          </div>

          <ul className="enter-up mt-12 grid max-w-xl grid-cols-3 lg:mt-16" style={{ animationDelay: "750ms" }}>
            {t.pillars.map((label, i) => {
              const Icon = pillarIcons[i];
              return (
                <li key={label} className={`px-3 first:ps-2 ${i > 0 ? "border-s border-ink/12 sm:ps-8" : ""}`}>
                  <Icon aria-hidden className="size-9 text-bronze" strokeWidth={1.2} />
                  <p className="mt-3 text-body-sm font-medium leading-snug text-ink sm:text-body">{label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Section navigation */}
      <div className="frame-wide pb-12 sm:pb-16">
        <div className="rounded-full border border-border bg-white/90 p-2 shadow-xs backdrop-blur-md sm:p-2.5">
          <SectionNav dict={dict} />
        </div>
      </div>
    </section>
  );
}

function SectionNav({ dict }: { dict: Dictionary }) {
  return (
    <nav aria-label={dict.about.sectionNav} className="w-full">
      <ol className="no-scrollbar flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {dict.about.hero.nav.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-10 items-center rounded-full border border-transparent bg-canvas px-5 py-2 text-small font-semibold tracking-wider text-ink uppercase transition-all duration-200 hover:border-red-primary hover:bg-red-soft hover:text-red-primary hover:shadow-xs rtl:tracking-normal"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
