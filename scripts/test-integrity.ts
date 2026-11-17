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
import { getProjects, getProject, availableCategories, legacyProjectSlugs } from "../src/content/projects";
import { newsArticles, getNewsArticles, getNewsArticle } from "../src/content/news";
import { getCareerPositions, getCareerPosition } from "../src/content/careers";
import { rawasinMall } from "../src/content/rawasin";
import { contact, social, contactVerified, socialVerified, legalVerified } from "../src/content/site";
import { careerPillars } from "../src/content/careers";
import { validateLead } from "../src/lib/leads";

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
assert(allProjects.length === 3, `Three developments are published (found: ${allProjects.length})`);
assert(allProjects.map((p) => p.slug).join(",") === "rawasin,dama-residence,dama-view", "Canonical slugs are stable");
assert(getProject("rwasin")?.slug === "rawasin", "Legacy /projects/rwasin URL resolves to Rawasin");
assert(legacyProjectSlugs.rwasin === "rawasin", "Legacy slug alias is declared");
for (const p of allProjects) {
  assert(p.image.startsWith("/"), `Project "${p.slug}" uses a local image`);
  assert(p.images.gallery.every((i) => i.startsWith("/")), `Project "${p.slug}" gallery uses local images only`);
  assert(Object.keys(p.copy).join(",") === "en,ar", `Project "${p.slug}" has EN + AR copy`);
}
const rawasin = getProject("rawasin")!;
assert(rawasin.copy.en.components.some((c) => c.href === "mall"), "Rawasin Mall is a component of Rawasin, not a separate development");
assert(rawasin.copy.en.facts.length > 0, "Rawasin publishes brochure-confirmed facts");
assert(rawasin.copy.en.facts.every((f) => !/\d+\s*%/.test(f.value)), "No unapproved percentage claims on Rawasin");
for (const slug of ["dama-residence", "dama-view"]) {
  const p = getProject(slug)!;
  assert(p.copy.en.facts.length === 0, `${p.name} publishes no invented facts`);
  assert(p.copy.en.amenities.length === 0, `${p.name} publishes no invented amenities`);
  assert(!p.mapUrl, `${p.name} publishes no unverified map pin`);
}
const categories = availableCategories();
assert(categories.includes("residential") && categories.includes("commercial") && categories.includes("mixed-use"), "Filters cover residential / commercial / mixed-use");

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
assert(ground.scheduleStatus === "source-pending" && ground.units.length === 0, "Ground retail schedule is source-pending, not invented");
const first = byId("first");
assert(first.categories.length === 0 && first.units.length === 0, "First Floor has no invented function or unit rows");
const second = byId("second");
assert(second.intro.includes("22 clinic units") && second.intro.includes("18.32 to 45.4 m²"), "Second Floor publishes 22 clinics and the exact range");
assert(second.facilities.some((f) => f.area === "189 m²") && second.facilities.some((f) => f.area === "174.3 m²"), "Both medical laboratory areas are exact");
assert(second.facilities.some((f) => f.area === "638 m²" && f.note?.includes("not an individual clinic")), "Obstetrics & Gynecology is a department, not a clinic");
assert(second.scheduleStatus === "source-pending", "22 individual clinic rows await the source plan");
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
assert(rawasinMall.en.partners.entries.length === 3, "ACCORD, WE and Dar Arafa are represented");
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

console.log("\n=======================================================");
console.log(` SUMMARY: ${passed} passed, ${failed} failed`);
console.log("=======================================================\n");
process.exit(failed > 0 ? 1 : 0);
