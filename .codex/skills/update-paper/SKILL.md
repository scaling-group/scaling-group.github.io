---
name: update-paper
description: Update this website when the user provides a new paper link or an official publication link. Use this skill for arXiv links, journal links, conference links, and paper-status upgrades that should sync News, Publications, and related blog posts in this repository.
---

# Update Paper

Use this skill when the user asks to add a paper, update a paper link, or sync a paper's publication status across the website.

This repository stores paper-related content in:

- `_data/publist.yml`
- `_data/news.yml`
- `_blogs/*.md`

## Goal

Keep the paper information consistent across the site.

- If the user provides an **arXiv link**, add the paper to `Publications` and `News`.
- If the paper is mentioned in a related blog post, improve that blog post as well.
- If the user provides an **official journal or conference link**, update `Publications`, `News`, and any other related content so the official link is reflected everywhere appropriate.

## Working Rules

- Preserve the repository's existing writing style and YAML structure.
- Prefer updating an existing paper entry over creating a duplicate.
- Match papers primarily by title; use authors and old links as secondary checks.
- Do not invent metadata that cannot be verified from the provided link or the existing repository content.
- Do not create a brand-new blog post unless the user explicitly asks for one.
- If a related blog post exists, make a minimal but meaningful update instead of rewriting the article.

## Repository Conventions

### Publications

Edit `_data/publist.yml`.

Each paper is a YAML item with fields such as:

- `title`
- `image`
- `description`
- `authors`
- `link.url`
- `link.display`
- `github`
- `highlight`

Rules:

- Newer papers appear earlier in the file.
- Preserve verified author footnote markers in `authors`:
  - use `<sup>*</sup>` for equal-contribution authors when the paper states equal contribution
  - use `<sup>†</sup>` for corresponding authors when the paper states corresponding author status
  - for arXiv papers, check the arXiv HTML/PDF/source for author footnotes because the abstract page often omits them
- `link.url` should point to the primary current destination for the paper.
- `link.display` should summarize status in the existing style, for example:
  - `arXiv, May 2026`
  - `Neural Networks, April 2025 / arXiv, Aug 2023`
  - `Transactions on Machine Learning Research, Jan 2026 / arXiv, Nov 2024`

### News

Edit `_data/news.yml`.

Rules:

- Newer news items appear earlier in the file.
- Follow the existing tone:
  - arXiv case: `Our paper [Title](link) is now available on arXiv.`
  - official publication case: `Our paper [Title](link) is published in Venue.` or `is accepted by Venue.`
- Reuse an existing news item when it is clearly the same milestone; otherwise add a new one.

### Blogs

Inspect `_blogs/*.md` for related mentions.

Typical blog updates are:

- Add or refresh a paper hyperlink when a plain-text mention exists.
- Upgrade an arXiv-only mention to include the official venue.
- Adjust one short sentence so the post reflects the paper's latest status.

Keep blog edits narrow. Do not change the article's argument or voice.

## Workflow

1. Read the provided paper link and identify:
   - title
   - authors, including verified equal-contribution and corresponding-author markers
   - venue or source
   - publication status
   - publication month/year if available
   - arXiv link if the official page references it, or existing arXiv link from the repo
2. Search `_data/publist.yml`, `_data/news.yml`, and `_blogs/*.md` for the paper title and distinctive aliases.
3. Decide whether this is:
   - a brand-new arXiv paper
   - a brand-new officially published paper
   - a status upgrade for an existing arXiv paper
4. Update `publist.yml` first.
5. Update `news.yml` next.
6. Update related blog posts last, if any.
7. Verify that links, venue names, and dates are consistent across all touched files.

## Decision Rules

### Case A: User provides an arXiv link

- Add a new publication entry if the paper does not already exist.
- If the paper already exists with an older or versioned arXiv URL, normalize to the best current arXiv landing page when appropriate.
- Add a news item announcing arXiv availability unless an equivalent item already exists.
- If a blog post discusses the paper's topic or explicitly names the paper, add or improve the paper link there.

### Case B: User provides a journal or conference link

- Find the existing publication entry if the paper was previously listed from arXiv.
- Update `link.url` to the official paper page.
- Update `link.display` so it includes the venue and publication date, and keep the arXiv reference when relevant.
- Update any existing news item that still points only to arXiv when the official link should replace it, or add a new milestone item if publication/acceptance is a distinct event.
- Update related blog posts so official venue information appears wherever the paper is already discussed.

## Blog Matching Heuristics

Treat a blog post as related if at least one of the following is true:

- The exact paper title appears.
- The post already links to the paper or its arXiv version.
- The post contains a section summarizing that paper in a sequence of group papers.

If multiple related posts exist, update all clearly relevant ones.

## Output Standard

When using this skill, finish by reporting:

- which files were changed
- whether this was a new paper or a status upgrade
- whether related blog content was found and updated
- any metadata that could not be confidently determined
