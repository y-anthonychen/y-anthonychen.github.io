# Data File Schemas

Schemas and examples for every file under `data/`. Optional fields are marked; each file is rendered by the matching `js/*.js` module.

> **Pages:** The site is split across two HTML pages sharing `css/styles.css` and `js/utils.js` + `js/site.js` (site chrome: title, nav name, footer, CV link). `index.html` is the About page: profile, a scenery-photo divider (first entry of `data/scenery.json`), and a short `data/latest_publications.json` highlight list. `research.html` groups Publications (full list) + Invited Talks + Conference Presentations & Awards (photo collage) under one "Research" headline with an in-page jump-nav, followed by Funding, and (currently empty) News/Projects/Software/Teaching further down. Working Papers has no section markup on either page right now (see note below) — add it back to bring it into the Research group.

> **Note:** These schemas describe the template as shipped. If the site has been redesigned (via `/setup-site` or manually), the live `data/*.json` files and `js/*.js` renderers are the ground truth. When they diverge from this file, follow the code and update this file to match.

## data/profile.json — name, bio, links

Object. Rendered by `js/profile.js` (also sets the page title, nav name, and footer).

```json
{
  "name": "Dr. Jane Placeholder",
  "title": "Assistant Professor of Something Interesting",
  "affiliation": "University of Somewhere",
  "photoPath": "./assets/images/headshot.svg",
  "bio": [
    "First paragraph of the bio.",
    "Second paragraph of the bio."
  ],
  "links": [
    { "label": "Google Scholar", "url": "https://scholar.google.com/..." },
    { "label": "Email", "url": "mailto:jane@example.edu" }
  ]
}
```

- `bio` is an array of paragraphs. Each paragraph is rendered as trusted HTML (like `news.json`'s `htmltext`): use single-quoted attributes, `<a href='URL' target='_blank'>` for hyperlinks (only for named entities with a real, verified URL — e.g. an institution or center homepage), and `<em>` for journal/venue names.
- Each `links` entry may set an optional `icon` (`scholar`, `orcid`, `linkedin`, `cv`, `email` — SVGs defined in `PROFILE_ICONS` in `js/profile.js`). With an icon, the link renders as that icon and `label` becomes its tooltip/aria-label; without one, `label` renders as text.
- Optional: `photoPath` (omit to render without a photo).
- Optional: `note` — a short trusted-HTML callout (e.g. a job-market notice) rendered in a tinted box below the links; omit to hide it.

## data/latest_publications.json — About page highlight list

Array, same shape as `data/publications.json` below (a subset — the site owner curates which entries appear here, e.g. skipping less prominent papers). Rendered by `js/latest_publications.js` on `index.html`.

## data/publications.json — full journal article list

Array, ordered by year (newest first). Rendered by `js/publications.js` on `research.html`.

```json
{
  "title": "A very important finding about an interesting phenomenon",
  "authors": "Jane Placeholder, Collaborator One, Collaborator Two",
  "publication": "Journal of Important Findings",
  "year": "2025",
  "url": "https://doi.org/10.0000/example.2025",
  "pdfPath": "./docs/publications/2025_Placeholder_ImportantFinding/2025_Placeholder_ImportantFinding.pdf",
  "bibPath": "./docs/publications/2025_Placeholder_ImportantFinding/cite.bib"
}
```

- `year` is a string. `url` is the canonical DOI/publisher link.
- Optional: `pdfPath`, `bibPath` (links only render when present), `imagePath` (a thumbnail/figure shown beside the entry, e.g. `./assets/images/...`).
- Shared-first-authorship is marked with `†` after author names.
- The site owner's name (`Site.selfName` in `js/utils.js`, currently `Y. A. Chen`) is auto-bolded in `authors` on every paper card — write it exactly that way.

## data/working_papers.json — preprints / under review

Array, newest first. Rendered by `js/working_papers.js`. Not currently included on either page (no `<section>`/script tag references it) — add a `working-papers` subsection back to `research.html` (matching the `publications`/`talks` subsection pattern) to bring it back.

```json
{
  "title": "A new preprint that is currently under review",
  "authors": "Jane Placeholder, Collaborator Three",
  "url": "https://doi.org/10.48550/arXiv.0000.00000",
  "id": "modal_placeholder_preprint",
  "pdfPath": "./docs/publications/0_Placeholder_NewPreprint/0_Placeholder_NewPreprint.pdf",
  "bibPath": "./docs/publications/0_Placeholder_NewPreprint/cite.bib"
}
```

- `id` is a unique identifier: `modal_[lowercase_short_identifier]` (author name + key title word).
- Optional: `pdfPath`, `bibPath`, `publication` (status note, e.g. `"Under review at Journal X"`), `imagePath` (a thumbnail/figure shown beside the entry).

## data/news.json — news items

Array of year groups, newest year first; items within a year are newest first. Rendered by `js/news.js`.

```json
{
  "year": "2026",
  "items": [
    {
      "type": "Preprint",
      "htmltext": "New preprint: <a href='https://doi.org/...' target='_blank'>Paper Title</a>."
    }
  ]
}
```

- `type` is one of: `Publication`, `Preprint`, `Talk`, `Award`, `Media`, `Tool`, `General`.
- `htmltext` conventions: single-quoted HTML attributes; links as `<a href='URL' target='_blank'>`; `<em>` for venues; `<code>` for software names. 1–2 sentences, professional tone, emojis only for big milestones.
- Per-type patterns:
  - Publication: `Our paper <a>Title</a> was published in <em>Journal</em>.`
  - Preprint: just the linked title: `New preprint: <a>Title</a>.`
  - Talk: `Gave an invited talk at <a>Event</a>...` or `...accepted for a poster/talk at <a>Conf</a>.`
  - Award: `Honored to receive [award] from <a>Org</a>.`
  - Media: `<a>Outlet</a> covered our paper <a>Title</a>.`
  - Tool: `Created <a><code>name</code></a> — description.`

## data/talks.json — invited talks (institution + date, no titles)

Array, newest first. Rendered by `js/talks.js` as a plain divider-list (institution name, date below it) — deliberately no talk titles, just the notable host institutions. Drop minor venues.

```json
{ "institution": "Stanford University", "date": "November 2023" }
```

- Optional: `date`.

## data/presentations.json — conference/presentation photo collage

Array of `{ src, alt }`, same shape as `data/scenery.json` below. Rendered by `js/presentations.js` as a CSS-columns masonry collage (each photo keeps its natural aspect ratio — no forced cropping, so mixed portrait/landscape photos all work) in the "Conference Presentations & Awards" subsection of `research.html`.

## data/funding.json — funders

Array. Rendered by `js/funding.js` as a divider-list: funder name, with the specific award/grant title (wording from the CV) hyperlinked to a relevant page.

```json
{
  "name": "Stanford Impact Labs",
  "title": "Emerging Scholars Fellowship",
  "url": "https://impact.stanford.edu/people/anthony-chen"
}
```

- `url` is optional (title renders as plain text without it). No logos — text-only by design (logo sourcing was tried and abandoned; verified official logo assets weren't available for these funders).

## data/scenery.json — About page photo(s)

Array of `{ src, alt }`. Rendered by `js/scenery.js`: only the **first** photo is used, as a wide divider band between the bio and Latest Publications on `index.html`. The rest of the array is unused (kept so reordering/adding photos is just a JSON edit — moving a different entry to index 0 swaps the divider photo).

```json
{ "src": "./assets/images/scenery/ocean-sunset.jpg", "alt": "Sunset over the Pacific coast" }
```

## data/software.json — software and tools

Array. Rendered by `js/software.js`.

```json
{
  "title": "example-package",
  "description": "A Python package that does something useful from the command line.",
  "href": "https://github.com/username/example-package"
}
```

## data/ongoing_projects.json — ongoing projects

Array. Rendered by `js/ongoing_projects.js`.

```json
{
  "title": "A large ongoing research project",
  "description": "A multi-year effort to understand an important phenomenon."
}
```

## data/teaching.json — courses taught

Array, newest first. Rendered by `js/teaching.js`.

```json
{
  "title": "Introduction to Interesting Things",
  "role": "Instructor",
  "institution": "University of Somewhere",
  "term": "Spring 2026",
  "description": "An undergraduate introduction to the field."
}
```

- Optional: `description`.

## docs/publications/ directory convention

Each paper has a directory under `docs/publications/` containing its PDF and a `cite.bib`:

- **Working papers (unpublished):** `0_LastName_ShortTitle/` (the `0` prefix means unpublished)
- **Published papers:** `YYYY_LastName_ShortTitle/` (year prefix)
- `ShortTitle` = first 2–3 significant title words, no spaces (e.g., `ImportantFinding`)
