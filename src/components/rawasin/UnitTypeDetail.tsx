import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import type { Locale } from "@/content";
import { rawasinMall, type FloorId, type UnitTypeId } from "@/content/projects/rawasin/mall";

import { rawasinHref } from "@/content/projects/rawasin/links";

/** Which floors host each unit type. Derived from the published floor schedules. */
export const unitFloors: Record<UnitTypeId, FloorId[]> = {
  retail: ["ground", "first"],
  medical: ["second", "third"],
};

export function UnitTypeDetail({ locale, unit }: { locale: Locale; unit: UnitTypeId }) {
  const t = rawasinMall[locale];
  const u = t.unitTypes[unit];
  const floors = t.floors.list.filter((f) => unitFloors[unit].includes(f.id));
  return (
    <section className="bg-charcoal py-section text-white sm:py-section-lg">
      <div className="frame-wide grid gap-10 lg:grid-cols-13">
        <article className="lg:col-span-8">
          <h2 className="font-display text-3xl sm:text-4xl">{u.title}</h2>
          <p className="mt-5 text-body-sm leading-golden text-white/75">{u.body}</p>
          <ul className="mt-6 space-y-2.5">
            {u.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-body-sm text-white/85">
                <MoveRight aria-hidden className="flip-rtl mt-0.5 size-3.5 shrink-0 text-red-light" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-small leading-golden text-white/50">{t.unitTypes.disclaimer}</p>
        </article>
        <ul className="grid content-start gap-3 lg:col-span-5">
          {floors.map((f) => (
            <li key={f.id}>
              <Link href={rawasinHref("mall-floor", locale, f.id)} className="group flex items-center justify-between gap-4 rounded-tile border border-white/12 bg-white/[0.05] px-5 py-4 hover:border-red-light/60">
                <span>
                  <span className="block text-body-sm font-semibold">{f.label}</span>
                  <span className="mt-0.5 block text-small text-white/60">{f.headline}</span>
                </span>
                <ArrowRight aria-hidden className="flip-rtl size-4 text-red-light" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
