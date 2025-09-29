# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a single static website for Laura Miller (duffle.one), built with Tailwind CSS v4 and deployed to AWS S3. The previous `display/` site has been removed; everything now lives under `src/` at the repository root.

## Development Commands

### Install

```bash
npm install
```

### Build

```bash
# Build the entire site locally using Vite (outputs to build/)
npm run build
```

### Develop (local)

```bash
# Start the Vite dev server
npm run dev
```

Then open `build/index.html` in your browser. As you edit `src/index.html` or change classes, the CSS will update automatically.

### Deploy

```bash
# Deploy to production (requires AWS CLI configured)
./publish.sh
```

## Architecture

### Project Structure

```
duffle.one/
├── src/               # Site source
│   ├── index.html     # Main page HTML
│   ├── 404.html       # Not found page
│   ├── input.css      # Tailwind CSS input
│   ├── favicon.svg
│   └── img/           # Images and icons
├── build/             # Generated output (do not edit)
├── package.json       # Tailwind CLI scripts
├── compile.sh         # Local build script (copies HTML/assets, injects cache-bust)
├── publish.sh         # Production deployment script (S3)
└── package-lock.json
```

### Build Process

1. Tailwind CLI compiles `src/input.css` → `build/output.css` (watch/build via `npm` scripts).
2. `compile.sh` copies HTML and static assets from `src/` into `build/` and injects a cache-busting timestamp into the CSS link in `index.html`.

### Technology Stack

- Tailwind CSS v4 via PostCSS in Vite
- Hosting on AWS S3 (static site)
- Git for version control

## Key Files

- `src/index.html`: Main page
- `src/404.html`: Not found page
- `src/input.css`: Tailwind input
- `compile.sh`: Local build steps
- `publish.sh`: Deployment to S3
- `package.json`: Build/watch scripts

## Development Notes

- No separate `display/` site; everything is in `src/`.
- Keep edits to `src/`; `build/` is output-only and can be cleaned/recreated.
- Tailwind v4 CLI is used without a custom config.
