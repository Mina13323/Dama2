"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Lightbox, type LightboxLabels } from "./Lightbox";

export type RailImage = { sm: string; lg: string; w: number; h: number; alt: string; pos?: string };

/**
 * Horizontal film-strip gallery. Native scroll-snap (touch swipe works everywhere), mouse drag on
 * desktop, arrow buttons, a progress bar for the active position, and the shared lightbox.
 * Frames take their width from the image's own aspect ratio, so nothing is cropped or stretched.
 */
export function RailGallery({ images, labels, prevLabel, nextLabel }: { images: RailImage[]; labels: LightboxLabels; prevLabel: string; nextLabel: string }) {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = Math.abs(el.scrollLeft);
    setProgress(max > 0 ? x / max : 0);
    setAtEnd(max <= 0 || x >= max - 2);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const rtl = document.documentElement.dir === "rtl";
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn = "inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-ink transition-colors hover:border-red-primary hover:text-red-primary disabled:opacity-40";

  return (
    <div>
      <ul
        ref={track}
        onScroll={measure}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { x: e.clientX, left: track.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !track.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          if (d.moved) {
            track.current.style.scrollSnapType = "none";
            track.current.scrollLeft = d.left - dx;
          }
        }}
        onPointerUp={() => {
          if (track.current) track.current.style.scrollSnapType = "";
          setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => {
          if (drag.current?.moved && track.current) track.current.style.scrollSnapType = "";
          drag.current = null;
        }}
        className="flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {images.map((im, i) => (
          <li key={im.sm} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={(e) => {
                if (drag.current?.moved) return;
                trigger.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`${i + 1} / ${images.length}`}
              className="group relative block h-[240px] overflow-hidden rounded-xl bg-stone sm:h-[340px] lg:h-[400px]"
              style={{ aspectRatio: `${im.w} / ${im.h}` }}
            >
              <Image
                src={im.sm}
                alt={im.alt}
                fill
                loading={i < 2 ? "eager" : "lazy"}
                draggable={false}
                sizes="(min-width:1024px) 540px, 80vw"
                className="select-none object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-[1.04]"
                style={{ objectPosition: im.pos }}
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span aria-hidden className="absolute bottom-3 end-3 inline-flex size-9 items-center justify-center rounded-full bg-red-primary text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-5">
        <div aria-hidden className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-border">
          <span className="absolute inset-y-0 start-0 rounded-full bg-red-primary transition-[width] duration-200" style={{ width: `${Math.round(15 + progress * 85)}%` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} aria-label={prevLabel} disabled={progress <= 0.005} className={btn}>
            <ArrowLeft aria-hidden className="flip-rtl size-4" />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label={nextLabel} disabled={atEnd} className={btn}>
            <ArrowRight aria-hidden className="flip-rtl size-4" />
          </button>
        </div>
      </div>

      {open !== null && (
        <Lightbox
          items={images.map((im) => ({ src: im.lg, thumb: im.sm, alt: im.alt }))}
          index={open}
          onIndex={setOpen}
          onClose={() => {
            setOpen(null);
            trigger.current?.focus();
          }}
          labels={labels}
        />
      )}
    </div>
  );
}
