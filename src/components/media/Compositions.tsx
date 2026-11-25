import Image from "next/image";
import type { Img } from "@/content/assets";
import { Parallax } from "../motion/Parallax";
import { stagger } from "../motion/Lines";

/** Full-bleed architectural image with a slow, low-amplitude parallax. Image only: no copy is added. */
export function Banner({ image, tall = false, priority = false }: { image: Img; tall?: boolean; priority?: boolean }) {
  return (
    <section aria-label={image.alt} className="bg-cream py-6 sm:py-10">
      <div className="frame-wide">
        <div className={`relative isolate overflow-hidden rounded-card bg-charcoal shadow-lift sm:rounded-panel ${tall ? "h-[58vh] max-h-[720px]" : "h-[42vh] max-h-[560px]"} min-h-[260px]`}>
          <Parallax amount={6}>
            <Image src={image.src} alt={image.alt} fill priority={priority} loading={priority ? undefined : "lazy"} sizes="(min-width:1600px) 1500px, 100vw" className="object-cover" style={{ objectPosition: image.pos ?? "50% 55%" }} />
          </Parallax>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

type Tile = { image: Img; className: string };

const frame = "group relative overflow-hidden bg-stone";

function TileImage({ image, i, sizes }: { image: Img; i: number; sizes: string }) {
  return (
    <div data-reveal="zoom" style={stagger(i)} className="absolute inset-0">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading="lazy"
        sizes={sizes}
        className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.05]"
        style={{ objectPosition: image.pos }}
      />
    </div>
  );
}

/**
 * Image-only compositions. Each frame keeps the image's own proportions where it matters
 * (portrait stays portrait); landscape frames crop with a stated focal point.
 */
export function Mosaic({ images, layout }: { images: Img[]; layout: "bento" | "portraits" | "duo" }) {
  if (layout === "portraits") {
    return (
      <div className="frame-wide">
        <ul className={`grid grid-cols-2 items-start gap-3 sm:gap-4 ${images.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {images.map((im, i) => (
            <li key={im.src} className={i % 2 === 1 ? "mt-8 sm:mt-14" : ""}>
              <div className={`${frame} rounded-tile`} style={{ aspectRatio: `${im.w} / ${im.h}` }}>
                <TileImage image={im} i={i} sizes="(min-width:1024px) 24vw, 50vw" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (layout === "duo") {
    const [a, b] = images;
    return (
      <div className="frame-wide grid gap-3 sm:gap-4 lg:grid-cols-12 lg:items-end">
        <div className={`${frame} aspect-[4/3] rounded-tile lg:col-span-8`}>
          <TileImage image={a} i={0} sizes="(min-width:1024px) 66vw, 100vw" />
        </div>
        <div className={`${frame} aspect-[4/3] rounded-tile lg:col-span-4 lg:aspect-[4/5]`}>
          <TileImage image={b} i={1} sizes="(min-width:1024px) 33vw, 100vw" />
        </div>
      </div>
    );
  }

  const tiles: Tile[] = images.slice(0, 5).map((image, i) => ({
    image,
    className: [
      "col-span-2 row-span-2 lg:col-span-7",
      "lg:col-span-5",
      "lg:col-span-5",
      "col-span-2 lg:col-span-4",
      "col-span-2 lg:col-span-8",
    ][i],
  }));
  return (
    <div className="frame-wide">
      <ul className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-12">
        {tiles.map((t, i) => (
          <li key={t.image.src} className={`${frame} rounded-tile ${t.className}`}>
            <TileImage image={t.image} i={i} sizes={i === 0 ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 40vw, 50vw"} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Signature arch composition (as on Home / About): arched primary frame with a white border,
 * a red arch rising behind its trailing corner and, when given, an inset detail overlapping the lower corner.
 */
export function Layered({ primary, secondary }: { primary: Img; secondary?: Img }) {
  return (
    <div data-reveal="card" className="relative mx-auto w-full max-w-[760px] pb-10 pe-10 sm:pe-14">
      <div aria-hidden className="pointer-events-none absolute end-2 top-2 h-[60%] w-[38%] rounded-t-full bg-gradient-to-b from-red-primary to-red-deep" />
      <div className={`${frame} aspect-[6/5.6] w-[88%] rounded-b-card rounded-t-full border-[5px] border-white shadow-lift`}>
        <TileImage image={primary} i={0} sizes="(min-width:1024px) 42vw, 90vw" />
      </div>
      {secondary && (
        <div className="group absolute bottom-0 end-0 aspect-[4/5] w-[36%] overflow-hidden rounded-card border-[6px] border-white bg-stone shadow-card">
          <TileImage image={secondary} i={2} sizes="(min-width:1024px) 18vw, 36vw" />
        </div>
      )}
    </div>
  );
}
