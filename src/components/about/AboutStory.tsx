import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Leaf, UsersRound } from "lucide-react";
import type { Dictionary } from "@/content";
import { images } from "@/content/site";
import { Accent, stagger } from "../motion/Lines";
import { buttonClass } from "@/components/ui";

/** Arch glyph for the Heritage principle (no equivalent in the icon set). */
function ArchIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 28V15a12 12 0 0 1 24 0v13" />
      <path d="M10 28V16a6 6 0 0 1 12 0v12" />
      <path d="M2 28h28" />
    </svg>
  );
}
const principleIcons = [ArchIcon, Layers, Leaf, UsersRound];

export function AboutStory({ dict }: { dict: Dictionary }) {
  const t = dict.about.story;
  return (
    <section id="story" aria-labelledby="about-story-title" className="relative isolate scroll-mt-24 overflow-hidden bg-cream py-section sm:py-section-lg">
      {/* faint arch outline behind the copy */}
      <div aria-hidden className="pointer-events-none absolute end-[6%] top-16 -z-10 hidden h-[78%] w-[42%] rounded-t-full border border-white/90 bg-gradient-to-b from-white/50 to-transparent lg:block" />

      <div className="mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-8 lg:grid-cols-13 lg:items-center lg:gap-12 lg:px-14">
        {/* Photographs */}
        <div data-reveal="card" className="relative mx-auto w-full max-w-[640px] pb-8 ps-6 order-2 lg:order-1 lg:col-span-5">
          <span aria-hidden className="absolute bottom-0 start-0 h-[48%] w-[30%] rounded-ss-[120px] bg-gradient-to-b from-red-primary to-red-deep" />
          <span aria-hidden className="absolute -top-5 start-6 h-[30%] w-[40%] rounded-t-card bg-stone" />

          <div className="relative aspect-[4/5] w-[92%] overflow-hidden rounded-ss-[110px] rounded-se-lg rounded-ee-lg rounded-es-lg border-[5px] border-white bg-stone shadow-lift">
            <Image src={images.about.story} alt={t.imageAlt} fill sizes="(min-width:1024px) 36vw, 90vw" className="object-cover transition-transform duration-[1.2s] ease-soft hover:scale-[1.03]" />
          </div>

          <div className="absolute bottom-0 end-0 aspect-square w-[38%] overflow-hidden rounded-ss-tile rounded-ee-panel border-[5px] border-white bg-stone shadow-card">
            <Image src={images.about.storyDetail} alt={t.detailAlt} fill sizes="(min-width:1024px) 15vw, 38vw" className="object-cover object-[70%_center]" />
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2 lg:col-span-8 lg:ps-6">
          <p className="flex items-center gap-2.5 text-small font-bold tracking-[0.18em] text-red-primary uppercase rtl:tracking-normal">
            <span aria-hidden className="h-[2px] w-5 bg-red-primary" />
            {t.eyebrow}
          </p>
          <h2 id="about-story-title" className="mt-5 font-display text-[clamp(2.6rem,4.8vw,5rem)] leading-[1.04] text-ink">
            {t.titleLines.map((line) => (
              <span key={line} className="block">
                <Accent text={line} />
              </span>
            ))}
          </h2>
          <p className="mt-7 max-w-2xl text-body leading-[1.8] text-muted">{t.body}</p>

          <ul aria-label={t.principlesLabel} className="mt-10 grid max-w-3xl grid-cols-2 gap-y-8 sm:grid-cols-4">
            {t.principles.map((p, i) => {
              const Icon = principleIcons[i] ?? Layers;
              return (
                <li key={p.title} data-reveal="up" style={stagger(2 + i)} className={`px-4 first:ps-0 ${i > 0 ? "sm:border-s sm:border-ink/12" : ""} ${i % 2 === 1 ? "border-s border-ink/12 sm:border-s" : ""}`}>
                  <Icon aria-hidden className="size-10 text-bronze" strokeWidth={1.3} />
                  <p className="mt-3 text-lead font-semibold text-ink">{p.title}</p>
                  <p className="mt-1.5 text-body-sm leading-snug text-muted">{p.caption}</p>
                </li>
              );
            })}
          </ul>

          <Link href="#vision-mission" className={`${buttonClass("red", "md")} mt-11`}>
            {t.cta}
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
