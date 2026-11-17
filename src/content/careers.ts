import type { Locale } from "./index";

export type CareerDepartment = "Architecture & Design" | "Engineering & Delivery" | "Sales & Client Advisory" | "Sustainability & Urbanism";

export interface CareerPositionCopy {
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface CareerPosition {
  slug: string;
  departmentId: "design" | "engineering" | "sales" | "sustainability";
  copy: Record<Locale, CareerPositionCopy>;
}

/**
 * Culture pillars are not approved company information. They are intentionally
 * empty; CareersView hides the culture section until DAMA supplies text.
 */
export const careerPillars: Record<Locale, { title: string; description: string }[]> = {
  en: [],
  ar: [],
};

/**
 * No approved vacancies are published. The four detailed job descriptions
 * previously in this array were speculative and have been removed. The careers
 * page, department filters and application form remain functional; add
 * DAMA-approved positions here to publish them without touching the UI.
 */
export const careerPositions: CareerPosition[] = [];

export const getCareerPositions = (): CareerPosition[] => careerPositions;
export const getCareerPosition = (slug: string): CareerPosition | undefined =>
  careerPositions.find((p) => p.slug === slug);
