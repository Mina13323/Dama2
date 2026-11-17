import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Locale } from "@/content";
import { livingContent } from "@/content/pages";
import { mallImages } from "@/content/rawasin";
import { Breadcrumbs, ButtonLink, SectionIntro } from "./ui";
import { stagger } from "./motion/Lines";

/** Dedicated Living page — facility categories are tied to the project where they exist. */
export function LivingPageView({ locale }: { locale: Locale }) {
  const t = livingContent[locale];
  const ar = locale === "ar";
  const base = `/${locale}`;

  return (
    <div className="bg-[#FBFBFA]">
      {/* Hero */}
      <section aria-labelledby="living-title" className="relative isolate overflow-hidden bg-[#F3F2EF] pb-14 pt-32 sm:pb-20 sm:pt-40 lg:pt-44">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ label: dictHome(ar), href: base }, { label: ar ? "الحياة" : "Living" }]} />
            <p className="mt-8 flex items-center gap-3 text-[11px] font-bold tracking-[0.26em] text-[#C51E28] uppercase rtl:tracking-normal">
              <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
              {t.hero.eyebrow}
            </p>
            <h1 id="living-title" className="mt-5 font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.05] text-[#14171A]">
              <span className="block">{t.hero.titleLines[0]}</span>
              <span className="mt-1 block italic text-[#C51E28]">{t.hero.titleLines[1].replace(/\*/g, "")}</span>
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-[#687076]">{t.hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={`${base}/projects/rawasin/mall`}>{t.example.cta}</ButtonLink>
              <ButtonLink href={`${base}/projects`} variant="outline">{ar ? "كل المشروعات" : "All Developments"}</ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-[#E9E6E0] lg:col-span-6">
            <Image src={mallImages.courtyard} alt="" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-[#ECEAE5] bg-white">
        <div className="container-x py-16 sm:py-20">
          <SectionIntro eyebrow={t.intro.eyebrow} lines={t.intro.titleLines} body={t.intro.body} />
        </div>
      </section>

      {/* Experience categories */}
      <section aria-labelledby="living-categories-title" className="bg-[#F3F2EF] py-16 sm:py-24">
        <div className="container-x">
          <h2 id="living-categories-title" className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] text-[#14171A]">{t.categories.title}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.categories.items.map((item, i) => (
              <li key={item.title} data-reveal="up" style={stagger(i)} className="group flex flex-col justify-between rounded-[24px] border border-[#ECEAE5] bg-white p-6 transition-all hover:border-[#C51E28]/50 hover:shadow-md sm:p-7">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#C51E28]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-xl text-[#14171A]">{item.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#687076]">{item.body}</p>
                </div>
                <p className="mt-6 flex items-center gap-1.5 text-[11.5px] font-semibold text-[#C51E28]">
                  <MapPin aria-hidden className="size-3.5" />
                  {item.related}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rawasin Mall example */}
      <section aria-labelledby="living-example-title" className="bg-[#111417] py-16 text-white sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-bold tracking-[0.26em] text-[#E4545C] uppercase rtl:tracking-normal">{t.example.eyebrow}</p>
            <h2 id="living-example-title" className="mt-4 font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-tight text-white">
              <span className="block">{t.example.titleLines[0]}</span>
              <span className="mt-1 block italic text-[#E4545C]">{t.example.titleLines[1].replace(/\*/g, "")}</span>
            </h2>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-white/70">{t.example.body}</p>
            <p className="mt-4 max-w-md text-[12px] leading-relaxed text-white/45">{t.example.note}</p>
            <Link href={`${base}/projects/rawasin/mall`} className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#C51E28] px-7 text-[13px] font-semibold text-white transition-colors hover:bg-[#9F121A]">
              {t.example.cta}
              <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {t.example.items.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/[0.05] px-5 py-4 text-[13.5px] text-white/85">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#C51E28]" aria-hidden />
                <span dir={/m²|\d/.test(item) ? "ltr" : undefined} className={/m²|\d/.test(item) ? "text-start" : undefined}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <div>
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">{t.cta.eyebrow}</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] text-[#14171A]">
              {t.cta.titleLines[0]} <span className="italic text-[#C51E28]">{t.cta.titleLines[1].replace(/\*/g, "")}</span>
            </h2>
            <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-[#687076]">{t.cta.body}</p>
          </div>
          <ButtonLink href={`${base}/contact`}>{t.cta.button}</ButtonLink>
        </div>
      </section>
    </div>
  );
}

function dictHome(ar: boolean) {
  return ar ? "الرئيسية" : "Home";
}
