import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/content";
import type { Block, BlockLink, Cell, MediaBlock } from "@/content/page-content";
import { getDictionary } from "@/content";
import { Banner, Layered, Mosaic } from "../media/Compositions";
import { RailGallery } from "../media/ImageRail";
import { linkHref, type LinkTarget } from "@/lib/routes";
import { ButtonLink, SectionIntro, cardSurface } from "../ui";
import { stagger } from "../motion/Lines";
import { Bento } from "./Bento";
import { Ranges } from "./Ranges";

/* Grounds and cards follow the Home / About redesign: warm cream, frosted white cards, soft long shadows. */
const tones = {
  light: "bg-cream",
  white: "bg-canvas",
  sand: "bg-gradient-to-b from-cream to-sand",
  dark: "bg-charcoal text-white",
} as const;

const card = `rounded-card p-7 sm:p-8 ${cardSurface}`;
const darkCard = "rounded-card border border-white/12 bg-white/[0.05] p-7 sm:p-8";

const to = (l: LinkTarget, locale: Locale) => linkHref(l, locale);

function LinkLabel({ link, locale, label, dark }: { link: BlockLink; locale: Locale; label: string; dark?: boolean }) {
  return (
    <Link
      href={to(link, locale)}
      className={`group inline-flex min-h-11 items-center gap-2.5 text-body-sm font-semibold ${dark ? "text-red-light hover:text-white" : "text-ink hover:text-red-primary"}`}
    >
      {label}
      <ArrowRight aria-hidden className={`flip-rtl size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${dark ? "" : "text-red-primary"}`} />
    </Link>
  );
}

function CellView({ cell, locale }: { cell: Cell; locale: Locale }) {
  if (typeof cell === "string") return <>{cell}</>;
  return (
    <Link href={to(cell.link, locale)} className="font-semibold text-red-primary hover:text-red-dark">
      {cell.text}
    </Link>
  );
}

function Body({ body, dark }: { body?: string | string[]; dark?: boolean }) {
  if (!body) return null;
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <>
      {paragraphs.map((p) => (
        <p key={p} className={`mt-5 max-w-xl text-body leading-[1.75] ${dark ? "text-white/75" : "text-muted"}`}>
          {p}
        </p>
      ))}
    </>
  );
}

function Intro({ b, dark }: { b: Block & { eyebrow: string; lines: string[]; id: string }; dark: boolean }) {
  return <SectionIntro id={`${b.id}-title`} eyebrow={b.eyebrow} lines={b.lines} tone={dark ? "light" : "dark"} />;
}

/** Renders structured page blocks. Presentation only: all copy comes from content/page-content. */
export function PageSections({
  blocks,
  locale,
  idPrefix,
}: {
  blocks: (Block | MediaBlock)[];
  locale: Locale;
  /** Namespaces HTML ids when blocks from several sets share one page (e.g. "floors-ground"). */
  idPrefix?: string;
}) {
  const scoped = idPrefix ? blocks.map((b) => ({ ...b, id: `${idPrefix}-${b.id}` })) : blocks;
  return (
    <>
      {scoped.map((b, index) => {
        if (b.kind === "banner") return <Banner key={b.id} image={b.image} tall={b.tall} priority={b.priority} />;
        if (b.kind === "mosaic") {
          return (
            <section key={b.id} id={b.id} aria-label={b.images[0]?.alt} className={`${tones[b.tone ?? "light"]} py-10 sm:py-14`}>
              <Mosaic images={b.images} layout={b.layout} />
            </section>
          );
        }
        if (b.kind === "rail") {
          const g = getDictionary(locale).projectDetail.gallery;
          return (
            <section key={b.id} id={b.id} aria-labelledby={`${b.id}-title`} className={`scroll-mt-36 ${tones[b.tone ?? "white"]} py-section sm:py-section-lg`}>
              <div className="frame-wide">
                <SectionIntro id={`${b.id}-title`} eyebrow={g.eyebrow} lines={g.titleLines} />
                <div className="mt-10">
                  <RailGallery
                    images={b.images}
                    labels={{ close: g.close, prev: g.prev, next: g.next, counter: g.counter }}
                    prevLabel={g.prev}
                    nextLabel={g.next}
                  />
                </div>
              </div>
            </section>
          );
        }
        const tone = b.tone ?? (index % 2 === 0 ? "white" : "light");
        const dark = tone === "dark";
        const wrap = `relative isolate scroll-mt-36 overflow-hidden ${tones[tone]} py-20 sm:py-28`;

        if (b.kind === "bento") return <Bento key={b.id} block={b} locale={locale} />;
        if (b.kind === "ranges") return <Ranges key={b.id} block={b} locale={locale} />;
        if (b.kind === "cta") {
          return (
            <section key={b.id} id={b.id} aria-labelledby={`${b.id}-title`} className={`scroll-mt-36 ${tones[b.tone ?? "light"]} py-section sm:py-section-lg`}>
              <div className="frame-wide">
                <div className="relative isolate overflow-hidden rounded-card bg-gradient-to-br from-red-bright to-red-deep p-8 text-white [--accent-ink:#FFD6D9] shadow-red-lift sm:rounded-panel sm:p-14 lg:grid lg:grid-cols-13 lg:items-center lg:gap-10">
                  <svg aria-hidden viewBox="0 0 200 140" className="pointer-events-none absolute -bottom-4 end-0 -z-10 h-48 w-auto text-white/[0.1] rtl:scale-x-[-1]">
                    {Array.from({ length: 8 }).flatMap((_, x) => Array.from({ length: 6 }).map((__, y) => <rect key={`${x}-${y}`} x={40 + x * 20 + (y % 2) * 10} y={14 + y * 20} width="8" height="12" rx="2" fill="currentColor" />))}
                  </svg>
                  <div aria-hidden className="pointer-events-none absolute -end-24 -top-32 -z-10 aspect-square w-[28rem] rounded-full border border-white/15" />
                  <div className="lg:col-span-8">
                    <SectionIntro id={`${b.id}-title`} eyebrow={b.eyebrow} lines={b.lines} tone="light" />
                    <Body body={b.body} dark />
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3 lg:col-span-5 lg:mt-0 lg:justify-end">
                    <ButtonLink href={to(b.primary.link, locale)} variant="light">{b.primary.label}</ButtonLink>
                    {b.secondary && (
                      <ButtonLink href={to(b.secondary.link, locale)} variant="outline" className="!border-white/70 !text-white hover:!bg-white hover:!text-red-primary">
                        {b.secondary.label}
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        return (
          <section key={b.id} id={b.id} aria-labelledby={`${b.id}-title`} className={wrap}>
            <div className="frame-wide">
              {b.kind === "split" && (
                <div className={`grid gap-14 lg:grid-cols-13 lg:items-center lg:gap-12 ${b.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="lg:col-span-5">
                    <Intro b={b} dark={dark} />
                    <Body body={b.body} dark={dark} />
                    {b.points && (
                      <ul className="mt-8 space-y-3.5">
                        {b.points.map((p) => (
                          <li key={p} className={`flex items-start gap-3 text-body-sm leading-golden ${dark ? "text-white/85" : "text-ink"}`}>
                            <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/10" : "bg-red-soft"}`}>
                              <Check aria-hidden className="size-3.5 text-red-primary" strokeWidth={2.4} />
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                    {b.note && <p className={`mt-5 text-small leading-golden ${dark ? "text-white/55" : "text-subtle"}`}>{b.note}</p>}
                    {b.link && (
                      <div className="mt-9">
                        {dark ? (
                          <LinkLabel link={b.link} locale={locale} label={b.link.label} dark />
                        ) : (
                          <ButtonLink href={to(b.link, locale)}>{b.link.label}</ButtonLink>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-8">
                    {b.images && <Layered primary={b.images[0]} secondary={b.images[1]} />}
                    {!b.images && b.image && (
                      b.image.h > b.image.w || b.image.w < 1000 ? (
                        <div className="relative mx-auto aspect-[4/5] max-w-[28rem] overflow-hidden rounded-card rounded-ss-[120px] border-[5px] border-white bg-stone shadow-lift">
                          <div data-reveal="zoom" className="absolute inset-0">
                            <Image src={b.image.src} alt={b.image.alt} fill loading="lazy" sizes="(min-width:1024px) 28rem, 100vw" className="object-cover" style={{ objectPosition: b.image.pos }} />
                          </div>
                        </div>
                      ) : (
                        <Layered primary={b.image} />
                      )
                    )}
                    {!b.image && !b.images && b.aside && (
                      <dl className="grid gap-3 sm:grid-cols-2">
                        {b.aside.map((a, i) => (
                          <div key={a.label} data-reveal="fade" style={stagger(i)} className={dark ? darkCard : card}>
                            <dt className={`text-caption font-bold tracking-wider uppercase rtl:tracking-normal ${dark ? "text-white/55" : "text-subtle"}`}>{a.label}</dt>
                            <dd className="mt-2 font-display text-xl text-red-primary" dir="auto">{a.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </div>
              )}

              {b.kind === "facts" && (
                <>
                  <div className="grid gap-6 lg:grid-cols-13 lg:items-end">
                    <div className="lg:col-span-8">
                      <Intro b={b} dark={dark} />
                    </div>
                    {b.body && <div className="lg:col-span-5"><Body body={b.body} dark={dark} /></div>}
                  </div>
                  <dl className={`mt-12 grid gap-5 sm:grid-cols-2 ${b.items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                    {b.items.map((f, i) => (
                      <div key={f.label} data-reveal="fade" style={stagger(i)} className={dark ? darkCard : card}>
                        <dd className="font-display text-[clamp(1.9rem,2.6vw,2.6rem)] leading-tight text-red-primary" dir="auto">{f.value}</dd>
                        <dt className={`mt-3 text-body-sm font-semibold ${dark ? "text-white" : "text-ink"}`}>{f.label}</dt>
                        {f.note && <p className={`mt-1.5 text-small leading-golden ${dark ? "text-white/60" : "text-muted"}`}>{f.note}</p>}
                      </div>
                    ))}
                  </dl>
                  {b.footnote && <p className="mt-5 text-caption text-subtle">{b.footnote}</p>}
                </>
              )}

              {b.kind === "cards" && (
                <>
                  <div className="grid gap-6 lg:grid-cols-13 lg:items-end">
                    <div className="lg:col-span-8">
                      <Intro b={b} dark={dark} />
                    </div>
                    {b.body && <div className="lg:col-span-5"><Body body={b.body} dark={dark} /></div>}
                  </div>
                  <ul className={`mt-12 grid gap-5 sm:grid-cols-2 ${b.cols === 2 ? "" : "lg:grid-cols-3"}`}>
                    {b.items.map((c, i) => (
                      <li key={c.title} data-reveal="fade" style={stagger(i)} className={`${dark ? darkCard : card} group/card flex flex-col ${c.image ? "!p-0 overflow-hidden" : ""}`}>
                        {c.image && (
                          <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-tile bg-stone">
                            <Image src={c.image.src} alt={c.image.alt} fill loading="lazy" sizes="(min-width:1024px) 46vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-soft group-hover/card:scale-[1.04]" style={{ objectPosition: c.image.pos }} />
                          </div>
                        )}
                        <div className={c.image ? "flex flex-1 flex-col px-6 pb-7 pt-4" : "contents"}>
                        {c.tag && <span className="w-fit rounded-full bg-red-soft px-3.5 py-1 text-small font-medium text-red-primary">{c.tag}</span>}
                        <h3 className={`${c.tag ? "mt-4" : ""} font-display text-[1.6rem] leading-tight ${dark ? "text-white" : "text-ink"}`}>{c.title}</h3>
                        <p className={`mt-3 text-body-sm leading-[1.7] ${dark ? "text-white/70" : "text-ink-soft"}`}>{c.body}</p>
                        {c.points && (
                          <ul className="mt-4 space-y-2">
                            {c.points.map((p) => (
                              <li key={p} className={`flex items-start gap-2 text-small leading-golden ${dark ? "text-white/80" : "text-ink"}`}>
                                <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-red-primary" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        )}
                        {c.link && (
                          <div className="mt-auto pt-4">
                            <LinkLabel link={c.link} locale={locale} label={c.link.label} dark={dark} />
                          </div>
                        )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {b.footnote && <p className="mt-5 text-caption text-subtle">{b.footnote}</p>}
                </>
              )}

              {b.kind === "groups" && (
                <>
                  <div className="grid gap-6 lg:grid-cols-13 lg:items-end">
                    <div className="lg:col-span-8">
                      <Intro b={b} dark={dark} />
                    </div>
                    {b.body && <div className="lg:col-span-5"><Body body={b.body} dark={dark} /></div>}
                  </div>
                  <div className={`mt-12 grid gap-5 sm:grid-cols-2 ${b.groups.length >= 4 ? "lg:grid-cols-4" : b.groups.length === 3 ? "lg:grid-cols-3" : ""}`}>
                    {b.groups.map((g, i) => (
                      <div key={g.title} data-reveal="fade" style={stagger(i)} className={dark ? darkCard : card}>
                        {g.tag && (
                          <span className={`inline-block rounded-full px-3.5 py-1 text-small font-medium ${g.tagTone === "pending" ? "bg-sand text-muted" : "bg-red-soft text-red-primary"}`}>{g.tag}</span>
                        )}
                        <h3 className={`${g.tag ? "mt-4" : ""} font-display text-[1.35rem] leading-tight ${dark ? "text-white" : "text-ink"}`}>{g.title}</h3>
                        <ul className="mt-4 space-y-2.5">
                          {g.items.map((item) => (
                            <li key={item} className={`flex items-start gap-2.5 text-body-sm leading-golden ${dark ? "text-white/75" : "text-ink-soft"}`}>
                              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-red-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {b.footnote && <p className="mt-5 text-caption text-subtle">{b.footnote}</p>}
                </>
              )}

              {b.kind === "table" && (
                <>
                  <div className="grid gap-6 lg:grid-cols-13 lg:items-end">
                    <div className="lg:col-span-8">
                      <Intro b={b} dark={dark} />
                    </div>
                    {b.body && <div className="lg:col-span-5"><Body body={b.body} dark={dark} /></div>}
                  </div>
                  <div className="mt-12 overflow-x-auto rounded-card border border-white bg-white/90 shadow-card">
                    <table className="w-full min-w-[34rem] border-collapse text-start text-body-sm">
                      <thead>
                        <tr className="bg-[#F6F1EC] text-caption font-bold tracking-wider text-muted uppercase rtl:tracking-normal">
                          {b.head.map((h) => (
                            <th key={h} scope="col" className="px-5 py-3.5 text-start">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {b.rows.map((row, r) => (
                          <tr key={r} className={`border-t border-border ${b.highlight === r ? "bg-red-soft" : ""}`}>
                            {row.map((cell, c) => (
                              c === 0 ? (
                                <th key={c} scope="row" className="px-5 py-3.5 text-start font-semibold text-ink">
                                  <CellView cell={cell} locale={locale} />
                                </th>
                              ) : (
                                <td key={c} className="px-5 py-3.5 text-ink-soft" dir="auto">
                                  <CellView cell={cell} locale={locale} />
                                </td>
                              )
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {b.footnote && <p className="mt-5 text-caption text-subtle">{b.footnote}</p>}
                </>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
