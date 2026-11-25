import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/content";
import { mallImages, rawasinMall } from "@/content/projects/rawasin/mall";
import { rawasinHref } from "@/content/projects/rawasin/links";
import { buttonClass } from "@/components/ui";

/** Section 06 — large architectural feature for Rawasin Mall. */
export function MallFeature({ locale }: { locale: Locale }) {
  const t = rawasinMall[locale].hero;
  const ar = locale === "ar";
  return (
    <section aria-labelledby="mall-feature-title" className="relative isolate overflow-hidden bg-charcoal text-white">
      <div className="grid lg:grid-cols-2">
        <div data-reveal="up" className="frame-wide flex flex-col justify-center py-16 sm:py-20 lg:py-28 lg:ps-[max(48px,calc((100vw-1240px)/2+48px))] lg:pe-16">
          <p className="flex items-center gap-3 text-micro font-bold tracking-[0.28em] text-white/60 uppercase rtl:tracking-normal">
            <span className="h-[2px] w-5 rounded-full bg-red-primary" aria-hidden />
            {ar ? "وجهة مميزة" : "Featured Destination"}
          </p>
          <h2 id="mall-feature-title" className="mt-5 font-display text-[clamp(2.4rem,4.2vw,4.25rem)] leading-[1.05] text-white">
            {ar ? "اكتشف مول" : "Discover"}{" "}
            <span className="italic text-red-light">{ar ? "رواسين" : "Rawasin Mall"}</span>
          </h2>
          <p className="mt-5 max-w-md text-body-sm leading-golden text-white/70">{t.description}</p>
          <p className="mt-4 max-w-md text-body-sm italic leading-golden text-white/50">
            {ar ? "وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والتسوق والترفيه في سوهاج الجديدة." : "A mixed-use destination bringing lifestyle, healthcare, shopping, and entertainment together in New Sohag."}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={rawasinHref("mall", locale)}
              className={`${buttonClass("red", "sm")}`}
            >
              {ar ? "استكشف مول رواسين" : "Explore Rawasin Mall"}
              <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/developments/rawasin`}
              className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-small font-semibold text-white transition-colors hover:border-white/60"
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
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent lg:bg-gradient-to-r" />
          <div className="absolute bottom-5 start-5 rounded-full border border-white/25 bg-charcoal/70 px-4 py-2 text-caption font-semibold tracking-wider text-white/80 backdrop-blur sm:bottom-8 sm:start-8">
            {ar ? "سوهاج الجديدة · صعيد مصر" : "NEW SOHAG · UPPER EGYPT"}
          </div>
        </div>
      </div>
    </section>
  );
}
