/**
 * Turns a run of existing blocks into one bento grid, reusing their copy verbatim.
 *
 *   first block      → heading tile (eyebrow, title, body)
 *   later blocks     → a dark heading tile (eyebrow as tag, title, body), then their items
 *   facts / aside    → stat tiles (value, label, note)
 *   cards / groups   → text tiles (tag, title, body or points, link)
 *   split            → text tile (extra paragraphs, points, note, link)
 *   banner / mosaic / split images / card images → image tiles, spread through the grid
 *
 * Tile sizes are then balanced so the grid closes on full rows of four.
 */
import type { Block, MediaBlock, Tile, TileSpan, TileTone } from "./blocks";
import type { Img } from "./assets";

type Any = Block | MediaBlock;
type Tone = "light" | "white" | "sand" | "dark";

const plain = (lines: readonly string[]) => lines.join(" ").replace(/\*/g, "").replace(/\s+/g, " ").trim();
const text = (body?: string | string[]) => (Array.isArray(body) ? body.join(" ") : body);
const cells: Record<TileSpan, number> = { sm: 1, wide: 2, tall: 2, big: 4, full: 4 };

export function mergeBento(id: string, blocks: Any[], opts: { tone?: Tone } = {}): Block {
  const content = blocks.filter((b): b is Block => b.kind !== "banner" && b.kind !== "mosaic" && b.kind !== "rail");
  const head = content[0];
  if (!head) throw new Error(`mergeBento(${id}): needs at least one block with a heading`);

  const tiles: Tile[] = [];
  const images: Img[] = [];
  const notes: string[] = [];
  let shade = 0;
  const nextTone = (): TileTone => (shade++ % 2 ? "sand" : "white");
  let introBody: string | undefined;

  for (const b of blocks) {
    if (b.kind === "banner") { images.push(b.image); continue; }
    if (b.kind === "mosaic") { images.push(...b.images); continue; }
    if (b.kind === "rail" || b.kind === "table" || b.kind === "cta" || b.kind === "bento" || b.kind === "ranges") continue;

    const body = "body" in b ? b.body : undefined;
    if (b === head) {
      // Heading tile carries the first paragraph; further paragraphs become their own tile.
      const paras = Array.isArray(body) ? body : body ? [body] : [];
      introBody = paras[0];
      if (paras.length > 1) tiles.push({ t: "text", tone: nextTone(), body: paras.slice(1).join(" ") });
    } else {
      tiles.push({ t: "text", tone: "dark", tag: b.eyebrow, title: plain(b.lines), body: text(body), span: "wide" });
    }

    if (b.kind === "facts") {
      b.items.forEach((f, i) => tiles.push({ t: "stat", value: f.value, label: f.label, note: f.note, tone: i === 0 && b === head ? "red" : "white" }));
      if (b.footnote) notes.push(b.footnote);
    } else if (b.kind === "cards") {
      for (const c of b.items) {
        if (c.image) tiles.push({ t: "text", tag: c.tag, title: c.title, body: c.body, points: c.points, link: c.link, image: c.image, span: "wide" });
        else tiles.push({ t: "text", tone: nextTone(), tag: c.tag, title: c.title, body: c.body, points: c.points, link: c.link });
      }
      if (b.footnote) notes.push(b.footnote);
    } else if (b.kind === "groups") {
      for (const g of b.groups) tiles.push({ t: "text", tone: nextTone(), tag: g.tag, title: g.title, points: g.items });
      if (b.footnote) notes.push(b.footnote);
    } else if (b.kind === "split") {
      (b.aside ?? []).forEach((a) => tiles.push({ t: "stat", value: a.value, label: a.label }));
      if (b.points?.length || b.link || b.note) {
        tiles.push({ t: "text", tone: nextTone(), points: b.points, body: b.note, link: b.link, span: (b.points?.length ?? 0) > 2 ? "wide" : "sm" });
      }
      if (b.image) images.push(b.image);
      if (b.images) images.push(...b.images);
    }
  }

  // Long copy gets room to breathe.
  for (const t of tiles) {
    if (t.t === "text" && !t.span && ((t.points?.length ?? 0) > 3 || (t.body?.length ?? 0) > 200)) t.span = "wide";
  }

  // Spread the photos: the first one large, then one after every few tiles.
  const out: Tile[] = [];
  let img = 0;
  tiles.forEach((t, i) => {
    if (img < images.length && (i === 1 || (i > 1 && (i - 1) % 3 === 0))) {
      out.push({ t: "image", image: images[img], span: img === 0 ? "big" : "sm" });
      img++;
    }
    out.push(t);
  });
  while (img < images.length) out.push({ t: "image", image: images[img++], span: "sm" });

  // Close the grid on full rows: intro is 2 cells; widen small tiles from the end until the total divides by 4.
  const total = () => 2 + out.reduce((n, t) => n + cells[t.span ?? (t.t === "layers" ? "wide" : "sm")], 0);
  for (let k = out.length - 1; k >= 0 && total() % 4 !== 0; k--) {
    const t = out[k];
    if ((t.span ?? "sm") === "sm" && (t.t === "text" || t.t === "image" || t.t === "stat")) t.span = "wide";
  }

  return {
    kind: "bento",
    id,
    eyebrow: head.eyebrow,
    lines: head.lines,
    body: introBody,
    // A dark ground would hide the dark heading text of the intro tile.
    tone: opts.tone ?? (head.tone === "dark" ? "light" : head.tone) ?? "light",
    tiles: out,
    footnote: notes.length ? notes.join(" ") : undefined,
  };
}
