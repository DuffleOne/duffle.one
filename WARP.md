# WARP.md

Working notes for WARP (warp.dev) and other AI assistants in this repo.

## Project overview

Personal site for Laura Miller (`duffle.one`). Single-page Vue 3 app with a
TTY/terminal aesthetic — fixed window chrome (titlebar + sidebar +
statusbar) wrapping a content pane that swaps between routes. Hosted as
static files on AWS S3.

The current visual design is the "tty" handoff in `design_handoff_duffle_one/`.

## Stack

- Vue 3 (`<script setup>` SFCs) + vue-router (hash mode for S3)
- Vite 8 + TypeScript + Tailwind CSS v4 (`@theme` for tokens)
- No backend. Live game-server data fetched at runtime from the AMP
  Cloudflare worker in `worker-amp/`.

## Commands

```bash
npm install        # one-time
npm run dev        # vite dev server on :3000
npm run typecheck  # vue-tsc --noEmit
npm run build      # typecheck + production bundle into ./build
./publish.sh       # build + deploy to s3://duffle.one
```

## Layout

```
src/
	index.html              SPA shell + fonts
	main.ts                 vue + router bootstrap
	App.vue                 root: <router-view> + palette overlay + global hotkeys
	input.css               Tailwind import + @theme tokens + tty-* effects
	site/
		data.ts               all copy: socials, projects, photos, gaming, cv, guide
		routes.ts             route registry (id, label, key, accent, path, component)
	types/
		accent.ts             accent palette + helpers
		safelist.ts           Tailwind v4 JIT safelist
	composables/
		useClock.ts           live London clock for status bar
		useSyncTimer.ts       "synced X ago" since mount
		useReducedMotion.ts   prefers-reduced-motion ref
		useHotkeys.ts         1-6 routes, ⌘K palette, Esc, ?, sudo egg
		usePalette.ts         palette state + fuzzy match
		useServers.ts         AMP worker poller (30s)
	components/
		atoms/                Kbd, Tag, Prompt, Caret, AccentDot, Glyph, Hairline
		layout/               TtyChrome, TitleBar, TrafficLights, SideBar,
		                      RouteList, RouteRow, ShellShortcuts, SysMonitor,
		                      ResourceBar, StatusBar, ContentPane
		headers/              SectionHeader, ManPageRule, ManSection
		cards/                Callout, DetailCard, CornerFrame, StatBox, StatGrid
		data/                 DataTable, DataTableRow, DottedRow, MetaTable
		overlay/              PaletteOverlay, PaletteModal, PaletteRow
		placeholders/         StripedPlaceholder
	screens/
		Home.vue              + home/{HeroBlock, PortraitCard, SocialCard}
		Projects.vue          + projects/{ProjectRow, ReadmeCard}
		Photo.vue             + photo/{PhotoCell, ExifPanel}
		Servers.vue           + servers/{ServerRow}
		Guide.vue
		CV.vue                + cv/{ExperienceEntry}
		Sudo.vue
```

## Conventions

- One screen per route under `screens/`. Each screen wraps `<TtyChrome>`,
  picks an accent + title from its `routes.ts` entry, and assembles
  shared components — no inline styling beyond what the design pixel-pegs.
- Atoms are presentation-only and dumb — they take props, render markup.
- Composables hold state + side effects (timers, fetch, hotkeys).
- All accent colours route through `types/accent.ts`. Don't ship raw
  hex/oklch in components.
- Tailwind v4 class names that are composed with template literals
  (`text-tty-${accent}`) need to be enumerated in `types/safelist.ts`
  so the JIT generates them.

## Routing + S3

The router uses hash mode (`#/projects`) so any URL shape works on plain
S3 without rewrites. `publish.sh` also sets index.html as the S3
error-document — that lets bare paths like `/projects` still load the
shell, and the router takes it from there.

## Live data

`useServers()` polls `VITE_SERVERS_API` every 30s and falls back to
`SITE.gaming` if the env var is unset or the fetch fails. Set the env
var via `.env.local`:

```
VITE_SERVERS_API=https://gaming.<account>.workers.dev
```

The worker is in `worker-amp/`; deploy with `wrangler deploy` from there.
