# Visual QA screenshots

Automated headless-Chromium captures of the live preview (Next.js dev server,
`prefers-reduced-motion: reduce`, full-page screenshots). No real-device testing
was performed. All captures had **zero console errors**, **zero uncaught page
errors**, **one `<h1>`** and **no horizontal overflow**
(`document.documentElement.scrollWidth === clientWidth`).

| File | Page | Viewport | Language / direction |
| --- | --- | --- | --- |
| `home-desktop.png` | Home | 1440 × 900 | EN / LTR |
| `home-tablet.png` | Home | 834 × 1112 | EN / LTR |
| `home-mobile.png` | Home | 390 × 844 | EN / LTR |
| `developments-desktop.png` | Our Developments | 1440 × 900 | EN / LTR |
| `developments-mobile.png` | Our Developments | 390 × 844 | EN / LTR |
| `rawasin-mall-desktop.png` | Rawasin Mall | 1440 × 900 | EN / LTR |
| `rawasin-mall-tablet.png` | Rawasin Mall | 834 × 1112 | EN / LTR |
| `rawasin-mall-mobile.png` | Rawasin Mall | 390 × 844 | EN / LTR |
| `rawasin-mall-ar-mobile.png` | Rawasin Mall | 390 × 844 | AR / RTL |
| `rawasin-mall-third-floor.png` | Floor Explorer (Third Floor tab active) | 1440 × 900 section | EN / LTR |

The screenshots reflect the site with the brochure PDF unavailable: the Floor
Explorer shows its labelled "original floor plan pending" state until the
original plan images are supplied. See `docs/IMPLEMENTATION.md` §7 for the
zero-code-change activation path.
