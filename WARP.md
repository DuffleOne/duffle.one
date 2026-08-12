# WARP.md

Working notes for WARP (warp.dev) and other AI assistants in this repo.

## Project overview

Personal site for Laura Miller (`duffle.one`). Single-page Vue 3 app with a
broadsheet/print aesthetic — a full-bleed paper page, Alcyone display type
over Lora body serif, gold accents, hairline rules. Light and dark follow
`prefers-color-scheme`. Hosted as static files on AWS S3.

The visual design came from a Claude Design handoff ("Broadsheet", on the
Classical design system); the previous tty/terminal design is gone.

## Stack

- Vue 3 (`<script setup>` SFCs) + vue-router (hash mode for S3)
- Vite 8 + TypeScript + Tailwind CSS v4 (`@theme` for tokens)
- No backend.

## Commands

```bash
npm install        # one-time
npm run dev        # vite dev server on :3000 (PORT env overrides)
npm run typecheck  # vue-tsc --noEmit
npm run build      # typecheck + production bundle into ./build
./publish.sh       # build + deploy to s3://duffle.one
```

## Layout

```
src/
	index.html              SPA shell + Lora from Google Fonts
	main.ts                 vue + router bootstrap, document.title sync
	App.vue                 bare router outlet
	input.css               Tailwind import + @theme tokens + dark
	                        overrides + Alcyone @font-face + base styles
	                        (scoped to html.paper-root so jellycats.html
	                        keeps preflight defaults)
	site/
		data.ts               all copy: bio, socials, projects, photos, cv, guide
		routes.ts             route registry (id, label, path, title, component)
	composables/
		useWeather.ts         London weather for the landing dateline (Open-Meteo)
		useQuoteRotation.ts   rotating quote (paused while the tab is hidden)
		useReducedMotion.ts   prefers-reduced-motion ref
	components/paper/
		PaperSheet.vue        full-bleed page, content centred at 1180px
		PageMasthead.vue      subpage brand + section nav over a hairline
		PageTitle.vue         centred Alcyone title + optional standfirst
		PlateFigure.vue       matted photograph with caption/meta row
		QuoteBlock.vue        rotating quote between hairlines
	screens/
		Home.vue              landing broadsheet (dateline, wordmark, About |
		                      plate | Elsewhere, Projects | Where I've worked,
		                      quote, footer)
		Projects.vue          numbered catalogue entries
		Photo.vue             plates with EXIF captions, Glass link
		Guide.vue             user guide: parted-column About, section rows, values
		CV.vue                Where I've worked: contact block, proud-of, roles
		Sudo.vue              404 catch-all
	public/                 static: fonts/ (Alcyone woff2), img/, favicons,
	                        robots.txt, sitemap.xml, site.webmanifest
	img/                    camera originals for scripts/process-photos.sh
	jellycats.html          standalone vanity page, outside the SPA
```

## Notes

- Content edits go in `src/site/data.ts`. Voice is part of the design,
  don't paraphrase.
- Colour/typography tokens live in `src/input.css` under `@theme`, with
  dark values overriding the same vars under `prefers-color-scheme: dark`.
- Alcyone is licensed (licence PDF at the repo root); woff2s are vendored
  in `src/public/fonts/`.
- `worker-amp/` is the Cloudflare worker that fed the old game-servers
  page. The page is gone; the worker is no longer used by the site.
