/**
 * Post-build: writes a static redirect page for every retired URL in
 * src/lib/redirects.ts into the export directory (default ./out).
 *
 *   npx tsx scripts/write-redirects.ts [outDir]
 *
 * Runs automatically as `postbuild`. Fails if a redirect would overwrite a real
 * page, so a retired path can never shadow a live route.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { locales } from "../src/content";
import { localeRedirects, rootRedirects } from "../src/lib/redirects";

// With NEXT_DIST_DIR set, `next build` exports into that folder instead of out/.
const outDir = path.resolve(process.argv[2] ?? (process.env.NEXT_DIST_DIR || "out"));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

if (!existsSync(outDir)) {
  console.error(`write-redirects: ${outDir} does not exist; run next build first.`);
  process.exit(1);
}

/** trailingSlash export: canonical page URLs end in "/", before any #anchor. */
function withSlash(to: string): string {
  const [p, anchor] = to.split("#");
  const slashed = p.endsWith("/") ? p : `${p}/`;
  return anchor ? `${slashed}#${anchor}` : slashed;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function page(opts: { lang: string; dir: string; target: string; script: string; message: string; cta: string }): string {
  const { lang, dir, target, script, message, cta } = opts;
  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>${esc(message)}</title>
<link rel="canonical" href="${esc(target)}">
<script>${script}</script>
<meta http-equiv="refresh" content="0; url=${esc(target)}">
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;background:#fbfbfa;color:#14171a;text-align:center;padding:0 16px}a{color:#c51e28;font-weight:600}</style>
</head>
<body><p>${esc(message)} <a href="${esc(target)}">${esc(cta)}</a></p></body>
</html>
`;
}

let written = 0;
function write(from: string, html: string) {
  const file = path.join(outDir, from, "index.html");
  if (existsSync(file)) throw new Error(`write-redirects: ${from}/ is a real page; remove it from src/lib/redirects.ts`);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
  written++;
}

for (const locale of locales) {
  const ar = locale === "ar";
  for (const r of localeRedirects) {
    const target = `${basePath}${withSlash(`/${locale}${r.to}`)}`;
    write(
      `/${locale}${r.from}`,
      page({
        lang: locale,
        dir: ar ? "rtl" : "ltr",
        target,
        script: `location.replace(${JSON.stringify(target)})`,
        message: ar ? "تم نقل هذه الصفحة إلى عنوان جديد." : "This page has moved.",
        cta: ar ? "انتقل الآن" : "Continue",
      }),
    );
  }
}

for (const r of rootRedirects) {
  const en = `${basePath}${withSlash(`/en${r.to}`)}`;
  const ar = `${basePath}${withSlash(`/ar${r.to}`)}`;
  write(
    r.from,
    page({
      lang: "en",
      dir: "ltr",
      target: en,
      // Arabic browsers go to /ar; everyone else (and no-JS, via meta refresh) to /en.
      script: `location.replace((navigator.language||"").toLowerCase().indexOf("ar")===0?${JSON.stringify(ar)}:${JSON.stringify(en)})`,
      message: "This page has moved.",
      cta: "Continue",
    }),
  );
}

console.log(`write-redirects: ${written} redirect pages written to ${path.relative(process.cwd(), outDir) || "."}`);
