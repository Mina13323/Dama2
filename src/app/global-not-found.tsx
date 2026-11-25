import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — DAMA Development", robots: { index: false } };

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Static-export 404 (served as /404.html for every unknown URL, under any locale).
 * There is no root layout, so this document is self-contained and bilingual: the visitor
 * can always leave through a real link instead of a dead-end default page.
 */
export default function GlobalNotFound() {
  const link = {
    display: "inline-block",
    padding: "12px 28px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  } as const;
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbfbfa",
          color: "#14171a",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Tahoma, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <main style={{ maxWidth: 520 }}>
          <p style={{ color: "#c51e28", fontWeight: 700, letterSpacing: "0.2em", fontSize: 12, margin: 0 }}>404</p>
          <h1 style={{ fontSize: 34, fontWeight: 400, margin: "16px 0 8px" }}>Page not found</h1>
          <p style={{ color: "#555e68", lineHeight: 1.6, margin: 0 }}>
            The page you are looking for may have moved or is not available.
          </p>
          <h2 lang="ar" dir="rtl" style={{ fontSize: 26, fontWeight: 400, margin: "28px 0 8px" }}>
            الصفحة غير موجودة
          </h2>
          <p lang="ar" dir="rtl" style={{ color: "#555e68", lineHeight: 1.7, margin: 0 }}>
            ربما تم نقل الصفحة التي تبحث عنها أو أنها غير متاحة.
          </p>
          <p style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            <a href={`${base}/en/`} style={{ ...link, background: "#c51e28", color: "#fff" }}>
              Back to home
            </a>
            <a href={`${base}/ar/`} lang="ar" style={{ ...link, background: "#fff", color: "#14171a", border: "1px solid #eceae5" }}>
              العودة إلى الرئيسية
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
