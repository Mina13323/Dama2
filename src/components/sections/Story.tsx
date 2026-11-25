import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Leaf, Users } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { images } from "@/content/site";
import { stagger } from "../motion/Lines";
import { storyGrid, storyRow } from "./layout";

export function Story({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.story;
  const icons = [Leaf, Users, Gem];
  const [tagA, tagB] = (t.tag || "OUR STORY").split(" ");

  return (
    <section id="about" aria-labelledby="story-title" className="relative isolate overflow-hidden bg-sand pb-10 pt-4 sm:pb-14 lg:pb-16 lg:pt-5">
      <div className={storyRow}>
        <div className={`grid gap-4 lg:min-h-[calc(var(--u)*40)] lg:items-stretch ${storyGrid}`}>
          {/* Left: monochrome courtyard with a translucent red block over its edge */}
          <div data-reveal="card" className="relative order-2 min-h-[440px] lg:order-none">
            <div className="absolute inset-y-0 end-0 start-10 overflow-hidden rounded-2xl rounded-ss-[calc(var(--u)*6.8)] rounded-se-[calc(var(--u)*6)] rounded-es-[calc(var(--u)*9)] bg-[#DCDAD5] lg:start-[calc(var(--u)*2.4)]">
              <Image
                src={images.courtyard}
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) calc(var(--u)*33), calc(var(--u)*100)"
                className="object-cover object-[38%_center] grayscale contrast-[1.15]"
              />
            </div>

            <div aria-hidden className="absolute start-0 top-[22%] h-[43%] w-[39%] rounded-2xl rounded-se-[calc(var(--u)*5.5)] rounded-es-[calc(var(--u)*3)] bg-red-primary/85 mix-blend-multiply" />
            <div aria-hidden className="absolute start-0 top-[22%] h-[43%] w-[39%] rounded-2xl rounded-se-[calc(var(--u)*5.5)] rounded-es-[calc(var(--u)*3)] border border-white/55" />

            <div className="absolute bottom-[6%] start-0 text-micro font-medium leading-[2] tracking-[0.32em] text-muted uppercase rtl:tracking-normal">
              <p>{tagA}</p>
              {tagB && <p>{tagB}</p>}
              <span aria-hidden className="mt-3 block h-[2px] w-6 bg-red-primary" />
            </div>
          </div>

          {/* Center: editorial card */}
          <div
            data-reveal="up"
            style={stagger(1)}
            className="order-1 flex flex-col lg:order-none rounded-card rounded-ss-[80px] border border-white/80 bg-canvas px-7 py-10 shadow-card sm:px-12 lg:rounded-[calc(var(--u)*2.6)] lg:rounded-ss-[calc(var(--u)*5.5)] lg:py-[calc(var(--u)*2.8)] lg:ps-[calc(var(--u)*5.2)] lg:pe-[calc(var(--u)*3)]"
          >
            <div className="flex items-center gap-4">
              <span className="h-[3px] w-5 rounded-full bg-red-primary" aria-hidden />
              <p className="text-micro font-normal tracking-[0.34em] text-muted uppercase rtl:tracking-normal">{t.eyebrow}</p>
            </div>

            <h2
              id="story-title"
              className="mt-[calc(var(--u)*1.6)] font-display text-[clamp(2.5rem,calc(var(--u)*4.7),4.5rem)] font-normal leading-[1.08] tracking-[-0.01em] text-ink"
            >
              <span className="block">{t.titleLines[0]}</span>
              {t.titleLines[1]?.split(/(\*[^*]+\*)/).map((part, i) =>
                part.startsWith("*") ? (
                  <span key={i} className="block italic text-red-primary">
                    {part.replace(/\*/g, "")}
                  </span>
                ) : (
                  part && <span key={i} className="block">{part.trim()}</span>
                ),
              )}
            </h2>

            <p className="mt-[calc(var(--u)*1.6)] max-w-[27rem] text-body-sm leading-[1.95] text-muted">{t.body}</p>

            <Link
              href={`/${locale}/about`}
              className="group mt-auto inline-flex items-end gap-6 self-start pt-8 text-small font-semibold text-ink"
            >
              <span className="border-b-2 border-red-primary pb-2 transition-colors group-hover:text-red-primary">{t.cta}</span>
              <span className="border-b border-red-primary/40 pb-1.5 text-red-primary">
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Right: card running off the edge — palm detail + value pillars */}
          <div
            data-reveal="fade"
            style={stagger(2)}
            className="order-3 flex flex-col overflow-hidden lg:order-none rounded-card border border-white/80 bg-canvas pb-6 shadow-card lg:rounded-e-none lg:rounded-s-[calc(var(--u)*3.6)] lg:border-e-0 lg:pb-[calc(var(--u)*2.4)]"
          >
            <div className="relative ms-10 h-44 shrink-0 overflow-hidden rounded-es-panel rounded-ss-panel lg:ms-[calc(var(--u)*3)] lg:h-[32%] lg:rounded-es-[calc(var(--u)*3)] lg:rounded-ss-[calc(var(--u)*3)]">
              <Image
                src={images.courtyardPalms}
                alt=""
                fill
                sizes="(min-width: 1024px) calc(var(--u)*20), calc(var(--u)*100)"
                className="object-cover object-center grayscale contrast-[1.1]"
              />
            </div>

            <ul className="mt-auto flex flex-col gap-[calc(var(--u)*1.6)] px-6 pt-10 sm:px-8 lg:ps-[calc(var(--u)*1.8)] lg:pe-4">
              {t.valueCards?.map((card, i) => {
                const Icon = icons[i] || Leaf;
                return (
                  <li key={card.title} className="flex items-center gap-[calc(var(--u)*1.5)] max-lg:gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-red-primary shadow-soft lg:size-[max(52px,calc(var(--u)*4.6))]">
                      <Icon className="size-5 lg:size-[max(20px,calc(var(--u)*1.7))]" strokeWidth={1.4} />
                    </span>
                    <span className="whitespace-pre-line text-micro font-bold leading-[1.6] tracking-[0.06em] text-ink uppercase rtl:tracking-normal">
                      {card.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
