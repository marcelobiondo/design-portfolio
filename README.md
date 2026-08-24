# Design Portfolio

Personal product-design portfolio focused on product strategy, design leadership, systems thinking and selected case studies.

The repository contains the public portfolio website, case-study pages, localization hooks, styling/motion and Cloudflare deployment configuration.

## Product goal

The site should communicate senior product-design and leadership work clearly, credibly and with a high perceived level of craft.

The priority is not frontend novelty. The priority is a strong narrative, clear hierarchy, fast loading, responsive behavior and trustworthy professional content.

## Stack

Frontend:
- HTML
- CSS
- Vanilla JavaScript
- Vite 8

Deployment/tooling:
- Cloudflare
- Wrangler 4

## Main structure

```text
design-portfolio/
├── index.html
├── work/
├── src/
│   ├── scripts/
│   └── styles/
├── public/
├── package.json
├── wrangler.jsonc
├── install.sh
├── AGENTS.md
└── README.md
```

Important areas:
- `index.html` — homepage and primary narrative
- `work/` — case-study pages
- `src/styles/` — reset, tokens, global styles and animations
- `src/scripts/main.js` — client behavior and localization
- `wrangler.jsonc` — Cloudflare deployment configuration
- `dist/` — generated build output; never edit manually

## Current content

Selected work currently includes case-study entry points for:
- meutudo
- Mercado Livre
- Facily

The homepage also includes earlier experience, About and contact sections.

## Development setup

### Requirements

Recommended:
- Node.js 24+
- npm 10+
- Git

### Quick setup

```bash
git clone https://github.com/marcelobiondo/design-portfolio.git
cd design-portfolio
chmod +x install.sh
./install.sh
```

On Windows, use Git Bash or WSL2.

The setup script verifies the environment, installs project dependencies and runs a validation build.

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

Cloudflare local preview when needed:

```bash
npm run build
npx wrangler dev
```

## Branch strategy

The project follows the same operational model used by the QuintaCast project:

```text
feature branch
      ↓
   develop
      ↓
 validation
      ↓
     main
      ↓
 production
```

Branches:
- `develop` — integration and validation
- `main` — production
- short-lived feature branches — implementation work

Preferred feature branch prefixes:
- `feat/`
- `fix/`
- `style/`
- `content/`
- `chore/`

Do not work directly on `main`.

## Suggested workflow

Start from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feat/my-change
```

After implementation and validation, open a Pull Request into `develop`.

Once the change is approved, tested and ready for production, promote `develop` to `main`.

## Validation checklist

Before considering a change complete:
- run `npm run build`;
- validate relevant pages at desktop and mobile widths;
- check navigation and case-study links;
- validate both supported languages when changing translatable content;
- check keyboard/focus behavior for interactive elements;
- respect `prefers-reduced-motion` for new animations;
- verify that professional claims remain factual.

## Content integrity

This portfolio contains professional claims and case studies.

Never invent:
- metrics;
- business outcomes;
- dates;
- team sizes;
- responsibilities;
- quotes;
- research findings;
- confidential information.

When evidence or context is missing, leave the decision/content for product-owner review instead of fabricating a plausible answer.

## Coding agents

Agent-specific operational instructions live in:

```text
AGENTS.md
```

Agents should use GitHub Issues as scope, implement changes in safe branches, validate before completion and leave ambiguous product/design decisions for owner review.

## Cloudflare

Deployment configuration is stored in:

```text
wrangler.jsonc
```

The generated production build lives in:

```text
dist/
```

The `dist/` directory must not be manually edited.

## Product principles

- ship useful value quickly;
- keep implementation simple;
- preserve premium visual quality;
- prioritize narrative clarity;
- avoid unnecessary dependencies;
- treat responsive design and accessibility as default requirements;
- keep product/design approval separate from implementation completion.

## License

Private project. All rights reserved.
