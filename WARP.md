# WARP.md

Working notes for WARP (warp.dev) and other AI assistants in this repo.

## Project overview

Personal site for Laura Miller (`duffle.one`). Single-page Vue 3 app in
the "Dot" design (a Pencil handoff): Figtree, a lot of white, navy ink
and the yellow dot off the Duffle logo. The yellow only ever fills dots,
never text. Light and dark follow the OS by default, with a visitor
override (the light/dark switch in the nav) persisted in localStorage.

Every page shares one shell: the nav along the top, a big title with the
dot after it, then labelled sections. One column (a phone layout under
720px, a centred 600px column up to 1439px); from 1440px the title
block takes a 600px column on the left and the rest runs down the right.

## Stack

- Vue 3 (`<script setup>` SFCs) + vue-router (hash mode for S3)
- Vite 8 + TypeScript
- Tailwind CSS v4, for its reset only: components style themselves in
  scoped CSS against the tokens in `input.css`
- No backend.

## Commands

```bash
npm install        # one-time
npm run dev        # vite dev server on :3000 (PORT env overrides)
npm run typecheck  # vue-tsc --noEmit
npm run build      # typecheck + production bundle into ./build
./publish.sh       # build + deploy to s3://duffle.one (AWS_PROFILE=dfl)
```

Woodpecker (`.woodpecker/build.yml`) builds every push and publishes
pushes to master straight to the bucket.

## Layout

```
src/
	index.html              SPA shell: Figtree preload, pre-paint theme
	                        script, icons and Open Graph tags
	main.ts                 vue + router bootstrap, document.title sync
	App.vue                 theme bootstrap + router outlet
	input.css               Tailwind reset, the colour tokens (light-dark()
	                        pairs), the spacing rhythm per layout, Figtree
	                        @font-face, base styles
	site/
		data.ts               all copy: about, socials, projects, quotes,
		                      footer lines, cv, guide
		routes.ts             route registry (id, label, path, title, nav)
	composables/
		useTheme.ts           light/dark/system choice, data-theme on <html>
		useQuoteRotation.ts   shuffled quote walk: timer, holds, go()
		useReducedMotion.ts   prefers-reduced-motion ref
	components/dot/
		DotPage.vue           the shell: nav, intro + content slots (two
		                      columns from 1440px), random footer line
		DotHeading.vue        big title with the dot, and the lede under it
		DotSection.vue        small muted label and what it labels
		DotRow.vue            list row as a link: name left, meta right
		DotQuote.vue          the landing's rotating quote and its dots
	screens/
		Home.vue              wordmark, about, links, quote, made, work
		CV.vue                proud of, jobs, volunteering, skills
		CVRole.vue            /cv/:slug, one role in full, newer/older
		Guide.vue             the user guide, section by section, values
		Sudo.vue              404 catch-all
	public/                 static: fonts/figtree/ (woff2 + OFL), img/,
	                        favicon.svg, apple-touch-icon.png,
	                        icon-512.png, og.png, robots.txt,
	                        sitemap.xml, site.webmanifest
	jellycats.html          standalone vanity page, outside the SPA
scripts/
	convert-new-jellycats.sh  thumbnail pipeline for new jellycat photos
```

## Notes

- Content edits go in `src/site/data.ts`. Voice is part of the design,
  don't paraphrase. Titles, ledes, labels and meta are lowercase (the
  components lowercase ledes and labels themselves); proper names like
  TFLGame keep their capitals.
- Sizes and spacing on the landing match the handoff to the pixel;
  `--gap-page`, `--gap-block` and `--gap-section` in `input.css` carry
  its rhythm to the other pages.
- The landing's quote block is always as tall as the longest quote, so
  nothing under it moves as it rotates; the dots are lifted to sit
  under whichever quote is showing. Dots, arrow keys (with the quote
  focused) and sideways swipes move it back and forth.
- Figtree is OFL and self-hosted (latin subset of the variable font).
  `Alcyone_webfont_license.pdf` at the root is the licence for the
  display face the previous designs used; it isn't on the site any more.
- Full-size jellycat photos aren't in git; publish.sh syncs them from
  local, and the Woodpecker publish never deletes, so they stay put.
- `jellycats.html` is one self-contained file on purpose: its own palette,
  its own fonts, no shared CSS. Everything on the page is derived from the
  `collection` array at the bottom, so counts, chips, the chart and the
  spotlight all follow the data — edit the array, not the markup. `pending:
  true` means we own them but haven't photographed them yet; those get a
  placeholder card instead of a photo. `jellycat:` is the product slug, and
  the buy link only renders when it's set.
