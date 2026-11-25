import { Fragment, type ReactNode } from "react";
import type { Dictionary, Locale } from "@/content";
import { pick } from "@/content/blocks";
import type { Project, Section, SectionPart } from "@/content/projects";
import type { FloorId, UnitTypeId } from "@/content/projects/rawasin/mall";
import { resolvePlans } from "@/lib/mall-plans";
import { PageSections } from "../sections/PageSections";
import { FloorIndex } from "../rawasin/FloorIndex";
import { MallPageView, type MallSection } from "../rawasin/MallPageView";
import { UnitTypeDetail } from "../rawasin/UnitTypeDetail";
import { ProjectBranches } from "./ProjectBranches";
import { ApartmentShowcase } from "./detail/ApartmentShowcase";
import { asset } from "@/content/news";
import { href } from "@/lib/routes";
import { ProjectLocation, ProjectMasterPlan } from "./detail/ProjectExtras";
import { ProjectHero } from "./detail/ProjectHero";
import { ProjectInquiry } from "./detail/ProjectInquiry";
import { ProjectLifestyle } from "./detail/ProjectLifestyle";
import { ProjectOverview } from "./detail/ProjectOverview";
import { RawasinArchitecture, RawasinClubhouse, RawasinMosque, RawasinPartners, RawasinSmart } from "./detail/RawasinStory";
import { Chapters } from "./Chapters";
import { Tabs } from "./Tabs";
import { VideoShowcase } from "./detail/VideoShowcase";

type Ctx = { project: Project; locale: Locale; dict: Dictionary };

/**
 * Bespoke components a project can place with `{ type: "custom", component }`.
 * A new project only needs an entry here when generic parts are not enough.
 */
const custom: Record<string, (ctx: Ctx, props: Record<string, unknown>) => ReactNode> = {
  "rawasin.architecture": ({ locale }) => <RawasinArchitecture locale={locale} />,
  "rawasin.smart": ({ locale }) => <RawasinSmart locale={locale} />,
  "rawasin.clubhouse": ({ locale }) => <RawasinClubhouse locale={locale} />,
  "rawasin.mosque": ({ locale }) => <RawasinMosque locale={locale} />,
  "rawasin.partners": ({ locale }) => <RawasinPartners locale={locale} />,
  "rawasin.mall": ({ locale, dict }, p) => (
    <MallPageView locale={locale} dict={dict} plans={resolvePlans()} sections={p.sections as MallSection[]} floorIds={p.floorIds as FloorId[] | undefined} />
  ),
  "rawasin.mall.floorIndex": ({ locale }) => <FloorIndex locale={locale} />,
  "rawasin.mall.unitType": ({ locale }, p) => <UnitTypeDetail locale={locale} unit={p.unit as UnitTypeId} />,
};

/** Renders one part. `scope` namespaces block ids so sets can share a page. */
function Part({ part, ctx, scope }: { part: SectionPart; ctx: Ctx; scope: string }) {
  const { project, locale, dict } = ctx;
  switch (part.type) {
    case "blocks":
      return <PageSections locale={locale} blocks={pick(part.from(locale), part.ids)} idPrefix={scope} />;
    case "hero":
      return <ProjectHero project={project} dict={dict} locale={locale} />;
    case "overview":
      return <ProjectOverview project={project} dict={dict} locale={locale} />;
    case "lifestyle":
      return <ProjectLifestyle project={project} dict={dict} locale={locale} />;
    case "location":
      return <ProjectLocation project={project} dict={dict} locale={locale} />;
    case "masterPlan":
      return <ProjectMasterPlan project={project} dict={dict} />;
    case "apartmentShowcase": {
      const t = dict.projectDetail.models;
      const en = project.copy.en.models ?? [];
      const models = (project.copy[locale].models ?? []).map((m, i) => {
        // Bar positions from the published English figures; labels keep each locale's wording.
        const [min, max] = (en[i]?.area.match(/[\d.]+/g) ?? ["0", "0"]).map(Number);
        return { id: m.id, type: m.type, name: m.name, bedrooms: m.bedrooms, bedroomsLabel: m.highlights[0] ?? String(m.bedrooms), area: m.area, description: m.description, highlights: m.highlights, plan: asset(`/images/${project.slug}/apartments/${m.id}.webp`), min, max };
      });
      const ar = locale === "ar";
      return (
        <ApartmentShowcase
          idBase={scope}
          models={models}
          enquireHref={href("contact", locale)}
          labels={{
            eyebrow: t.eyebrow, lines: t.titleLines, body: t.body, area: t.areaLabel, highlights: t.highlightsLabel, enquire: t.enquireCta,
            planNote: ar ? "المخطط منشور كما ورد في كتيّب المشروع." : "The plan is reproduced as published in the project brochure.",
            planAlt: ar ? "مخطط الشقة" : "Floor plan",
          }}
        />
      );
    }
    case "branches":
      return <ProjectBranches project={project} locale={locale} />;
    case "inquiry":
      return <ProjectInquiry project={project} dict={dict} locale={locale} />;
    case "film": {
      const film = project.films?.[part.film];
      if (!film) throw new Error(`${project.slug}: unknown film "${part.film}"`);
      const c = film.copy[locale];
      return <VideoShowcase id={`film-${part.film}`} eyebrow={c.eyebrow} lines={c.titleLines} body={c.body} video={film.video} label={c.label} tone={part.tone} />;
    }
    case "tabs":
      return (
        <Tabs
          idBase={scope}
          label={dict.projectDetail.sectionsLabel}
          tabs={part.tabs.map((t) => ({ id: t.id, label: t.label[locale] }))}
          panels={part.tabs.map((t) => (
            <Parts key={t.id} parts={t.parts} ctx={ctx} scope={`${scope}-${t.id}`} />
          ))}
        />
      );
    case "custom": {
      const render = custom[part.component];
      if (!render) throw new Error(`${project.slug}: unknown custom component "${part.component}"`);
      return <>{render(ctx, part.props ?? {})}</>;
    }
  }
}

function Parts({ parts, ctx, scope }: { parts: SectionPart[]; ctx: Ctx; scope: string }) {
  return (
    <>
      {parts.map((p, i) => (
        <Part key={i} part={p} ctx={ctx} scope={scope} />
      ))}
    </>
  );
}

/**
 * A full project page (hub or branch) built from its section list.
 *
 * Layout: header, sticky in-page nav, then each section wrapped in an anchor
 * (#architecture, #floors, …). With `ownHero`, the first part of the first
 * section is the page hero and renders above the nav in place of `header`.
 */
export function ProjectSections({
  project,
  sections,
  locale,
  dict,
  header,
  ownHero,
  nav: showNav = true,
}: {
  project: Project;
  sections: Section[];
  locale: Locale;
  dict: Dictionary;
  header?: ReactNode;
  ownHero?: boolean;
  /** Sticky in-page section nav; off for short pages such as a project hub. */
  nav?: boolean;
}) {
  const ctx: Ctx = { project, locale, dict };
  const [first, ...rest] = sections;
  const hero = ownHero && first ? first.parts[0] : undefined;
  const body = hero ? [{ ...first, parts: first.parts.slice(1) }, ...rest] : sections;
  const top = hero ? <Part part={hero} ctx={ctx} scope={first.id} /> : header;

  // Chapters: each nav section opens a chapter; sections without `nav` join the next chapter (else the previous).
  const chapters: { section: Section; extra: Section[] }[] = [];
  let pending: Section[] = [];
  for (const s of body) {
    if (s.nav) {
      chapters.push({ section: s, extra: pending });
      pending = [];
    } else pending.push(s);
  }
  if (pending.length && chapters.length) chapters[chapters.length - 1].extra.push(...pending);

  if (!showNav || chapters.length < 2) {
    return (
      <>
        {top}
        {body.map((s) => (
          <div key={s.id} id={s.id} className="scroll-mt-36">
            <Parts parts={s.parts} ctx={ctx} scope={s.id} />
          </div>
        ))}
      </>
    );
  }

  const ar = locale === "ar";
  return (
    <>
      {top}
      <Chapters
        label={dict.projectDetail.sectionsLabel}
        labels={{ prev: ar ? "السابق" : "Previous", next: ar ? "التالي" : "Next" }}
        chapters={chapters.map((c) => ({ id: c.section.id, label: c.section.label[locale] }))}
        panels={chapters.map((c) => (
          <Fragment key={c.section.id}>
            {[...c.extra.filter((x) => body.indexOf(x) < body.indexOf(c.section)), c.section, ...c.extra.filter((x) => body.indexOf(x) > body.indexOf(c.section))].map((s) =>
              s === c.section ? (
                <Parts key={s.id} parts={s.parts} ctx={ctx} scope={s.id} />
              ) : (
                <div key={s.id} id={s.id} className="scroll-mt-36">
                  <Parts parts={s.parts} ctx={ctx} scope={s.id} />
                </div>
              ),
            )}
          </Fragment>
        ))}
      />
    </>
  );
}
