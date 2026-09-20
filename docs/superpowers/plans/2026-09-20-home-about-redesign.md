# Home + About Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle index.html and about.html in the tampa.dev mold using the logo palette (navy `#0E2A73`, crimson `#E6004B`), remove the named team section from About, mobile-first.

**Architecture:** Pure static site — no build step. All new styles are appended to `css/style.css` under a clearly-marked `V2 REDESIGN` block using new `-v2` class names, so existing pages are untouched except through the shared `:root` variable swap. `js/script.js` is never edited; the featured event card keeps every element ID it reads.

**Tech Stack:** Plain HTML/CSS. Verification via `python3 -m http.server 8000` + browser (Chrome DevTools MCP) at 375/768/1280 px.

**Spec:** `docs/superpowers/specs/2026-09-20-home-about-redesign-design.md`

**Content-preservation note (deviation from spec's section list):** The existing "Our Partners" section on index.html is KEPT (restyled automatically by the variable swap) — deleting partner logos is an outward-facing content change nobody approved. The "Our Values" section is REMOVED from index.html because the same content lives on about.html ("What We Stand For"). Everything else follows the spec.

---

### Task 1: Palette swap in `:root`

**Files:**
- Modify: `css/style.css:5-35` (the `:root` block)

- [ ] **Step 1: Replace lake values with navy, add crimson vars**

In the `:root` block, change exactly these three lines:

```css
  --lake: #3A7CA5;
  --lake-light: #5A9CC5;
  --lake-dark: #2A5C85;
```

to:

```css
  --lake: #0E2A73;
  --lake-light: #2545A8;
  --lake-dark: #081A4D;
  --crimson: #E6004B;
  --crimson-light: #FF5C8A;
```

Do NOT rename the `--lake*` variables — every existing page references them.

- [ ] **Step 2: Verify no other hardcoded lake-blue hexes remain**

Run: `grep -rn '3A7CA5\|5A9CC5\|2A5C85' css/ *.html blogs/ events/ js/`
Expected: zero matches (if any appear in HTML inline styles, replace them with `var(--lake)` etc. — check each hit).

- [ ] **Step 3: Visual smoke check of untouched pages**

Run: `python3 -m http.server 8000` (background). Open `http://localhost:8000/events.html` and `http://localhost:8000/blog.html` in the browser. Expected: pages render with navy accents instead of lake blue, nothing broken.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "Swap palette to logo navy/crimson"
```

### Task 2: Append V2 component CSS

**Files:**
- Modify: `css/style.css` (append at end of file)

- [ ] **Step 1: Append the full V2 block at the end of `css/style.css`**

```css
/* ============================================
   V2 REDESIGN — Home + About (tampa.dev-style)
   ============================================ */

/* --- Hero --- */
.hero-v2 {
  background: radial-gradient(ellipse at 80% -30%, #1d3d9e 0%, var(--lake) 45%, var(--lake-dark) 100%);
  padding: clamp(3rem, 8vw, 6rem) 0 clamp(4.5rem, 10vw, 7rem);
  color: var(--white);
}

.hero-v2__badge {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #c7d2fe;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
}

.hero-v2__title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.hero-v2__subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #c7d2fe;
  max-width: 38rem;
  margin-bottom: 2rem;
}

.hero-v2__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-v2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.625rem;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.btn-v2--crimson {
  background: var(--crimson);
  color: var(--white);
  box-shadow: 0 4px 14px rgba(230, 0, 75, 0.35);
}

.btn-v2--crimson:hover {
  background: var(--crimson-light);
  transform: translateY(-1px);
}

.btn-v2--outline {
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: var(--white);
}

.btn-v2--outline:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* --- Featured event card overlaps hero --- */
.events-section--overlap {
  margin-top: clamp(-5rem, -8vw, -3rem);
  position: relative;
  z-index: 2;
  padding-top: 0;
}

.events-section--overlap .event-card {
  box-shadow: 0 12px 40px rgba(14, 42, 115, 0.14);
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--card-bg);
}

.events-section--overlap .event-status {
  background: var(--crimson);
  color: var(--white);
}

.events-section--overlap .event-status.past {
  background: var(--gray-200);
  color: var(--gray-600);
}

/* --- Recent events grid --- */
.event-grid-v2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.event-card-v2 {
  display: block;
  border: 1px solid var(--border);
  border-radius: 0.875rem;
  overflow: hidden;
  background: var(--card-bg);
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.event-card-v2:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(14, 42, 115, 0.12);
}

.event-card-v2__media {
  position: relative;
  aspect-ratio: 16 / 9;
  background: linear-gradient(120deg, var(--lake), var(--lake-light));
}

.event-card-v2__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-card-v2__date {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  background: var(--white);
  color: var(--lake);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: 0.5rem;
}

.event-card-v2__body {
  padding: 1rem 1.125rem 1.25rem;
}

.event-card-v2__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.375rem;
}

.event-card-v2__meta {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* --- CTA panel --- */
.cta-panel-v2 {
  background: var(--lake);
  border-radius: 1.25rem;
  padding: clamp(2rem, 6vw, 3.5rem);
  text-align: center;
  color: var(--white);
}

.cta-panel-v2 h2 {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.cta-panel-v2 p {
  color: #c7d2fe;
  max-width: 34rem;
  margin: 0 auto 1.5rem;
}

.cta-panel-v2__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* --- About page hero strip --- */
.page-hero-v2 {
  background: radial-gradient(ellipse at 80% -30%, #1d3d9e 0%, var(--lake) 45%, var(--lake-dark) 100%);
  padding: clamp(2.5rem, 6vw, 4rem) 0;
  color: var(--white);
  text-align: center;
}

.page-hero-v2 h1 {
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.page-hero-v2 p {
  color: #c7d2fe;
  max-width: 36rem;
  margin: 0 auto;
}

/* --- Mobile --- */
@media (max-width: 480px) {
  .hero-v2__actions .btn-v2 {
    width: 100%;
  }
}
```

- [ ] **Step 2: Confirm the file still parses (no stray braces)**

Run: `python3 -c "c=open('css/style.css').read(); assert c.count('{')==c.count('}'), (c.count('{'), c.count('}'))" && echo OK`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "Add V2 component styles"
```

### Task 3: index.html — new hero + overlap featured card

**Files:**
- Modify: `index.html:118-168` (hero section + commented-out block) and `index.html:169-178` (events-section opening + heading)

- [ ] **Step 1: Replace the hero**

Delete lines 118–168 (the whole `<section class="hero">…</section>` AND the commented-out `<!-- ===== UPCOMING EVENT ===== -->` block that follows it). Insert:

```html
  <section class="hero-v2">
    <div class="container">
      <span class="hero-v2__badge">🏔 Pokhara · Est. 2023</span>
      <h1 class="hero-v2__title">Pokhara's Tech<br>Events Hub</h1>
      <p class="hero-v2__subtitle">Meetups, talks and workshops from the lake city's developer community. Free and open
        to everyone.</p>
      <div class="hero-v2__actions">
        <a href="events.html" class="btn-v2 btn-v2--crimson">Browse Events →</a>
        <a href="about.html" class="btn-v2 btn-v2--outline">About Us</a>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Make the featured event card overlap the hero**

On the events-section opening tag (`<section class="events-section" id="events">`) add the overlap modifier:

```html
  <section class="events-section events-section--overlap" id="events">
```

Then delete the `section-heading` div inside it (the `<div class="section-heading">…</div>` containing `sectionTitle` / `sectionDescription`) — the hero now does that job. Everything else in the section (the `event-card` article with all its IDs, `eventNavigation`) stays byte-for-byte identical.

- [ ] **Step 3: Verify the featured card still works**

Serve and open `http://localhost:8000/`. Expected: dark navy hero, white event card overlapping its bottom edge, card populated by JS (title "Reading Unites Developers" or current default), status badge crimson, "View Other Event" cycles events, footer year filled.
Also check DevTools console: no JS errors (missing `sectionTitle` must not break anything — `js/script.js` never references it; confirm with `grep -n 'sectionTitle' js/script.js` → zero matches).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "New hero with overlapping featured event card"
```

### Task 4: index.html — recent events grid, drop values, add CTA panel

**Files:**
- Modify: `index.html` (insert new section after events-section; delete "Our Values" section; insert CTA panel before footer)

- [ ] **Step 1: Insert recent-events grid section right after the closing `</section>` of the events-section**

```html
  <!-- ===== RECENT EVENTS ===== -->
  <section class="section">
    <div class="container">
      <div class="section__header">
        <h2 class="section__title">Recent Events</h2>
        <p class="section__subtitle">Catch up on what the community has been doing.</p>
      </div>
      <div class="event-grid-v2">
        <a class="event-card-v2" href="events/event_details.html?slug=stock-market-vc-2026">
          <div class="event-card-v2__media">
            <span class="event-card-v2__date">Jul 2026</span>
          </div>
          <div class="event-card-v2__body">
            <div class="event-card-v2__title">Stock Market &amp; Venture Capital</div>
            <div class="event-card-v2__meta">La Grande International College, Pokhara</div>
          </div>
        </a>
        <a class="event-card-v2" href="events/event_details.html?slug=meetup-june-2026">
          <div class="event-card-v2__media">
            <span class="event-card-v2__date">Jun 2026</span>
          </div>
          <div class="event-card-v2__body">
            <div class="event-card-v2__title">Monthly Developer Meetup</div>
            <div class="event-card-v2__meta">Pokhara</div>
          </div>
        </a>
        <a class="event-card-v2" href="events/event_details.html?slug=meetup-may-2026">
          <div class="event-card-v2__media">
            <span class="event-card-v2__date">May 2026</span>
          </div>
          <div class="event-card-v2__body">
            <div class="event-card-v2__title">Monthly Developer Meetup</div>
            <div class="event-card-v2__meta">Pokhara</div>
          </div>
        </a>
      </div>
      <p style="text-align:center;margin-top:1.5rem;">
        <a href="events.html" style="color:var(--lake);font-weight:600;">View all events →</a>
      </p>
    </div>
  </section>
```

Before committing, open `events.html`, find these three cards, and correct each card's title, month label, and venue text to match what `events.html` actually shows for those slugs (the markup above uses the slugs verified to exist at `events.html:154,182,199`). If a card there has a poster image, copy its `<img>` into the matching `event-card-v2__media` div above the date badge.

- [ ] **Step 2: Delete the "Our Values" section**

Delete the whole `<section class="section">…</section>` block containing `<h2 class="section__title">Our Values</h2>` (around lines 312–357 pre-edit; find it by the title). The Partners section that follows it stays.

- [ ] **Step 3: Insert CTA panel between the Partners section and the footer**

```html
  <!-- ===== JOIN CTA ===== -->
  <section class="section">
    <div class="container">
      <div class="cta-panel-v2">
        <h2>Join the Pokhara tech community</h2>
        <p>Come to a meetup, give a talk, or just hang out with people who build things.</p>
        <div class="cta-panel-v2__actions">
          <a href="https://github.com/dev-community-pokhara" target="_blank" rel="noopener noreferrer"
            class="btn-v2 btn-v2--crimson">GitHub</a>
          <a href="https://www.linkedin.com/company/developers-community-pokhara" target="_blank"
            rel="noopener noreferrer" class="btn-v2 btn-v2--outline">LinkedIn</a>
          <a href="https://www.facebook.com/groups/developerscommunitypokhara" target="_blank"
            rel="noopener noreferrer" class="btn-v2 btn-v2--outline">Facebook</a>
        </div>
      </div>
    </div>
  </section>
```

Before committing, verify the three URLs against the ones already in the footer (`index.html` footer social links) and use those exact hrefs.

- [ ] **Step 4: Verify in browser**

Reload `http://localhost:8000/`. Expected order: hero → featured card → Recent Events grid (3 cards, hover lift) → Stats → Partners → CTA panel → footer. Click one grid card → event detail page loads with correct event.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Add recent events grid and join CTA, drop values section"
```

### Task 5: about.html — navy hero, remove team section

**Files:**
- Modify: `about.html:116-~150` (page-hero), `about.html:~334-440` (team section)

- [ ] **Step 1: Restyle the page hero**

Replace the existing `<section class="page-hero">…</section>` (starts at line 116) with:

```html
  <section class="page-hero-v2">
    <div class="container">
      <h1>About Developers Community Pokhara</h1>
      <p>A volunteer-run community for software developers, engineers, and tech enthusiasts in Pokhara, Nepal.</p>
    </div>
  </section>
```

Keep whatever copy the existing page-hero has if it is better — reuse its exact `<h1>` and intro text inside the new markup rather than inventing new wording.

- [ ] **Step 2: Delete the team section**

Delete the entire `<section class="section">…</section>` block that contains `<h2 class="section__title">Meet Our Team</h2>` and every `team-card` (runs from ~line 334 to the `</section>` just before `<!-- ===== CTA SECTION ===== -->`). Replace it with the single marker line:

```html
  <!-- Volunteers section returns here later -->
```

- [ ] **Step 3: Verify**

Run: `grep -n 'team-card\|Meet Our Team\|Surendra\|Jerusha\|Saurab\|Kiran' about.html`
Expected: zero matches (footer "Volunteer" nav link does not match these patterns and stays).
Open `http://localhost:8000/about.html`. Expected: navy hero strip, story/stats/values render with navy palette, no team grid, existing CTA section still present.

- [ ] **Step 4: Commit**

```bash
git add about.html
git commit -m "Redesign about hero, remove team section"
```

### Task 6: Responsive + regression pass

**Files:** none (verification only; fix-ups amend the relevant file)

- [ ] **Step 1: Mobile check**

With the server running, use Chrome DevTools (or resize) at 375px width on `/` and `/about.html`. Expected: no horizontal scroll, hero CTAs full-width, event grid single column, overlap card not clipped, hamburger menu opens/closes.

- [ ] **Step 2: Tablet + desktop check**

Repeat at 768px and 1280px. Expected: grid 2–3 columns, hero type scales up.

- [ ] **Step 3: Untouched-page regression**

Open `/events.html`, `/blog.html`, `/talks.html`, `/partnership.html`, `/cloud-project.html`, one blog detail, one event detail. Expected: everything renders; only colors changed (navy where lake blue was).

- [ ] **Step 4: Fix anything found, amend or commit small fixes**

```bash
git add -A && git commit -m "Responsive fixes"
```

(Skip if nothing to fix.)
