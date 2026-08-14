# Academic Website Template

A JSON-driven personal academic website: vanilla HTML/CSS/JS, no build step, deployable to GitHub Pages as-is.

## Architecture (the one rule that matters)

**Content lives in `data/*.json`, never in HTML.** Each section is rendered client-side by a matching `js/*.js` module via the `Site.load` helper in `js/utils.js`. A section whose data file is missing, empty, or malformed hides itself silently.

The site is two pages sharing `css/styles.css`, `js/utils.js`, and `js/site.js` (site chrome: page title, nav name, footer, CV nav link — runs on every page):

- `index.html` — About page: profile, a scenery-photo divider (one photo), and a short curated publication highlight list. Deliberately spare.
- `research.html` — Publications, Invited Talks, and a Conference Presentations & Awards photo collage render under one "Research" headline as subsections, with an in-page jump-nav to navigate between them; Funding follows, then News, Working Papers, Projects, Software, and Teaching (currently empty/unused) further down.

| Section | Data file | Renderer | Page |
| --- | --- | --- | --- |
| About/profile | `data/profile.json` | `js/profile.js` | `index.html` |
| Latest publications (highlight) | `data/latest_publications.json` | `js/latest_publications.js` | `index.html` |
| Scenery photo (divider) | `data/scenery.json` | `js/scenery.js` | `index.html` |
| Publications (full list) | `data/publications.json` | `js/publications.js` | `research.html` |
| Talks (institution + date) | `data/talks.json` | `js/talks.js` | `research.html` |
| Conference presentations & awards (photo collage) | `data/presentations.json` | `js/presentations.js` | `research.html` |
| Funding (name + linked award title) | `data/funding.json` | `js/funding.js` | `research.html` |
| News | `data/news.json` | `js/news.js` | `research.html` |
| Working papers | `data/working_papers.json` | `js/working_papers.js` | not on either page currently |
| Ongoing projects | `data/ongoing_projects.json` | `js/ongoing_projects.js` | `research.html` |
| Software | `data/software.json` | `js/software.js` | `research.html` |
| Teaching | `data/teaching.json` | `js/teaching.js` | `research.html` |

Schemas are documented in `.claude/skills/update-site-data/references/schemas.md`. If you change a schema or renderer, update that file in the same session.

## Conventions

- Entries in data files go newest-first; match each file's existing indentation.
- Local paths in data files use a `./` prefix (e.g., `./docs/publications/...`).
- Per-paper assets live in `docs/publications/0_LastName_ShortTitle/` (working papers) or `docs/publications/YYYY_LastName_ShortTitle/` (published), each with a `cite.bib` and the PDF.
- After editing any `data/*.json`, validate it: `python3 -m json.tool data/<file>.json`.

## Skills

- `/setup-site` — design/build the site from reference URLs, screenshots, or design notes (initial setup or redesign).
- `/update-site-data` — add/convert papers, news, talks, software, projects, teaching, or profile edits.
- `/preview-site` — validate data files, serve locally (`python3 -m http.server`), and verify sections render.

## Preview

`python3 -m http.server 8000` from the repo root, then open `http://127.0.0.1:8000/`. Opening `index.html` via `file://` will NOT work — `fetch` needs HTTP.
