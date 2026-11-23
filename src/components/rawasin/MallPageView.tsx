import Image from "next/image";
import { ArrowRight, MapPin, MoveRight, Navigation } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { mallAreaMapUrl, mallImages, rawasinMall, type FloorId } from "@/content/rawasin";
import { Breadcrumbs, ButtonLink, SectionIntro } from "@/components/ui";
import { SectionNav } from "@/components/projects/detail/SectionNav";
import { ProjectGallery } from "@/components/projects/detail/ProjectGallery";
import { InquiryForm } from "@/components/projects/detail/InquiryForm";
import { stagger } from "@/components/motion/Lines";
import { FloorExplorer } from "./FloorExplorer";
import { VideoShowcase } from "@/components/projects/detail/VideoShowcase";
import { mallDayGallery, mallNightGallery, rawasinVideos } from "@/content/rawasin-media";

type Props = {
  locale: Locale;
  dict: Dictionary;
  plans: Record<FloorId, string | null>;
};

export function MallPageView({ locale, dict, plans }: Props) {
  const t = rawasinMall[locale];
  const ar = locale === "ar";
  const base = `/${locale}`;
  const enquirySubjects = {
    "rawasin-mall": t.hero.name,
    "rawasin-mall-retail": ar ? "الوحدات التجارية" : "Retail Units",
    "rawasin-mall-medical": ar ? "الوحدات الطبية" : "Medical Units",
    "rawasin-mall-info": ar ? "معلومات عن المول" : "Mall Information",
    "rawasin-mall-partnership": ar ? "استفسار شراكة" : "Partnership Enquiry",
    general: ar ? "استفسار عام" : "General Enquiry",
  };

  return (
    <div className="bg-[#FBFBFA]">
      {/* ---------- Hero ---------- */}
      <section aria-labelledby="mall-hero-title" className="relative isolate overflow-hidden bg-[#111417] pb-16 pt-32 text-white sm:pb-20 sm:pt-40 lg:pt-44">
        <div className="absolute inset-0 -z-10">
          <Image src={mallImages.hero} alt={t.hero.imageAlt} fill priority sizes="100vw" className="object-cover object-center opacity-45" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#111417] via-[#111417]/80 to-[#111417]/25" />
        </div>
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Breadcrumbs
              className="[&_a]:text-white/60 [&_span]:text-white [&_svg]:text-white/40"
              items={[
                { label: ar ? "الرئيسية" : "Home", href: base },
                { label: ar ? "مشروعاتنا" : "Our Developments", href: `${base}/projects` },
                { label: "Rawasin", href: `${base}/projects/rawasin` },
                { label: t.hero.name },
              ]}
            />
            <p className="mt-9 flex items-center gap-3 text-[10.5px] font-bold tracking-[0.28em] text-white/65 uppercase rtl:tracking-normal">
              <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
              {t.hero.eyebrow}
            </p>
            <h1 id="mall-hero-title" className="mt-5 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.02] text-white" dir="ltr">
              {t.hero.name}
            </h1>
            <p className="mt-3 font-display text-[clamp(1.4rem,2.6vw,2.2rem)] italic text-[#E4545C]">{t.hero.tagline}</p>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/80">{t.hero.description}</p>
          </div>
          <div className="lg:col-span-4">
            <ul className="space-y-2.5 rounded-[24px] border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm">
              {t.hero.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-white/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C51E28]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-x mt-10 flex flex-wrap gap-4">
          <ButtonLink href="#floors">{t.hero.primaryCta}</ButtonLink>
          <ButtonLink href="#enquire" variant="light">{t.hero.secondaryCta}</ButtonLink>
        </div>
      </section>

      <SectionNav items={t.nav.items} label={t.nav.label} />

      {/* ---------- About ---------- */}
      <section id="about" aria-labelledby="mall-about-title" className="scroll-mt-32 bg-[#FBFBFA] py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionIntro id="mall-about-title" eyebrow={t.about.eyebrow} lines={t.about.titleLines} body={t.about.lead} />
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[28px] border border-[#ECEAE5] bg-[#E9E6E0]">
              <Image src={mallImages.aerial} alt={t.masterPlan.imageAlt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-3">
              {t.about.statements.map((s, i) => (
                <li key={s.title} data-reveal="up" style={stagger(1 + i)} className="rounded-[24px] border border-[#ECEAE5] bg-white p-6 shadow-xs">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#C51E28]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-display text-xl text-[#14171A]">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#687076]">{s.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-[24px] bg-[#111417] p-7 text-white sm:p-9">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#E4545C] uppercase rtl:tracking-normal">{t.about.businessTitle}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/80">{t.about.businessBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Vision ---------- */}
      <section id="vision" aria-labelledby="mall-vision-title" className="relative isolate scroll-mt-32 overflow-hidden bg-[#F3F2EF] py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.26em] text-[#C51E28] uppercase rtl:tracking-normal">
              <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
              {t.vision.eyebrow}
            </p>
            <h2 id="mall-vision-title" className="mt-5 font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.05] text-[#14171A]">
              <span className="block">{t.vision.titleLines[0]}</span>
              <span className="mt-1 block italic text-[#C51E28]">{t.vision.titleLines[1].replace(/\*/g, "")}</span>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#687076]">{t.vision.body}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#E9E6E0] lg:col-span-6">
            <Image src={mallImages.entrance} alt={t.masterPlan.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#111417]/35 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ---------- Location ---------- */}
      <section id="location" aria-labelledby="mall-location-title" className="scroll-mt-32 border-y border-[#ECEAE5] bg-white py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionIntro id="mall-location-title" eyebrow={t.location.eyebrow} lines={t.location.titleLines} body={t.location.body} />
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <a
                href={mallAreaMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-[#ECEAE5] bg-white px-6 text-[13px] font-semibold text-[#14171A] transition-colors hover:border-[#C51E28] hover:text-[#C51E28]"
              >
                <Navigation aria-hidden className="size-4 text-[#C51E28]" />
                {t.location.directionsCta}
                <ArrowRight aria-hidden className="flip-rtl size-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Context map (no invented plot coordinates) */}
            <div className="relative overflow-hidden rounded-[28px] border border-[#ECEAE5] bg-[#F3F2EF] p-6 lg:col-span-5">
              <div className="relative flex h-64 items-center justify-center sm:h-72">
                <svg viewBox="0 0 400 260" className="absolute inset-0 size-full text-[#C51E28]/20" fill="none" aria-hidden>
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <ellipse key={i} cx="200" cy="130" rx={40 + i * 26} ry={24 + i * 16} stroke="currentColor" strokeWidth="1" transform={`rotate(${-12 + i * 3} 200 130)`} />
                  ))}
                </svg>
                <span className="relative flex flex-col items-center gap-2 rounded-[20px] border border-[#ECEAE5] bg-white px-6 py-4 shadow-sm">
                  <MapPin aria-hidden strokeWidth={1.8} className="size-6 text-[#C51E28]" />
                  <span className="font-display text-xl text-[#14171A]">{ar ? "سوهاج الجديدة" : "New Sohag"}</span>
                  <span className="text-[11px] text-[#687076]">{ar ? "التوسع الجنوبي" : "Southern expansion"}</span>
                </span>
              </div>
              <p className="mt-4 text-[11.5px] leading-relaxed text-[#8C939B]">{t.location.note}</p>
            </div>

            {/* Destinations */}
            <div className="lg:col-span-7">
              <h3 className="text-[11px] font-bold tracking-wider text-[#8C939B] uppercase rtl:tracking-normal">{t.location.destinationsLabel}</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.location.destinations.map((d, i) => (
                  <li key={d} className="flex items-start gap-3 rounded-[18px] border border-[#ECEAE5] bg-[#FBFBFA] px-4 py-3.5 text-[13.5px] text-[#14171A]">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FDF2F2] text-[10px] font-bold text-[#C51E28]" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-[11px] font-bold tracking-wider text-[#8C939B] uppercase rtl:tracking-normal">{t.location.accessTitle}</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.location.access.map((a) => (
                  <li key={a.title} className="rounded-[18px] bg-[#111417] p-5 text-white">
                    <p className="text-[13.5px] font-semibold">{a.title}</p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/65">{a.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Master plan ---------- */}
      <section id="master-plan" aria-labelledby="mall-master-title" className="scroll-mt-32 bg-[#F3F2EF] py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionIntro id="mall-master-title" eyebrow={t.masterPlan.eyebrow} lines={t.masterPlan.titleLines} body={t.masterPlan.body} />

            <dl className="mt-8 grid gap-3">
              {t.masterPlan.facts.map((f) => (
                <div key={f.label} className="flex items-start justify-between gap-4 rounded-[18px] border border-[#ECEAE5] bg-white px-5 py-4">
                  <dt className="text-[13px] text-[#687076]">{f.label}</dt>
                  <dd className="text-end text-[14px] font-semibold text-[#14171A]" dir="ltr">{f.value}</dd>
                </div>
              ))}
            </dl>

            {/* Level stack: an orientation diagram, not a technical plan */}
            <div className="mt-8">
              <h3 className="text-[11px] font-bold tracking-wider text-[#8C939B] uppercase rtl:tracking-normal">{t.masterPlan.levelsLabel}</h3>
              <ol className="mt-3 space-y-1.5">
                {t.masterPlan.levels.map((level, i) => (
                  <li key={level} className="flex items-center gap-3 rounded-[12px] border border-[#ECEAE5] bg-white px-4 py-2.5 text-[13px] font-medium text-[#14171A]">
                    <span className="h-5 w-1 rounded-full bg-[#C51E28]" aria-hidden />
                    <span className="text-[10.5px] font-bold text-[#C51E28]" dir="ltr">{String(t.masterPlan.levels.length - i).padStart(2, "0")}</span>
                    {level}
                  </li>
                ))}
              </ol>
            </div>

            <ButtonLink href="#floors" className="mt-8">{t.masterPlan.cta}</ButtonLink>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[#ECEAE5] bg-white shadow-sm">
              <Image src={mallImages.hero} alt={t.masterPlan.imageAlt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-4 rounded-[18px] border border-[#ECEAE5] bg-white p-4 text-[12.5px] leading-relaxed text-[#687076]">
              {t.masterPlan.imageNote}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Floor explorer ---------- */}
      <FloorExplorer
        floors={t.floors.list}
        labels={t.floors}
        locale={locale}
        plans={plans}
        contactHref={`${base}/contact`}
      />

      {/* ---------- Unit types ---------- */}
      <section id="unit-types" aria-labelledby="mall-units-title" className="scroll-mt-32 border-t border-[#ECEAE5] bg-[#111417] py-16 text-white sm:py-24">
        <div className="container-x">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.26em] text-[#E4545C] uppercase rtl:tracking-normal">
                <span className="h-[2px] w-5 rounded-full bg-[#C51E28]" aria-hidden />
                {t.unitTypes.eyebrow}
              </p>
              <h2 id="mall-units-title" className="mt-4 font-display text-[clamp(2.1rem,4vw,3.5rem)] leading-tight text-white">
                <span className="block">{t.unitTypes.titleLines[0]}</span>
                <span className="mt-1 block italic text-[#E4545C]">{t.unitTypes.titleLines[1].replace(/\*/g, "")}</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <ButtonLink href="#enquire">{t.unitTypes.cta}</ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[t.unitTypes.retail, t.unitTypes.medical].map((u, i) => (
              <article key={u.title} className="rounded-[28px] border border-white/10 bg-white/[0.05] p-7 sm:p-9">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#E4545C]" dir="ltr">0{i + 1}</span>
                <h3 className="mt-4 font-display text-3xl text-white">{u.title}</h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/70">{u.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {u.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13px] text-white/80">
                      <MoveRight aria-hidden className="mt-0.5 size-3.5 shrink-0 text-[#E4545C] flip-rtl" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[12.5px] leading-relaxed text-white/50">{t.unitTypes.disclaimer}</p>
        </div>
      </section>

      {/* ---------- Fractional Investment ---------- */}
      {t.investment && (
        <section id="investment" aria-labelledby="mall-investment-title" className="scroll-mt-32 border-t border-[#ECEAE5] bg-[#F3F2EF] py-16 sm:py-24">
          <div className="container-x">
            <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SectionIntro id="mall-investment-title" eyebrow={t.investment.eyebrow} lines={t.investment.titleLines} body={t.investment.body} />
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <ButtonLink href="#enquire">{t.investment.cta}</ButtonLink>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {t.investment.shares.map((share, i) => (
                <div
                  key={share.title}
                  data-reveal="card"
                  style={stagger(1 + i)}
                  className="flex flex-col justify-between rounded-[28px] border border-[#ECEAE5] bg-white p-7 sm:p-9 shadow-xs transition-all hover:border-[#C51E28]/50 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-block rounded-full bg-[#FDF2F2] px-3.5 py-1 text-[11px] font-bold text-[#C51E28]">
                        {share.shareSize}
                      </span>
                      <span className="text-[12px] font-medium text-[#8C939B]" dir="ltr">
                        {share.grossArea}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl sm:text-3xl text-[#14171A]">{share.title}</h3>
                    <div className="mt-5 flex items-baseline gap-3">
                      <p className="font-display text-3xl sm:text-4xl font-bold text-[#C51E28]" dir="ltr">
                        {share.totalSharePrice}
                      </p>
                      <span className="text-[13px] text-[#687076]" dir="ltr">({share.pricePerM2})</span>
                    </div>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-[#687076]">{share.notes}</p>
                  </div>
                  <div className="mt-7 border-t border-[#ECEAE5] pt-5">
                    <ButtonLink href="#enquire" variant="outline" className="w-full text-center justify-center">
                      {t.investment.cta}
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11.5px] text-[#8C939B]">{t.investment.disclaimer}</p>
          </div>
        </section>
      )}

      {/* ---------- Facility Management & Operations (FMO) ---------- */}
      {t.operations && (
        <section id="operations" aria-labelledby="mall-operations-title" className="scroll-mt-32 border-t border-[#ECEAE5] bg-white py-16 sm:py-24">
          <div className="container-x">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.618fr] lg:gap-14 items-start">
              {/* Left Column (38.2% Golden Ratio slice) */}
              <div>
                <SectionIntro id="mall-operations-title" eyebrow={t.operations.eyebrow} lines={t.operations.titleLines} body={t.operations.lead} />
                <div className="mt-8 rounded-[24px] bg-[#111417] p-7 text-white">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-[#E4545C] uppercase">Operational Excellence</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/80">
                    {locale === "ar"
                      ? "إدارة تشغيلية تعتمد على المعايير العالمية لصيانة المباني وتخفيض تكاليف المستثمرين مع الحفاظ على القيمة الاستثمارية."
                      : "Sustainable operational standards engineered to minimize overheads while ensuring pristine visitor experiences."}
                  </p>
                </div>
              </div>

              {/* Right Column (61.8% Golden Ratio slice) */}
              <div>
                {/* 4 Metric Highlights */}
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {t.operations.metrics.map((m) => (
                    <div key={m.label} className="rounded-[22px] border border-[#ECEAE5] bg-[#FBFBFA] p-5 sm:p-6 shadow-xs">
                      <p className="font-display text-3xl sm:text-4xl font-bold text-[#C51E28]" dir="ltr">{m.value}</p>
                      <p className="mt-1.5 text-[13.5px] font-semibold text-[#14171A]">{m.label}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-[#687076]">{m.desc}</p>
                    </div>
                  ))}
                </div>

                {/* 4 Feature Points */}
                <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                  {t.operations.features.map((feat) => (
                    <li key={feat.title} className="rounded-[18px] border border-[#ECEAE5] bg-white p-4.5 shadow-xs">
                      <p className="text-[13.5px] font-semibold text-[#14171A]">{feat.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-[#687076]">{feat.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Partners ---------- */}
      <section id="partners" aria-labelledby="mall-partners-title" className="scroll-mt-32 bg-[#FBFBFA] py-16 sm:py-24">
        <div className="container-x">
          <SectionIntro id="mall-partners-title" eyebrow={t.partners.eyebrow} lines={t.partners.titleLines} body={t.partners.body} />
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {t.partners.entries.map((p, i) => (
              <li key={p.name} data-reveal="up" style={stagger(1 + i)} className="flex flex-col rounded-[24px] border border-[#ECEAE5] bg-white p-7 shadow-xs">
                <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#C51E28] uppercase rtl:tracking-normal">{p.context}</span>
                <h3 className="mt-5 font-display text-[28px] text-[#14171A]" dir="ltr">{p.name}</h3>
                <p className="mt-2 text-[12.5px] font-semibold text-[#C51E28]">{p.role}</p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-[#687076]">{p.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[11.5px] text-[#8C939B]">{t.partners.logoNote}</p>
        </div>
      </section>

      {/* ---------- Film ---------- */}
      <VideoShowcase
        id="film"
        eyebrow={ar ? "فيلم" : "Film"}
        lines={ar ? ["رواسين مول", "*من الخارج*"] : ["Rawasin Mall,", "*Day and Night*"]}
        body={ar ? "جولة حول واجهات المول والساحات الخارجية نهارًا وليلًا." : "A tour of the mall façades and outdoor terraces, by day and by night."}
        video={rawasinVideos.mall}
        label={ar ? "فيلم رواسين مول" : "Rawasin Mall film"}
        tone="dark"
      />

      {/* ---------- Gallery (lightbox, keyboard + swipe) ---------- */}
      <ProjectGallery
        images={[...mallDayGallery, ...mallNightGallery]}
        name={t.hero.name}
        labels={dict.projectDetail.gallery}
      />

      {/* ---------- Sales enquiry ---------- */}
      <section id="enquire" aria-labelledby="mall-enquire-title" className="scroll-mt-32 border-t border-[#ECEAE5] bg-white py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro id="mall-enquire-title" eyebrow={t.cta.eyebrow} lines={t.cta.titleLines} body={t.cta.body} />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`${base}/projects/rawasin`} variant="outline">{t.cta.secondary}</ButtonLink>
            </div>
            <p className="mt-8 rounded-[18px] border border-[#ECEAE5] bg-[#FBFBFA] p-5 text-[12.5px] leading-relaxed text-[#687076]">
              {t.unitTypes.disclaimer}
            </p>
          </div>
          <div className="rounded-[28px] border border-[#ECEAE5] bg-[#FBFBFA] p-6 shadow-sm sm:p-9 lg:col-span-7">
            <InquiryForm
              project="rawasin-mall"
              locale={locale}
              labels={dict.projectDetail.inquiry}
              subjects={enquirySubjects}
              subjectLabel={ar ? "نوع الاستفسار" : "Enquiry type"}
            />
          </div>
        </div>
      </section>

      {/* ---------- Source note ---------- */}
      <div className="border-t border-[#ECEAE5] bg-[#FBFBFA]">
        <div className="container-x flex flex-wrap items-baseline justify-between gap-3 py-8">
          <p className="text-[11.5px] font-semibold tracking-wider text-[#C51E28] uppercase rtl:tracking-normal">{t.source.label}</p>
          <p className="max-w-2xl text-[11.5px] leading-relaxed text-[#8C939B]">{t.source.body}</p>
        </div>
      </div>
    </div>
  );
}
