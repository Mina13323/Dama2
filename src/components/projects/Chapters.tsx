"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useHashLinks } from "./useHashLinks";

type Chapter = { id: string; label: string };

/**
 * Chapter switcher for long project pages: one chapter is shown at a time and
 * swaps in place with a fade-and-rise. A red pill glides to the active chapter,
 * a progress line fills with the chapter number, and each chapter ends with
 * previous/next links.
 *
 * Every panel is server-rendered and stays in the HTML (inactive ones `hidden`),
 * so all content is crawlable. Any #anchor inside a panel (a chapter, a block, or
 * a tab such as #apartments-type-3) opens the chapter that contains it.
 */
export function Chapters({ chapters, panels, label, labels }: { chapters: Chapter[]; panels: ReactNode[]; label: string; labels: { prev: string; next: string } }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const ids = chapters.map((c) => c.id).join("|");

  /** Scroll so the chapter bar sits at the top, if the reader is below it. */
  const toTop = useCallback((force = false) => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    if (force || window.scrollY > top) window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);

  // Scroll requests run after React has committed the newly shown chapter (see effect below).
  const pending = useRef<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const open = useCallback(
    (i: number, opts: { hash?: string; scrollTo?: string } = {}) => {
      setActive(i);
      window.history.replaceState(null, "", `#${opts.hash ?? ids.split("|")[i]}`);
      pending.current = opts.scrollTo ?? "";
      setNonce((n) => n + 1);
    },
    [ids],
  );
  useEffect(() => {
    if (pending.current === null) return;
    const id = pending.current;
    pending.current = null;
    const raf = requestAnimationFrame(() => {
      // A chapter id brings the chapter bar to the top; anything inside a chapter scrolls to itself.
      if (id && ids.split("|").includes(id)) return toTop(true);
      const target = id && document.getElementById(id);
      if (target) target.scrollIntoView({ block: "start" });
      else toTop();
    });
    return () => cancelAnimationFrame(raf);
  }, [nonce, toTop, ids]);

  /** Open the chapter holding the element named by the URL hash. */
  const fromHash = useCallback(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    const i = ids.split("|").indexOf(hash);
    if (i >= 0) return open(i, { hash, scrollTo: hash });
    const panel = document.getElementById(hash)?.closest<HTMLElement>("[data-chapter]");
    const j = panel ? ids.split("|").indexOf(panel.dataset.chapter!) : -1;
    if (j >= 0) open(j, { hash, scrollTo: hash });
  }, [ids, open]);

  useEffect(() => {
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [fromHash]);
  useHashLinks();

  // Glide the pill under the active chapter, and keep it in view on narrow screens.
  useLayoutEffect(() => {
    const measure = () => {
      const a = links.current[active];
      if (a) setPill({ left: a.offsetLeft, width: a.offsetWidth });
    };
    measure();
    const l = list.current;
    const a = links.current[active];
    if (l && a && l.scrollWidth > l.clientWidth) l.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const n = chapters.length;
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div ref={root}>
      <nav data-chapter-nav aria-label={label} className="sticky top-[60px] z-30 border-y border-white bg-cream/90 shadow-soft backdrop-blur-md">
        <ul ref={list} className="no-scrollbar frame-wide relative flex gap-1 overflow-x-auto py-2.5">
          {pill && (
            <li aria-hidden className="pointer-events-none absolute top-2.5 h-10 rounded-full bg-red-primary shadow-red transition-[left,width] duration-500 ease-soft motion-reduce:transition-none" style={{ left: pill.left, width: pill.width }} />
          )}
          {chapters.map((c, i) => (
            <li key={c.id} className="shrink-0">
              <a
                ref={(el) => {
                  links.current[i] = el;
                }}
                href={`#${c.id}`}
                aria-current={i === active ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  open(i);
                }}
                className={`relative z-10 flex min-h-10 items-center gap-2 rounded-full px-4 text-small whitespace-nowrap transition-colors duration-300 ${i === active ? "font-semibold text-white" : "font-medium text-ink/65 hover:text-red-primary"}`}
              >
                <span className={`text-micro tabular-nums ${i === active ? "text-white/75" : "text-red-primary/70"}`}>{num(i)}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Progress: how far through the chapters the reader is. */}
        <div aria-hidden className="h-[2px] bg-border">
          <div className="h-full origin-left bg-red-primary transition-transform duration-700 ease-soft motion-reduce:transition-none rtl:origin-right" style={{ transform: `scaleX(${(active + 1) / n})` }} />
        </div>
      </nav>

      {panels.map((panel, i) => (
        <div key={chapters[i].id} id={chapters[i].id} data-chapter={chapters[i].id} hidden={i !== active} aria-label={chapters[i].label} role="region" className="chapter-in scroll-mt-36">
          {panel}
          {n > 1 && (
            <nav data-chapter-nav aria-label={label} className="bg-cream py-12 sm:py-16">
              <div className="frame-wide grid gap-3 sm:grid-cols-2">
                {i > 0 ? (
                  <a href={`#${chapters[i - 1].id}`} onClick={(e) => { e.preventDefault(); open(i - 1); }} className="group flex items-center gap-4 rounded-card border border-white bg-white/85 p-5 shadow-card transition-colors hover:border-red-primary/30 sm:p-6">
                    <ArrowLeft aria-hidden className="flip-rtl size-5 shrink-0 text-red-primary transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                    <span>
                      <span className="block text-caption font-bold tracking-[0.16em] text-subtle uppercase rtl:tracking-normal">{labels.prev} · {num(i - 1)}</span>
                      <span className="mt-1 block font-display text-xl text-ink">{chapters[i - 1].label}</span>
                    </span>
                  </a>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {i < n - 1 && (
                  <a href={`#${chapters[i + 1].id}`} onClick={(e) => { e.preventDefault(); open(i + 1); }} className="group flex items-center justify-end gap-4 rounded-card bg-red-primary p-5 text-end text-white shadow-red-lift transition-colors hover:bg-red-dark sm:p-6">
                    <span>
                      <span className="block text-caption font-bold tracking-[0.16em] text-white/75 uppercase rtl:tracking-normal">{labels.next} · {num(i + 1)}</span>
                      <span className="mt-1 block font-display text-xl">{chapters[i + 1].label}</span>
                    </span>
                    <ArrowRight aria-hidden className="flip-rtl size-5 shrink-0 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </a>
                )}
              </div>
            </nav>
          )}
        </div>
      ))}
    </div>
  );
}
