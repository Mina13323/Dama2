"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type LightboxItem = { src: string; thumb: string; alt: string };
export type LightboxLabels = { close: string; prev: string; next: string; counter: string };

const ctrl =
  "inline-flex size-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:bg-white hover:text-ink";

/**
 * Full-screen viewer: keyboard (Esc, arrows), swipe, focus return, and a thumbnail strip that shows
 * the active image. Full-size files load only for the current slide; the strip uses small variants.
 */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
  labels,
}: {
  items: LightboxItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  labels: LightboxLabels;
}) {
  const total = items.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const go = useCallback((dir: 1 | -1) => onIndex((index + dir + total) % total), [index, total, onIndex]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  useEffect(() => {
    const el = stripRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  const item = items[index];
  const counter = labels.counter.replace("{n}", String(index + 1)).replace("{total}", String(total));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        const rtl = document.documentElement.dir === "rtl";
        if (Math.abs(dx) > 50) go((dx < 0) !== rtl ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <p className="text-small text-white/70" aria-live="polite" dir="ltr">{counter}</p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={labels.close} className={ctrl}>
          <X aria-hidden className="size-5" />
        </button>
      </div>
      <div className="relative min-h-0 flex-1">
        <Image key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" className="enter-fade object-contain" />
        <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={`${ctrl} absolute start-3 top-1/2 hidden -translate-y-1/2 bg-ink/40 sm:inline-flex`}>
          <ArrowLeft aria-hidden className="flip-rtl size-5" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label={labels.next} className={`${ctrl} absolute end-3 top-1/2 hidden -translate-y-1/2 bg-ink/40 sm:inline-flex`}>
          <ArrowRight aria-hidden className="flip-rtl size-5" />
        </button>
      </div>
      <ul ref={stripRef} className="flex shrink-0 gap-2 overflow-x-auto px-4 py-4 [scrollbar-width:none] sm:justify-center sm:px-8">
        {items.map((it, i) => (
          <li key={it.thumb} className="shrink-0">
            <button
              type="button"
              onClick={() => onIndex(i)}
              aria-label={`${i + 1} / ${total}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative block h-14 w-20 overflow-hidden rounded-md border-2 transition-all duration-200 ${i === index ? "border-red-primary opacity-100" : "border-transparent opacity-55 hover:opacity-90"}`}
            >
              <Image src={it.thumb} alt="" fill sizes="80px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
