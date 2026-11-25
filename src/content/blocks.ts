/**
 * Block model shared by every page: corporate pages (./page-content) and each
 * project's own block sets (./projects/<slug>/blocks). Rendered by
 * components/sections/PageSections.
 */
import type { Locale } from "./index";
import type { LinkTarget } from "@/lib/routes";
import type { Img, ImgSet } from "./assets";

/** A labelled link to a corporate page ({ key }) or a project page ({ project, branch, anchor }). */
export type BlockLink = LinkTarget & { label: string };
export type Cell = string | { text: string; link: LinkTarget };
type Tone = "light" | "white" | "sand" | "dark";
type Head = { id: string; eyebrow: string; lines: string[]; tone?: Tone };

export type Block =
  | (Head & {
      kind: "split";
      body?: string | string[];
      points?: string[];
      aside?: { label: string; value: string }[];
      image?: Img;
      /** Layered composition: a landscape primary with a smaller image overlapping it. */
      images?: [Img, Img];
      imageAlt?: string;
      note?: string;
      link?: BlockLink;
      reverse?: boolean;
    })
  | (Head & { kind: "facts"; body?: string; items: { label: string; value: string; note?: string }[]; footnote?: string })
  | (Head & {
      kind: "cards";
      body?: string;
      cols?: 2 | 3;
      items: { title: string; body: string; tag?: string; points?: string[]; link?: BlockLink; image?: Img }[];
      footnote?: string;
    })
  | (Head & {
      kind: "groups";
      body?: string;
      groups: { title: string; items: string[]; tag?: string; tagTone?: "confirmed" | "pending" }[];
      footnote?: string;
    })
  | (Head & { kind: "table"; body?: string; head: string[]; rows: Cell[][]; highlight?: number; footnote?: string })
  | (Head & {
      kind: "cta";
      body: string;
      primary: { label: string; link: LinkTarget };
      secondary?: { label: string; link: LinkTarget };
    })
  | (Head & {
      kind: "ranges";
      body?: string;
      /** Unit shown on the scale, e.g. "m²". */
      unit: string;
      /** One bar per row on a shared scale; `display` is the published wording of the range. */
      rows: { label: string; count?: { n: number; label: string }; min: number; max: number; display: string; link?: BlockLink }[];
      footnote?: string;
    })
  | (Head & {
      kind: "bento";
      body?: string;
      /** Size and ground of the heading tile (eyebrow, title, body) that opens the grid. */
      intro?: { span?: TileSpan; tone?: TileTone };
      tiles: Tile[];
      footnote?: string;
    });

/**
 * Bento tiles on a 4-column grid (2 on mobile): sm 1×1, wide 2×1, tall 1×2, big 2×2, full row.
 * Copy in tiles must come from the same verified sources as any other block.
 */
export type TileSpan = "sm" | "wide" | "tall" | "big" | "full";
export type TileTone = "white" | "dark" | "red" | "sand" | "clear";
export type Tile =
  | { t: "image"; image: Img; span?: TileSpan }
  | { t: "stat"; value: string; label: string; note?: string; span?: TileSpan; tone?: TileTone }
  | {
      t: "text";
      /** Small badge above the title, e.g. "Ground Floor" or "Part of the project". */
      tag?: string;
      title?: string;
      body?: string;
      points?: string[];
      span?: TileSpan;
      tone?: TileTone;
      link?: BlockLink;
      /** External link (opens in a new tab). */
      href?: { url: string; label: string };
      /** Photo behind the copy, under a dark gradient. */
      image?: Img;
    }
  /** A row of figures read together, e.g. the three layers of a stone wall. */
  | { t: "layers"; title?: string; body?: string; layers: { value: string; label: string }[]; span?: TileSpan; tone?: TileTone; note?: string };

/** Image-led sections. No copy of their own: they carry only the images and their alt text. */
export type MediaBlock =
  | { kind: "banner"; id: string; image: Img; tall?: boolean; priority?: boolean }
  | { kind: "mosaic"; id: string; layout: "bento" | "portraits" | "duo"; images: Img[]; tone?: Tone }
  | { kind: "rail"; id: string; images: ImgSet[]; tone?: Tone };

export type BlockSet = Record<string, Block | MediaBlock>;
export const pick = (set: BlockSet, ids: string[]): (Block | MediaBlock)[] => ids.map((id) => set[id]).filter(Boolean);

/** Picks the localized string. */
export const tr = (l: Locale) => (en: string, ar: string) => (l === "ar" ? ar : en);
