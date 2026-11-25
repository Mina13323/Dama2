/**
 * Visual asset registry (TASK 03).
 *
 * Single source of truth for how existing imagery is addressed: file variants,
 * intrinsic size (so frames reserve space and never stretch), and a short alt text.
 * Every file here already exists in /public/images; nothing is generated or sourced elsewhere.
 * The human-readable inventory is docs/ASSET-INVENTORY.md.
 *
 * Variants of the staged renders (4:3 unless listed in `odd`):
 *   sm  900 px   cards, thumbnails, mosaics
 *   md 1600 px   heroes, banners, split frames
 *   lg 2400 px   lightbox only
 */
import type { Locale } from "./index";
import { asset } from "./news";

export type Img = { src: string; w: number; h: number; alt: string; pos?: string };
export type ImgSet = Img & { sm: string; lg: string };

const odd: Record<string, number> = {
  "res-13": 1780 / 2400,
  "mall-day-128": 1799 / 2400,
  "mall-day-129": 1613 / 2400,
  "mall-day-135": 1799 / 2400,
  "mall-night-128": 1799 / 2400,
};
const L = (l: Locale, en: string, ar: string) => (l === "ar" ? ar : en);

function gallery(kind: "residential" | "mall", file: string, key: string, alt: string, pos?: string): ImgSet {
  const ratio = odd[key] ?? 0.75;
  const base = `/images/rawasin/gallery/${kind}/${file}`;
  return { src: asset(`${base}-md.webp`), sm: asset(`${base}-sm.webp`), lg: asset(`${base}-lg.webp`), w: 1600, h: Math.round(1600 * ratio), alt, pos };
}

function brochure(file: string, w: number, h: number, alt: string, pos?: string): Img {
  return { src: asset(`/images/rawasin/brochure/${file}.webp`), w, h, alt, pos };
}

/** Residential renders (source: "rawasin desgin 22-10-2026", staged as rawasin-NN-*). */
export const res = (l: Locale) => ({
  gateStreet: gallery("residential", "rawasin-01-gate-street", "res-01", L(l, "Rawasin gate and entrance street with Hashemi stone buildings", "بوابة رواسين وشارع المدخل أمام مبانٍ من الحجر الهاشمي")),
  gateFront: gallery("residential", "rawasin-10-gate-front", "res-10", L(l, "Rawasin gate 1 seen from the street", "بوابة رواسين رقم 1 من الشارع")),
  gateCloseup: gallery("residential", "rawasin-11-gate-1-closeup", "res-11", L(l, "Gate 1 of Rawasin with a residential building behind", "البوابة رقم 1 في رواسين وخلفها مبنى سكني")),
  jacarandaStreet: gallery("residential", "rawasin-12-street-jacaranda", "res-12", L(l, "Tree-lined internal street with jacaranda in bloom", "شارع داخلي تحفه الأشجار وأشجار الجاكاراندا المزهرة")),
  facadeCorner: gallery("residential", "rawasin-13-facade-corner", "res-13", L(l, "Corner of a Hashemi stone residential building with green rooftop", "ركن مبنى سكني من الحجر الهاشمي بسطح أخضر"), "50% 40%"),
  facadeCourtyard: gallery("residential", "rawasin-14-facade-courtyard-trees", "res-14", L(l, "Residential façade facing a planted courtyard", "واجهة سكنية تطل على فناء مزروع")),
  streetHedge: gallery("residential", "rawasin-16-street-hedge", "res-16", L(l, "Internal street lined with hedges and residential buildings", "شارع داخلي بسياج نباتي ومبانٍ سكنية")),
  facadeStreet: gallery("residential", "rawasin-18-facade-street", "res-18", L(l, "Stacked stone balconies above the street", "شرفات حجرية متدرجة فوق الشارع")),
  facadeScreens: gallery("residential", "rawasin-19-facade-screens", "res-19", L(l, "Hashemi stone façade with deep balconies and patterned screens", "واجهة من الحجر الهاشمي بشرفات عميقة وحواجز مفرّغة")),
  facadeJacaranda: gallery("residential", "rawasin-20-facade-jacaranda", "res-20", L(l, "Residential building behind a flowering jacaranda tree", "مبنى سكني خلف شجرة جاكاراندا مزهرة")),
  curved: gallery("residential", "rawasin-21-curved-building", "res-21", L(l, "Curved stone building among palms", "مبنى حجري منحني بين أشجار النخيل")),
  buildingCorner: gallery("residential", "rawasin-22-building-corner", "res-22", L(l, "Residential building corner with rooftop and palms", "ركن مبنى سكني بسطح ونخيل")),
  facadeRow: gallery("residential", "rawasin-23-facade-row", "res-23", L(l, "Row of residential façades behind cypress trees", "صف من الواجهات السكنية خلف أشجار السرو")),
  streetAxis: gallery("residential", "rawasin-24-street-axis", "res-24", L(l, "Internal street axis framed by buildings and jacaranda", "محور الشارع الداخلي بين المباني والجاكاراندا")),
  screenPassage: gallery("residential", "rawasin-25-screen-passage", "res-25", L(l, "Passage between buildings with a planted patterned screen", "ممر بين المباني بحاجز مفرّغ مزروع")),
  rooftop: gallery("residential", "rawasin-27-rooftop-terrace", "res-27", L(l, "Residential building with a rooftop terrace", "مبنى سكني بتراس على السطح")),
  aerialRoundabout: gallery("residential", "rawasin-28-aerial-roundabout", "res-28", L(l, "Aerial view of Rawasin and its surrounding roads", "منظر جوي لرواسين والطرق المحيطة")),
  aerial2: gallery("residential", "rawasin-30-aerial-02", "res-30", L(l, "Aerial view of the Rawasin residential buildings", "منظر جوي للمباني السكنية في رواسين")),
  aerial3: gallery("residential", "rawasin-32-aerial-03", "res-32", L(l, "Aerial view of Rawasin from the south", "منظر جوي لرواسين من الجنوب")),
  aerial4: gallery("residential", "rawasin-33-aerial-04", "res-33", L(l, "Aerial view of Rawasin and the adjacent plots", "منظر جوي لرواسين والقطع المجاورة")),
  masterTop: gallery("residential", "rawasin-34-masterplan-top", "res-34", L(l, "Top view of the Rawasin master plan", "منظر علوي للمخطط العام لرواسين")),
  gateSign: gallery("residential", "rawasin-35-gate-1-sign", "res-35", L(l, "Gate 1 sign with the Rawasin lettering", "لافتة البوابة رقم 1 بحروف رواسين")),
});

/** Rawasin Mall renders (source: "MALL 3D DESIGN", day and night). */
export const mall = (l: Locale) => ({
  dayCorner: gallery("mall", "mall-day-123", "mall-day-123", L(l, "Rawasin Mall corner entrance by day", "مدخل ركن رواسين مول نهارًا")),
  dayMedical: gallery("mall", "mall-day-124", "mall-day-124", L(l, "Rawasin Mall frontage with the medical entrance", "واجهة رواسين مول مع مدخل الخدمات الطبية")),
  dayFront: gallery("mall", "mall-day-125", "mall-day-125", L(l, "Front elevation of Rawasin Mall by day", "الواجهة الأمامية لرواسين مول نهارًا")),
  dayFront2: gallery("mall", "mall-day-126", "mall-day-126", L(l, "Rawasin Mall street frontage by day", "واجهة رواسين مول على الشارع نهارًا")),
  dayBillboard: gallery("mall", "mall-day-127", "mall-day-127", L(l, "Rawasin Mall corner with its media screen", "ركن رواسين مول مع شاشة العرض")),
  dayEntrance1: gallery("mall", "mall-day-128", "mall-day-128", L(l, "Rawasin Mall entrance 1 and signage", "مدخل رواسين مول رقم 1 واللافتات")),
  dayColonnade: gallery("mall", "mall-day-129", "mall-day-129", L(l, "Rawasin Mall stone façade with shop signage", "واجهة رواسين مول الحجرية بلافتات المحلات")),
  dayEscalator: gallery("mall", "mall-day-131", "mall-day-131", L(l, "Rawasin Mall medical entrance and escalator", "مدخل الخدمات الطبية والسلم المتحرك في رواسين مول")),
  dayMedicalDoor: gallery("mall", "mall-day-132", "mall-day-132", L(l, "Medical entrance and pharmacy at Rawasin Mall", "المدخل الطبي والصيدلية في رواسين مول"), "40% 60%"),
  dayEntrance3: gallery("mall", "mall-day-133", "mall-day-133", L(l, "Entrance 3 with café and shop signage", "المدخل رقم 3 بلافتات الكافيه والمحلات")),
  dayTerrace: gallery("mall", "mall-day-134", "mall-day-134", L(l, "Outdoor café terrace along the mall frontage", "تراس كافيه خارجي على واجهة المول")),
  dayTerrace2: gallery("mall", "mall-day-135", "mall-day-135", L(l, "Outdoor seating and umbrellas at Rawasin Mall", "جلسات خارجية ومظلات في رواسين مول")),
  nightFront: gallery("mall", "mall-night-125", "mall-night-125", L(l, "Rawasin Mall front elevation at night", "الواجهة الأمامية لرواسين مول ليلًا")),
  nightCorner: gallery("mall", "mall-night-127", "mall-night-127", L(l, "Rawasin Mall corner lit at night", "ركن رواسين مول مضاءً ليلًا")),
  nightEntrance1: gallery("mall", "mall-night-128", "mall-night-128", L(l, "Rawasin Mall entrance 1 at night", "مدخل رواسين مول رقم 1 ليلًا")),
  nightMedical: gallery("mall", "mall-night-131", "mall-night-131", L(l, "Medical entrance of Rawasin Mall at night", "المدخل الطبي لرواسين مول ليلًا")),
  nightEntrance3: gallery("mall", "mall-night-133", "mall-night-133", L(l, "Entrance 3 of Rawasin Mall at night", "المدخل رقم 3 لرواسين مول ليلًا")),
  nightStreet: gallery("mall", "mall-night-136", "mall-night-136", L(l, "Rawasin Mall along the street at night", "رواسين مول على امتداد الشارع ليلًا")),
  nightMarket: gallery("mall", "mall-night-138", "mall-night-138", L(l, "Rawasin Mall market corner at night", "ركن المول التجاري لرواسين ليلًا")),
});

/** Renders extracted from the Rawasin Compound brochure (794 px wide at source: used only in compact frames). */
export const brochureImg = (l: Locale) => ({
  courtyardPath: brochure("courtyard-path", 794, 1123, L(l, "Planted courtyard path with a tree and patterned railing", "ممر فناء مزروع بشجرة ودرابزين مفرّغ"), "50% 40%"),
  rooftop: brochure("rooftop-terrace", 794, 1123, L(l, "Residents walking on a green rooftop terrace", "سكان يسيرون على تراس سطح أخضر")),
  lobby: brochure("lobby-entrance", 794, 1123, L(l, "Building entrance lobby with a patterned screen", "مدخل مبنى بحاجز مفرّغ")),
  facadeTree: brochure("facade-tree", 794, 1123, L(l, "Hashemi stone building with a tree and children playing", "مبنى من الحجر الهاشمي وشجرة وأطفال يلعبون")),
  screenPassage: brochure("screen-passage", 794, 1123, L(l, "Hanging planters on a patterned screen between buildings", "نباتات متدلية على حاجز مفرّغ بين المباني")),
  courtyardGarden: brochure("courtyard-garden", 794, 1123, L(l, "Courtyard garden seen from above", "حديقة الفناء من الأعلى")),
  streetAxis: brochure("street-axis", 794, 1123, L(l, "Two residential buildings facing each other across the street", "مبنيان سكنيان متقابلان على جانبي الشارع")),
  twinBuildings: brochure("twin-buildings", 794, 992, L(l, "Two residential buildings with green rooftops", "مبنيان سكنيان بأسطح خضراء")),
  masterTop: brochure("masterplan-top", 650, 434, L(l, "Top view of the residential buildings and courtyards", "منظر علوي للمباني السكنية والأفنية")),
  mallEntrance: brochure("mall-entrance", 794, 1123, L(l, "Visitors at the Rawasin Mall entrance", "زوار عند مدخل رواسين مول")),
  mosque: brochure("mosque-prayer", 794, 1123, L(l, "Prayer niche of Rawasin Mosque", "محراب مسجد رواسين"), "50% 55%"),
  locationMap: brochure("location-map", 758, 587, L(l, "Map of the Rawasin Mall site beside the airport road", "خريطة موقع رواسين مول بجوار طريق المطار")),
});

export const clubhousePlans = (l: Locale) =>
  (
    [
      ["ground", 719, 340, L(l, "Ground floor", "الدور الأرضي")],
      ["second", 707, 340, L(l, "Second floor", "الدور الثاني")],
      ["third", 707, 340, L(l, "Third floor", "الدور الثالث")],
      ["fourth", 733, 335, L(l, "Fourth floor", "الدور الرابع")],
      ["roof", 705, 340, L(l, "Roof (padel court)", "السطح (ملعب البادل)")],
    ] as const
  ).map(([id, w, h, label]) => ({ id, label, img: { src: asset(`/images/rawasin/clubhouse/${id}.webp`), w, h, alt: `${L(l, "Clubhouse plan", "مخطط النادي الاجتماعي")} · ${label}` } as Img }));

export const logos = {
  wordmarkDark: { src: asset("/images/brand/rawasin-wordmark-dark.webp"), w: 900, h: 479 },
  wordmarkLight: { src: asset("/images/brand/rawasin-wordmark-light.webp"), w: 900, h: 479 },
};

export const partnerLogos: Record<string, Img> = {
  ACCORD: { src: asset("/images/partners/accord.webp"), w: 296, h: 143, alt: "ACCORD" },
  WE: { src: asset("/images/partners/we.webp"), w: 159, h: 159, alt: "WE" },
  "Middle East Engineering Consultants": { src: asset("/images/partners/meec.webp"), w: 325, h: 162, alt: "Middle East Engineering Consultants" },
};

/** Logo for the i-th Rawasin partner entry (entries share order across locales; names differ in Arabic). */
export const partnerLogoAt = (enName: string | undefined): Img | undefined => (enName ? partnerLogos[enName] : undefined);

/** Gallery lists used by the lightbox galleries: residential (22) and mall day + night (19). */
export const residentialAll = (l: Locale): ImgSet[] => {
  const r = res(l);
  return [r.masterTop, r.gateStreet, r.gateFront, r.gateCloseup, r.gateSign, r.jacarandaStreet, r.streetHedge, r.streetAxis, r.facadeCorner, r.facadeCourtyard, r.facadeStreet, r.facadeScreens, r.facadeJacaranda, r.facadeRow, r.screenPassage, r.curved, r.buildingCorner, r.rooftop, r.aerialRoundabout, r.aerial2, r.aerial3, r.aerial4];
};
export const mallAll = (l: Locale): ImgSet[] => {
  const m = mall(l);
  return [m.dayFront, m.dayFront2, m.dayCorner, m.dayBillboard, m.dayEntrance1, m.dayMedical, m.dayColonnade, m.dayEscalator, m.dayMedicalDoor, m.dayEntrance3, m.dayTerrace, m.dayTerrace2, m.nightFront, m.nightCorner, m.nightEntrance1, m.nightMedical, m.nightEntrance3, m.nightStreet, m.nightMarket];
};
