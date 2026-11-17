import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { MallPageView } from "@/components/rawasin/MallPageView";
import { getDictionary, isLocale, locales, type Locale } from "@/content";
import { rawasinMall, type FloorId } from "@/content/rawasin";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

/**
 * Floor-plan images are optional build-time assets. The brochure PDF was not
 * supplied with this build, so no plan is shown by default. Dropping a file at
 * public/images/rawasin/plans/<floor>.{jpg|png|webp} enables the plan viewer
 * and lightbox for that level automatically.
 */
const floorIds: FloorId[] = ["basement", "ground", "first", "second", "third"];

function resolvePlans(): Record<FloorId, string | null> {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const dir = path.join(process.cwd(), "public", "images", "rawasin", "plans");
  const result = {} as Record<FloorId, string | null>;
  for (const id of floorIds) {
    const ext = ["jpg", "jpeg", "png", "webp"].find((e) => fs.existsSync(path.join(dir, `${id}.${e}`)));
    result[id] = ext ? `${basePath}/images/rawasin/plans/${id}.${ext}` : null;
  }
  return result;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = rawasinMall[locale].meta;
  const url = absoluteUrl(`/${locale}/projects/rawasin/mall`);
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url, languages: languageAlternates("/projects/rawasin/mall") },
    openGraph: { title: t.title, description: t.description, url, type: "website" },
  };
}

export default async function Page({ params }: { params: Params }) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const plans = resolvePlans();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: "Rawasin Mall",
    description: rawasinMall[locale].meta.description,
    url: absoluteUrl(`/${locale}/projects/rawasin/mall`),
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Sohag",
      addressRegion: "Sohag",
      addressCountry: "EG",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MallPageView locale={locale} dict={dict} plans={plans} />
    </>
  );
}
