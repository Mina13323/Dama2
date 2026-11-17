import { organizationJsonLd } from "@/lib/seo";

/** Accurate, minimal structured data — no invented addresses, ratings or awards. */
export function CorporateHeroJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  );
}
