# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Static website for Developers Community Pokhara (devpkr.com). Plain HTML/CSS/JS — no build system, no package.json, no framework, no tests. Deployed via GitHub Pages (CNAME → devpkr.com).

## Running Locally

Pages load JSON via `fetch()`, which fails on `file://`. Serve over HTTP:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Architecture

All styling lives in one file: `css/style.css` (class prefix `td-` for shared layout components like header/footer).

### Event data is duplicated in THREE places

Adding or editing an event requires touching all three:

1. **`js/script.js`** — hardcoded `events` array powering the featured event card on `index.html`. Contains Nepal-time (GMT+5:45) status logic: computes upcoming/ongoing/past from `date` + `startTime`/`endTime` (24h format) and picks the closest upcoming/ongoing event as default. Follow the comment block in that file for field formats.
2. **`events.html`** — static hardcoded event cards (the listing page), each linking to `events/event_details.html?slug=<slug>`.
3. **`data/event_details.json`** — detail content, keyed by slug, fetched by inline JS in `events/event_details.html`.

### Blog data is duplicated in TWO places

1. **`data/blogs.json`** — listing metadata, fetched by `js/blog.js` for `blog.html` (groups posts by year, newest first).
2. **`data/blog_details.json`** — full post content keyed by slug, fetched by inline JS in `blogs/blog_details.html` (`?slug=<slug>` URL param).

Blog/event body content uses a typed-block format: `{ "type": "paragraph" | "heading", "text": "..." }`.

### Detail pages use relative fetch paths

`blogs/blog_details.html` and `events/event_details.html` fetch `../data/*.json` — they only work from their subdirectory URLs. Image paths in JSON/JS are inconsistent (some root-relative `/images/...`, some relative `images/...`); check what the consuming page expects.

### Pages

`index.html` (home + featured event), `events.html`, `blog.html`, `about.html`, `talks.html`, `partnership.html`, `cloud-project.html` — each is a standalone HTML file with duplicated header/footer markup. `events.html` and most static pages carry their own inline hamburger-menu script instead of loading `js/script.js`; a header change means editing every HTML file.
