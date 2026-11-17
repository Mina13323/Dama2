/**
 * News & Media — data source.
 *
 * CONTENT POLICY: the previous build published four invented articles with
 * future dates, fictional construction milestones and unsourced quotes. That
 * content has been removed. DAMA has not supplied approved news, press
 * releases, project updates or events, so the newsroom is intentionally empty.
 *
 * The listing, category filters, article detail template and share links are
 * fully implemented and data-driven: adding an approved article here publishes
 * it everywhere (home page, listing and detail route) without code changes.
 */
import type { Locale } from "./index";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;

export type NewsCategory = "project-updates" | "press-releases" | "events" | "architecture";

export interface NewsArticleCopy {
  title: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  summary: string;
  leadParagraph: string;
  sections: {
    heading?: string;
    paragraphs: string[];
    quote?: string;
  }[];
  keyTakeaways?: string[];
}

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  dateISO: string;
  image: string;
  featured?: boolean;
  relatedProject?: string;
  copy: Record<Locale, NewsArticleCopy>;
}

/** No approved articles yet. Never fabricate dates, announcements or quotes. */
export const newsArticles: NewsArticle[] = [];

export const getNewsArticles = (): NewsArticle[] => newsArticles;

export const getNewsArticle = (slug: string): NewsArticle | undefined =>
  newsArticles.find((a) => a.slug === slug);

/** Kept for callers that want a lead story; undefined while the newsroom is empty. */
export const getFeaturedNewsArticle = (): NewsArticle | undefined =>
  newsArticles.find((a) => a.featured) ?? newsArticles[0];

export const getNewsCategories = (): NewsCategory[] => [
  "project-updates",
  "press-releases",
  "events",
  "architecture",
];
