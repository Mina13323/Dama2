/**
 * RAWASIN MALL — structured content module (EN + AR)
 * ==================================================
 *
 * Transcribed and verified directly from the official Rawasin Mall
 * master documents, brand guidelines and architectural schedules.
 */
import type { Locale } from "../../index";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

export type FloorId = "basement" | "ground" | "first" | "second" | "third";
/** Floors in building order; also the floor tab ids on the mall page. */
export const floorIds: FloorId[] = ["basement", "ground", "first", "second", "third"];
/** Unit categories with their own tab on the mall page. */
export const unitTypeIds = ["retail", "medical"] as const;
export type UnitTypeId = (typeof unitTypeIds)[number];
export type UnitRow = { number: string; category: string; area: string };
export type Facility = { name: string; area?: string; kind?: "indoor" | "outdoor"; note?: string };

export interface Floor {
  id: FloorId;
  label: string;
  officialLabel: string;
  planFile: string;
  categories: string[];
  headline: string;
  intro: string;
  highlights: string[];
  facilities: Facility[];
  units: UnitRow[];
  scheduleStatus: "published" | "source-pending";
  scheduleNote?: string;
}

export interface InvestmentShare {
  title: string;
  shareSize: string;
  pricePerM2: string;
  totalSharePrice: string;
  grossArea: string;
  notes: string;
}

export interface OperationMetric {
  value: string;
  label: string;
  desc: string;
}

export interface OperationFeature {
  title: string;
  desc: string;
}

export interface MallCopy {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    name: string;
    tagline: string;
    description: string;
    points: string[];
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    titleLines: string[];
    lead: string;
    statements: { title: string; body: string }[];
    businessTitle: string;
    businessBody: string;
  };
  vision: { eyebrow: string; titleLines: string[]; body: string };
  location: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    destinationsLabel: string;
    destinations: string[];
    accessTitle: string;
    access: { title: string; body: string }[];
    note: string;
    directionsCta: string;
  };
  masterPlan: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    facts: { label: string; value: string; note?: string }[];
    levelsLabel: string;
    levels: string[];
    imageAlt: string;
    imageNote: string;
    cta: string;
  };
  floors: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    selectorLabel: string;
    planLabel: string;
    planPendingTitle: string;
    planPendingBody: string;
    planPendingCta: string;
    zoomIn: string;
    zoomOut: string;
    zoomReset: string;
    openLightbox: string;
    closeLightbox: string;
    planAlt: string;
    activitiesLabel: string;
    facilitiesLabel: string;
    scheduleLabel: string;
    scheduleNumber: string;
    scheduleCategory: string;
    scheduleArea: string;
    scheduleEmpty: string;
    schedulePending: string;
    sourceNote: string;
    list: Floor[];
  };
  unitTypes: {
    eyebrow: string;
    titleLines: string[];
    retail: { title: string; body: string; points: string[] };
    medical: { title: string; body: string; points: string[] };
    disclaimer: string;
    cta: string;
  };
  investment: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    shares: InvestmentShare[];
    disclaimer: string;
    cta: string;
  };
  operations: {
    eyebrow: string;
    titleLines: string[];
    lead: string;
    metrics: OperationMetric[];
    features: OperationFeature[];
  };
  partners: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    entries: { name: string; role: string; description: string; context: string }[];
    logoNote: string;
  };
  cta: { eyebrow: string; titleLines: string[]; body: string; primary: string; secondary: string };
  source: { label: string; body: string };
  nav: { label: string; items: { id: string; label: string }[] };
}

const groundUnitsEn: UnitRow[] = [
  { number: "NO.1", category: "Retail", area: "18.8 m²" },
  { number: "NO.2", category: "Retail", area: "13.86 m²" },
  { number: "NO.3", category: "Retail", area: "13.86 m²" },
  { number: "NO.4", category: "Retail", area: "13.86 m²" },
  { number: "NO.5", category: "Retail", area: "18.8 m²" },
  { number: "NO.6", category: "Retail", area: "17.1 m²" },
  { number: "NO.7", category: "Retail", area: "22.4 m²" },
  { number: "NO.8", category: "Retail", area: "13.9 m²" },
  { number: "NO.9", category: "Retail", area: "13.97 m²" },
  { number: "NO.10", category: "Retail", area: "13.96 m²" },
  { number: "NO.11", category: "Retail", area: "14.03 m²" },
  { number: "NO.12", category: "Retail", area: "20.2 m²" },
  { number: "NO.13", category: "Retail", area: "13.97 m²" },
  { number: "NO.14", category: "Retail", area: "13.96 m²" },
  { number: "NO.15", category: "Retail", area: "14.03 m²" },
  { number: "NO.16", category: "Retail", area: "20.2 m²" },
  { number: "NO.17", category: "Retail", area: "13.97 m²" },
  { number: "NO.18", category: "Retail", area: "13.96 m²" },
  { number: "NO.19", category: "Retail", area: "14.03 m²" },
  { number: "NO.20", category: "Retail", area: "20.2 m²" },
  { number: "NO.21", category: "Retail", area: "22.23 m²" },
  { number: "NO.22", category: "Retail", area: "16.4 m²" },
  { number: "NO.23", category: "Retail", area: "16 m²" },
  { number: "NO.24", category: "Retail", area: "16 m²" },
  { number: "NO.25", category: "Retail", area: "16.84 m²" },
  { number: "REST1", category: "Restaurant", area: "192.5 m²" },
  { number: "REST2", category: "Restaurant", area: "168.9 m²" },
  { number: "CAFE", category: "Café", area: "191.55 m²" },
  { number: "D-SH", category: "Dessert Shop", area: "150.3 m²" },
  { number: "J-SH", category: "Juice Shop", area: "81.84 m²" },
  { number: "PH 1", category: "Pharmacy", area: "77.5 m²" },
  { number: "PH 2", category: "Pharmacy", area: "133.9 m²" },
  { number: "MED", category: "Medical Reception", area: "69.8 m²" },
];

const groundUnitsAr: UnitRow[] = [
  { number: "NO.1", category: "تجاري", area: "18.8 m²" },
  { number: "NO.2", category: "تجاري", area: "13.86 m²" },
  { number: "NO.3", category: "تجاري", area: "13.86 m²" },
  { number: "NO.4", category: "تجاري", area: "13.86 m²" },
  { number: "NO.5", category: "تجاري", area: "18.8 m²" },
  { number: "NO.6", category: "تجاري", area: "17.1 m²" },
  { number: "NO.7", category: "تجاري", area: "22.4 m²" },
  { number: "NO.8", category: "تجاري", area: "13.9 m²" },
  { number: "NO.9", category: "تجاري", area: "13.97 m²" },
  { number: "NO.10", category: "تجاري", area: "13.96 m²" },
  { number: "NO.11", category: "تجاري", area: "14.03 m²" },
  { number: "NO.12", category: "تجاري", area: "20.2 m²" },
  { number: "NO.13", category: "تجاري", area: "13.97 m²" },
  { number: "NO.14", category: "تجاري", area: "13.96 m²" },
  { number: "NO.15", category: "تجاري", area: "14.03 m²" },
  { number: "NO.16", category: "تجاري", area: "20.2 m²" },
  { number: "NO.17", category: "تجاري", area: "13.97 m²" },
  { number: "NO.18", category: "تجاري", area: "13.96 m²" },
  { number: "NO.19", category: "تجاري", area: "14.03 m²" },
  { number: "NO.20", category: "تجاري", area: "20.2 m²" },
  { number: "NO.21", category: "تجاري", area: "22.23 m²" },
  { number: "NO.22", category: "تجاري", area: "16.4 m²" },
  { number: "NO.23", category: "تجاري", area: "16 m²" },
  { number: "NO.24", category: "تجاري", area: "16 m²" },
  { number: "NO.25", category: "تجاري", area: "16.84 m²" },
  { number: "REST1", category: "مطعم", area: "192.5 m²" },
  { number: "REST2", category: "مطعم", area: "168.9 m²" },
  { number: "CAFE", category: "كافيه", area: "191.55 m²" },
  { number: "D-SH", category: "حلويات", area: "150.3 m²" },
  { number: "J-SH", category: "عصائر", area: "81.84 m²" },
  { number: "PH 1", category: "صيدلية", area: "77.5 m²" },
  { number: "PH 2", category: "صيدلية", area: "133.9 m²" },
  { number: "MED", category: "استقبال طبي", area: "69.8 m²" },
];

const firstUnitsEn: UnitRow[] = [
  { number: "NO.26", category: "Retail", area: "30.3 m²" },
  { number: "NO.27", category: "Retail", area: "18 m²" },
  { number: "NO.28", category: "Retail", area: "18 m²" },
  { number: "NO.29", category: "Retail", area: "18 m²" },
  { number: "NO.30", category: "Retail", area: "28.8 m²" },
  { number: "NO.31", category: "Retail", area: "20.1 m²" },
  { number: "NO.32", category: "Retail", area: "17.7 m²" },
  { number: "NO.33", category: "Retail", area: "39.1 m²" },
  { number: "NO.34", category: "Retail", area: "25.2 m²" },
  { number: "NO.35", category: "Retail", area: "15.02 m²" },
  { number: "NO.36", category: "Retail", area: "22.97 m²" },
  { number: "NO.37", category: "Retail", area: "19.41 m²" },
  { number: "NO.40", category: "Retail", area: "12.1 m²" },
  { number: "NO.42", category: "Retail", area: "13.9 m²" },
  { number: "NO.43", category: "Retail", area: "21.4 m²" },
  { number: "NO.44", category: "Retail", area: "13.9 m²" },
  { number: "NO.45", category: "Retail", area: "101 m²" },
  { number: "NO.46", category: "Retail", area: "59.5 m²" },
  { number: "NO.47", category: "Retail", area: "118.7 m²" },
  { number: "NO.48", category: "Retail", area: "249.4 m²" },
  { number: "NO.49", category: "Retail", area: "58.9 m²" },
  { number: "FCORT", category: "Food Court", area: "367.7 m²" },
  { number: "KID", category: "Kids Area", area: "220.5 m²" },
];

const firstUnitsAr: UnitRow[] = [
  { number: "NO.26", category: "تجاري", area: "30.3 m²" },
  { number: "NO.27", category: "تجاري", area: "18 m²" },
  { number: "NO.28", category: "تجاري", area: "18 m²" },
  { number: "NO.29", category: "تجاري", area: "18 m²" },
  { number: "NO.30", category: "تجاري", area: "28.8 m²" },
  { number: "NO.31", category: "تجاري", area: "20.1 m²" },
  { number: "NO.32", category: "تجاري", area: "17.7 m²" },
  { number: "NO.33", category: "تجاري", area: "39.1 m²" },
  { number: "NO.34", category: "تجاري", area: "25.2 m²" },
  { number: "NO.35", category: "تجاري", area: "15.02 m²" },
  { number: "NO.36", category: "تجاري", area: "22.97 m²" },
  { number: "NO.37", category: "تجاري", area: "19.41 m²" },
  { number: "NO.40", category: "تجاري", area: "12.1 m²" },
  { number: "NO.42", category: "تجاري", area: "13.9 m²" },
  { number: "NO.43", category: "تجاري", area: "21.4 m²" },
  { number: "NO.44", category: "تجاري", area: "13.9 m²" },
  { number: "NO.45", category: "تجاري", area: "101 m²" },
  { number: "NO.46", category: "تجاري", area: "59.5 m²" },
  { number: "NO.47", category: "تجاري", area: "118.7 m²" },
  { number: "NO.48", category: "تجاري", area: "249.4 m²" },
  { number: "NO.49", category: "تجاري", area: "58.9 m²" },
  { number: "FCORT", category: "منطقة مطاعم", area: "367.7 m²" },
  { number: "KID", category: "ألعاب أطفال", area: "220.5 m²" },
];

const secondUnitsEn: UnitRow[] = [
  { number: "CL.01", category: "Clinic", area: "26.2 m²" },
  { number: "CL.02", category: "Clinic", area: "26.14 m²" },
  { number: "CL.03", category: "Clinic", area: "26.2 m²" },
  { number: "CL.04", category: "Clinic", area: "26.14 m²" },
  { number: "CL.05", category: "Clinic", area: "26.2 m²" },
  { number: "CL.06", category: "Clinic", area: "26 m²" },
  { number: "CL.07", category: "Clinic", area: "26.2 m²" },
  { number: "CL.08", category: "Clinic", area: "25.3 m²" },
  { number: "CL.09", category: "Clinic", area: "26.2 m²" },
  { number: "CL.10", category: "Clinic", area: "26.2 m²" },
  { number: "CL.11", category: "Clinic", area: "45.4 m²" },
  { number: "CL.12", category: "Clinic", area: "24.5 m²" },
  { number: "CL.13", category: "Clinic", area: "18.32 m²" },
  { number: "CL.14", category: "Clinic", area: "40.4 m²" },
  { number: "CL.15", category: "Clinic", area: "34.6 m²" },
  { number: "CL.16", category: "Clinic", area: "27.9 m²" },
  { number: "CL.17", category: "Clinic", area: "27 m²" },
  { number: "CL.18", category: "Clinic", area: "26.1 m²" },
  { number: "CL.19", category: "Clinic", area: "26.7 m²" },
  { number: "CL.20", category: "Clinic", area: "23.6 m²" },
  { number: "CL.21", category: "Clinic", area: "27.1 m²" },
  { number: "CL.22", category: "Clinic", area: "26 m²" },
  { number: "MED LAB 1", category: "Laboratory", area: "189 m²" },
  { number: "MED LAB 2", category: "Laboratory", area: "174.3 m²" },
  { number: "O&G DEP", category: "Department", area: "638 m²" },
];

const secondUnitsAr: UnitRow[] = [
  { number: "CL.01", category: "عيادة", area: "26.2 m²" },
  { number: "CL.02", category: "عيادة", area: "26.14 m²" },
  { number: "CL.03", category: "عيادة", area: "26.2 m²" },
  { number: "CL.04", category: "عيادة", area: "26.14 m²" },
  { number: "CL.05", category: "عيادة", area: "26.2 m²" },
  { number: "CL.06", category: "عيادة", area: "26 m²" },
  { number: "CL.07", category: "عيادة", area: "26.2 m²" },
  { number: "CL.08", category: "عيادة", area: "25.3 m²" },
  { number: "CL.09", category: "عيادة", area: "26.2 m²" },
  { number: "CL.10", category: "عيادة", area: "26.2 m²" },
  { number: "CL.11", category: "عيادة", area: "45.4 m²" },
  { number: "CL.12", category: "عيادة", area: "24.5 m²" },
  { number: "CL.13", category: "عيادة", area: "18.32 m²" },
  { number: "CL.14", category: "عيادة", area: "40.4 m²" },
  { number: "CL.15", category: "عيادة", area: "34.6 m²" },
  { number: "CL.16", category: "عيادة", area: "27.9 m²" },
  { number: "CL.17", category: "عيادة", area: "27 m²" },
  { number: "CL.18", category: "عيادة", area: "26.1 m²" },
  { number: "CL.19", category: "عيادة", area: "26.7 m²" },
  { number: "CL.20", category: "عيادة", area: "23.6 m²" },
  { number: "CL.21", category: "عيادة", area: "27.1 m²" },
  { number: "CL.22", category: "عيادة", area: "26 m²" },
  { number: "MED LAB 1", category: "معمل طبي", area: "189 m²" },
  { number: "MED LAB 2", category: "معمل طبي", area: "174.3 m²" },
  { number: "O&G DEP", category: "قسم متخصص", area: "638 m²" },
];

const thirdUnitsEn: UnitRow[] = [
  { number: "Indoor Gym", category: "Fitness", area: "350.7 m²" },
  { number: "Outdoor Gym", category: "Fitness", area: "212.8 m²" },
  { number: "Health Club", category: "Wellness", area: "186.7 m²" },
  { number: "Beauty Centre", category: "Personal Care", area: "71.9 m²" },
  { number: "Clinic", category: "Medical", area: "38 m²" },
  { number: "Café", category: "Dining", area: "154 m²" },
  { number: "Outdoor Café", category: "Dining", area: "148 m²" },
];

const thirdUnitsAr: UnitRow[] = [
  { number: "صالة رياضية داخلية", category: "لياقة بدنية", area: "350.7 m²" },
  { number: "صالة رياضية خارجية", category: "لياقة بدنية", area: "212.8 m²" },
  { number: "النادي الصحي", category: "صحة وعافية", area: "186.7 m²" },
  { number: "مركز التجميل", category: "عناية شخصية", area: "71.9 m²" },
  { number: "عيادة", category: "طبي", area: "38 m²" },
  { number: "كافيه", category: "مطاعم وكافيهات", area: "154 m²" },
  { number: "كافيه خارجي", category: "مطاعم وكافيهات", area: "148 m²" },
];

const en: MallCopy = {
  meta: {
    title: "Rawasin Mall — Where Heritage Meets Tomorrow",
    description:
      "Rawasin Mall is a mixed-use destination bringing lifestyle, healthcare, shopping and entertainment together in New Sohag, Upper Egypt.",
  },
  hero: {
    eyebrow: "RAWASIN · A DAMA DEVELOPMENT",
    name: "Rawasin Mall",
    tagline: "Where Heritage Meets Tomorrow.",
    description:
      "Rawasin Mall is a mixed-use destination bringing lifestyle, healthcare, shopping, and entertainment together in one place.",
    points: [
      "A destination for shopping and everyday essentials",
      "Dedicated medical facilities",
      "Fitness and personal care",
      "Restaurants and cafés",
      "A combination of commercial and service activities",
    ],
    primaryCta: "Explore the Mall",
    secondaryCta: "Get in Touch",
    imageAlt: "Architectural exterior view of Rawasin Mall in New Sohag",
  },
  about: {
    eyebrow: "About Rawasin Mall",
    titleLines: ["A Complete", "Everyday *Experience*"],
    lead: "Rawasin Mall is a mixed-use destination bringing lifestyle, healthcare and entertainment together in one place.",
    statements: [
      {
        title: "A wide range of services",
        body: "A wide range of services creates a complete experience.",
      },
      {
        title: "A lively hub",
        body: "We are creating a lively hub of energy, connection and everyday life.",
      },
      {
        title: "A meeting point",
        body: "A dynamic meeting point for everyone.",
      },
    ],
    businessTitle: "For commercial customers",
    businessBody:
      "Thoughtfully designed retail and medical units support your long-term business goals, opening opportunities to invest and reach your full potential. We create a lasting experience, with a unique atmosphere that excites today and inspires for years to come.",
  },
  vision: {
    eyebrow: "Our Vision",
    titleLines: ["New Energy", "for *New Sohag*"],
    body: "To bring new energy to New Sohag, step by step, through memorable experiences.",
  },
  location: {
    eyebrow: "Location",
    titleLines: ["Connected to", "*New Sohag*"],
    body: "Rawasin Mall is strategically located in the southern expansion of New Sohag, with easy access to key destinations. The mall sits within Rawasin, bringing homes, services and modern living together.",
    destinationsLabel: "Nearby destinations listed in the brochure",
    destinations: [
      "Sohag International Airport",
      "Banking District",
      "Al Ahly Club",
      "Medical Centre and Hospitals",
      "Educational Services and International Schools",
      "Future Neighbourhood Services Area",
    ],
    accessTitle: "Road network and access",
    access: [
      {
        title: "Modern road network",
        body: "A modern road network provides fast, direct access, avoiding city-centre traffic.",
      },
      {
        title: "New Airport Axis",
        body: "Connects the project directly to the airport highway.",
      },
    ],
    note: "The brochure does not publish travel times or distances, and exact plot coordinates are pending DAMA approval. The map link opens the wider New Sohag area for orientation.",
    directionsCta: "Open the area in Google Maps",
  },
  masterPlan: {
    eyebrow: "Master Plan",
    titleLines: ["Planned for", "*Easy Circulation*"],
    body: "Rawasin Mall's master plan features an active retail strip, with retail, medical and leisure spaces serving a wide range of visitors and businesses. The mall spans a basement, a ground floor and three upper floors, carefully planned for easy circulation and a better experience for visitors and businesses.",
    facts: [
      { label: "Commercial land area", value: "6,280 m²" },
      { label: "Frontage", value: "123 metres" },
      { label: "Project levels", value: "Basement + Ground + First + Second + Third" },
    ],
    levelsLabel: "Project levels",
    levels: ["Third Floor", "Second Floor", "First Floor", "Ground Floor", "Basement"],
    imageAlt: "Architectural plaza view of Rawasin Mall",
    imageNote:
      "Official floor plans for each level are published on the Floor Plans pages.",
    cta: "Explore the Floors",
  },
  floors: {
    eyebrow: "Floor Explorer",
    titleLines: ["Explore", "the *Floors*"],
    body: "Switch between the five levels of Rawasin Mall. Each level shows its confirmed activities and facility areas, plus the unit schedule where the published plan data is available.",
    selectorLabel: "Select a floor",
    planLabel: "Original floor plan",
    planPendingTitle: "Original floor plan pending",
    planPendingBody:
      "The brochure's floor-plan drawing for this level has not been supplied to the website build. No redrawn or approximate plan is shown, so that unit layouts stay accurate.",
    planPendingCta: "Request the official plan",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    zoomReset: "Reset zoom",
    openLightbox: "Open floor plan in full screen",
    closeLightbox: "Close floor plan",
    planAlt: "Original {floor} floor plan from the Rawasin Mall brochure",
    activitiesLabel: "Main activities",
    facilitiesLabel: "Facilities & confirmed areas",
    scheduleLabel: "Unit schedule",
    scheduleNumber: "Unit",
    scheduleCategory: "Category",
    scheduleArea: "Area",
    scheduleEmpty: "No individual unit rows have been published for this level.",
    schedulePending:
      "Unit numbers and individual areas are printed on the original floor plan. They will be transcribed exactly once the brochure source file is available — they are not estimated here.",
    sourceNote: "Source: Rawasin Mall brochure. Areas are reproduced exactly as published; no values are rounded.",
    list: [
      {
        id: "basement",
        label: "Basement",
        officialLabel: "Basement Floor",
        planFile: "/images/rawasin/plans/basement.jpg",
        categories: ["Hypermarket", "Underground Parking"],
        headline: "Everyday Essentials in One Place",
        intro: "The basement combines a large hypermarket with underground parking for convenient everyday access to the mall.",
        highlights: ["Hypermarket: 754 m²", "Underground parking", "Convenient access for everyday shopping"],
        facilities: [
          { name: "Hypermarket", area: "754 m²", note: "Dedicated space for everyday shopping and household essentials" },
          { name: "Underground parking", note: "Convenient access to the mall for everyday shopping" },
        ],
        units: [],
        scheduleStatus: "published",
        scheduleNote: "The brochure publishes the hypermarket area and underground parking, but no numbered retail schedule for this level.",
      },
      {
        id: "ground",
        label: "Ground Floor",
        officialLabel: "Ground Floor",
        planFile: "/images/rawasin/plans/ground.jpg",
        categories: ["Retail Shops", "Restaurants", "Cafés", "Pharmacies", "Medical Reception"],
        headline: "Shops, Restaurants and Welcome",
        intro: "The ground floor brings together retail shops, restaurants, cafés, pharmacies and a medical reception.",
        highlights: ["5 activity categories", "3 published restaurant & café areas", "Medical reception"],
        facilities: [
          { name: "Restaurant 1", area: "192.5 m²" },
          { name: "Restaurant 2", area: "168.9 m²" },
          { name: "Café", area: "191.55 m²" },
          { name: "Retail shops", note: "Unit numbers and areas are printed on the original plan" },
          { name: "Pharmacies" },
          { name: "Medical reception", note: "A separate functional component on this level" },
        ],
        units: groundUnitsEn,
        scheduleStatus: "published",
        scheduleNote: "Published retail and dining units schedule from the Ground Floor master plan.",
      },
      {
        id: "first",
        label: "First Floor",
        officialLabel: "First Floor",
        planFile: "/images/rawasin/plans/first.jpg",
        categories: ["Retail Shops", "Food Court", "Kids Area"],
        headline: "Fashion, Dining and Family Leisure",
        intro: "The first floor hosts 21 retail boutiques alongside an expansive 367.7 m² food court and a 220.5 m² children's entertainment area.",
        highlights: ["21 Retail shops", "Food Court: 367.7 m²", "Kids Area: 220.5 m²"],
        facilities: [
          { name: "Food Court", area: "367.7 m²" },
          { name: "Kids Area", area: "220.5 m²" },
        ],
        units: firstUnitsEn,
        scheduleStatus: "published",
        scheduleNote: "Official first-floor retail and entertainment schedule.",
      },
      {
        id: "second",
        label: "Second Floor",
        officialLabel: "Second Floor",
        planFile: "/images/rawasin/plans/second.jpg",
        categories: ["Medical & Healthcare", "Clinics", "Medical Laboratories", "Obstetrics & Gynecology"],
        headline: "Medical & Healthcare",
        intro: "The second floor offers 22 clinic units, ranging from 18.32 to 45.4 m², for different medical specialties and operational needs.",
        highlights: ["22 clinic units", "Clinic areas from 18.32 to 45.4 m²", "2 medical laboratories", "Obstetrics & Gynecology Department"],
        facilities: [
          { name: "Clinic units (22)", area: "18.32 to 45.4 m²", note: "Range published for different medical specialties and operational needs" },
          { name: "Medical Laboratory 1", area: "189 m²" },
          { name: "Medical Laboratory 2", area: "174.3 m²" },
          { name: "Obstetrics & Gynecology Department", area: "638 m²", note: "A dedicated department — not an individual clinic unit" },
        ],
        units: secondUnitsEn,
        scheduleStatus: "published",
        scheduleNote: "Published 22 clinics, diagnostic laboratories and maternity department schedule.",
      },
      {
        id: "third",
        label: "Third Floor",
        officialLabel: "Third Floor",
        planFile: "/images/rawasin/plans/third.jpg",
        categories: ["Fitness", "Health Club", "Beauty Centre", "Clinic", "Café"],
        headline: "Fitness, Personal Care and Leisure",
        intro: "The third floor includes indoor and outdoor gyms, a health club, a beauty centre, a café with outdoor space, and a clinic unit. A variety of activities creates space for fitness, personal care and leisure.",
        highlights: ["Indoor & outdoor facilities", "7 published facility areas", "Café with outdoor space"],
        facilities: [
          { name: "Indoor Gym", area: "350.7 m²", kind: "indoor" },
          { name: "Outdoor Gym", area: "212.8 m²", kind: "outdoor" },
          { name: "Health Club", area: "186.7 m²", kind: "indoor" },
          { name: "Beauty Centre", area: "71.9 m²", kind: "indoor" },
          { name: "Clinic", area: "38 m²", kind: "indoor" },
          { name: "Café", area: "154 m²", kind: "indoor" },
          { name: "Outdoor Café", area: "148 m²", kind: "outdoor" },
        ],
        units: thirdUnitsEn,
        scheduleStatus: "published",
        scheduleNote: "Facility areas reproduced exactly from the brochure's third-floor table.",
      },
    ],
  },
  unitTypes: {
    eyebrow: "Unit Types",
    titleLines: ["Spaces Built", "Around *Your Business*"],
    retail: {
      title: "Retail Units",
      body: "Purpose-designed retail units offer flexible layouts and a range of sizes to suit different businesses. The mall's prime location and mix of well-known brands attract a steady flow of visitors, supporting the success and growth of your business.",
      points: ["Retail shops on the Ground Floor", "Restaurant 1 — 192.5 m²", "Restaurant 2 — 168.9 m²", "Café — 191.55 m²"],
    },
    medical: {
      title: "Medical Units",
      body: "Rawasin Mall offers dedicated medical units suited to clinics and a range of healthcare services. These spaces support quality healthcare within a lively, integrated commercial setting.",
      points: [
        "22 clinics from 18.32 to 45.4 m² on the Second Floor",
        "Medical Laboratory 1 — 189 m²",
        "Medical Laboratory 2 — 174.3 m²",
        "Obstetrics & Gynecology Department — 638 m²",
        "Medical reception and waiting areas",
        "Clinic unit on the Third Floor — 38 m²",
      ],
    },
    disclaimer:
      "Availability, prices, payment plans, ownership and rental arrangements are not published here. Contact the DAMA team for current, approved information.",
    cta: "Enquire About Units",
  },
  investment: {
    eyebrow: "Fractional Ownership",
    titleLines: ["Smart Commercial", "*Co-Investment*"],
    body: "Invest in prime commercial and healthcare assets through verified fractional ownership shares backed by DAMA Development.",
    shares: [
      {
        title: "Hypermarket Anchor Share",
        shareSize: "10 m² Share",
        pricePerM2: "100,000 EGP / m²",
        totalSharePrice: "1,000,000 EGP",
        grossArea: "830 m² Gross Area",
        notes: "Includes 30% loading factor. Long-term essential everyday shopping asset.",
      },
      {
        title: "Maternity & OB/GYN Center",
        shareSize: "10 m² Share",
        pricePerM2: "65,000 EGP / m²",
        totalSharePrice: "650,000 EGP",
        grossArea: "720 m² Gross Area",
        notes: "Includes 30% loading factor. Dedicated regional healthcare facility.",
      },
    ],
    disclaimer: "Fractional share allocations and terms are subject to commercial availability and formal contract approval by DAMA.",
    cta: "Enquire About Shares",
  },
  operations: {
    eyebrow: "Facility Management & Operations",
    titleLines: ["Run to Be", "*Safe and Efficient*"],
    lead: "Operational facility management (FMO) covers the activities that keep the mall running effectively, safely and sustainably, relieving the owner and investors of day-to-day operating burdens.",
    metrics: [
      { value: "1.8 m", label: "Minimum medical corridor width", desc: "Wide corridors for the movement of patient beds, especially in the obstetrics and gynaecology centre" },
      { value: "500 lux", label: "Lighting on commercial floors", desc: "400 lux in parking and storage areas, 250 lux on medical floors" },
      { value: "15%", label: "Maximum ramp gradient", desc: "Parking ramps with side guard rails and anti-slip treated floors" },
      { value: "250 kg", label: "Façade platform capacity", desc: "Articulated aerial platform operated from ground level" },
    ],
    features: [
      { title: "Security and surveillance", desc: "Digital monitoring of entrances, exits and parking, supporting round-the-clock security and reducing reliance on manned security" },
      { title: "Parking management", desc: "Smart traffic and gate systems, electronic payment and advance parking reservation" },
      { title: "Waste management", desc: "Separate handling of dry, organic and medical waste, with automated cleaning and disinfection of the waste chutes" },
      { title: "Façade care", desc: "Cleaning and upkeep by articulated aerial platform, without permanent equipment on the façades or roofs" },
    ],
  },
  partners: {
    eyebrow: "Project Partners",
    titleLines: ["Working", "*Together*"],
    body: "These organisations are presented in their project-specific roles as stated in the Rawasin Mall brochure. They are not described as company-wide strategic partners.",
    entries: [
      {
        name: "Dar Arafa Architecture",
        role: "Architectural direction of Rawasin",
        description: "Rawasin is developed under the architectural direction of Dar Arafa Architecture, led by architect Walid Arafa, combining elegance, authenticity and modern design.",
        context: "Rawasin · design",
      },
      {
        name: "ACCORD",
        role: "Mall management & operations partner",
        description:
          "As the mall's management and operations partner, ACCORD provides comprehensive property services to maintain high quality and efficiency, creating a positive experience for visitors and tenants. Through its operational expertise, partnerships and franchises, ACCORD helps bring distinctive brands and services to the mall, adding value and creating a complete retail experience.",
        context: "Rawasin Mall operations",
      },
      {
        name: "WE",
        role: "Telecommunications & technology infrastructure partner",
        description:
          "In partnership with WE, Egypt's leading telecommunications provider, Rawasin Mall features advanced technology infrastructure.",
        context: "Rawasin Mall infrastructure",
      },
      {
        name: "Middle East Engineering Consultants",
        role: "Engineering supervision of the project",
        description: "Supervises the execution of the works, reviews their compliance with technical specifications and contracts, tracks the project programme, and reviews and approves each execution stage before the next begins.",
        context: "Rawasin · supervision",
      },
    ],
    logoNote: "Official partner logos will be added once supplied and approved by DAMA.",
  },
  cta: {
    eyebrow: "Let's Start a Conversation",
    titleLines: ["Discover Rawasin", "*Mall*"],
    body: "Speak with our team about retail and medical units, the mall's facilities, or partnership opportunities.",
    primary: "Contact Our Team",
    secondary: "Back to Rawasin",
  },
  source: {
    label: "Content source",
    body: "All confirmed facts on this page come from the official Rawasin Mall brochure. Proposed headlines and supporting website copy are draft marketing text and remain subject to DAMA's brand approval.",
  },
  nav: {
    label: "On this page",
    items: [
      { id: "about", label: "About" },
      { id: "vision", label: "Vision" },
      { id: "location", label: "Location" },
      { id: "master-plan", label: "Master Plan" },
      { id: "floors", label: "Floors" },
      { id: "unit-types", label: "Unit Types" },
      { id: "investment", label: "Investment" },
      { id: "operations", label: "Operations" },
      { id: "partners", label: "Partners" },
      { id: "gallery", label: "Gallery" },
      { id: "enquire", label: "Enquire" },
    ],
  },
};

const ar: MallCopy = {
  meta: {
    title: "مول رواسين — حيث يلتقي التراث بالغد",
    description:
      "مول رواسين وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والتسوق والترفيه في سوهاج الجديدة بصعيد مصر.",
  },
  hero: {
    eyebrow: "رواسين · إحدى مشروعات داما للتطوير العقاري",
    name: "مول رواسين",
    tagline: "أصالة تمتد، ومستقبل يبدأ.",
    description:
      "مول رواسين وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والتسوق والترفيه في مكان واحد.",
    points: [
      "وجهة للتسوق والاحتياجات اليومية",
      "مرافق طبية متخصصة",
      "لياقة بدنية وعناية شخصية",
      "مطاعم وكافيهات راقية",
      "مزيج متكامل من الأنشطة التجارية والخدمية",
    ],
    primaryCta: "استكشف المول",
    secondaryCta: "تواصل معنا",
    imageAlt: "واجهة معمارية راقية لمول رواسين في سوهاج الجديدة",
  },
  about: {
    eyebrow: "عن مول رواسين",
    titleLines: ["تجربة متكاملة", "لكل *يوم*"],
    lead: "مول رواسين هو وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والترفيه في مكان واحد.",
    statements: [
      {
        title: "خدمات متكاملة",
        body: "نقدم تجربة متكاملة من خلال مجموعة واسعة من الخدمات والمرافق.",
      },
      {
        title: "مركز نابض بالحياة",
        body: "نصنع مساحة حيوية مفعمة بالطاقة والتواصل والحياة اليومية.",
      },
      {
        title: "نقطة لقاء",
        body: "ملتقى حيوي يرحب بالجميع في أجواء عصرية راقية.",
      },
    ],
    businessTitle: "لشركائنا التجاريين والمستثمرين",
    businessBody:
      "صُممت الوحدات التجارية والطبية بعناية لتتوافق مع أهدافك الاستثمارية طويلة المدى، وتفتح أمامك آفاق النمو والنجاح داخل بيئة متكاملة تعزز استدامة الأعمال.",
  },
  vision: {
    eyebrow: "رؤيتنا",
    titleLines: ["طاقة جديدة", "لسوهاج *الجديدة*"],
    body: "أن نمنح سوهاج الجديدة طاقة جديدة، خطوة بخطوة، ومن خلال تجارب ملهمة تدوم.",
  },
  location: {
    eyebrow: "الموقع",
    titleLines: ["في قلب", "سوهاج *الجديدة*"],
    body: "يتمتع مول رواسين بموقع استراتيجي في التوسع الجنوبي لمدينة سوهاج الجديدة، مع سهولة الوصول إلى أهم المحاور والمناطق الحيوية.",
    destinationsLabel: "وجهات حيوية قريبة معتمدة",
    destinations: [
      "مطار سوهاج الدولي",
      "مجمع البنوك",
      "النادي الأهلي",
      "المركز الطبي والمستشفيات",
      "منطقة الخدمات التعليمية والمدارس الدولية",
      "منطقة خدمات المجاورات المستقبلية",
    ],
    accessTitle: "شبكة الطرق والمحاور",
    access: [
      {
        title: "شبكة طرق حديثة",
        body: "اتصال مباشر وسريع بخطوط مستقيمة تتيح الحركة بسلاسة دون الدخول في زحام وسط المدينة.",
      },
      {
        title: "محور المطار الجديد",
        body: "يربط أرض المشروع مباشرة بطريق المطار السريع.",
      },
    ],
    note: "المسافات وأوقات الرحلات لم تُنشر في الكتيّب، وإحداثيات القطعة بدقة رهن الاعتماد النهائي من داما. رابط الخريطة مخصص لبيان موقع سوهاج الجديدة.",
    directionsCta: "فتح المنطقة على خرائط جوجل",
  },
  masterPlan: {
    eyebrow: "المخطط العام",
    titleLines: ["تصميم يعزز", "انسيابية *الحركة*"],
    body: "تم تصميم مول رواسين ليوفر شريطًا تجاريًا نشطًا يجمع بين التسوق والخدمات الطبية والترفيه. يمتد المول على بدروم ودور أرضي وثلاثة أدوار متكررة مصممة لسهولة الحركة وتوفير أفضل تجربة للزوار والمستأجرين.",
    facts: [
      { label: "مساحة الأرض التجارية", value: "6,280 m²" },
      { label: "طول الواجهة الرئيسية", value: "123 metres" },
      { label: "طوابق المشروع", value: "بدروم + أرضي + 3 أدوار متكررة" },
    ],
    levelsLabel: "أدوار المشروع",
    levels: ["الدور الثالث", "الدور الثاني", "الدور الأول", "الدور الأرضي", "البدروم"],
    imageAlt: "رندر معماري لواجهة وبلازا مول رواسين",
    imageNote:
      "المخططات الرسمية لكل دور متاحة في صفحات مخططات الأدوار.",
    cta: "استكشف الأدوار",
  },
  floors: {
    eyebrow: "مستعرض الأدوار",
    titleLines: ["استكشف", "أدوار *المول*"],
    body: "تنقّل بين طوابق مول رواسين الخمسة للاطلاع على الأنشطة والمرافق المعتمدة وجداول الوحدات الرسمية.",
    selectorLabel: "اختر الدور",
    planLabel: "المخطط الأصلي المعياري",
    planPendingTitle: "المخطط قيد النشر",
    planPendingBody: "المخطط المعماري قيد النشر والتحديث.",
    planPendingCta: "طلب المخطط الرسمي",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    zoomReset: "إعادة الضبط",
    openLightbox: "عرض المخطط بالشاشة الكاملة",
    closeLightbox: "إغلاق المخطط",
    planAlt: "المخطط المعماري المعتمد لـ {floor} بمول رواسين",
    activitiesLabel: "الأنشطة الرئيسية",
    facilitiesLabel: "المرافق والمساحات المؤكدة",
    scheduleLabel: "جدول حصر الوحدات",
    scheduleNumber: "رقم الوحدة",
    scheduleCategory: "النشاط",
    scheduleArea: "المساحة",
    scheduleEmpty: "لا توجد وحدات فردية منشورة لهذا الدور.",
    schedulePending: "بيانات الوحدات قيد التحديث.",
    sourceNote: "المصدر: كتيّب مول رواسين الرسمي. جميع المساحات مطابقة للمخططات المعتمدة دون تقريب.",
    list: [
      {
        id: "basement",
        label: "البدروم",
        officialLabel: "دور البدروم",
        planFile: "/images/rawasin/plans/basement.jpg",
        categories: ["هايبر ماركت", "مواقف سيارات تحت الأرض"],
        headline: "احتياجاتك اليومية في مكان واحد",
        intro: "يضم البدروم هايبر ماركت بمساحة 754 م² لتوفير الاحتياجات اليومية، إلى جانب جراج سيارات تحت الأرض لحركة ميسرة.",
        highlights: ["هايبر ماركت: 754 m²", "مواقف سيارات تحت الأرض", "وصول ميسر لخدمات التسوق"],
        facilities: [
          { name: "هايبر ماركت", area: "754 m²", note: "مساحة مخصصة للسلع والمستلزمات المنزلية اليومية" },
          { name: "مواقف سيارات تحت الأرض", note: "مواقف آمنة ومجهزة بنظام إدارة مروري ذكي" },
        ],
        units: [],
        scheduleStatus: "published",
        scheduleNote: "يوثق الكتيّب مساحة الهايبر ماركت ومواقف السيارات لهذا المستوى.",
      },
      {
        id: "ground",
        label: "الدور الأرضي",
        officialLabel: "الدور الأرضي",
        planFile: "/images/rawasin/plans/ground.jpg",
        categories: ["محال تجارية", "مطاعم", "كافيهات", "صيدليات", "استقبال طبي"],
        headline: "محال ومطاعم واستقبال",
        intro: "يجمع الدور الأرضي بين المحال التجارية والمطاعم والكافيهات والصيدليات واستقبال طبي.",
        highlights: ["5 فئات أنشطة", "3 مساحات منشورة للمطاعم والكافيه", "استقبال طبي"],
        facilities: [
          { name: "مطعم 1", area: "192.5 m²" },
          { name: "مطعم 2", area: "168.9 m²" },
          { name: "كافيه", area: "191.55 m²" },
          { name: "محال تجارية", note: "أرقام الوحدات والمساحات مطبوعة على المخطط الأصلي" },
          { name: "صيدليات" },
          { name: "استقبال طبي", note: "مكوّن وظيفي مستقل في هذا الدور" },
        ],
        units: groundUnitsAr,
        scheduleStatus: "published",
        scheduleNote: "جدول حصر الوحدات التجارية والمطاعم المعتمد بالدور الأرضي.",
      },
      {
        id: "first",
        label: "الدور الأول",
        officialLabel: "الدور الأول",
        planFile: "/images/rawasin/plans/first.jpg",
        categories: ["محال تجارية", "منطقة مطاعم", "ألعاب أطفال"],
        headline: "تسوق عصري، ومطاعم، وترفيه عائلي",
        intro: "يجمع الدور الأول بين 21 محلاً تجارياً بمساحات متنوعة ومنطقة مطاعم (فود كورت) بمساحة 367.7 م² ومنطقة ألعاب أطفال مخصصة بمساحة 220.5 م².",
        highlights: ["21 محلاً تجارياً", "منطقة مطاعم: 367.7 m²", "منطقة أطفال: 220.5 m²"],
        facilities: [
          { name: "منطقة مطاعم (Food Court)", area: "367.7 m²" },
          { name: "منطقة ألعاب أطفال (Kids Area)", area: "220.5 m²" },
        ],
        units: firstUnitsAr,
        scheduleStatus: "published",
        scheduleNote: "جدول حصر المحلات ومنطقة الترفيه العائلي بالدور الأول.",
      },
      {
        id: "second",
        label: "الدور الثاني",
        officialLabel: "الدور الثاني",
        planFile: "/images/rawasin/plans/second.jpg",
        categories: ["طبي وصحي", "عيادات", "معامل طبية", "نساء وتوليد"],
        headline: "الخدمات الطبية والرعاية الصحية",
        intro: "يضم الدور الثاني 22 وحدة عيادة تتراوح مساحاتها بين 18.32 و45.4 م² لتناسب مختلف التخصصات، إلى جانب معملين طبيين وقسم متخصص لأمراض النساء والتوليد بمساحة 638 م².",
        highlights: ["22 وحدة عيادة", "مساحات العيادات من 18.32 إلى 45.4 م²", "معملان طبيان", "قسم أمراض النساء والتوليد"],
        facilities: [
          { name: "وحدات العيادات (22)", area: "18.32 to 45.4 m²", note: "نطاق المساحات المنشور لتخصصات طبية واحتياجات تشغيلية مختلفة" },
          { name: "معمل طبي 1", area: "189 m²" },
          { name: "معمل طبي 2", area: "174.3 m²" },
          { name: "قسم أمراض النساء والتوليد", area: "638 m²", note: "قسم مستقل — وليس وحدة عيادة فردية" },
        ],
        units: secondUnitsAr,
        scheduleStatus: "published",
        scheduleNote: "جدول حصر العيادات الـ22 والمعامل وقسم النساء والتوليد بالدور الثاني.",
      },
      {
        id: "third",
        label: "الدور الثالث",
        officialLabel: "الدور الثالث",
        planFile: "/images/rawasin/plans/third.jpg",
        categories: ["لياقة بدنية", "نادي صحي", "مركز تجميل", "عيادة", "كافيه"],
        headline: "اللياقة والعناية الشخصية والترفيه",
        intro: "يضم الدور الثالث صالات رياضية داخلية وخارجية وناديًا صحيًا ومركز تجميل وكافيه بمساحة خارجية ووحدة عيادة. تنوّع الأنشطة يوفر مساحة للياقة البدنية والعناية الشخصية والترفيه.",
        highlights: ["مرافق داخلية وخارجية", "7 مساحات مرافق منشورة", "كافيه بمساحة خارجية"],
        facilities: [
          { name: "صالة رياضية داخلية", area: "350.7 m²", kind: "indoor" },
          { name: "صالة رياضية خارجية", area: "212.8 m²", kind: "outdoor" },
          { name: "النادي الصحي", area: "186.7 m²", kind: "indoor" },
          { name: "مركز التجميل", area: "71.9 m²", kind: "indoor" },
          { name: "عيادة", area: "38 m²", kind: "indoor" },
          { name: "كافيه", area: "154 m²", kind: "indoor" },
          { name: "كافيه خارجي", area: "148 m²", kind: "outdoor" },
        ],
        units: thirdUnitsAr,
        scheduleStatus: "published",
        scheduleNote: "مساحات المرافق منقولة كما وردت تمامًا في جدول الدور الثالث بالكتيّب.",
      },
    ],
  },
  unitTypes: {
    eyebrow: "أنواع الوحدات",
    titleLines: ["مساحات صُممت", "حول *نشاطك*"],
    retail: {
      title: "الوحدات التجارية",
      body: "توفر الوحدات التجارية المصممة بعناية تخطيطات مرنة ومساحات متنوعة تناسب مختلف الأنشطة. ويجذب الموقع المتميز للمول ومزيجه من العلامات المعروفة تدفقًا مستمرًا من الزوار، بما يدعم نجاح نشاطك ونموه.",
      points: ["محال تجارية بالدور الأرضي", "مطعم 1 — 192.5 m²", "مطعم 2 — 168.9 m²", "كافيه — 191.55 m²"],
    },
    medical: {
      title: "الوحدات الطبية",
      body: "يوفر مول رواسين وحدات طبية مخصصة تناسب العيادات ومجموعة من خدمات الرعاية الصحية. وتدعم هذه المساحات تقديم رعاية صحية عالية الجودة داخل بيئة تجارية متكاملة نابضة بالحياة.",
      points: [
        "22 عيادة من 18.32 إلى 45.4 m² بالدور الثاني",
        "معمل طبي 1 — 189 m²",
        "معمل طبي 2 — 174.3 m²",
        "قسم أمراض النساء والتوليد — 638 m²",
        "مناطق استقبال وانتظار",
        "وحدة عيادة بالدور الثالث — 38 m²",
      ],
    },
    disclaimer: "لا ننشر هنا توفر الوحدات أو الأسعار أو خطط السداد أو ترتيبات الملكية والإيجار. تواصل مع فريق داما للحصول على المعلومات المعتمدة الحالية.",
    cta: "استفسر عن الوحدات",
  },
  investment: {
    eyebrow: "الحصص العقارية الاستثمارية",
    titleLines: ["استثمار تجاري", "*بحصص ذكية*"],
    body: "فرص استثمارية مباشرة في أصول تجارية وطبية متميزة بنظام الملكية الجزئية بدعم من داما للتطوير العقاري.",
    shares: [
      {
        title: "حصة الهايبر ماركت",
        shareSize: "حصة 10 م²",
        pricePerM2: "100,000 ج.م / م²",
        totalSharePrice: "1,000,000 ج.م",
        grossArea: "830 م² مساحة إجمالية",
        notes: "تشمل نسبة تحميل 30%. أصل تجاري حيوي باحتياجات يومية مستدامة.",
      },
      {
        title: "حصة مركز النساء والتوليد",
        shareSize: "حصة 10 م²",
        pricePerM2: "65,000 ج.م / م²",
        totalSharePrice: "650,000 ج.م",
        grossArea: "720 م² مساحة إجمالية",
        notes: "تشمل نسبة تحميل 30%. استثمار طبي متخصص ذو عائد طويل الأجل.",
      },
    ],
    disclaimer: "تخضع شروط الحصص الاستثمارية للتوافر والاعتماد التعاقدي الرسمي من شركة داما.",
    cta: "استفسر عن الحصص",
  },
  operations: {
    eyebrow: "إدارة المرافق والتشغيل",
    titleLines: ["تشغيل آمن", "*وكفء*"],
    lead: "تشمل إدارة المرافق التشغيلية (FMO) الأنشطة الداعمة لعمل المول بكفاءة وأمان واستدامة، بما يخفف الأعباء التشغيلية اليومية عن المالك والمستثمرين.",
    metrics: [
      { value: "1.8 م", label: "أقل عرض لممرات القطاع الطبي", desc: "ممرات واسعة لحركة الأسرة المتحركة، خاصة في مركز النساء والتوليد" },
      { value: "500 لوكس", label: "إضاءة الأدوار التجارية", desc: "400 لوكس في الجراجات والمخازن، و250 لوكس في الأدوار الطبية" },
      { value: "15%", label: "الحد الأقصى لميل المنحدرات", desc: "منحدرات الجراج بحواجز أمان جانبية وأرضيات معالجة لمنع الانزلاق" },
      { value: "250 كجم", label: "قدرة تحميل منصة الواجهات", desc: "منصة رفع مفصلية تُشغَّل من مستوى الأرض" },
    ],
    features: [
      { title: "الأمن والمراقبة", desc: "مراقبة رقمية للمداخل والمخارج والمواقف لدعم الأمن على مدار الساعة وتقليل الاعتماد على الأمن البشري" },
      { title: "إدارة المواقف", desc: "أنظمة ذكية لإدارة المرور والبوابات، مع الدفع الإلكتروني والحجز المسبق للمواقف" },
      { title: "إدارة النفايات", desc: "مسارات منفصلة للنفايات الجافة والعضوية والطبية، مع تنظيف وتطهير آلي لأنابيب النفايات" },
      { title: "العناية بالواجهات", desc: "تنظيف وصيانة بمنصة رفع مفصلية دون تركيب معدات دائمة على الواجهات أو الأسطح" },
    ],
  },
  partners: {
    eyebrow: "شركاء المشروع",
    titleLines: ["نعمل", "*معًا*"],
    body: "تُعرض هذه الجهات وفق أدوارها الخاصة بمشروع مول رواسين كما وردت في الكتيّب الرسمي. ولا توصف هنا بأنها شراكات استراتيجية عامة على مستوى الشركة ككل.",
    entries: [
      {
        name: "دار عرفة للعمارة",
        role: "التوجيه المعماري لمشروع رواسين",
        description: "يُنفَّذ رواسين تحت التوجيه المعماري لمكتب دار عرفة للعمارة بقيادة المهندس وليد عرفة، بما يجمع بين الرقي والأصالة والتصميم الحديث.",
        context: "رواسين · التصميم",
      },
      {
        name: "ACCORD",
        role: "شريك إدارة وتشغيل المول",
        description:
          "بصفتها شريك الإدارة والتشغيل للمول، تقدم ACCORD خدمات عقارية وإدارية شاملة للحفاظ على معايير الجودة والكفاءة، وتوفير تجربة متميزة للزوار والمستأجرين. ومن خلال خبراتها وشراكاتها، تسهم في استقطاب علامات تجارية وخدمية متميزة تثري تجربة التسوق وترفع القيمة الاستثمارية للمول.",
        context: "تشغيل وإدارة مول رواسين",
      },
      {
        name: "المصرية للاتصالات WE",
        role: "شريك البنية التحتية التكنولوجية والاتصالات",
        description: "بالشراكة مع الشركة المصرية للاتصالات، المشغل الوطني الرائد في مصر، يتميز مول رواسين ببنية تحتية رقمية متطورة تلبي أعلى متطلبات الاتصال الحديثة.",
        context: "البنية الرقمية للمول",
      },
      {
        name: "مكتب الشرق الأوسط للاستشارات الهندسية",
        role: "الإشراف الهندسي على المشروع",
        description: "يتولى الإشراف العام على تنفيذ الأعمال ومراجعة مطابقتها للمواصفات الفنية والعقود، ومتابعة البرنامج الزمني، ومراجعة واعتماد كل مرحلة تنفيذ قبل الانتقال إلى التالية.",
        context: "رواسين · الإشراف",
      },
    ],
    logoNote: "سيتم إدراج الشعارات الرسمية فور اعتمادها من داما.",
  },
  cta: {
    eyebrow: "لنبدأ الحوار",
    titleLines: ["اكتشف مول", "*رواسين*"],
    body: "تواصل مع فريقنا للتعرف على فرص الوحدات التجارية والطبية، ومرافق المول، وفرص الشراكة.",
    primary: "تواصل مع فريقنا",
    secondary: "العودة إلى رواسين",
  },
  source: {
    label: "مصدر المحتوى",
    body: "جميع الحقائق المؤكدة في هذه الصفحة مستقاة من كتيّب مول رواسين الرسمي. العناوين والنصوص التسويقية المقترحة هي مسودات خاضعة لاعتماد الهوية الرسمية من داما.",
  },
  nav: {
    label: "في هذه الصفحة",
    items: [
      { id: "about", label: "عن المول" },
      { id: "vision", label: "رؤيتنا" },
      { id: "location", label: "الموقع" },
      { id: "master-plan", label: "المخطط العام" },
      { id: "floors", label: "الأدوار" },
      { id: "unit-types", label: "أنواع الوحدات" },
      { id: "investment", label: "الحصص الاستثمارية" },
      { id: "operations", label: "إدارة المرافق" },
      { id: "partners", label: "الشركاء" },
      { id: "gallery", label: "معرض الصور" },
      { id: "enquire", label: "تواصل معنا" },
    ],
  },
};

export const rawasinMall: Record<Locale, MallCopy> = { en, ar };

export const mallImages = {
  hero: asset("/images/rawasin/mall-day-exterior.webp"),
  aerial: asset("/images/rawasin/compound-masterplan.webp"),
  lifestyle: asset("/images/rawasin/mall-night-plaza.webp"),
  courtyard: asset("/images/rawasin/mall-day-plaza.webp"),
  entrance: asset("/images/rawasin/mall-night-exterior.webp"),
};

export const mallAreaMapUrl =
  "https://www.google.com/maps/search/?api=1&query=New+Sohag%2C+Sohag+Governorate%2C+Egypt";
