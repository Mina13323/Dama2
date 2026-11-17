import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { revealBootScript } from "@/components/motion/boot";
import { RevealController } from "@/components/motion/RevealController";
import { getDictionary, isLocale, locales } from "@/content";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import "../globals.css";

/*
 * Self-hosted fonts. The typefaces are unchanged from the original design
 * system (Manrope, Gilda Display, Montserrat, IBM Plex Sans Arabic), but they
 * are served from the build instead of Google Fonts. This keeps the static
 * export reproducible offline, avoids a render-blocking third-party request
 * and removes a runtime dependency on fonts.googleapis.com.
 */
const body = localFont({
  src: [
    { path: "../../fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  preload: true,
});

const heading = localFont({
  src: [{ path: "../../fonts/gilda-display-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-heading",
  display: "swap",
  fallback: ["Georgia", "serif"],
  preload: true,
});

const logo = localFont({
  src: [{ path: "../../fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-logo",
  display: "swap",
  fallback: ["Montserrat", "Arial", "sans-serif"],
});

const arabic = localFont({
  src: [
    { path: "../../fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-plex-arabic",
  display: "swap",
  fallback: ["ui-sans-serif", "sans-serif"],
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#ffffff" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: { default: dict.meta.title, template: `%s — DAMA Development` },
    description: dict.meta.description,
    applicationName: "DAMA Development",
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: languageAlternates(),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      siteName: "DAMA Development",
      locale: locale === "ar" ? "ar_EG" : "en_EG",
      url: absoluteUrl(`/${locale}`),
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    // The boot script toggles reveal classes on <html> before hydration.
    <html
      lang={locale}
      dir={dict.dir}
      className={`${body.variable} ${heading.variable} ${logo.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body>
        <Header dict={dict} locale={locale} />
        <main id="main">{children}</main>
        <Footer dict={dict} locale={locale} />
        <RevealController />
      </body>
    </html>
  );
}
