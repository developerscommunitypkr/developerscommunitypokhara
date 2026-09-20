# Home + About Redesign — Design Spec

Date: 2026-09-20
Status: Approved direction (Option A: navy base, crimson action, tampa.dev structure)

## Goal

Redesign `index.html` and `about.html` in the style of https://tampa.dev/, using the logo's colors, mobile-first. Remove the named volunteer/team section from the About page (volunteers return later). All other pages receive only the color refresh via shared CSS variables.

## Palette (site-wide)

Extracted from `images/developers community pokhara logo.png` (PNG palette chunk):

- Primary navy: `#0E2A73` (backgrounds, headings, footer/CTA panels)
- Primary navy dark: `#081A4D` (hero gradient end)
- Primary navy light: `#2545A8` (gradients, hovers)
- Accent crimson: `#E6004B` (CTAs, badges, highlights only — never large surfaces)
- Crimson light: `#FF5C8A` (gradient ends, hover)
- Existing gray scale (`--gray-100`…`--gray-900`) unchanged.

Implementation: redefine the existing `--lake`, `--lake-light`, `--lake-dark` variables in `css/style.css` `:root` to the navy values (all pages inherit instantly), and add new `--crimson` / `--crimson-light` variables. No renaming of variables — old pages keep working untouched.

## index.html structure (top to bottom)

1. **Header** — existing markup and hamburger JS untouched; restyled: white, sticky, navy logo text, crimson hover underline.
2. **Hero** — dark radial navy gradient (`#1D3D9E` → `#0E2A73` → `#081A4D`). Contents: pill badge ("Pokhara · Est. 2023"), H1 "Pokhara's Tech Events Hub", one-line subtext, two CTAs: crimson solid "Browse Events →" (→ `events.html`), outline "About Us" (→ `about.html`).
3. **Featured event card** — white card overlapping the hero bottom (negative margin), shadow, rounded. **All existing element IDs preserved** (`eventCard`, `eventStatus`, `eventNumber`, `eventTitle`, `eventSubtitle`, `eventDate`, `eventTime`, `eventVenue`, `eventSpeaker`, `eventDescription`, `eventPoster`, `eventButton`, `eventNavigation`, `nextEventButton`, `year`) so `js/script.js` Nepal-time status logic works without modification. Status badge: crimson for UPCOMING/ONGOING, gray for COMPLETED.
4. **Upcoming events grid** — three static cards (image top with date badge overlay, title, time/venue meta) linking to `events/event_details.html?slug=…`. Content hand-picked from existing `events.html` entries. "View all events →" link.
5. **Stats band** — 3–4 stat tiles (events held, members, years, speakers) reusing numbers already on `about.html`.
6. **CTA panel** — dark navy rounded panel: "Join the Pokhara tech community" + social link buttons (existing socials from footer). Replaces tampa.dev's newsletter band (no backend; newsletter dropped by decision).
7. **Footer** — existing structure restyled navy.

## about.html structure

1. Navy hero strip (smaller than home): title + subtitle.
2. Story section (existing copy, restyled).
3. Stats cards (existing numbers, new card style).
4. Mission/values section (existing copy).
5. **Team section removed entirely.** Leave `<!-- Volunteers section returns here later -->` marker. Remove the "Meet Our Team" heading, subtitle, and all `team-card` markup from the page. Footer "Volunteer" link stays but points to `about.html` as before.
6. CTA panel (same component as home).

## Mobile-first rules

- Type scale via `clamp()`; H1 roughly 2rem → 3.5rem.
- Card grids: `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`.
- Hero stacks vertically; CTAs full-width under 480px.
- Featured-card hero overlap reduces/collapses under 640px.
- Existing hamburger menu behavior unchanged.
- Acceptance: clean layout at 375px width, no horizontal scroll.

## Explicitly out of scope

- No JS changes (only preserved IDs/classes referenced from `js/script.js`).
- No changes to `data/*.json`.
- No restructuring of `events.html`, `blog.html`, `talks.html`, `partnership.html`, `cloud-project.html`, detail pages — they get the variable-driven color refresh only.
- No newsletter signup.

## Testing

- Serve via `python3 -m http.server`; verify featured event card renders and status logic still selects the correct event (drive in browser).
- Check pages at 375px, 768px, 1280px widths.
- Spot-check untouched pages (events, blog) for color regressions from variable changes.
