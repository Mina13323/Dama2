// @ts-nocheck -- browser-context callbacks mix DOM and Node types; this is a dev-only audit script
/**
 * Browser-level functional audit (TASK 04). Run `npm run build` first, then `npm run test:e2e`.
 *
 * No project dependency is added: the script reuses `puppeteer-core` (shipped with the globally
 * installed `lighthouse`) and a local Chrome/Edge. Override with PUPPETEER_CORE=<path> and
 * CHROME_PATH=<exe> if they live elsewhere. It serves `out/` itself.
 *
 * Sections: header/mega menu/footer/breadcrumbs/language switcher, mobile drawer, legacy redirects and
 * 404, galleries, forms, dead-button sweep (every visible button on every page), journeys A-F.
 */
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { homedir } from "node:os";
import { href, footerGroups, projectHref, type PageKey } from "../src/lib/routes";
import { projectMenu } from "../src/content/projects/menu";
import { rawasinLink, type RawasinPlace } from "../src/content/projects/rawasin/links";
import { localeRedirects, rootRedirects } from "../src/lib/redirects";

const require = createRequire(import.meta.url);
const pptrPath =
  process.env.PUPPETEER_CORE ||
  join(homedir(), "AppData/Roaming/npm/node_modules/lighthouse/node_modules/puppeteer-core");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const puppeteer = require(pptrPath);
const CHROME =
  process.env.CHROME_PATH ||
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);

/** Exported site: out/, or the NEXT_DIST_DIR folder when the build used one. */
const OUT = join(process.cwd(), process.env.NEXT_DIST_DIR || "out");
const PORT = Number(process.env.PORT || 4173);
const ORIGIN = `http://localhost:${PORT}`;
const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".mp4": "video/mp4",
  ".txt": "text/plain", ".xml": "application/xml", ".ico": "image/x-icon", ".woff2": "font/woff2",
};
const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0]);
  let f = join(OUT, url);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) {
    // behave like GitHub Pages: 404.html with status 404
    res.writeHead(404, { "content-type": MIME[".html"] });
    res.end(existsSync(join(OUT, "404.html")) ? readFileSync(join(OUT, "404.html")) : "404");
    return;
  }
  res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
});

type R = { name: string; ok: boolean; detail?: string };
const results: R[] = [];
const counts = { buttons: 0, links: 0, pages: 0 };
const check = (name: string, ok: boolean, detail?: string) => {
  results.push({ name, ok, detail });
  if (!ok) console.log(`  FAIL ${name}${detail ? " :: " + detail : ""}`);
};
const section = (s: string) => console.log("\n" + s);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
const locales = ["en", "ar"] as const;
/** registry path as rendered by the site (trailingSlash export) */
const H = (k: PageKey, l: "en" | "ar", p?: string) => norm(href(k, l, p));
/** As rendered: trailing slash before any #anchor. */
const norm = (x: string) => { const [path, anchor] = x.split("#"); const p = path.endsWith("/") ? path : path + "/"; return anchor ? `${p}#${anchor}` : p; };
/** A Rawasin place (hub, branch, section or tab), as rendered. */
const R = (place: RawasinPlace, l: "en" | "ar", param?: string) => norm(projectHref(rawasinLink(place, param), l));
/** Retired paths: static redirect pages in out/, not site pages. */
const redirectPaths = new Set([...localeRedirects.flatMap((r) => locales.map((l) => `/${l}${r.from}/`)), ...rootRedirects.map((r) => `${r.from}/`)]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Page = any;

async function open(page: Page, path: string) {
  const res = await page.goto(ORIGIN + path, { waitUntil: "networkidle0", timeout: 30000 });
  // Clicks before hydration finish are lost; the reveal controller flags that the client has booted.
  if (res && res.status() === 200) {
    await page.waitForFunction(() => document.documentElement.classList.contains("reveal-ready") || !document.querySelector("header"), { timeout: 8000 }).catch(() => {});
    await sleep(350);
  }
  return res?.status() ?? 0;
}
const pathOf = (page: Page) => new URL(page.url()).pathname;
/** Waits for the URL to match; an expected value with #anchor must match the hash too. */
async function waitPath(page: Page, expected: string, ms = 6000) {
  const t = Date.now();
  const at = () => { const u = new URL(page.url()); return expected.includes("#") ? u.pathname + u.hash : u.pathname; };
  while (Date.now() - t < ms) {
    if (at() === expected) { await sleep(150); return true; }
    await sleep(80);
  }
  return false;
}
const h1 = (page: Page): Promise<string> => page.evaluate(() => document.querySelector("h1")?.textContent?.trim() ?? "");
/** click the first visible element matching selector */
async function clickVisible(page: Page, selector: string) {
  const pt = await page.evaluate((sel: string) => {
    const el = [...document.querySelectorAll<HTMLElement>(sel)].find((e) => {
      const r = e.getBoundingClientRect();
      const cs = getComputedStyle(e);
      return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && !e.closest("[hidden]");
    });
    if (!el) return null;
    if (getComputedStyle(el).position !== "fixed" && !el.closest("header")) el.scrollIntoView({ block: "center", behavior: "instant" });
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, selector);
  if (!pt) return false;
  await page.mouse.move(pt.x, pt.y, { steps: 4 });
  await page.mouse.click(pt.x, pt.y);
  return true;
}
async function clickLink(page: Page, hrefPath: string) {
  return clickVisible(page, `a[href="${hrefPath}"]`);
}

async function main() {
  await new Promise<void>((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
  const consoleErrors = new Map<string, string>();
  const newPage = async (vp: object) => {
    const p = await browser.newPage();
    await p.setViewport(vp);
    p.on("pageerror", (e: Error) => { if (/Connection closed/.test(e.message)) return; /* navigation away from a redirect stub, not an app error */ consoleErrors.set(p.url() + e.message, `${p.url()} :: ${e.message}`); });
    p.on("dialog", (d: { dismiss: () => void }) => d.dismiss());
    return p;
  };

  try {
    // ------------------------------------------------------------------ header / menu / footer
    section("1. Desktop header, mega menu, footer, language switcher");
    const page = await newPage(DESKTOP);
    for (const l of locales) {
      await open(page, `/${l}/`);
      const nav: [PageKey, string][] = [["about", "about"], ["news", "news"], ["contact", "contact"]];
      for (const [key] of nav) {
        await open(page, `/${l}/`);
        const clicked = await clickVisible(page, `header nav a[href="${H(key, l)}"]`);
        const arrived = clicked && (await waitPath(page, H(key, l)));
        check(`[${l}] header nav -> ${key}`, !!arrived, clicked ? pathOf(page) : "link not visible");
        counts.links++;
      }
      // Our Developments: button opens menu; "All developments" link goes to /developments
      await open(page, `/${l}/`);
      await page.hover("header nav li button[aria-haspopup]");
      await sleep(250);
      const opened = await page.evaluate(() => document.querySelector("header nav li button[aria-haspopup]")?.getAttribute("aria-expanded"));
      check(`[${l}] mega menu opens on hover`, opened === "true");
      const menuLinks: string[] = await page.evaluate(() => [...document.querySelectorAll("header nav [data-menu-link]")].map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
      // Mega menu: featured project (first in the registry) with All Developments, Explore and one chip per branch.
      const expected = [R("rawasin", l), H("developments", l), R("residential", l), R("mall", l)];
      check(`[${l}] mega menu links match registry`, JSON.stringify([...menuLinks].sort()) === JSON.stringify([...expected].sort()), `${menuLinks.length} vs ${expected.length}`);
      await page.keyboard.press("Escape");
      await sleep(150);
      check(`[${l}] mega menu closes on Escape`, (await page.evaluate(() => document.querySelector("header nav li button[aria-haspopup]")?.getAttribute("aria-expanded"))) === "false");
      for (const target of expected) {
        await open(page, `/${l}/`);
        await page.hover("header nav li button[aria-haspopup]");
        await sleep(200);
        const clicked = await clickVisible(page, `header nav [data-menu-link][href="${target}"]`);
        const ok = clicked && (await waitPath(page, target));
        const heading = ok ? await h1(page) : "";
        check(`[${l}] mega menu -> ${target.replace(`/${l}`, "") || "/"}`, !!ok && heading.length > 0, ok ? "no h1" : `landed ${pathOf(page)}`);
        counts.links++;
      }
      // outside click closes
      await open(page, `/${l}/`);
      await page.hover("header nav li button[aria-haspopup]");
      await page.click("header nav li button[aria-haspopup]");
      await page.mouse.move(700, 600);
      await page.mouse.down(); await page.mouse.up();
      await sleep(200);
      check(`[${l}] mega menu closes on outside click`, (await page.evaluate(() => document.querySelector("header nav li button[aria-haspopup]")?.getAttribute("aria-expanded"))) === "false");

      // logo + Get in touch from a deep page
      const deep = R("mall-floor", l, "ground");
      await open(page, deep);
      await clickLink(page, `/${l}/`);
      check(`[${l}] logo -> home`, await waitPath(page, `/${l}/`), pathOf(page));
      await open(page, deep);
      await clickVisible(page, `header a[href="${H("contact", l)}"]`);
      check(`[${l}] header "Get in touch" -> contact`, await waitPath(page, H("contact", l)), pathOf(page));

      // footer: every link reaches its registry target
      await open(page, `/${l}/`);
      const footerLinks: string[] = await page.evaluate(() => [...document.querySelectorAll("footer a[href]")].map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
      const internal = [...new Set(footerLinks.filter((x) => x.startsWith("/")))];
      const registry = new Set([
        ...footerGroups.flatMap((g) => g.links.map((x) => H(x.key, l))),
        ...projectMenu(l).flatMap((pm) => pm.branches.flatMap((b) => b.links.map((x) => norm(x.href)))),
      ]);
      for (const r of registry) check(`[${l}] footer has registry link ${r.replace(`/${l}`, "") || "/"}`, internal.includes(r));
      for (const target of internal) {
        await open(page, `/${l}/`);
        const clicked = await clickVisible(page, `footer a[href="${target}"]`);
        const ok = clicked && (await waitPath(page, target));
        check(`[${l}] footer link -> ${target.replace(`/${l}`, "") || "/"}`, !!ok, ok ? "" : `landed ${pathOf(page)}`);
        counts.links++;
      }
      const ext: { href: string; target: string | null; rel: string | null }[] = await page.evaluate(() =>
        [...document.querySelectorAll("a[href]")].map((a) => ({ href: (a as HTMLAnchorElement).getAttribute("href")!, target: a.getAttribute("target"), rel: a.getAttribute("rel") })).filter((x) => /^(https?:|mailto:|tel:)/.test(x.href)));
      for (const e of ext) {
        if (e.href.startsWith("http")) check(`[${l}] external ${e.href.slice(0, 50)} opens safely`, e.target === "_blank" && /noopener/.test(e.rel ?? ""), `${e.target}/${e.rel}`);
      }

      // language switcher: same page in the other locale, html lang/dir flip, and back
      const samples = ["", "/about", "/developments", "/developments/rawasin", "/developments/rawasin/residential", "/developments/rawasin/mall", "/contact", "/news", "/careers", "/terms", "/privacy-policy"];
      const other = l === "en" ? "ar" : "en";
      for (const s of samples) {
        await open(page, `/${l}${s}`);
        await clickVisible(page, "header a[hreflang]");
        const ok = await waitPath(page, `/${other}${s}/`.replace(/\/\/$/, "/"));
        const attrs = await page.evaluate(() => ({ lang: document.documentElement.lang, dir: document.documentElement.dir }));
        check(`[${l}->${other}] switcher keeps page ${s || "/"}`, ok && attrs.lang === other && attrs.dir === (other === "ar" ? "rtl" : "ltr"), `${pathOf(page)} ${JSON.stringify(attrs)}`);
        counts.links++;
      }
    }

    // ------------------------------------------------------------------ breadcrumbs on every page
    section("2. Breadcrumbs: every crumb is an ancestor path that resolves");
    const sitemapPaths: string[] = [];
    {
      const walk = (d: string, base = ""): void => {
        for (const n of require("node:fs").readdirSync(d)) {
          const p = join(d, n);
          if (statSync(p).isDirectory()) walk(p, `${base}/${n}`);
          else if (n === "index.html" && (base.startsWith("/en") || base.startsWith("/ar")) && !redirectPaths.has(base + "/")) sitemapPaths.push(base + "/");
        }
      };
      walk(OUT);
    }
    counts.pages = sitemapPaths.length;
    for (const p of sitemapPaths) {
      await open(page, p);
      const crumbs: { href: string | null; text: string; current: boolean }[] = await page.evaluate(() =>
        [...document.querySelectorAll("nav[aria-label='Breadcrumb'] li")].map((li) => ({ href: li.querySelector("a")?.getAttribute("href") ?? null, text: li.textContent?.trim() ?? "", current: !!li.querySelector("[aria-current]") })));
      if (crumbs.length === 0) continue; // home
      const bad = crumbs.filter((c) => c.href && !(p === c.href ? false : p.startsWith(c.href) || c.href === `/${p.split("/")[1]}/`));
      check(`breadcrumb ancestors ${p}`, bad.length === 0, JSON.stringify(bad));
      check(`breadcrumb current page not a link ${p}`, crumbs[crumbs.length - 1].href === null);
    }

    // ------------------------------------------------------------------ legacy routes, 404, history
    section("3. Legacy redirects, unknown routes, refresh/back/forward");
    for (const [from, toPath] of [["/en/projects/", ""], ["/en/projects/rawasin/mall/", ""], ["/ar/projects/", ""]] as const) {
      const status = await open(page, from);
      await sleep(1500);
      check(`legacy ${from} resolves (status ${status}, lands ${pathOf(page)})`, status === 200 && (pathOf(page) !== from || (await page.evaluate(() => !!document.querySelector("a[href^='/'], a[href^='./']")))), toPath);
    }
    for (const from of ["/projects/", "/about/", "/news/", "/contact/", "/careers/", "/privacy-policy/", "/terms-of-use/"]) {
      const status = await open(page, from);
      await sleep(1200);
      const dest = pathOf(page);
      check(`legacy ${from} redirects into a locale (${status} -> ${dest})`, status === 200 && /^\/(en|ar)\//.test(dest), dest);
    }
    // Retired Rawasin sub-pages land on the right section, with the right tab open.
    for (const [from, to, tab] of [
      ["/en/developments/rawasin/commercial/mall/floors/ground/", R("mall-floor", "en", "ground"), "floors-ground-tab"],
      ["/ar/developments/rawasin/residential/apartments/type-3/", R("residential-apartment", "ar", "type-3"), ""],
      ["/en/developments/rawasin/commercial/mall/units/medical/", R("mall-unit", "en", "medical"), "units-medical-tab"],
      ["/en/developments/rawasin/commercial/mall/operations/", R("mall-operations", "en"), ""],
      ["/en/thank-you/", H("contact", "en"), ""],
    ] as const) {
      await open(page, from);
      const landed = await waitPath(page, to, 8000);
      await sleep(400);
      const selected = !tab || (await page.evaluate((id: string) => document.getElementById(id)?.getAttribute("aria-selected") === "true", tab));
      check(`retired ${from} -> ${to}${tab ? " (tab open)" : ""}`, landed && selected, `${page.url()} selected=${selected}`);
    }
    for (const bad of ["/en/nope/", "/en/developments/nope/", "/en/developments/rawasin/nope/", "/en/developments/rawasin/commercial/mall/floors/tenth/", "/ar/developments/rawasin/residential/apartments/type-9/", "/en/news/not-an-article/", "/xx/"]) {
      const status = await open(page, bad);
      const homeLink = await page.evaluate(() => !![...document.querySelectorAll("a[href]")].find((a) => /^\/(en|ar)?\/?$/.test((a as HTMLAnchorElement).getAttribute("href") ?? "")));
      check(`unknown route ${bad} -> 404 with escape link`, status === 404 && homeLink, `status ${status}, home link ${homeLink}`);
    }
    // refresh keeps page; back/forward
    await open(page, "/en/developments/");
    await clickLink(page, "/en/developments/rawasin/");
    await waitPath(page, "/en/developments/rawasin/");
    await clickLink(page, "/en/developments/rawasin/mall/");
    await waitPath(page, "/en/developments/rawasin/mall/");
    await page.reload({ waitUntil: "networkidle0" });
    check("refresh keeps deep page", pathOf(page) === "/en/developments/rawasin/mall/");
    await page.goBack({ waitUntil: "networkidle0" });
    check("back -> rawasin", pathOf(page) === "/en/developments/rawasin/", pathOf(page));
    await page.goBack({ waitUntil: "networkidle0" });
    check("back -> developments", pathOf(page) === "/en/developments/", pathOf(page));
    await page.goForward({ waitUntil: "networkidle0" });
    check("forward -> rawasin", pathOf(page) === "/en/developments/rawasin/", pathOf(page));
    // A tab deep link survives a refresh.
    await open(page, R("mall-floor", "en", "third"));
    await page.reload({ waitUntil: "networkidle0" });
    await sleep(500);
    check("refresh keeps the open tab", await page.evaluate(() => document.getElementById("floors-third-tab")?.getAttribute("aria-selected") === "true"));

    // ------------------------------------------------------------------ mobile
    section("4. Mobile drawer (390 px, touch)");
    const m = await newPage(MOBILE);
    for (const l of locales) {
      await open(m, `/${l}/`);
      const drawerHidden = () => m.evaluate(() => document.getElementById("mobile-menu")!.hidden);
      await m.tap("header button[aria-controls='mobile-menu']");
      await sleep(250);
      check(`[${l}] mobile menu opens`, !(await drawerHidden()));
      check(`[${l}] body scroll locked while open`, (await m.evaluate(() => document.body.style.overflow)) === "hidden");
      await m.keyboard.press("Escape");
      await sleep(200);
      check(`[${l}] Escape closes drawer`, await drawerHidden());
      await m.tap("header button[aria-controls='mobile-menu']");
      await sleep(250);
      await m.tap("#mobile-menu button[aria-label][aria-expanded]:not([aria-controls])").catch(() => {});
      await m.evaluate(() => document.querySelector<HTMLButtonElement>("#mobile-menu button[aria-label]:not(:first-of-type)")?.focus());
      await m.tap("#mobile-menu .container-x button:last-of-type").catch(() => {});
      // close via X
      await m.evaluate(() => (document.querySelector("#mobile-menu button") as HTMLButtonElement)?.click());
      await sleep(250);
      check(`[${l}] X closes drawer`, await drawerHidden());
      // main links
      for (const [key, label] of [["about", "about"], ["news", "news"], ["contact", "contact"], ["developments", "developments"]] as const) {
        await open(m, `/${l}/`);
        await m.tap("header button[aria-controls='mobile-menu']");
        await sleep(250);
        await m.tap(`#mobile-menu nav a[href="${H(key, l)}"]`);
        const ok = await waitPath(m, H(key, l));
        await sleep(200);
        check(`[${l}] mobile menu -> ${label}`, ok && (await drawerHidden()), pathOf(m));
        counts.links++;
      }
      // nested: expand Developments, visit every leaf
      const leaves = projectMenu(l).flatMap((pm) => [pm.href, ...pm.branches.flatMap((b) => b.links.map((x) => x.href))]).map(norm);
      for (const target of leaves) {
        await open(m, `/${l}/`);
        await m.tap("header button[aria-controls='mobile-menu']");
        await sleep(250);
        await m.tap("#mobile-menu li:nth-child(3) button[aria-expanded]");
        await sleep(200);
        const tapped = await m.evaluate((target: string) => {
          const a = document.querySelector<HTMLAnchorElement>(`#mobile-menu a[href="${target}"]`);
          if (!a) return false;
          a.scrollIntoView({ block: "center", behavior: "instant" });
          return true;
        }, target);
        if (tapped) await m.tap(`#mobile-menu a[href="${target}"]`);
        const ok = tapped && (await waitPath(m, target));
        check(`[${l}] mobile nested -> ${target.replace(`/${l}/developments`, "")}`, !!ok, tapped ? m.url() : "leaf missing in drawer");
        counts.links++;
      }
      // language + CTA inside drawer
      await open(m, H("about", l));
      await m.tap("header button[aria-controls='mobile-menu']");
      await sleep(250);
      await m.tap("#mobile-menu a[hreflang]");
      const other = l === "en" ? "ar" : "en";
      check(`[${l}] drawer language switch -> ${other} same page`, await waitPath(m, H("about", other)), pathOf(m));
      await open(m, `/${l}/`);
      await m.tap("header button[aria-controls='mobile-menu']");
      await sleep(250);
      await m.tap(`#mobile-menu > div a[href="${H("contact", l)}"]`);
      check(`[${l}] drawer CTA -> contact`, await waitPath(m, H("contact", l)), pathOf(m));
      // no horizontal overflow on a few pages
      for (const s of ["", "/developments/rawasin/", "/developments/rawasin/residential/", "/developments/rawasin/mall/", "/contact/"]) {
        await open(m, `/${l}${s}`);
        const over = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        check(`[${l}] mobile no horizontal overflow ${s || "/"}`, over <= 1, `${over}px`);
      }
    }
    await m.close();

    // ------------------------------------------------------------------ galleries & widgets
    section("5. Galleries, floor explorer, apartment cards, filters");
    for (const l of locales) {
      // lightbox: residential page galleries
      await open(page, R("residential-architecture", l));
      const opened = await clickVisible(page, "main [role='list'] button, main section button[aria-haspopup='dialog'], main .snap-x button");
      check(`[${l}] residential gallery frame opens lightbox`, opened && (await page.evaluate(() => !!document.querySelector("[role='dialog']:not(#mobile-menu)"))));
      if (opened) {
        const counter = () => page.evaluate(() => document.querySelector("[role='dialog']:not(#mobile-menu)")?.textContent ?? "");
        const c0 = await counter();
        await page.keyboard.press("ArrowRight"); await sleep(250);
        const c1 = await counter();
        check(`[${l}] lightbox ArrowRight changes image`, c0 !== c1);
        await page.keyboard.press("ArrowLeft"); await sleep(250);
        check(`[${l}] lightbox ArrowLeft returns`, (await counter()) === c0);
        await page.keyboard.press("Escape"); await sleep(250);
        check(`[${l}] lightbox Escape closes`, await page.evaluate(() => !document.querySelector("[role='dialog']:not(#mobile-menu)")));
      }
      // mall gallery -> lightbox via button
      await open(page, R("mall-lifestyle", l));
      const mg = await clickVisible(page, "main button[aria-haspopup='dialog'], main button[aria-label]:has(img)");
      check(`[${l}] mall gallery opens lightbox`, mg && (await page.evaluate(() => !!document.querySelector("[role='dialog']:not(#mobile-menu)"))));
      await page.keyboard.press("Escape");

      // Tabs: click, deep link, keyboard, and same-page links (floor cards).
      const tabState = (base: string) =>
        page.evaluate((b: string) => {
          const tabs = [...document.querySelectorAll<HTMLElement>(`[role=tab][id^="${b}-"]`)].filter((t) => t.id.endsWith("-tab"));
          const sel = tabs.filter((t) => t.getAttribute("aria-selected") === "true").map((t) => t.id);
          const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")!)).filter((x) => x && !x.hidden).map((x) => x!.id);
          return { n: tabs.length, sel, panels, hash: location.hash };
        }, base);
      const groups: [string, RawasinPlace, string[]][] = [
        ["floors", "mall-floor", ["basement", "ground", "first", "second", "third"]],
        ["units", "mall-unit", ["retail", "medical"]],
      ];
      for (const [base, place, ids] of groups) {
        // Deep link to the first tab: opens its chapter (only one chapter is shown at a time).
        await open(page, R(place, l, ids[0]));
        await sleep(300);
        const st0 = await tabState(base);
        check(`[${l}] ${base}: ${ids.length} tabs, first open, one panel visible`, st0.n === ids.length && st0.sel[0] === `${base}-${ids[0]}-tab` && st0.panels.length === 1, JSON.stringify(st0));
        for (const id of ids) {
          const ok = await clickVisible(page, `#${base}-${id}-tab`);
          await sleep(200);
          const st = await tabState(base);
          check(`[${l}] ${base} tab ${id} opens its panel and sets #${base}-${id}`, ok && st.sel.join() === `${base}-${id}-tab` && st.panels.join() === `${base}-${id}` && st.hash === `#${base}-${id}`, JSON.stringify(st));
          counts.links++;
        }
        // keyboard: the next-tab arrow follows reading direction
        await clickVisible(page, `#${base}-${ids[0]}-tab`);
        await page.focus(`#${base}-${ids[0]}-tab`);
        await page.keyboard.press(l === "ar" ? "ArrowLeft" : "ArrowRight");
        await sleep(150);
        const kb = await tabState(base);
        check(`[${l}] ${base}: arrow key moves to the next tab`, kb.sel.join() === `${base}-${ids[1]}-tab` && (await page.evaluate(() => document.activeElement?.id)) === `${base}-${ids[1]}-tab`, JSON.stringify(kb));
        // deep link opens the last tab
        await open(page, R(place, l, ids[ids.length - 1]));
        await sleep(300);
        check(`[${l}] ${base}: deep link opens tab ${ids[ids.length - 1]}`, (await tabState(base)).sel.join() === `${base}-${ids[ids.length - 1]}-tab`);
      }
      // floor cards are same-page links: clicking one must open that floor's tab
      for (const f of ["basement", "ground", "first", "second", "third"]) {
        await open(page, R("mall-floors", l));
        const ok = await clickVisible(page, `main a[href="${R("mall-floor", l, f)}"]`);
        await sleep(400);
        const st = await tabState("floors");
        check(`[${l}] floor card ${f} opens its tab`, ok && st.sel.join() === `floors-${f}-tab`, JSON.stringify(st));
        counts.links++;
      }
      // home hero: slider next/dots
      await open(page, `/${l}/`);
      const dots = await page.evaluate(() => document.querySelectorAll("section button[aria-label]").length);
      check(`[${l}] home hero controls present`, dots > 0);
    }

    // ------------------------------------------------------------------ forms
    section("6. Forms (static build: no NEXT_PUBLIC_LEADS_ENDPOINT, so a valid submit must say so, never fake success)");
    for (const l of locales) {
      await open(page, H("contact", l));
      await page.click("form button[type=submit]");
      await sleep(250);
      const invalid = await page.evaluate(() => document.querySelectorAll("form [aria-invalid='true']").length);
      check(`[${l}] contact: empty submit flags required fields`, invalid >= 3, `${invalid} invalid`);
      check(`[${l}] contact: focus moves to first invalid field`, await page.evaluate(() => document.activeElement?.getAttribute("name") === "name"));
      await page.type("form input[name=name]", "Test User");
      await page.type("form input[name=email]", "not-an-email");
      await page.type("form input[name=phone]", "+20 100 000 0000");
      await page.click("form button[type=submit]");
      await sleep(200);
      check(`[${l}] contact: bad email rejected`, await page.evaluate(() => document.querySelector("form input[name=email]")?.getAttribute("aria-invalid") === "true"));
      await page.click("form input[name=email]", { clickCount: 3 });
      await page.type("form input[name=email]", "test@example.org");
      await page.click("form button[type=submit]");
      await sleep(200);
      check(`[${l}] contact: missing consent rejected`, await page.evaluate(() => document.querySelector("form input[type=checkbox]")?.getAttribute("aria-invalid") === "true"));
      await page.click("form input[type=checkbox]");
      await page.click("form button[type=submit]");
      await sleep(400);
      const msg = await page.evaluate(() => document.querySelector("form [role=status]")?.textContent?.trim() ?? "");
      check(`[${l}] contact: valid submit with no endpoint shows explicit not-configured message (no fake success)`, msg.length > 0 && !/success|thank|شكر/i.test(msg), msg);
      // subject selector works
      const subj = await page.$$eval("form select option", (o: HTMLOptionElement[]) => o.map((x) => x.value));
      await page.select("form select", subj[subj.length - 1]);
      check(`[${l}] contact: subject select changes`, (await page.$eval("form select", (s: HTMLSelectElement) => s.value)) === subj[subj.length - 1]);
      // privacy link inside form
      await clickVisible(page, `form a[href="${H("privacy", l)}"]`);
      check(`[${l}] contact: privacy link -> privacy`, await waitPath(page, H("privacy", l)), pathOf(page));
    }
    // enquiry CTAs: from journeys pages they must land on a working form
    for (const l of locales) {
      // Enquire chapters of the branch pages (one chapter is visible at a time).
      for (const p of [norm(projectHref({ project: "rawasin", branch: "residential", anchor: "enquire" }, l)), norm(projectHref({ project: "rawasin", branch: "mall", anchor: "enquire" }, l))]) {
        await open(page, p);
        await sleep(300);
        const hasForm = await page.evaluate(() => [...document.querySelectorAll("form")].some((f) => !f.closest("[hidden]")));
        const cta = await page.evaluate(() => [...document.querySelectorAll("main a[href]")].map((a) => (a as HTMLAnchorElement).getAttribute("href")!).filter((h) => /contact|#enquire|#enquiry-form/.test(h)));
        check(`[${l}] ${p.replace(`/${l}/developments/rawasin`, "")} has a contact path (form or CTA)`, hasForm || cta.length > 0, JSON.stringify(cta));
        if (hasForm) {
          await clickVisible(page, "form button[type=submit]");
          await sleep(250);
          check(`[${l}] ${p.slice(-30)} inquiry form validates`, (await page.evaluate(() => document.querySelectorAll("form [aria-invalid='true']").length)) >= 3);
        }
      }
    }
    // careers apply modal
    for (const l of locales) {
      await open(page, H("careers", l));
      const opened = await clickVisible(page, "main button[type=button]");
      await sleep(300);
      check(`[${l}] careers apply button opens form`, opened && (await page.evaluate(() => !!document.querySelector("form"))));
      if (opened) {
        await page.click("form button[type=submit]");
        await sleep(250);
        check(`[${l}] careers form validates`, (await page.evaluate(() => document.querySelectorAll("form [aria-invalid='true']").length)) >= 1);
        await page.keyboard.press("Escape");
        await sleep(250);
        const stillOpen = await page.evaluate(() => !!document.querySelector("form"));
        if (stillOpen) {
          const closed = await page.evaluate(() => {
            const b = [...document.querySelectorAll("button")].find((x) => /close|إغلاق/i.test(x.getAttribute("aria-label") ?? x.textContent ?? ""));
            b?.click();
            return !!b;
          });
          await sleep(250);
          check(`[${l}] careers form closes (Escape or close button)`, closed && (await page.evaluate(() => !document.querySelector("form"))));
        } else check(`[${l}] careers form closes with Escape`, true);
      }
    }
    // news filters
    for (const l of locales) {
      await open(page, H("news", l));
      const filters = await page.evaluate(() => [...document.querySelectorAll("main button[aria-pressed]")].length);
      check(`[${l}] news filter buttons expose state`, filters === 0 || filters > 1, `${filters}`);
    }

    // ------------------------------------------------------------------ dead-button sweep
    section("7. Dead-button sweep: click every visible enabled button on every page, desktop and mobile");
    const dead: string[] = [];
    const fingerprint = (p: Page) =>
      p.evaluate(() => JSON.stringify({
        u: location.href, h: document.body.innerHTML, sx: [...document.querySelectorAll("ul,div")].reduce((a, n) => a + n.scrollLeft, 0), y: Math.round(scrollY),
        e: [...document.querySelectorAll("[aria-expanded],[aria-pressed],[aria-selected],[aria-current]")].map((x) => x.getAttribute("aria-expanded") + x.getAttribute("aria-pressed") + x.getAttribute("aria-selected")).join(""),
        f: document.activeElement?.tagName + (document.activeElement as HTMLElement | null)?.id,
        c: document.documentElement.className + document.body.style.cssText,
        d: document.querySelectorAll("[role=dialog]:not([hidden])").length,
      }));
    for (const [label, vp] of process.env.SKIP_SWEEP ? [] : ([["desktop", DESKTOP], ["mobile", MOBILE]] as const)) {
      const s = await newPage(vp);
      for (const p of sitemapPaths) {
        await open(s, p);
        await s.addStyleTag({ content: "*{animation:none!important;transition:none!important}" });
        const n: number = await s.evaluate(() => document.querySelectorAll("button").length);
        for (let i = 0; i < n; i++) {
          const info = await s.evaluate((idx: number) => {
            const b = document.querySelectorAll("button")[idx] as HTMLButtonElement;
            if (!b || b.disabled || b.type === "submit") return null;
            const r = b.getBoundingClientRect();
            if (r.width === 0 || r.height === 0 || getComputedStyle(b).visibility === "hidden" || b.closest("[hidden]")) return null;
            if (b.closest("[aria-hidden='true']") || b.closest("[inert]")) return null;
            // already-selected tabs/filters are legitimately a no-op when clicked
            if (b.getAttribute("aria-pressed") === "true" || b.getAttribute("aria-selected") === "true" || b.getAttribute("aria-current")) return null;
            b.scrollIntoView({ block: "center", behavior: "instant" });
            const r2 = b.getBoundingClientRect();
            if (r2.x + r2.width / 2 > innerWidth || r2.x + r2.width / 2 < 0) return null; // scrolled-away rail frame: not clickable until the strip moves
            return { label: (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 40), x: r2.x + r2.width / 2, y: r2.y + r2.height / 2 };
          }, i);
          if (!info) continue;
          counts.buttons++;
          const before = await fingerprint(s);
          await s.mouse.click(info.x, info.y);
          await sleep(750);
          const after = await fingerprint(s);
          if (before === after) dead.push(`${label} ${p} button#${i} "${info.label}"`);
          if (pathOf(s) !== p) { await open(s, p); await s.addStyleTag({ content: "*{animation:none!important;transition:none!important}" }); }
          else if (JSON.parse(after).d > JSON.parse(before).d) { await s.keyboard.press("Escape"); await sleep(500); /* let the lightbox close before the next click */ }
        }
      }
      await s.close();
    }
    check(`no dead buttons (${counts.buttons} clicks)`, dead.length === 0, dead.slice(0, 30).join(" | "));
    if (dead.length) console.log(dead.join("\n"));

    // ------------------------------------------------------------------ journeys
    section("8. Journeys A-F (click-through)");
    for (const l of locales) {
      const nav = async (selector: string, expected: string, name: string) => {
        const ok = await clickVisible(page, selector);
        const landed = ok && (await waitPath(page, expected));
        check(`[${l}] ${name}`, !!landed, ok ? `landed ${pathOf(page)}` : `no visible ${selector}`);
        return !!landed;
      };
      const offersContact = () => page.evaluate(() => [...document.querySelectorAll("main a[href], main form")].some((e) => e.tagName === "FORM" || /contact|#enquir/.test((e as HTMLAnchorElement).getAttribute("href") ?? "")));
      const tabOpen = (id: string) => page.evaluate((x: string) => document.getElementById(x)?.getAttribute("aria-selected") === "true", id);
      // A corporate
      await open(page, `/${l}/`);
      await nav(`header nav a[href="${H("about", l)}"]`, H("about", l), "A: home -> about");
      await nav(`header nav li button[aria-haspopup] ~ div [data-menu-link][href="${H("developments", l)}"], main a[href="${H("developments", l)}"]`, H("developments", l), "A: about -> developments").catch(() => {});
      if (pathOf(page) !== H("developments", l)) await open(page, H("developments", l));
      await nav(`main a[href="${R("rawasin", l)}"]`, R("rawasin", l), "A: developments -> rawasin");
      // B residential: hub card -> residential, section nav -> apartments, tab -> type-1
      await nav(`main a[href="${R("residential", l)}"]`, R("residential", l), "B: rawasin -> residential");
      await nav(`nav a[href="#apartments"]`, R("residential-apartments", l), "B: section nav -> apartments");
      check(`[${l}] B: all five apartment cards are shown`, (await page.evaluate(() => ["type-1", "type-2", "type-3", "type-4", "type-5"].every((t) => { const a = document.getElementById(`apartments-${t}`); return !!a && !a.closest("[hidden]"); }))));
      check(`[${l}] B: residential offers contact (form or CTA)`, await offersContact());
      // C commercial: hub card -> mall, section nav -> floors, floor card -> ground tab
      await open(page, R("rawasin", l));
      await nav(`main a[href="${R("mall", l)}"]`, R("mall", l), "C: rawasin -> mall");
      await nav(`nav a[href="#floors"]`, R("mall-floors", l), "C: section nav -> floors");
      await clickVisible(page, `main a[href="${R("mall-floor", l, "ground")}"]`);
      await sleep(400);
      check(`[${l}] C: floor card opens the ground-floor tab`, await tabOpen("floors-ground-tab"));
      check(`[${l}] C: mall offers contact (form or CTA)`, await offersContact());
      // D medical: hub section chip -> mall #medical
      await open(page, R("rawasin", l));
      await nav(`main a[href="${R("mall-medical", l)}"]`, R("mall-medical", l), "D: rawasin -> mall medical section");
      // F contact flow from the hub's partnership CTA
      await open(page, R("rawasin", l));
      await nav(`main a[href^="${H("contact", l)}"]`, H("contact", l), "F: hub CTA -> contact").catch(() => {});
    }

    section("9. Runtime errors");
    check("no uncaught page errors", consoleErrors.size === 0, [...consoleErrors.values()].slice(0, 5).join(" | "));
  } finally {
    await browser.close();
    server.close();
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\npages: ${counts.pages}  checks: ${results.length}  passed: ${results.length - failed.length}  failed: ${failed.length}`);
  console.log(`link clicks: ${counts.links}  button clicks (sweep): ${counts.buttons}`);
  if (failed.length) {
    console.log("\nFAILED:");
    for (const f of failed) console.log(` - ${f.name}${f.detail ? " :: " + f.detail : ""}`);
    process.exit(1);
  }
}

main().catch((e) => { console.error(e); server.close(); process.exit(2); });
