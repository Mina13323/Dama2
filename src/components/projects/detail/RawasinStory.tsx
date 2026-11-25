import Image from "next/image";
import { Check } from "lucide-react";
import type { Locale } from "@/content";
import { rawasinStory } from "@/content/projects/rawasin/story";
import { clubhousePlans, brochureImg } from "@/content/assets";
import { getDictionary } from "@/content";
import { RailGallery } from "../../media/ImageRail";
import { SectionIntro } from "../../ui";
import { stagger } from "../../motion/Lines";

const card = "rounded-tile border border-border bg-white p-6 shadow-xs";

export function RawasinArchitecture({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].architecture;
  return (
    <section aria-labelledby="architecture-title" className="scroll-mt-36 bg-cream py-section sm:py-section-lg">
      <div className="frame-wide">
        <div className="grid gap-10 lg:grid-cols-13 lg:items-end">
          <div className="min-w-0 lg:col-span-8">
            <SectionIntro id="architecture-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
          </div>
          <dl className="grid grid-cols-2 gap-3 lg:col-span-5">
            {t.stats.map((s, i) => (
              <div key={s.value} data-reveal="fade" style={stagger(i)} className={card}>
                <dt className="font-serif text-[2rem] leading-none text-red-primary" dir="auto">{s.value}</dt>
                <dd className="mt-3 text-small leading-golden text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function RawasinSmart({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].smart;
  return (
    <section id="smart" aria-labelledby="smart-title" className="scroll-mt-36 border-t border-white/10 bg-charcoal py-section text-white sm:py-section-lg">
      <div className="frame-wide">
        <SectionIntro id="smart-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} tone="light" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.groups.map((g, i) => (
            <div key={g.title} data-reveal="fade" style={stagger(i)} className="rounded-tile border border-white/12 bg-white/[0.04] p-6">
              <span className={`inline-block rounded-full px-3 py-1 text-micro font-semibold ${g.conditional ? "bg-white/10 text-white/70" : "bg-red-primary/20 text-[#F08A90]"}`}>{g.tag}</span>
              <h3 className="mt-3 text-body-sm font-semibold">{g.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm leading-golden text-white/75">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#E85A62]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-caption text-white/55">{t.note}</p>
      </div>
    </section>
  );
}

export function RawasinClubhouse({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].clubhouse;
  const g = getDictionary(locale).projectDetail.gallery;
  return (
    <section id="clubhouse" aria-labelledby="clubhouse-title" className="scroll-mt-36 bg-canvas py-section sm:py-section-lg">
      <div className="frame-wide grid gap-10 lg:grid-cols-13">
        <div className="min-w-0 lg:col-span-5">
          <SectionIntro id="clubhouse-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
          <div className="mt-8">
            <RailGallery
              images={clubhousePlans(locale).map((p) => ({ sm: p.img.src, lg: p.img.src, w: p.img.w, h: p.img.h, alt: p.img.alt }))}
              labels={{ close: g.close, prev: g.prev, next: g.next, counter: g.counter }}
              prevLabel={g.prev}
              nextLabel={g.next}
            />
          </div>
        </div>
        <ol className="grid content-start gap-3 lg:col-span-8">
          {t.floors.map((f, i) => (
            <li key={f.level + i} data-reveal="fade" style={stagger(i)} className={`${card} flex gap-5`}>
              <span className="w-16 shrink-0 text-caption font-bold tracking-[0.2em] text-red-primary uppercase rtl:tracking-normal">{f.level}</span>
              <div>
                <h3 className="text-body-sm font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-body-sm leading-golden text-ink-soft">{f.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RawasinMosque({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].mosque;
  const mosque = brochureImg(locale).mosque;
  return (
    <section id="mosque" aria-labelledby="mosque-title" className="scroll-mt-36 bg-gradient-to-b from-cream to-sand py-section sm:py-section-lg">
      <div className="frame-wide grid gap-10 lg:grid-cols-2 lg:items-center">
        <div data-reveal="zoom" className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-lg bg-stone shadow-md">
          <Image src={mosque.src} alt={mosque.alt} fill loading="lazy" sizes="(min-width:1024px) 26rem, 100vw" className="object-cover" style={{ objectPosition: mosque.pos }} />
        </div>
        <SectionIntro id="mosque-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
      </div>
    </section>
  );
}

export function RawasinServices({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].services;
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-36 bg-cream py-section sm:py-section-lg">
      <div className="frame-wide grid gap-10 lg:grid-cols-13">
        <div className="min-w-0 lg:col-span-5">
          <SectionIntro id="services-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 min-w-0 lg:col-span-8">
          {t.items.map((item, i) => (
            <li key={item} data-reveal="fade" style={stagger(i)} className={`${card} flex items-start gap-3 text-body-sm leading-golden text-ink`}>
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-red-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RawasinPartners({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].partners;
  return (
    <section aria-labelledby="partners-title" className="scroll-mt-36 bg-canvas py-section sm:py-section-lg">
      <div className="frame-wide">
        <SectionIntro id="partners-title" eyebrow={t.eyebrow} lines={t.titleLines} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((p, i) => (
            <li key={p.name} data-reveal="fade" style={stagger(i)} className={card}>
              <h3 className="text-body-sm font-semibold text-ink">{p.name}</h3>
              <p className="mt-2 text-body-sm leading-golden text-ink-soft">{p.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
