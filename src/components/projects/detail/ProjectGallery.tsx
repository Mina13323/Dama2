"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Expand } from "lucide-react";
import type { Dictionary } from "@/content";
import { Lines, stagger } from "../../motion/Lines";
import { Lightbox } from "../../media/Lightbox";
import { fill } from "../format";

/* Asymmetric layout: a tall lead image, then a rhythm of wide and square tiles. */
const tile = ["sm:col-span-2 sm:row-span-2", "sm:col-span-2", "", "", "sm:col-span-4"];

/** Staged renders ship as -sm (900 px) and -lg (2400 px): the grid loads the small file, the lightbox the large one. */
const thumbOf = (src: string) => src.replace("-lg.webp", "-sm.webp");

export function ProjectGallery({ images, name, labels }: { images: string[]; name: string; labels: Dictionary["projectDetail"]["gallery"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const total = images.length;
  const alt = (i: number) => fill(labels.alt, { name, n: i + 1 });

  const close = () => {
    setOpen(null);
    triggerRef.current?.focus();
  };

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-36 bg-cream">
      <div className="frame-wide py-20 sm:py-24 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div data-reveal="fade" className="flex items-center gap-3">
              <span className="h-[2px] w-4 rounded-full bg-red-primary" aria-hidden />
              <p className="text-micro font-medium tracking-[0.28em] text-muted uppercase rtl:tracking-normal">
                {labels.eyebrow}
              </p>
            </div>
            <Lines id="gallery-title" lines={labels.titleLines} delay={1} className="font-serif text-[clamp(2.2rem,4vw,3.25rem)] font-normal leading-tight text-ink mt-4" />
          </div>
        </div>

        <ul className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4 lg:auto-rows-[260px]">
          {images.map((src, i) => (
            <li key={src} className={`${i === 0 ? "col-span-2" : ""} ${tile[i % tile.length]} relative`}>
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={fill(labels.open, { n: i + 1, total })}
                className="group relative block size-full overflow-hidden rounded-2xl bg-stone"
              >
                <div data-reveal="zoom" style={stagger(i % 6)} className="absolute inset-0">
                  <Image
                    src={thumbOf(src)}
                    alt={alt(i)}
                    fill
                    loading="lazy"
                    sizes={i === 0 ? "(min-width:640px) 50vw, 100vw" : "(min-width:640px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-[1.1s] ease-soft group-hover:scale-[1.05]"
                  />
                </div>
                <span aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
                <span
                  aria-hidden
                  className="absolute bottom-3 end-3 inline-flex size-9 items-center justify-center rounded-full bg-red-primary text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <Lightbox
          items={images.map((src, i) => ({ src, thumb: thumbOf(src), alt: alt(i) }))}
          index={open}
          onIndex={setOpen}
          onClose={close}
          labels={{ close: labels.close, prev: labels.prev, next: labels.next, counter: labels.counter }}
        />
      )}
    </section>
  );
}
