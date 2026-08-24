# AGENTS.md — Design Portfolio

## Purpose

This file defines how coding agents should work on the personal product-design portfolio.

The portfolio presents product design, leadership and strategy work. Its primary job is not to demonstrate frontend engineering; it is to communicate thinking, impact, craft and leadership clearly to hiring managers and senior product/design audiences.

## Product principles

- Content, narrative and perceived quality are more important than technical novelty.
- Preserve a premium, restrained visual direction.
- Motion should support comprehension and perceived craft, never become a blocker or distraction.
- Prioritize shipping a credible MVP and iterate from real use.
- Keep the site fast, responsive and accessible.
- Avoid dependencies, frameworks or abstractions that do not materially improve the portfolio.
- Do not invent career facts, metrics, outcomes, quotes or case-study details.
- Treat product/design decisions as product-owner decisions; surface assumptions for review.

## Current stack

- HTML
- CSS
- Vanilla JavaScript
- Vite 8
- Wrangler 4 available in the project tooling

The current homepage includes selected work, earlier experience, about content and contact links. It supports localized strings through `data-i18n` hooks and JavaScript.

## Current content direction

Selected work currently includes case-study entry points for:
- meutudo
- Mercado Livre
- Facily

Earlier experience and an About section also appear on the homepage.

The portfolio is intended to position the owner for senior product-design leadership opportunities. Case studies should emphasize problem framing, decisions, collaboration, systems thinking, leadership and measurable impact where verified evidence exists.

## Important implementation areas

- `index.html` — homepage and primary portfolio narrative
- `src/styles/` — reset, tokens, global styles and animations
- `src/scripts/main.js` — client behavior/localization
- `work/` — case-study pages
- `package.json` — Vite scripts/tooling

Inspect the repository before assuming additional structure.

## Git workflow

Never implement product work directly on `main`.

Create short-lived branches such as:
- `feature/<short-name>`
- `fix/<short-name>`
- `content/<short-name>`
- `chore/<short-name>`

Expected flow: `feature branch -> review/local validation -> Pull Request -> main`.

Do not merge or deploy to production unless explicitly requested.

## Development commands

Install dependencies:

```bash
npm ci
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Validation before completing a task

1. Run `npm run build`.
2. Fix errors introduced by the change.
3. Check affected pages at desktop and mobile widths.
4. Check keyboard/focus behavior for interactive elements.
5. Check that motion does not hide essential content or break when JavaScript is delayed.
6. Verify both supported languages when changing translatable content or markup.
7. Check case-study/navigation links affected by the change.
8. Summarize what changed and identify any content/design decision requiring owner review.

Do not claim live deployment validation unless actually performed.

## Visual and motion guidelines

- Reuse existing design tokens and spacing/typography patterns before introducing new ones.
- Maintain strong hierarchy and generous whitespace.
- Prefer subtle, purposeful motion.
- Respect `prefers-reduced-motion` when adding animation.
- Avoid layout shift and animation that delays access to content.
- Keep responsive behavior intentional rather than simply shrinking desktop layouts.

## Content integrity

This portfolio contains professional claims. Never fabricate or infer confidential metrics, team sizes, business outcomes, dates or responsibilities.

When information is missing:
- preserve placeholders if appropriate;
- flag the missing evidence/content;
- ask for product-owner input rather than inventing details.

When rewriting case studies, preserve factual meaning while improving clarity and narrative structure.

## Case-study quality bar

A strong case study should make it possible to understand:
- context and problem;
- the owner's role;
- constraints;
- discovery/reasoning;
- important decisions and trade-offs;
- collaboration/leadership;
- solution/evolution;
- outcome/impact, when verified;
- learning or reflection where useful.

Do not force every case into the same template if the story benefits from a different narrative.

## Scope discipline

When implementing a GitHub Issue:
- treat the Issue and acceptance criteria as scope;
- inspect the existing design before changing patterns;
- avoid redesigning unrelated sections;
- if the Issue is a raw idea, expose unresolved design/product decisions instead of silently choosing them;
- prefer a polished, reviewable slice over broad unfinished work.

## Commits and PRs

Use Conventional Commit-style messages where practical (`feat:`, `fix:`, `style:`, `content:`, `refactor:`, `docs:`, `chore:`).

PR descriptions should explain what changed, why it improves the portfolio, how it was validated, and which visual/content decisions still require review. Include screenshots for meaningful visual changes when available.

## Product-owner review

The owner should spend time on product strategy, narrative, design direction and final visual judgment rather than mechanical implementation. Agents should therefore implement clearly specified work autonomously while escalating ambiguous product/design choices instead of making large silent assumptions.
