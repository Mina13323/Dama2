import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/content";
import { impactContent } from "@/content/pages";
import { mallImages, rawasinMall } from "@/content/rawasin";

/** Section 06 — large architectural feature for Rawasin Mall. */
export function MallFeature({ locale }: { locale: Locale }) {
  const t = rawasinMall[locale].hero;
  const ar = locale === "ar";
  return (
    <section aria-labelledby="mall-feature-title" className="relative isolate overflow-hidden bg-[#111417] text-white">
      <div className="grid lg:grid-cols-2">
        <div data-reveal="up" className="container-x flex flex-col justify-center py-16 sm:py-20 lg:py-28 lg:ps-[max(48px,calc((100vw-1240px)/2+48px))] lg:pe-16">
          <p className="flex items-center gap-3 text-[10.5px] font-bold tracking-[0.28em] text-white/60 uppercase rtl:tracking-normal">
            <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
            {ar ? "وجهة مميزة" : "Featured Destination"}
          </p>
          <h2 id="mall-feature-title" className="mt-5 font-display text-[clamp(2.4rem,4.2vw,4.25rem)] leading-[1.05] text-white">
            {ar ? "اكتشف مول" : "Discover"}{" "}
            <span className="italic text-[#E4545C]">{ar ? "رواسين" : "Rawasin Mall"}</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">{t.description}</p>
          <p className="mt-4 max-w-md text-[13.5px] italic leading-relaxed text-white/50">
            {ar ? "وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والتسوق والترفيه في سوهاج الجديدة." : "A mixed-use destination bringing lifestyle, healthcare, shopping, and entertainment together in New Sohag."}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/projects/rawasin/mall`}
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#C51E28] px-7 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9F121A]"
            >
              {ar ? "استكشف مول رواسين" : "Explore Rawasin Mall"}
              <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/projects/rawasin`}
              className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-[13px] font-semibold text-white transition-colors hover:border-white/60"
            >
              {ar ? "عن مشروع رواسين" : "About Rawasin"}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[340px] lg:min-h-[560px]">
          <Image
            src={mallImages.hero}
            alt={t.imageAlt}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#111417]/50 via-transparent to-transparent lg:bg-gradient-to-r" />
          <div className="absolute bottom-5 start-5 rounded-full border border-white/25 bg-[#111417]/70 px-4 py-2 text-[11px] font-semibold tracking-wider text-white/80 backdrop-blur sm:bottom-8 sm:start-8">
            {ar ? "سوهاج الجديدة · صعيد مصر" : "NEW SOHAG · UPPER EGYPT"}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Section 05 — restrained Our Impact teaser. No unverified claims or statistics. */
export function ImpactTeaser({ locale }: { locale: Locale }) {
  const t = impactContent[locale];
  const ar = locale === "ar";
  return (
    <section aria-labelledby="impact-teaser-title" className="border-y border-[#ECEAE5] bg-[#F3F2EF]">
      <div className="container-x grid gap-8 py-14 sm:py-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-2">
          <p className="text-[10.5px] font-bold tracking-[0.28em] text-[#C51E28] uppercase rtl:tracking-normal">{t.hero.eyebrow}</p>
          <span className="mt-4 block h-0.5 w-8 bg-[#C51E28]" aria-hidden />
        </div>
        <div className="lg:col-span-6">
          <h2 id="impact-teaser-title" className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-tight text-[#14171A]">
            {t.hero.titleLines[0]}{" "}
            <span className="italic text-[#C51E28]">{t.hero.titleLines[1].replace(/\*/g, "")}</span>
          </h2>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#687076]">{t.hero.body}</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Link
            href={`/${locale}/growth`}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-[#14171A]/20 bg-white px-6 text-[13px] font-semibold text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
          >
            {ar ? "تعرّف على أثرنا" : "Read about Our Impact"}
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
          <p className="mt-3 max-w-xs text-[11.5px] leading-relaxed text-[#8C939B]">{t.status.note}</p>
        </div>
      </div>
    </section>
  );
}
