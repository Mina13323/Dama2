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

export const images = {
  hero: asset("/images/hero-building.webp"),
  heroSlides: [
    asset("/images/hero-building.webp"),
    asset("/images/project-residence.jpg"),
    asset("/images/about-dama.jpg"),
  ],
  featured: asset("/images/about-dama.jpg"),
  courtyard: asset("/images/story-courtyard.webp"),
  courtyardTree: asset("/images/story-detail-tree.webp"),
  courtyardPalms: asset("/images/story-detail-palms.webp"),
  rawasinAerial: asset("/images/rawasin-aerial.webp"),
  lifestyleEntrance: asset("/images/lifestyle-entrance.webp"),
  lifestyleTree: asset("/images/lifestyle-tree.webp"),
  story: asset("/images/lifestyle-interior.jpg"),
  lifestyle: asset("/images/lifestyle-terrace.jpg"),
  lifestyleThemes: [
    asset("/images/lifestyle-terrace.jpg"),
    asset("/images/lifestyle-interior.jpg"),
    asset("/images/dama-courtyard-living.jpg"),
  ],
  values: [
    asset("/images/story-detail-tree.webp"),
    asset("/images/lifestyle-interior.jpg"),
    asset("/images/story-detail-palms.webp"),
    asset("/images/lifestyle-entrance.webp"),
  ],
  news: [
    asset("/images/about-dama.jpg"),
    asset("/images/hero-dama.jpg"),
    asset("/images/lifestyle-terrace.jpg"),
  ],
  cta: asset("/images/cta-dama.jpg"),
  about: {
    hero: asset("/images/dama-twin-residences.png"),
    who: asset("/images/dama-courtyard-living.jpg"),
    story: asset("/images/story-courtyard.webp"),
    vision: asset("/images/dama-jacaranda-hero.jpg"),
    mission: asset("/images/lifestyle-entrance.webp"),
    cta: asset("/images/cta-dama.jpg"),
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
  { role: "ceo", name: "", portrait: "", linkedin: "" },
  { role: "coCeo", name: "", portrait: "", linkedin: "" },
];

/** Verified partners only, with official logo files in /public/partners. */
export const partners: { name: string; logo: string; href?: string }[] = [];
