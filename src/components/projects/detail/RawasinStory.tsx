import Image from "next/image";
import { Check } from "lucide-react";
import type { Locale } from "@/content";
import { rawasinStory } from "@/content/rawasin-story";
import { asset } from "@/content/news";
import { SectionIntro } from "../../ui";
import { stagger } from "../../motion/Lines";

const card = "rounded-[20px] border border-[#ECEAE5] bg-white p-6 shadow-xs";

export function RawasinArchitecture({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].architecture;
  return (
    <section id="architecture" aria-labelledby="architecture-title" className="scroll-mt-36 border-t border-[#ECEAE5] bg-[#FBFBFA] py-20 sm:py-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionIntro id="architecture-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
          </div>
          <dl className="grid grid-cols-2 gap-3 lg:col-span-5">
            {t.stats.map((s, i) => (
              <div key={s.value} data-reveal="fade" style={stagger(i)} className={card}>
                <dt className="font-serif text-[2rem] leading-none text-[#C51E28]" dir="auto">{s.value}</dt>
                <dd className="mt-3 text-[13px] leading-relaxed text-[#4B5258]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.points.map((p, i) => (
            <li key={p.title} data-reveal="fade" style={stagger(i)} className={card}>
              <h3 className="text-[15px] font-semibold text-[#14171A]">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#4B5258]">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RawasinSmart({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].smart;
  return (
    <section id="smart" aria-labelledby="smart-title" className="scroll-mt-36 border-t border-white/10 bg-[#111417] py-20 text-white sm:py-24">
      <div className="container-x">
        <SectionIntro id="smart-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} tone="light" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.groups.map((g, i) => (
            <div key={g.title} data-reveal="fade" style={stagger(i)} className="rounded-[20px] border border-white/12 bg-white/[0.04] p-6">
              <h3 className="text-[15px] font-semibold">{g.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/75">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#E85A62]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[11.5px] text-white/55">{t.note}</p>
      </div>
    </section>
  );
}

export function RawasinClubhouse({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].clubhouse;
  return (
    <section id="clubhouse" aria-labelledby="clubhouse-title" className="scroll-mt-36 border-t border-[#ECEAE5] bg-white py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro id="clubhouse-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[24px] border border-[#ECEAE5] shadow-md">
            <Image src={asset("/images/rawasin/compound-clubhouse.webp")} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
        <ol className="grid content-start gap-3 lg:col-span-7">
          {t.floors.map((f, i) => (
            <li key={f.level + i} data-reveal="fade" style={stagger(i)} className={`${card} flex gap-5`}>
              <span className="w-16 shrink-0 text-[11px] font-bold tracking-[0.2em] text-[#C51E28] uppercase rtl:tracking-normal">{f.level}</span>
              <div>
                <h3 className="text-[15px] font-semibold text-[#14171A]">{f.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#4B5258]">{f.body}</p>
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
  return (
    <section id="mosque" aria-labelledby="mosque-title" className="scroll-mt-36 border-t border-[#ECEAE5] bg-[#F3F2EF] py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[#ECEAE5] shadow-md">
          <Image src={asset("/images/rawasin/compound-mosque.webp")} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <SectionIntro id="mosque-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
      </div>
    </section>
  );
}

export function RawasinServices({ locale }: { locale: Locale }) {
  const t = rawasinStory[locale].services;
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-36 border-t border-[#ECEAE5] bg-[#FBFBFA] py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro id="services-title" eyebrow={t.eyebrow} lines={t.titleLines} body={t.body} />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {t.items.map((item, i) => (
            <li key={item} data-reveal="fade" style={stagger(i)} className={`${card} flex items-start gap-3 text-[14px] leading-relaxed text-[#14171A]`}>
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[#C51E28]" />
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
    <section id="partners" aria-labelledby="partners-title" className="scroll-mt-36 border-t border-[#ECEAE5] bg-white py-20 sm:py-24">
      <div className="container-x">
        <SectionIntro id="partners-title" eyebrow={t.eyebrow} lines={t.titleLines} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((p, i) => (
            <li key={p.name} data-reveal="fade" style={stagger(i)} className={card}>
              <h3 className="text-[15px] font-semibold text-[#14171A]">{p.name}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#4B5258]">{p.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
