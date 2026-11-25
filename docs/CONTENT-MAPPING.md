# TASK 02 — Content mapping, flags and open questions

Sources: `RAWASIN MALL Guideline'.pdf` (G), `Rawasin Mall - Final.pdf` (M), `Rawasin Compound brochure Content` (C, a .pptx), `Collab orientation` (O, a .pptx).
New section copy lives in `src/content/page-content.ts`; rendered by `src/components/sections/PageSections.tsx`.

## Mapping

| Source content | Destination | Action |
|---|---|---|
| M/C "About Dama", mission, vision | About; Home | Keep; duplicate mission paragraph removed from About "Our Story" |
| C Rawasin intro, 7.5 feddan / 7 buildings / 196 homes | Rawasin hub, Residential, Developments, Home stats | Keep; Home stats switched from mall-only to Rawasin-level figures |
| C architecture, privacy, daylight, stone wall, courtyards, rooftops, solar | Residential › Architecture (+ summary on Residential) | Split into sections; points no longer repeated |
| C courtyards/shared time/rooftops/parking/nursery/clubhouse/mosque | Residential › Lifestyle & Amenities | Keep; duplicate "Services" list and icon-chip amenities removed |
| C smart services, FTTH, Triple Play, Smart Home Ready; O slide 3 | Lifestyle & Amenities (Smart section) | Rewritten with confirmed vs package-dependent tags (no separate route exists) |
| C apartment plans (5 types, areas) + plan PNGs | Apartments, Apartment detail | Keep; plans now shown; invented per-type features removed |
| C/O finishing offices, finishing rules | Apartments | Moved from a one-line partner card to its own section |
| C/M location, road network | Residential › Location; Mall › Location | Keep (both) |
| M about, master plan, 6,280 m², 123 m, 5 levels | Mall overview, Master plan, Commercial | Keep; overview intro de-duplicated |
| M/O floor plans and schedules | Floors, Floor detail, Units, Medical | Keep; summaries derived from the verified schedules |
| O slides 11–27 (FM, parking, medical standards, security, wayfinding, emergency, lighting, maintenance, façade, waste) | Mall › Operations (+ Medical for medical standards) | New sections; previously unused |
| M/C partners (Dar Arafa, ACCORD, WE, MEEC) | Mall › Partners; Residential partners; About (names only) | Keep; descriptions no longer repeated on About |
| G brand purpose "Bringing Life Together", brand about | Mall overview › Concept | Used; colours/fonts/photography rules are design-system material, not site copy |
| O slides 28–29 fractional ownership prices | — | **Not published** (unapproved financial claim) |
| O slide 11 "up to 20%" cost saving | — | **Not published** |

## Removed
Invented apartment features (en-suite master, cross-ventilation, terrace…); mall "AI-enhanced" surveillance and "Operational Excellence" box; "five-level clubhouse"; stray footnote on Residential; About Leadership and Organisation placeholder sections; "Partner Consultant" placeholder text; misleading model images (renders presented as apartments).

## Conflicts / questions needing approval
1. Hypermarket: 754 m² (M, floor plan) vs 830 m² gross (O). OB/GYN: 638 m² (plan) vs 720 m² gross (O). Site shows plan areas; gross-vs-net unconfirmed.
2. Apartment types: C slide 6 (Arabic) says one- and three-bedroom; plans/slide 35 say two and three. Site uses two/three.
3. Hypermarket (M) vs supermarket (C/G). Site uses "hypermarket" for the basement and "supermarket and pharmacy" only where C says it.
4. Clubhouse floors 3–4: 13 rooms each (31–49 m²) with sleeping area and bathroom; purpose (guest rooms?) not stated. Floor numbering note in C ("per clubhouse file").
5. Dar Arafa is credited for "Rawasin" (C, M); previous site copy said "Rawasin Mall". Now phrased as Rawasin.
6. Finishing offices: C/O say "owners' units"; unclear if compound only or mall too. Placed on Apartments.
7. Middle East Engineering Consultants: project-level supervision; not specified for compound vs mall.
8. Spelling "Rawaseen" (M p.3) vs "Rawasin".
9. Mall main entrances, circulation diagram and travel times are not in any source; pages say so.
10. Smart Living has no route in the TASK 01 sitemap; kept as a section of Lifestyle & Amenities (`#smart`). Adding a route needs a decision.
11. Wayfinding, medical and parking standards (O) read as planned operating standards, presented as such; confirm they are committed.
12. Mall Master Plan has no drawing in the sources; hero render is used and labelled.
