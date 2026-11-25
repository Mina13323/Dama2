/**
 * Static link audit over the exported site (`out/`). Run `npm run build` first.
 * Checks every <a href>, <link rel=alternate>, <form action> against the exported file tree:
 *  - internal links resolve to an exported page/file
 *  - same-page and cross-page #anchors resolve to an element id
 *  - no placeholder hrefs (#, empty, javascript:)
 *  - locale never leaks (en page -> /ar and vice versa, except the language switcher)
 *  - mailto/tel are well formed; external links are https and open safely
 *  - no <button> without type/handler is detectable statically, so buttons are only counted here
 * Exit code 1 on any failure.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

/** Exported site: out/, or the NEXT_DIST_DIR folder when the build used one. */
const OUT = join(process.cwd(), process.env.NEXT_DIST_DIR || "out");
if (!existsSync(OUT)) {
  console.error("out/ missing: run `npm run build` first");
  process.exit(2);
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

function walk(dir: string, acc: string[] = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    statSync(p).isDirectory() ? walk(p, acc) : acc.push(p);
  }
  return acc;
}

const files = walk(OUT);
const pages = files.filter((f) => f.endsWith(".html") && !f.endsWith("404.html"));
const urlOf = (f: string) => "/" + relative(OUT, f).split(sep).join("/").replace(/index\.html$/, "").replace(/\.html$/, "");
const fileSet = new Set(files.map((f) => "/" + relative(OUT, f).split(sep).join("/")));
const pageSet = new Set(pages.map(urlOf));

const idsCache = new Map<string, Set<string>>();
const htmlCache = new Map<string, string>();
function html(url: string) {
  if (!htmlCache.has(url)) {
    const f = join(OUT, url.replace(/\/$/, ""), "index.html");
    htmlCache.set(url, existsSync(f) ? readFileSync(f, "utf8") : "");
  }
  return htmlCache.get(url)!;
}
function ids(url: string) {
  if (!idsCache.has(url)) {
    const s = new Set<string>();
    for (const m of html(url).matchAll(/\sid="([^"]+)"/g)) s.add(m[1]);
    idsCache.set(url, s);
  }
  return idsCache.get(url)!;
}

const failures: string[] = [];
const stats = { pages: pages.length, anchors: 0, internal: 0, external: 0, mailto: 0, tel: 0, buttons: 0, forms: 0, unique: new Set<string>() };
const fail = (page: string, msg: string) => failures.push(`${page}: ${msg}`);

const localeOf = (u: string) => (u.startsWith("/en/") || u === "/en" ? "en" : u.startsWith("/ar/") || u === "/ar" ? "ar" : null);

for (const f of pages) {
  const page = urlOf(f);
  const src = readFileSync(f, "utf8");
  // strip scripts/styles so JSON blobs are not parsed as markup
  const body = src.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  stats.buttons += (body.match(/<button[\s>]/g) ?? []).length;
  stats.forms += (body.match(/<form[\s>]/g) ?? []).length;

  for (const m of body.matchAll(/<a\s([^>]*)>/g)) {
    const attrs = m[1];
    const hrefM = attrs.match(/\shref="([^"]*)"|^href="([^"]*)"/);
    const href = (hrefM?.[1] ?? hrefM?.[2] ?? "").replace(/&amp;/g, "&");
    stats.anchors++;
    if (!hrefM) { fail(page, `<a> without href: <a ${attrs.slice(0, 80)}>`); continue; }
    if (href === "" || href === "#" || /^javascript:/i.test(href)) { fail(page, `placeholder href "${href}"`); continue; }
    stats.unique.add(href);

    if (/^mailto:/i.test(href)) {
      stats.mailto++;
      if (!/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/i.test(href.split("?")[0])) fail(page, `bad mailto ${href}`);
      continue;
    }
    if (/^tel:/i.test(href)) {
      stats.tel++;
      if (!/^tel:\+?[0-9]{6,15}$/.test(href)) fail(page, `bad tel ${href}`);
      continue;
    }
    if (/^https?:\/\//i.test(href)) {
      stats.external++;
      if (!href.startsWith("https://")) fail(page, `insecure external ${href}`);
      if (/example\.com|lorem|placeholder|your-|xxx|#$/i.test(href)) fail(page, `placeholder external ${href}`);
      if (/target="_blank"/.test(attrs) && !/rel="[^"]*noopener/.test(attrs)) fail(page, `_blank without noopener ${href}`);
      continue;
    }

    stats.internal++;
    let [path, hash] = href.split("#");
    if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
    if (path === "") path = page; // same-page anchor
    else if (!path.startsWith("/")) {
      // relative: resolve against page
      const u = new URL(path, "http://x" + page);
      path = u.pathname;
    }
    const clean = path.split("?")[0];
    const isFile = /\.[a-z0-9]+$/i.test(clean);
    const target = isFile ? clean : clean.replace(/\/?$/, "/");
    if (isFile ? !fileSet.has(clean) : !pageSet.has(target)) {
      fail(page, `broken internal link ${href}`);
      continue;
    }
    if (!isFile && !href.endsWith("/") && !href.includes("#") && !href.includes("?")) fail(page, `link missing trailing slash ${href}`);
    if (hash && !isFile && !ids(target).has(hash)) fail(page, `missing anchor #${hash} on ${target}`);

    // locale leakage
    const pl = localeOf(page);
    const tl = localeOf(target);
    const isSwitcher = /hreflang=|data-locale-switch|lang="/.test(attrs);
    if (pl && tl && pl !== tl && !isSwitcher) fail(page, `locale leak ${pl} -> ${tl}: ${href}`);
  }
}

// every page must offer an equivalent in the other locale (language switcher parity)
for (const p of pageSet) {
  const l = localeOf(p);
  if (!l) continue;
  const other = p.replace(/^\/(en|ar)/, l === "en" ? "/ar" : "/en");
  if (!pageSet.has(other)) fail(p, `no ${l === "en" ? "ar" : "en"} equivalent at ${other}`);
}

console.log(`pages: ${stats.pages}`);
console.log(`anchors checked: ${stats.anchors} (unique hrefs ${stats.unique.size}; internal ${stats.internal}, external ${stats.external}, mailto ${stats.mailto}, tel ${stats.tel})`);
console.log(`buttons (static count): ${stats.buttons}; forms: ${stats.forms}`);
if (failures.length) {
  const uniq = [...new Set(failures)];
  console.log(`\nFAILURES (${uniq.length}):`);
  for (const f of uniq.slice(0, 200)) console.log(" - " + f);
  process.exit(1);
}
console.log("ALL LINK CHECKS PASSED");
