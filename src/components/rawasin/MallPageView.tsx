import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MoveRight, Navigation } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { mallAreaMapUrl, mallImages, rawasinMall, unitTypeIds, type FloorId } from "@/content/projects/rawasin/mall";
import { Breadcrumbs, ButtonLink, SectionIntro } from "@/components/ui";
import { ProjectGallery } from "@/components/projects/detail/ProjectGallery";
import { InquiryForm } from "@/components/projects/detail/InquiryForm";
import { stagger } from "@/components/motion/Lines";
import { FloorExplorer } from "./FloorExplorer";
import { projectCrumbs } from "@/lib/routes";
import { VideoShowcase } from "@/components/projects/detail/VideoShowcase";
import { mallDayGallery, mallNightGallery, rawasinVideos } from "@/content/projects/rawasin/media";
import { partnerLogoAt } from "@/content/assets";
import { CurvedHero } from "@/components/media/CurvedHero";
import { rawasinHref } from "@/content/projects/rawasin/links";

export type MallSection =
  | "hero" | "about" | "vision" | "location" | "master-plan" | "floors" | "unit-types"
  | "investment" | "operations" | "partners" | "film" | "gallery" | "enquire" | "source";

type Props = {
  locale: Locale;
  dict: Dictionary;
  plans: Record<FloorId, string | null>;
  /** Which sections of the Mall content this route renders. One section set per page. */
  sections: MallSection[];
  /** Restrict the floor explorer to these floors (defaults to all five). */
  floorIds?: FloorId[];
};

export function MallPageView({ locale, dict, plans, sections, floorIds }: Props) {
  const show = (id: MallSection) => sections.includes(id);
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
    <div className="bg-cream">
      {/* ---------- Hero ---------- */}
      {show("hero") && (
        <>
      <CurvedHero
        id="mall-hero-title"
        top={<Breadcrumbs items={projectCrumbs(locale, { slug: "rawasin", name: locale === "ar" ? "رواسين" : "Rawasin" }, { id: "mall", label: t.hero.name })} />}
        eyebrow={t.hero.eyebrow}
        title={
          <>
            <span className="block" dir="ltr">{t.hero.name}</span>
            <span className="mt-2 block font-display text-[clamp(1.4rem,2.4vw,2.2rem)] italic text-red-primary">{t.hero.tagline}</span>
          </>
        }
        body={
          <>
            <p>{t.hero.description}</p>
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-body-sm text-ink sm:grid-cols-2">
              {t.hero.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red-primary" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </>
        }
        image={mallImages.hero}
        imageAlt={t.hero.imageAlt}
      >
        <ButtonLink href={rawasinHref("mall-floors", locale)}>{t.hero.primaryCta}</ButtonLink>
        <ButtonLink href="#enquire" variant="outline">{t.hero.secondaryCta}</ButtonLink>
      </CurvedHero>


        </>
      )}
      {/* ---------- About ---------- */}
      {show("about") && (
        <>
      <section id="about" aria-labelledby="mall-about-title" className="scroll-mt-32 bg-cream py-section sm:py-section-lg">
        <div className="frame-wide grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionIntro id="mall-about-title" eyebrow={t.about.eyebrow} lines={t.about.titleLines} body={t.about.lead} />
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-card border border-border bg-stone">
              <Image src={mallImages.aerial} alt={t.masterPlan.imageAlt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-3">
              {t.about.statements.map((s, i) => (
                <li key={s.title} data-reveal="up" style={stagger(1 + i)} className="rounded-card border border-white bg-white/85 backdrop-blur-md p-6 shadow-card">
                  <span className="text-caption font-bold tracking-[0.2em] text-red-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-display text-xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-small leading-golden text-muted">{s.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-card bg-charcoal p-7 text-white sm:p-9">
              <p className="text-caption font-bold tracking-[0.24em] text-red-light uppercase rtl:tracking-normal">{t.about.businessTitle}</p>
              <p className="mt-4 text-body-sm leading-golden text-white/80">{t.about.businessBody}</p>
            </div>
          </div>
        </div>
      </section>

        </>
      )}
      {/* ---------- Vision ---------- */}
      {show("vision") && (
        <>
      <section id="vision" aria-labelledby="mall-vision-title" className="relative isolate scroll-mt-32 overflow-hidden bg-gradient-to-b from-cream to-sand py-section sm:py-section-lg">
        <div className="frame-wide grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 text-caption font-bold tracking-[0.26em] text-red-primary uppercase rtl:tracking-normal">
              <span className="h-[2px] w-5 rounded-full bg-red-primary" aria-hidden />
              {t.vision.eyebrow}
            </p>
            <h2 id="mall-vision-title" className="mt-5 font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.05] text-ink">
              <span className="block">{t.vision.titleLines[0]}</span>
              <span className="mt-1 block italic text-red-primary">{t.vision.titleLines[1].replace(/\*/g, "")}</span>
            </h2>
            <p className="mt-6 max-w-md text-body leading-golden text-muted">{t.vision.body}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-stone lg:col-span-6">
            <Image src={mallImages.entrance} alt={t.masterPlan.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
          </div>
        </div>
      </section>

        </>
      )}
      {/* ---------- Location ---------- */}
      {show("location") && (
        <>
      <section aria-labelledby="mall-location-title" className="scroll-mt-32 border-y border-border bg-canvas py-section sm:py-section-lg">
        <div className="frame-wide">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionIntro id="mall-location-title" eyebrow={t.location.eyebrow} lines={t.location.titleLines} body={t.location.body} />
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <a
                href={mallAreaMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-border bg-white px-6 text-small font-semibold text-ink transition-colors hover:border-red-primary hover:text-red-primary"
              >
                <Navigation aria-hidden className="size-4 text-red-primary" />
                {t.location.directionsCta}
                <ArrowRight aria-hidden className="flip-rtl size-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Context map (no invented plot coordinates) */}
            <div className="relative overflow-hidden rounded-card border border-border bg-sand p-6 lg:col-span-5">
              <div className="relative flex h-64 items-center justify-center sm:h-72">
                <svg viewBox="0 0 400 260" className="absolute inset-0 size-full text-red-primary/20" fill="none" aria-hidden>
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <ellipse key={i} cx="200" cy="130" rx={40 + i * 26} ry={24 + i * 16} stroke="currentColor" strokeWidth="1" transform={`rotate(${-12 + i * 3} 200 130)`} />
                  ))}
                </svg>
                <span className="relative flex flex-col items-center gap-2 rounded-card border border-white bg-white/85 backdrop-blur-md px-6 py-4 shadow-card">
                  <MapPin aria-hidden strokeWidth={1.8} className="size-6 text-red-primary" />
                  <span className="font-display text-xl text-ink">{ar ? "سوهاج الجديدة" : "New Sohag"}</span>
                  <span className="text-caption text-muted">{ar ? "التوسع الجنوبي" : "Southern expansion"}</span>
                </span>
              </div>
              <p className="mt-4 text-caption leading-golden text-subtle">{t.location.note}</p>
            </div>

            {/* Destinations */}
            <div className="lg:col-span-7">
              <h3 className="text-caption font-bold tracking-wider text-subtle uppercase rtl:tracking-normal">{t.location.destinationsLabel}</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.location.destinations.map((d, i) => (
                  <li key={d} className="flex items-start gap-3 rounded-tile border border-border bg-canvas px-4 py-3.5 text-body-sm text-ink">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-soft text-micro font-bold text-red-primary" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-caption font-bold tracking-wider text-subtle uppercase rtl:tracking-normal">{t.location.accessTitle}</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.location.access.map((a) => (
                  <li key={a.title} className="rounded-tile bg-charcoal p-5 text-white">
                    <p className="text-body-sm font-semibold">{a.title}</p>
                    <p className="mt-2 text-small leading-golden text-white/65">{a.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

        </>
      )}
      {/* ---------- Master plan ---------- */}
      {show("master-plan") && (
        <>
      <section aria-labelledby="mall-master-title" className="scroll-mt-32 bg-gradient-to-b from-cream to-sand py-section sm:py-section-lg">
        <div className="frame-wide grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionIntro id="mall-master-title" eyebrow={t.masterPlan.eyebrow} lines={t.masterPlan.titleLines} body={t.masterPlan.body} />

            <dl className="mt-8 grid gap-3">
              {t.masterPlan.facts.map((f) => (
                <div key={f.label} className="flex items-start justify-between gap-4 rounded-tile border border-border bg-white px-5 py-4">
                  <dt className="text-small text-muted">{f.label}</dt>
                  <dd className="text-end text-body-sm font-semibold text-ink" dir="ltr">{f.value}</dd>
                </div>
              ))}
            </dl>

            {/* Level stack: an orientation diagram, not a technical plan */}
            <div className="mt-8">
              <h3 className="text-caption font-bold tracking-wider text-subtle uppercase rtl:tracking-normal">{t.masterPlan.levelsLabel}</h3>
              <ol className="mt-3 space-y-1.5">
                {t.masterPlan.levels.map((level, i) => (
                  <li key={level} className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-2.5 text-small font-medium text-ink">
                    <span className="h-5 w-1 rounded-full bg-red-primary" aria-hidden />
                    <span className="text-micro font-bold text-red-primary" dir="ltr">{String(t.masterPlan.levels.length - i).padStart(2, "0")}</span>
                    {level}
                  </li>
                ))}
              </ol>
            </div>

            <ButtonLink href={rawasinHref("mall-floors", locale)} className="mt-8">{t.masterPlan.cta}</ButtonLink>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-white bg-white/85 backdrop-blur-md shadow-card">
              <Image src={mallImages.hero} alt={t.masterPlan.imageAlt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-4 rounded-tile border border-border bg-white p-4 text-small leading-golden text-muted">
              {t.masterPlan.imageNote}
            </p>
          </div>
        </div>
      </section>

        </>
      )}
      {/* ---------- Floor explorer ---------- */}
      {show("floors") && (
        <>
      <FloorExplorer
        floors={floorIds ? t.floors.list.filter((f) => floorIds.includes(f.id)) : t.floors.list}
        labels={t.floors}
        locale={locale}
        plans={plans}
        contactHref={`${base}/contact`}
      />

        </>
      )}
      {/* ---------- Unit types ---------- */}
      {show("unit-types") && (
        <>
      <section id="unit-types" aria-labelledby="mall-units-title" className="scroll-mt-32 bg-charcoal py-section text-white sm:py-section-lg">
        <div className="frame-wide">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 text-caption font-bold tracking-[0.26em] text-red-light uppercase rtl:tracking-normal">
                <span className="h-[2px] w-5 rounded-full bg-red-primary" aria-hidden />
                {t.unitTypes.eyebrow}
              </p>
              <h2 id="mall-units-title" className="mt-4 font-display text-[clamp(2.1rem,4vw,3.5rem)] leading-tight text-white">
                <span className="block">{t.unitTypes.titleLines[0]}</span>
                <span className="mt-1 block italic text-red-light">{t.unitTypes.titleLines[1].replace(/\*/g, "")}</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <ButtonLink href={`${base}/contact`}>{t.unitTypes.cta}</ButtonLink>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[t.unitTypes.retail, t.unitTypes.medical].map((u, i) => (
              <article key={u.title} className="rounded-card border border-white/10 bg-white/[0.05] p-7 sm:p-9">
                <span className="text-caption font-bold tracking-[0.2em] text-red-light" dir="ltr">0{i + 1}</span>
                <h3 className="mt-4 font-display text-3xl text-white"><Link href={rawasinHref("mall-unit", locale, unitTypeIds[i])} className="hover:text-red-light">{u.title}</Link></h3>
                <p className="mt-4 text-body-sm leading-golden text-white/70">{u.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {u.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-small text-white/80">
                      <MoveRight aria-hidden className="mt-0.5 size-3.5 shrink-0 text-red-light flip-rtl" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-small leading-golden text-white/50">{t.unitTypes.disclaimer}</p>
        </div>
      </section>

        </>
      )}
      {/* ---------- Fractional Investment ---------- */}
      {show("investment") && (
        <>
      {t.investment && (
        <section id="investment" aria-labelledby="mall-investment-title" className="scroll-mt-32 bg-gradient-to-b from-cream to-sand py-section sm:py-section-lg">
          <div className="frame-wide">
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
                  className="flex flex-col justify-between rounded-card border border-white bg-white/85 backdrop-blur-md p-7 sm:p-9 shadow-card transition-all hover:border-red-primary/50 hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-block rounded-full bg-red-soft px-3.5 py-1 text-caption font-bold text-red-primary">
                        {share.shareSize}
                      </span>
                      <span className="text-small font-medium text-subtle" dir="ltr">
                        {share.grossArea}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl sm:text-3xl text-ink">{share.title}</h3>
                    <div className="mt-5 flex items-baseline gap-3">
                      <p className="font-display text-3xl sm:text-4xl font-bold text-red-primary" dir="ltr">
                        {share.totalSharePrice}
                      </p>
                      <span className="text-small text-muted" dir="ltr">({share.pricePerM2})</span>
                    </div>
                    <p className="mt-4 text-body-sm leading-golden text-muted">{share.notes}</p>
                  </div>
                  <div className="mt-7 border-t border-border pt-5">
                    <ButtonLink href="#enquire" variant="outline" className="w-full text-center justify-center">
                      {t.investment.cta}
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-caption text-subtle">{t.investment.disclaimer}</p>
          </div>
        </section>
      )}

        </>
      )}
      {/* ---------- Facility Management & Operations (FMO) ---------- */}
      {show("operations") && (
        <>
      {t.operations && (
        <section aria-labelledby="mall-operations-title" className="scroll-mt-32 bg-canvas py-section sm:py-section-lg">
          <div className="frame-wide">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.618fr] lg:gap-14 items-start">
              {/* Left Column (38.2% Golden Ratio slice) */}
              <div>
                <SectionIntro id="mall-operations-title" eyebrow={t.operations.eyebrow} lines={t.operations.titleLines} body={t.operations.lead} />
              </div>

              {/* Right Column (61.8% Golden Ratio slice) */}
              <div>
                {/* 4 Metric Highlights */}
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {t.operations.metrics.map((m) => (
                    <div key={m.label} className="rounded-tile border border-border bg-canvas p-5 sm:p-6 shadow-xs">
                      <p className="font-display text-3xl sm:text-4xl font-bold text-red-primary" dir="ltr">{m.value}</p>
                      <p className="mt-1.5 text-body-sm font-semibold text-ink">{m.label}</p>
                      <p className="mt-1 text-small leading-golden text-muted">{m.desc}</p>
                    </div>
                  ))}
                </div>

                {/* 4 Feature Points */}
                <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                  {t.operations.features.map((feat) => (
                    <li key={feat.title} className="rounded-tile border border-border bg-white p-4.5 shadow-xs">
                      <p className="text-body-sm font-semibold text-ink">{feat.title}</p>
                      <p className="mt-1 text-small leading-golden text-muted">{feat.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

        </>
      )}
      {/* ---------- Partners ---------- */}
      {show("partners") && (
        <>
      <section aria-labelledby="mall-partners-title" className="scroll-mt-32 bg-cream py-section sm:py-section-lg">
        <div className="frame-wide">
          <SectionIntro id="mall-partners-title" eyebrow={t.partners.eyebrow} lines={t.partners.titleLines} body={t.partners.body} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.partners.entries.map((p, i) => (
              <li key={p.name} data-reveal="up" style={stagger(1 + i)} className="flex flex-col rounded-card border border-white bg-white/85 backdrop-blur-md p-7 shadow-card">
                <span className="text-micro font-bold tracking-[0.2em] text-red-primary uppercase rtl:tracking-normal">{p.context}</span>
                {(() => {
                  const logo = partnerLogoAt(rawasinMall.en.partners.entries[i]?.name);
                  return (
                    <>
                      {logo && (
                        <div className="mt-5 flex h-16 items-center">
                          <Image src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} loading="lazy" className="h-14 w-auto max-w-[160px] object-contain object-left rtl:object-right" />
                        </div>
                      )}
                      <h3 className={`${logo ? "mt-3" : "mt-5"} font-display text-title-lg text-ink`}>{p.name}</h3>
                    </>
                  );
                })()}
                <p className="mt-2 text-small font-semibold text-red-primary">{p.role}</p>
                <p className="mt-4 text-body-sm leading-golden text-muted">{p.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-caption text-subtle">{t.partners.logoNote}</p>
        </div>
      </section>

        </>
      )}
      {/* ---------- Film ---------- */}
      {show("film") && (
        <>
      <VideoShowcase
        id="film"
        eyebrow={ar ? "فيلم" : "Film"}
        lines={ar ? ["رواسين مول", "*من الخارج*"] : ["Rawasin Mall,", "*Day and Night*"]}
        body={ar ? "جولة حول واجهات المول والساحات الخارجية نهارًا وليلًا." : "A tour of the mall façades and outdoor terraces, by day and by night."}
        video={rawasinVideos.mall}
        label={ar ? "فيلم رواسين مول" : "Rawasin Mall film"}
        tone="dark"
      />

        </>
      )}
      {/* ---------- Gallery (lightbox, keyboard + swipe) ---------- */}
      {show("gallery") && (
        <>
      <ProjectGallery
        images={[...mallDayGallery, ...mallNightGallery]}
        name={t.hero.name}
        labels={dict.projectDetail.gallery}
      />

        </>
      )}
      {/* ---------- Sales enquiry ---------- */}
      {show("enquire") && (
        <>
      <section aria-labelledby="mall-enquire-title" className="scroll-mt-32 bg-canvas py-section sm:py-section-lg">
        <div className="frame-wide grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro id="mall-enquire-title" eyebrow={t.cta.eyebrow} lines={t.cta.titleLines} body={t.cta.body} />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`${base}/developments/rawasin`} variant="outline">{t.cta.secondary}</ButtonLink>
            </div>
            <p className="mt-8 rounded-tile border border-border bg-canvas p-5 text-small leading-golden text-muted">
              {t.unitTypes.disclaimer}
            </p>
          </div>
          <div className="rounded-card border border-border bg-canvas p-6 shadow-sm sm:p-9 lg:col-span-7">
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

        </>
      )}
      {/* ---------- Source note ---------- */}
      {show("source") && (
        <>
      <div className="border-t border-border bg-canvas">
        <div className="frame-wide flex flex-wrap items-baseline justify-between gap-3 py-8">
          <p className="text-caption font-semibold tracking-wider text-red-primary uppercase rtl:tracking-normal">{t.source.label}</p>
          <p className="max-w-2xl text-caption leading-golden text-subtle">{t.source.body}</p>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
