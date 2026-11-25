import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Locale } from "@/content";
import type { Block, Tile, TileSpan, TileTone } from "@/content/blocks";
import { linkHref } from "@/lib/routes";
import { Counter } from "../motion/Counter";
import { stagger } from "../motion/Lines";
import { SectionIntro, cardSurface } from "../ui";

type BentoBlock = Extract<Block, { kind: "bento" }>;

/* 4 columns on desktop, 2 on mobile. Text tiles take the full mobile row so copy never gets cramped. */
const spans: Record<TileSpan, string> = {
  sm: "col-span-1",
  wide: "col-span-2",
  tall: "col-span-1 row-span-2",
  big: "col-span-2 row-span-2",
  full: "col-span-2 lg:col-span-4",
};
const textSpans: Record<TileSpan, string> = { ...spans, sm: "col-span-2 lg:col-span-1", tall: "col-span-2 lg:col-span-1 lg:row-span-2" };

const tones: Record<TileTone, string> = {
  white: `text-ink ${cardSurface}`,
  dark: "bg-charcoal text-white",
  red: "bg-gradient-to-br from-red-bright to-red-deep text-white shadow-red-lift [--accent-ink:#FFD6D9]",
  sand: "bg-sand text-ink",
  clear: "text-ink",
};
const onDark = (tone: TileTone) => tone === "dark" || tone === "red";
const tileBase = "group relative isolate flex min-h-[190px] flex-col overflow-hidden rounded-card sm:rounded-card";

function Points({ points, dark }: { points: string[]; dark: boolean }) {
  return (
    <ul className="mt-4 space-y-2">
      {points.map((p) => (
        <li key={p} className={`flex items-start gap-2.5 text-body-sm leading-snug ${dark ? "text-white/85" : "text-ink/85"}`}>
          <Check aria-hidden className={`mt-0.5 size-4 shrink-0 ${dark ? "text-red-mist" : "text-red-primary"}`} />
          {p}
        </li>
      ))}
    </ul>
  );
}

function TileView({ tile, locale, i }: { tile: Tile; locale: Locale; i: number }) {
  const reveal = { "data-reveal": "up", style: stagger(Math.min(i, 6)) } as const;

  if (tile.t === "image") {
    return (
      <figure {...reveal} className={`${tileBase} ${spans[tile.span ?? "sm"]} bg-charcoal`}>
        <Image
          src={tile.image.src}
          alt={tile.image.alt}
          fill
          sizes={tile.span === "big" || tile.span === "wide" || tile.span === "full" ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
          className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.05] motion-reduce:transition-none"
          style={{ objectPosition: tile.image.pos ?? "50% 50%" }}
        />
      </figure>
    );
  }

  const tone = tile.tone ?? "white";
  const dark = onDark(tone);

  if (tile.t === "stat") {
    return (
      <div {...reveal} className={`${tileBase} ${spans[tile.span ?? "sm"]} ${tones[tone]} justify-between p-6 sm:p-7`}>
        <span aria-hidden className={`h-[2px] w-6 ${dark ? "bg-white/60" : "bg-red-primary"}`} />
        <div>
          <p className={`font-display leading-none tracking-tight ${tile.value.length > 9 && (tile.span ?? "sm") === "sm" ? "text-[clamp(1.6rem,2.4vw,2.2rem)]" : "text-[clamp(2.2rem,3.6vw,3.4rem)]"} ${dark ? "text-white" : "text-red-primary"}`}>
            <Counter value={tile.value} />
          </p>
          <p className={`mt-3 text-small font-medium leading-snug ${dark ? "text-white/85" : "text-ink/80"}`}>{tile.label}</p>
          {tile.note && <p className={`mt-1.5 text-small leading-snug ${dark ? "text-white/60" : "text-subtle"}`}>{tile.note}</p>}
        </div>
      </div>
    );
  }

  if (tile.t === "layers") {
    return (
      <div {...reveal} className={`${tileBase} ${textSpans[tile.span ?? "wide"]} ${tones[tone]} justify-between gap-6 p-6 sm:p-8`}>
        <div>
          {tile.title && <h3 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] leading-tight">{tile.title}</h3>}
          {tile.body && <p className={`mt-3 max-w-md text-body-sm leading-golden ${dark ? "text-white/75" : "text-muted"}`}>{tile.body}</p>}
        </div>
        <div className="grid grid-flow-col gap-2">
          {tile.layers.map((l, k) => (
            <div key={k} className={`rounded-tile px-3 py-4 text-center ${dark ? "bg-white/[0.07]" : "bg-sand"} ${k % 2 ? "opacity-80" : ""}`}>
              <p className={`font-display text-[clamp(1.5rem,2.4vw,2.2rem)] leading-none ${dark ? "text-white" : "text-red-primary"}`}>{l.value}</p>
              <p className={`mt-2 text-caption leading-snug ${dark ? "text-white/70" : "text-muted"}`}>{l.label}</p>
            </div>
          ))}
        </div>
        {tile.note && <p className={`text-caption leading-golden ${dark ? "text-white/55" : "text-subtle"}`}>{tile.note}</p>}
      </div>
    );
  }

  // text tile, optionally over a photo
  const photo = !!tile.image;
  const light = dark || photo;
  const linkCls = `relative z-10 mt-5 inline-flex min-h-10 items-center gap-2 self-start text-body-sm font-semibold ${light ? "text-white hover:text-red-mist" : "text-red-primary hover:text-red-dark"}`;
  return (
    <div {...reveal} className={`${tileBase} ${textSpans[tile.span ?? "sm"]} ${photo ? "min-h-[300px] bg-charcoal text-white sm:min-h-[340px]" : tones[tone]} ${tile.title || photo ? "justify-end" : "justify-center"} p-6 sm:p-8`}>
      {tile.image && (
        <>
          <Image src={tile.image.src} alt={tile.image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="-z-20 object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.05] motion-reduce:transition-none" style={{ objectPosition: tile.image.pos ?? "50% 50%" }} />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-charcoal/0" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/50 to-transparent rtl:bg-gradient-to-l" />
        </>
      )}
      {tile.tag && (
        <span className={`mb-3 inline-flex self-start rounded-full px-2.5 py-1 text-caption font-semibold ${light ? "bg-white/15 text-white" : "bg-red-soft text-red-primary"}`}>{tile.tag}</span>
      )}
      {tile.title && <h3 className={`font-display text-[clamp(1.3rem,1.8vw,1.7rem)] leading-tight ${light ? "text-white" : ""}`}>{tile.title}</h3>}
      {tile.body && <p className={`mt-3 max-w-xl text-body-sm leading-golden ${light ? "text-white/85" : "text-muted"}`}>{tile.body}</p>}
      {tile.points && <Points points={tile.points} dark={light} />}
      {tile.link && (
        <Link href={linkHref(tile.link, locale)} className={linkCls}>
          {tile.link.label}
          <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      )}
      {tile.href && (
        <a href={tile.href.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {tile.href.label}
          <ArrowUpRight aria-hidden className="size-4" />
        </a>
      )}
    </div>
  );
}

const sectionTones = { light: "bg-cream", white: "bg-canvas", sand: "bg-gradient-to-b from-cream to-sand", dark: "bg-charcoal" } as const;

/** Bento section: a heading tile followed by image, stat and text tiles that rise in with a stagger. */
export function Bento({ block: b, locale }: { block: BentoBlock; locale: Locale }) {
  const introTone = b.intro?.tone ?? "clear";
  return (
    <section id={b.id} aria-labelledby={`${b.id}-title`} className={`scroll-mt-36 ${sectionTones[b.tone ?? "light"]} py-14 sm:py-20`}>
      <div className="frame-wide">
        <div className="grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(200px,auto)] lg:grid-cols-4">
          <div className={`${tileBase} ${textSpans[b.intro?.span ?? "wide"]} ${tones[introTone]} justify-center ${introTone === "clear" ? "px-1 py-4 sm:px-2" : "p-7 sm:p-9"}`}>
            <SectionIntro id={`${b.id}-title`} eyebrow={b.eyebrow} lines={b.lines} body={b.body} tone={onDark(introTone) ? "light" : "dark"} />
          </div>
          {b.tiles.map((tile, i) => (
            <TileView key={i} tile={tile} locale={locale} i={i + 1} />
          ))}
        </div>
        {b.footnote && <p className="mt-5 max-w-3xl text-small leading-golden text-subtle">{b.footnote}</p>}
      </div>
    </section>
  );
}
