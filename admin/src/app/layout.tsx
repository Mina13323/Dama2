import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const body = localFont({
  src: [
    { path: "../fonts/manrope-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/manrope-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/manrope-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/manrope-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});
const heading = localFont({ src: [{ path: "../fonts/gilda-display-latin-400-normal.woff2", weight: "400" }], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  title: { default: "DAMA CMS", template: "%s · DAMA CMS" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`}>
      <body>{children}</body>
    </html>
  );
}
