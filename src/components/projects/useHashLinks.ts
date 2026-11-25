"use client";

import { useEffect } from "react";

let users = 0;

/**
 * Same-page #anchor links (e.g. a floor card pointing at #floors-second) must
 * reach Tabs and Chapters. Next's <Link> updates the hash with pushState, which
 * fires no hashchange, and does so after a delay. So while any Tabs/Chapters is
 * mounted, clicks on same-page hash links are taken over here: the hash is pushed
 * directly and a real `hashchange` is dispatched for the components to react to.
 */
function onClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
  const url = new URL(a.href, location.href);
  const here = new URL(location.href);
  const norm = (p: string) => p.replace(/\/$/, "");
  if (url.origin !== here.origin || norm(url.pathname) !== norm(here.pathname) || !url.hash) return;
  // Only take over when the target is on this page; anything else keeps normal behaviour.
  if (!document.getElementById(decodeURIComponent(url.hash.slice(1)))) return;
  e.preventDefault(); // Next's <Link> skips handling when the click is already prevented.
  if (url.hash !== here.hash) history.pushState(history.state, "", url.hash);
  window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL: here.href, newURL: url.href }));
}

export function useHashLinks() {
  useEffect(() => {
    // Capture phase on document runs before React's root listener (where <Link> handles clicks).
    if (users++ === 0) document.addEventListener("click", onClick, true);
    return () => {
      if (--users === 0) document.removeEventListener("click", onClick, true);
    };
  }, []);
}
