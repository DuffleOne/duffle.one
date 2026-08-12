# WARP.md

Working notes for WARP (warp.dev) and other AI assistants in this repo.

## Project overview

Personal site for Laura Miller (`duffle.one`). Single-page Vue 3 app with a
broadsheet/print aesthetic — full-bleed paper, Alcyone display type over
Lora body serif, gold accents, hairline rules. Light and dark follow the
OS by default, with a visitor override (the small toggle in the dateline
and mastheads) persisted in localStorage.

The visual design came from a Claude Design handoff ("Broadsheet", on the
Classical design system), applied over the previous design-C site.

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
./publish.sh       # build + deploy to s3://duffle.one (AWS_PROFILE=dfl)
```

Drone (`.drone.yml`) builds and publishes on push to master; the pipeline
is signed, so edit it via `drone sign`.

## Layout

```
src/
	index.html              SPA shell: Lora from Google Fonts, Alcyone
	                        preloads, pre-paint theme script
	main.ts                 vue + router bootstrap, document.title sync
	App.vue                 theme bootstrap + router outlet
	input.css               Tailwind import + light-dark() tokens +
	                        Alcyone @font-face + base styles (scoped to
	                        html.paper-root so jellycats.html stays
	                        independent)
	site/
		data.ts               all copy: bio, socials, projects, cv, guide
		routes.ts             route registry (id, label, path, title, nav)
	composables/
		useWeather.ts         London weather for the dateline (Open-Meteo)
		useToday.ts           dotted dateline date, refreshed half-hourly
		useTheme.ts           light/dark/system choice, data-theme on <html>
		useQuoteRotation.ts   shuffled-cycle quote walk (paused when hidden)
		useReducedMotion.ts   prefers-reduced-motion ref
	components/paper/
		PaperSheet.vue        full-bleed page, content centred at 1180px
		PageMasthead.vue      brand + section nav + theme toggle
		PageTitle.vue         centred Alcyone title + optional standfirst
		PlateFigure.vue       matted photograph with caption/meta row
		QuoteBlock.vue        rotating quote between hairlines
		ThemeToggle.vue       the light/dark/auto control
	screens/
		Home.vue              landing broadsheet (dateline, wordmark, About |
		                      plate | Elsewhere, Projects | Where I've worked,
		                      quote, footer)
		CV.vue                role list with first-bullet standfirsts
		CVRole.vue            /cv/:slug — one role in full, prev/next
		Guide.vue             user guide: parted-column About, section rows
		Sudo.vue              404 catch-all
	public/                 static: fonts/alcyone/ (woff2), img/, favicons,
	                        robots.txt, sitemap.xml, site.webmanifest
	jellycats.html          standalone vanity page, outside the SPA
scripts/
	convert-new-jellycats.sh  thumbnail pipeline for new jellycat photos
```

## Notes

- Content edits go in `src/site/data.ts`. Voice is part of the design,
  don't paraphrase.
- Colour tokens live in `src/input.css` as light-dark() pairs; the
  effective color-scheme comes from the OS or the data-theme attribute
  useTheme() writes.
- Alcyone is licensed (licence PDF at the repo root); woff2s are vendored
  in `src/public/fonts/alcyone/`.
- Full-size jellycat photos aren't in git; publish.sh syncs them from
  local, and the Drone pipeline excludes them from `--delete`.
