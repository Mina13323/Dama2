"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useHashLinks } from "./useHashLinks";

/**
 * Accessible tabs for project sections (apartment types, floors, unit types).
 *
 * Every panel is rendered on the server and kept in the HTML (inactive ones are
 * `hidden`), so all content stays crawlable. Each panel is addressable by hash:
 * /…/residential#apartments-type-3 opens that tab and scrolls to it.
 */
export function Tabs({ idBase, tabs, label, panels }: { idBase: string; tabs: { id: string; label: string }[]; label: string; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = (i: number) => `${idBase}-${tabs[i].id}`;

  // Tab ids as a stable key: `tabs` is a new array on every render.
  const ids = tabs.map((t) => t.id).join("|");
  const fromHash = useCallback(() => {
    const i = ids.split("|").findIndex((id) => `#${idBase}-${id}` === window.location.hash);
    if (i < 0) return;
    setActive(i);
    requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" }));
  }, [idBase, ids]);

  useEffect(() => {
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [fromHash]);
  useHashLinks();

  const select = (i: number, focus = false) => {
    setActive(i);
    // Keep the URL shareable without adding history entries or jumping the page.
    window.history.replaceState(null, "", `#${panelId(i)}`);
    if (focus) buttons.current[i]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const rtl = document.documentElement.dir === "rtl";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const prev = rtl ? "ArrowRight" : "ArrowLeft";
    const n = tabs.length;
    if (e.key === next) select((active + 1) % n, true);
    else if (e.key === prev) select((active - 1 + n) % n, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(n - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <div className="bg-canvas pt-12 sm:pt-16">
      <div className="frame-wide">
        <div role="tablist" aria-label={label} onKeyDown={onKey} className="no-scrollbar flex gap-1.5 overflow-x-auto rounded-full border border-border bg-white p-1.5 sm:inline-flex">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${panelId(i)}-tab`}
              aria-selected={i === active}
              aria-controls={panelId(i)}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              className="inline-flex min-h-10 shrink-0 items-center rounded-full px-4.5 text-small font-medium whitespace-nowrap text-ink/70 transition-colors hover:text-red-primary aria-selected:bg-red-primary aria-selected:font-semibold aria-selected:text-white"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {panels.map((panel, i) => (
        <div key={tabs[i]?.id ?? i} role="tabpanel" id={panelId(i)} aria-labelledby={`${panelId(i)}-tab`} hidden={i !== active} className="scroll-mt-36">
          {panel}
        </div>
      ))}
    </div>
  );
}
