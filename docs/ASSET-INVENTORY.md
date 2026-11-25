# TASK 03 — Visual asset inventory and mapping

Registry in code: `src/content/assets.ts` (variants, intrinsic size, bilingual alt). Nothing was generated, downloaded or deleted; source files on `G:\Dama Development` are untouched.

## Source folders audited

| Folder | Files | Dimensions | Category | Status |
|---|---|---|---|---|
| `Reseidential/rawasin desgin 22-10-2026` | 22 | 3840×2880 (4:3) | Residential renders: gates, streets, façades, rooftop, aerials, top-view master plan | Staged earlier as `gallery/residential/rawasin-NN-*` (sm 900 / lg 2400). **New: md 1600** for heroes, banners, frames |
| `Mall/MALL 3D DESIGN` day (13) + night (7) | 20 | 3840–5760 wide | Mall exterior renders | Staged earlier as `gallery/mall/*`. **New: md 1600**. No interiors exist |
| `Reseidential/Rawasin Compound` Picture1–13 | 13 | 794×992 / 794×1123 / 650×434 / 758×587 | Brochure renders: courtyard path, green rooftop terrace, lobby (C1), screens, street axis, top view, **location map**, mall entrance | **New:** staged to `rawasin/brochure/*.webp` at native size (never upscaled). Picture13 = duplicate of Picture11, Picture7 = low-res crop of Picture1: not used |
| `…/Rawasin Compound/مسجد رواسين.jpg` | 1 | 794×1123 | Mosque interior (prayer niche) | **New:** `brochure/mosque-prayer.webp`; replaces an aerial that was labelled "mosque" |
| `…/Rawasin Compound/*.png` clubhouse (الأرضي، الثاني، الثالث، الرابع، سطح) | 5 | ~710×340 | Clubhouse floor plans | **New:** `rawasin/clubhouse/*.webp`; shown as a plan gallery in the Clubhouse section |
| `…/Rawasin Compound` apartment plans | 5 | ~660×630 | Apartment layouts | Staged in TASK 02 (`apartments/type-N.webp`) |
| `…/Rawasin Compound` Accord, middle east, we-logo | 3 | ≤325 px | Partner logos | **New:** `partners/*.webp`, shown on Mall › Partners |
| `Reseidential/Mall` floor plans | 5 | 1315–4245 wide | Mall plans | In use since TASK 01 (`plans/*.jpg`) |
| `PNG/RAWASIN LOGO-01…22` | 22 | 4167² | Rawasin wordmark / mark / colour variants | **New:** 5 trimmed variants in `images/brand/` (registered, not yet placed: no spot in the current design uses a Rawasin lockup) |
| `public/images/*` legacy (21 files) | | | See below | |

## Legacy site images

| File | Verdict |
|---|---|
| hero-building, dama-jacaranda-hero, dama-courtyard-living, story-courtyard, lifestyle-entrance, story-detail-*, lifestyle-tree, rawasin-aerial(-masterplan) | Rawasin concept art: **kept** (cards, story details). Some are 760–890 px: kept to small frames |
| about-dama, cta-dama, hero-dama, project-residence, project-rwasin, project-view, lifestyle-interior, lifestyle-terrace | **Unsuitable**: coastal villas/pools/interiors that are not Rawasin. Removed from every page; files left on disk (not deleted) |
| dama-twin-residences.png (970 KB PNG) | Replaced by a 1600 px render; unused |
| rawasin-aerial.webp vs rawasin-aerial-masterplan.jpg | Duplicates of one view |
| `rawasin/compound-masterplan/-courtyard/-clubhouse/-facade/-mosque` | **Mislabelled**: they are street/gate/aerial renders, not a master plan, clubhouse or mosque. Roles corrected; still on disk |

## Placement

| Page | Visuals |
|---|---|
| Home | Hero slides: jacaranda façade, corner façade, aerial (Ken Burns push on active slide). CTA: gate render. Generic villa images removed |
| About | Hero: façade row; CTA: gate; "Our work": layered façade + courtyard path |
| Developments | Branch cards are now image-led: residential street render, mall front elevation |
| Rawasin hub | Aerial banner, layered courtyard pair, portrait mosaic (path, rooftop, lobby, mosque) |
| Residential overview | Hero (jacaranda façade, slow push), layered screens pair, duo, true top-view master plan |
| Architecture | Banner, 5-tile bento of façades, 22-image film strip with lightbox |
| Lifestyle & Amenities | Portrait mosaic, clubhouse plans strip, real mosque photograph, courtyard collage |
| Apartments | Façade banner; plan images (TASK 02) |
| Location (res.) | Aerial banner, top-view master plan |
| Commercial overview | Banner, 5-tile bento of mall renders |
| Mall overview | Hero push, layered café + entrance, duo, night front, 19-image bento gallery |
| Floor pages | One matching render each (basement: MARKET corner; ground: café terrace; first: entrance 3; third: lit corner) |
| Units / Medical | Retail and medical entrances paired; medical entrance and pharmacy on Medical |
| Mall Lifestyle | Bento + 19-image film strip |
| Operations / Location (mall) | Night banners; location map from the brochure |
| Partners | ACCORD, WE, Middle East Engineering Consultants logos |

Residential and mall imagery are kept on their own branches. The Rawasin hub, Developments and Home show both because they present both.

## Not available (not invented)
Apartment or retail/medical **interiors**, a clubhouse **first-floor** plan, a **Rawasin Mall logo** file, a Dar Arafa Architecture logo and the four finishing-office logos (only ACCORD, WE and Middle East Engineering Consultants logos were supplied), and Mall brand photography (people, lifestyle).
