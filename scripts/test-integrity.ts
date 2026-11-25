/**
 * DAMA Development — Website & Data Integrity Verification Suite
 *
 * 1. Dictionary parity (EN <-> AR)
 * 2. Project portfolio: hierarchy, categories, legacy URLs, no invented facts
 * 3. Rawasin Mall: floor coverage, exact measurements, source-pending schedules
 * 4. Newsroom: no fabricated articles or dates
 * 5. Careers data shape
 * 6. Lead validation & accepted enquiry types
 * 7. Contact / social channels
 *
 * Run with: npx tsx scripts/test-integrity.ts  (or via any TS runner)
 */
import { en } from "../src/content/en";
import { ar } from "../src/content/ar";
import { crumbs, footerGroups, pages, projectPath, staticPagePaths, type PageKey, type ProjectTarget } from "../src/lib/routes";
import { getProjects, getProject, availableCategories, legacyProjectSlugs, projects, type Section, type SectionPart } from "../src/content/projects";
import { projectMenu } from "../src/content/projects/menu";
import { rawasinLink } from "../src/content/projects/rawasin/links";
import { floorIds, unitTypeIds } from "../src/content/projects/rawasin/mall";
import { localeRedirects, rootRedirects } from "../src/lib/redirects";
import { newsArticles, getNewsArticles, getNewsArticle } from "../src/content/news";
import { getCareerPositions, getCareerPosition } from "../src/content/careers";
import { rawasinMall } from "../src/content/projects/rawasin/mall";
import { contact, social, contactVerified, socialVerified, legalVerified } from "../src/content/site";
import { careerPillars } from "../src/content/careers";
import { validateLead } from "../src/lib/leads";
import * as pc from "../src/content/page-content";

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function deepCompareKeys(objA: Record<string, any>, objB: Record<string, any>, path = ""): string[] {
  const missing: string[] = [];
  for (const key of Object.keys(objA)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (!(key in objB)) missing.push(`Missing in B: ${currentPath}`);
    else if (typeof objA[key] === "object" && objA[key] !== null && !Array.isArray(objA[key])) {
      missing.push(...deepCompareKeys(objA[key], objB[key], currentPath));
    }
  }
  return missing;
}

console.log("\n=======================================================");
console.log(" DAMA Development — Data Integrity Test Suite");
console.log("=======================================================\n");

// 1. Dictionary Parity
console.log("1. Dictionary Parity (EN <-> AR):");
assert(deepCompareKeys(en, ar).length === 0, "All EN dictionary keys exist in AR");
assert(deepCompareKeys(ar, en).length === 0, "All AR dictionary keys exist in EN");
assert(en.locale === "en" && en.dir === "ltr", "EN dictionary specifies locale=en and dir=ltr");
assert(ar.locale === "ar" && ar.dir === "rtl", "AR dictionary specifies locale=ar and dir=rtl");
assert(en.nav.projects === "Our Developments" && en.nav.sustainability === "Our Impact", "Primary navigation labels are corporate");

// 2. Project portfolio
console.log("\n2. Project Portfolio Integrity:");
const allProjects = getProjects();
assert(allProjects.length === 1, `Only Rawasin is published as a development (found: ${allProjects.length})`);
assert(allProjects.map((p) => p.slug).join(",") === "rawasin", "Canonical slugs are stable");
assert(getProject("rwasin")?.slug === "rawasin", "Legacy /projects/rwasin URL resolves to Rawasin");
assert(legacyProjectSlugs.rwasin === "rawasin", "Legacy slug alias is declared");
for (const p of allProjects) {
  assert(p.image.startsWith("/"), `Project "${p.slug}" uses a local image`);
  assert(p.images.gallery.every((i) => i.startsWith("/")), `Project "${p.slug}" gallery uses local images only`);
  assert(Object.keys(p.copy).join(",") === "en,ar", `Project "${p.slug}" has EN + AR copy`);
}
const rawasin = getProject("rawasin")!;
assert(rawasin.copy.en.components.some((c) => c.href === "mall"), "Rawasin Mall is a component of Rawasin, not a separate development");
assert(rawasin.branches.map((b) => b.id).join(",") === "residential,mall", "Rawasin has two branches: residential and mall");
assert(rawasin.copy.en.facts.length > 0, "Rawasin publishes brochure-confirmed facts");
assert(rawasin.copy.en.facts.every((f) => !/\d+\s*%/.test(f.value)), "No unapproved percentage claims on Rawasin");
const categories = availableCategories();
assert(categories.includes("residential") && categories.includes("commercial") && categories.includes("mixed-use"), "Filters cover residential / commercial / mixed-use");

// 2b. Information architecture: corporate route table + project registry
console.log("\n2b. Routes, Registry & Navigation:");
const keys = Object.keys(pages) as PageKey[];
const paths = keys.map((k) => pages[k].path);
assert(new Set(paths).size === paths.length, "No two corporate pages share a path");
assert(keys.every((k) => k === "home" || pages[k].parent !== undefined), "Every page has a parent (breadcrumb hierarchy)");
assert(keys.every((k) => pages[k].en && pages[k].ar), "Every page has an EN and AR label");
assert(keys.every((k) => k === "home" || crumbs(k, "en").length >= 2), "Every page produces a breadcrumb trail");
assert(!keys.some((k) => /dama-(residence|view)|rawasin/.test(pages[k].path)), "Project pages are not in the corporate route table");
assert(footerGroups.map((g) => g.id).join(",") === "company,contact", "Corporate footer groups: Company, Contact (project groups come from the registry)");

/** Anchors a project page exposes: section ids, section-tab ids and apartment showcase cards. */
const anchorsOf = (sections: Section[], modelIds: string[]) =>
  new Set(
    sections.flatMap((s) => [
      s.id,
      ...s.parts.flatMap((p) => (p.type === "tabs" ? p.tabs.map((t) => `${s.id}-${t.id}`) : p.type === "apartmentShowcase" ? modelIds.map((m) => `${s.id}-${m}`) : [])),
    ]),
  );
const pageAnchors = new Map<string, Set<string>>();
for (const p of projects) {
  const modelIds = (p.copy.en.models ?? []).map((m) => m.id);
  pageAnchors.set(projectPath({ project: p.slug }), anchorsOf(p.hub, modelIds));
  for (const b of p.branches) pageAnchors.set(projectPath({ project: p.slug, branch: b.id }), anchorsOf(b.sections, modelIds));
}
const reaches = (t: ProjectTarget) => {
  const a = pageAnchors.get(projectPath({ project: t.project, branch: t.branch }));
  return !!a && (!t.anchor || a.has(t.anchor));
};

for (const p of projects) {
  const pagesOf: [string, Section[]][] = [["hub", p.hub], ...p.branches.map((b) => [b.id, b.sections] as [string, Section[]])];
  for (const [page, secs] of pagesOf) {
    const ids = secs.map((x) => x.id);
    assert(new Set(ids).size === ids.length, `${p.slug}/${page}: section ids are unique`);
    assert(secs.every((x) => x.label.en && x.label.ar), `${p.slug}/${page}: every section has EN and AR labels`);
    const missing: string[] = [];
    const walkParts = (where: string, parts: SectionPart[]) => {
      for (const part of parts) {
        if (part.type === "blocks") for (const l of ["en", "ar"] as const) for (const id of part.ids) if (!part.from(l)[id]) missing.push(`${where} ${l}:${id}`);
        if (part.type === "tabs") for (const t of part.tabs) walkParts(`${where}>${t.id}`, t.parts);
        if (part.type === "film" && !p.films?.[part.film]) missing.push(`${where} film:${part.film}`);
      }
    };
    for (const x of secs) walkParts(`#${x.id}`, x.parts);
    assert(missing.length === 0, `${p.slug}/${page}: every referenced block and film exists ${missing.slice(0, 3).join(" ")}`);
  }
}
const places = ["rawasin", "commercial", "residential", "residential-architecture", "residential-lifestyle", "residential-apartments", "residential-location", "mall", "mall-master-plan", "mall-floors", "mall-units", "mall-medical", "mall-lifestyle", "mall-operations", "mall-partners", "mall-location"] as const;
assert(places.every((pl) => reaches(rawasinLink(pl))), "Every named Rawasin place lands on a real page section");
assert(floorIds.every((f) => reaches(rawasinLink("mall-floor", f))) && unitTypeIds.every((u) => reaches(rawasinLink("mall-unit", u))), "Every floor and unit type has its own mall tab");
assert(rawasin.copy.en.models!.every((m) => reaches(rawasinLink("residential-apartment", m.id))), "Every apartment type has its own residential card");
const menu = projectMenu("en");
assert(menu.length === projects.length && menu.every((m) => m.branches.length > 0 && m.branches.every((b) => b.links.length > 0)), "Header/footer menu lists every project branch with its sections");

// Redirects: retired URLs never shadow a live page, and always land on one.
const live = new Set([...staticPagePaths(), ...pageAnchors.keys()]);
const resolves = (to: string) => {
  const [path, anchor] = to.split("#");
  return pageAnchors.has(path) ? !anchor || pageAnchors.get(path)!.has(anchor) : !anchor && live.has(path);
};
assert(localeRedirects.every((r) => !live.has(r.from)), "No locale redirect overwrites a live page");
assert(new Set(localeRedirects.map((r) => r.from)).size === localeRedirects.length, "Locale redirect sources are unique");
const badTargets = [...localeRedirects, ...rootRedirects].filter((r) => !resolves(r.to)).map((r) => r.to);
assert(badTargets.length === 0, `Every redirect lands on a live page/section ${badTargets.join(" ")}`);
assert(floorIds.length === 5 && rawasin.copy.en.models!.length === 5 && unitTypeIds.length === 2, "Tabs: 5 floors, 5 apartment types, 2 unit types");

// 3. Rawasin Mall
console.log("\n3. Rawasin Mall Content Integrity:");
for (const locale of ["en", "ar"] as const) {
  const t = rawasinMall[locale];
  assert(t.floors.list.length === 5, `[${locale}] All five floors are represented`);
  assert(
    t.floors.list.map((f) => f.id).join(",") === "basement,ground,first,second,third",
    `[${locale}] Floor order is Basement → Third`,
  );
  assert(t.floors.list.every((f) => f.planFile.startsWith("/images/rawasin/plans/")), `[${locale}] Each floor has a plan-file path`);
}
const floors = rawasinMall.en.floors.list;
const byId = (id: string) => floors.find((f) => f.id === id)!;
assert(byId("basement").facilities.some((f) => f.area === "754 m²"), "Basement hypermarket is 754 m² (exact)");
const ground = byId("ground");
assert(ground.facilities.some((f) => f.area === "192.5 m²"), "Restaurant 1 is 192.5 m² (exact)");
assert(ground.facilities.some((f) => f.area === "168.9 m²"), "Restaurant 2 is 168.9 m² (exact)");
assert(ground.facilities.some((f) => f.area === "191.55 m²"), "Café is 191.55 m² (exact)");
assert(ground.scheduleStatus === "published" && ground.units.length === 33, "Ground retail schedule is published with 33 confirmed units");
const first = byId("first");
assert(first.scheduleStatus === "published" && first.categories.length === 3 && first.units.length === 23, "First Floor publishes 21 retail units, food court and kids area");
const second = byId("second");
assert(second.intro.includes("22 clinic units") && second.intro.includes("18.32 to 45.4 m²"), "Second Floor publishes 22 clinics and the exact range");
assert(second.facilities.some((f) => f.area === "189 m²") && second.facilities.some((f) => f.area === "174.3 m²"), "Both medical laboratory areas are exact");
assert(second.facilities.some((f) => f.area === "638 m²" && f.note?.includes("not an individual clinic")), "Obstetrics & Gynecology is a department, not a clinic");
assert(second.scheduleStatus === "published" && second.units.length === 25, "Second Floor publishes 22 clinics, 2 labs and OB/GYN department");
const third = byId("third");
const thirdAreas = ["350.7 m²", "212.8 m²", "186.7 m²", "71.9 m²", "38 m²", "154 m²", "148 m²"];
assert(third.facilities.length === 7, "Third Floor has 7 facilities");
assert(thirdAreas.every((a) => third.facilities.some((f) => f.area === a)), "All 7 third-floor areas are exact");
assert(third.facilities.filter((f) => f.kind === "outdoor").length === 2, "Indoor / outdoor facilities are distinguished");
assert(third.units.length === 7 && third.scheduleStatus === "published", "Third Floor unit schedule is published");
assert(rawasinMall.en.masterPlan.facts.some((f) => f.value === "6,280 m²"), "Commercial land area is 6,280 m²");
assert(rawasinMall.en.masterPlan.facts.some((f) => f.value === "123 metres"), "Frontage is 123 metres");
assert(rawasinMall.en.location.destinations.length === 6, "Six nearby destinations are listed");
assert(!/minute|mins|km|\d+\s*min/i.test(rawasinMall.en.location.body + rawasinMall.en.location.note), "No invented travel times or distances");
assert(
  ["ACCORD", "WE", "Dar Arafa Architecture", "Middle East Engineering Consultants"].every((n) => rawasinMall.en.partners.entries.some((e) => e.name === n)),
  "ACCORD, WE, Dar Arafa and Middle East Engineering Consultants are represented",
);
assert(rawasinMall.en.partners.entries.every((p) => /project|rawasin/i.test(p.context)), "Partner roles are project-specific, not company-wide");

// 4. Newsroom
console.log("\n4. Newsroom Integrity:");
assert(getNewsArticles().length === 0, "No fabricated news articles or publication dates are published");
assert(newsArticles.length === 0 && getNewsArticle("anything") === undefined, "News detail lookup returns undefined while unapproved");

// 5. Careers
console.log("\n5. Careers Data Shape:");
const positions = getCareerPositions();
assert(positions.length === 0, "No speculative job openings are published");
assert(careerPillars.en.length === 0 && careerPillars.ar.length === 0, "No unapproved careers culture pillars are published");
assert(getCareerPosition("anything") === undefined, "Unapproved vacancy lookup resolves to undefined");

// 6. Lead validation
console.log("\n6. Lead & Enquiry Validation:");
const validLead = {
  name: "Karim Mostafa", email: "karim@example.com", phone: "+20 100 123 4567",
  message: "Interested in a retail unit at Rawasin Mall.", consent: true,
  project: "rawasin-mall-retail", subject: "rawasin-mall-retail", locale: "en",
};
assert(Object.keys(validateLead(validLead)).length === 0, "Valid Rawasin Mall retail lead passes");
assert(validateLead({ ...validLead, email: "invalid" }).email === true, "Invalid email is rejected");
assert(validateLead({ ...validLead, phone: "123" }).phone === true, "Short phone is rejected");
assert(validateLead({ ...validLead, consent: false }).consent === true, "Missing consent is rejected");
assert(validateLead({ ...validLead, name: "A" }).name === true, "Single-character name is rejected");
assert(validateLead({ ...validLead, message: "A".repeat(2500) }).message === true, "Over-long message is rejected");

// 7. Contact & social
console.log("\n7. Official Channels:");
assert(contact.email.includes("@"), "Contact email is populated");
assert(contact.mapUrl.startsWith("https://"), "Map link is a valid URL");
assert(social.length >= 4 && social.every((s) => s.href.startsWith("https://")), "Social links are valid URLs");
assert(contactVerified === false, "Unverified contact details are hidden from the public UI");
assert(socialVerified === false, "Unverified social profiles are hidden from the public UI");
assert(legalVerified === false, "Unapproved legal text is hidden behind the verification flag");
// 8. Page content architecture (TASK 02)
console.log("\n8. Page Content Architecture:");
const builders: Record<string, (l: "en" | "ar") => pc.BlockSet> = {
  developments: pc.developmentsBlocks,
  rawasin: pc.rawasinHubBlocks,
  residential: pc.residentialBlocks,
  architecture: pc.architectureBlocks,
  lifestyle: pc.lifestyleBlocks,
  apartments: pc.apartmentsBlocks,
  residentialLocation: pc.residentialLocationBlocks,
  commercial: pc.commercialBlocks,
  mallOverview: pc.mallOverviewBlocks,
  masterPlan: pc.masterPlanBlocks,
  floorsIndex: pc.floorsIndexBlocks,
  units: pc.unitsBlocks,
  medical: pc.medicalBlocks,
  mallLifestyle: pc.mallLifestyleBlocks,
  operations: pc.operationsBlocks,
  partners: pc.partnersBlocks,
  mallLocation: pc.mallLocationBlocks,
  about: pc.aboutBlocks,
};
for (const [name, build] of Object.entries(builders)) {
  const en = build("en");
  const ar = build("ar");
  const ids = Object.keys(en);
  assert(ids.length >= 2 && ids.join() === Object.keys(ar).join(), `${name}: EN and AR define the same sections`);
  assert(ids.every((id) => en[id].kind === ar[id].kind), `${name}: EN and AR use the same section kinds`);
}
for (const f of floorIds) {
  assert(Object.keys(pc.floorDetailBlocks("en", f)).length >= 2, `Floor ${f}: has focus and navigation sections beyond the plan explorer`);
}
for (const t of rawasin.copy.en.models!.map((m) => m.id)) {
  assert(Object.keys(pc.apartmentDetailBlocks("en", t)).length === 3, `Apartment ${t}: comparison, context and enquiry sections`);
}
const everything = JSON.stringify([
  ...Object.values(builders).flatMap((b) => [b("en"), b("ar")]),
  ...floorIds.flatMap((f) => [pc.floorDetailBlocks("en", f), pc.floorDetailBlocks("ar", f)]),
  ...unitTypeIds.flatMap((u) => [pc.unitDetailBlocks("en", u), pc.unitDetailBlocks("ar", u)]),
]);
assert(!/EGP|ج\.م|lorem ipsum|placeholder|pending approval/i.test(everything), "No prices, placeholders or lorem ipsum in page sections");
assert(!/\b20%|up to 20/i.test(everything), "The unconfirmed 'up to 20%' operating-cost claim is not published");
for (const m of getProject("rawasin")!.copy.en.models!) {
  assert(!/en-suite|cross-ventilation|salon|terrace|courtyard orientation/i.test(m.description + m.highlights.join(" ")), `${m.type}: no undocumented apartment features`);
}


// 9. Visual assets (TASK 03)
console.log("9. Visual Assets:");
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { res, mall, mallAll, residentialAll, brochureImg, clubhousePlans, partnerLogos } from "../src/content/assets";
const onDisk = (u: string) => existsSync(join(process.cwd(), "public", u.replace(/^\/+/, "")));
const registry = [
  ...Object.values(res("en")), ...Object.values(mall("en")),
  ...[...residentialAll("en"), ...mallAll("en")],
];
assert(registry.every((i) => onDisk(i.src) && onDisk(i.sm) && onDisk(i.lg)), "Every render has sm, md and lg files on disk");
assert([...Object.values(brochureImg("en")), ...clubhousePlans("en").map((p) => p.img), ...Object.values(partnerLogos)].every((i) => onDisk(i.src)), "Brochure images, clubhouse plans and partner logos exist");
assert([...registry, ...Object.values(brochureImg("en"))].every((i) => i.w > 0 && i.h > 0 && i.alt.length > 8), "Every image declares dimensions and alt text");
assert(Object.values(brochureImg("ar")).every((i) => /[؀-ۿ]/.test(i.alt)), "Arabic alt text is provided for brochure images");
const retired = ["about-dama", "cta-dama", "hero-dama", "project-residence", "project-rwasin", "project-view", "lifestyle-interior", "lifestyle-terrace", "dama-twin-residences"];
const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const srcText = walk("src").filter((f) => /\.(ts|tsx)$/.test(f)).map((f) => readFileSync(f, "utf8")).join(" ");
assert(retired.every((n) => !srcText.includes(n)), "Generic non-Rawasin images are no longer referenced by the site");



console.log("\n=======================================================");
console.log(` SUMMARY: ${passed} passed, ${failed} failed`);
console.log("=======================================================\n");
process.exit(failed > 0 ? 1 : 0);
