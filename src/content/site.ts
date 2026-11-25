/**
 * Site-wide data that does not change between languages.
 *
 * All imagery is now local: no third-party image hosts are used at runtime.
 * Photography currently in /public is architectural art direction carried over
 * from the existing site; it must be replaced with approved DAMA project
 * photography before publication (see docs/IMPLEMENTATION.md).
 *
 * `contact` and `social` were carried over from the original site and have NOT
 * been independently verified. They are listed in the "information required
 * from DAMA" section of the implementation report.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

/** Corporate imagery is drawn from the Rawasin renders only (1600 px variants); generic stock-style files were retired. */
const rr = (name: string) => asset(`/images/rawasin/gallery/residential/${name}-md.webp`);

export const images = {
  hero: rr("rawasin-20-facade-jacaranda"),
  heroSlides: [
    rr("rawasin-20-facade-jacaranda"),
    rr("rawasin-13-facade-corner"),
    rr("rawasin-28-aerial-roundabout"),
  ],
  featured: rr("rawasin-19-facade-screens"),
  courtyard: asset("/images/story-courtyard.webp"),
  courtyardTree: asset("/images/story-detail-tree.webp"),
  courtyardPalms: asset("/images/story-detail-palms.webp"),
  rawasinAerial: asset("/images/rawasin-aerial.webp"),
  lifestyleEntrance: asset("/images/lifestyle-entrance.webp"),
  lifestyleTree: asset("/images/lifestyle-tree.webp"),
  story: rr("rawasin-12-street-jacaranda"),
  lifestyle: rr("rawasin-14-facade-courtyard-trees"),
  lifestyleThemes: [
    rr("rawasin-14-facade-courtyard-trees"),
    rr("rawasin-12-street-jacaranda"),
    asset("/images/dama-courtyard-living.jpg"),
  ],
  values: [
    asset("/images/story-detail-tree.webp"),
    rr("rawasin-12-street-jacaranda"),
    asset("/images/story-detail-palms.webp"),
    asset("/images/lifestyle-entrance.webp"),
  ],
  news: [rr("rawasin-19-facade-screens"), rr("rawasin-23-facade-row"), rr("rawasin-12-street-jacaranda")],
  cta: rr("rawasin-10-gate-front"),
  about: {
    hero: rr("rawasin-23-facade-row"),
    who: rr("rawasin-12-street-jacaranda"),
    whoDetail: rr("rawasin-25-screen-passage"),
    story: rr("rawasin-24-street-axis"),
    storyDetail: rr("rawasin-19-facade-screens"),
    vision: rr("rawasin-20-facade-jacaranda"),
    mission: asset("/images/lifestyle-entrance.webp"),
    cta: rr("rawasin-10-gate-front"),
  },
  projectsHero: asset("/images/rawasin-aerial-masterplan.jpg"),
} as const;

// Project data lives in ./projects (single source of truth).
export { projects, type ProjectSlug } from "./projects";
export { newsArticles, getNewsArticles, getNewsArticle } from "./news";
export { careerPositions, getCareerPositions, getCareerPosition } from "./careers";

/**
 * Contact channels carried over from the previous site. NOT independently
 * verified: `contactVerified` keeps them out of the public UI until DAMA signs off.
 */
export const contactVerified = false;
export const socialVerified = false;
export const legalVerified = false;
export const contact = {
  phone: "+20 2 2810 5000",
  email: "info@damadevelopments.com",
  salesEmail: "sales@damadevelopments.com",
  address: "Road 90, North Investors Area, New Cairo, Egypt",
  addressAr: "شارع التسعين، منطقة المستثمرين الشمالية، القاهرة الجديدة، مصر",
  mapUrl: "https://maps.google.com/?q=New+Cairo+Egypt",
  workingHours: "Sunday – Thursday, 9:00 AM – 6:00 PM (EET)",
  workingHoursAr: "الأحد – الخميس، 9:00 صباحًا – 6:00 مساءً (توقيت القاهرة)",
};

/** Social URLs carried over from the previous site — pending verification. */
export const social: { label: "Instagram" | "LinkedIn" | "YouTube" | "Facebook"; href: string }[] = [
  { label: "Instagram", href: "https://instagram.com/damadevelopments" },
  { label: "LinkedIn", href: "https://linkedin.com/company/damadevelopments" },
  { label: "Facebook", href: "https://facebook.com/damadevelopments" },
  { label: "YouTube", href: "https://youtube.com/@damadevelopments" },
];

/**
 * Leadership details. Empty `name`/`portrait` render clearly
 * marked placeholders; `linkedin` is only shown when provided.
 */
export const leadership: { role: "ceo" | "coCeo"; name: string; portrait: string; linkedin: string }[] = [
  /** Name is intentionally empty until DAMA supplies the approved spelling and title; the portrait is the supplied photograph. */
  { role: "ceo", name: "", portrait: "/images/leadership/ceo.webp", linkedin: "" },
  { role: "coCeo", name: "", portrait: "", linkedin: "" },
];

/** Verified partners only, with official logo files in /public/partners. */
export const partners: { name: string; logo: string; href?: string }[] = [];
