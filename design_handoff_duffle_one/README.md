# Handoff: tty.duffle.one (v2 visual)

## Overview

A personal site for **Laura Miller** at `duffle.one`, designed as an **interactive terminal/TTY** rather than a conventional web layout. The whole site lives inside a single window-chrome that visually impersonates a tiling terminal emulator: title bar with traffic-light buttons, left sidebar with route list + shell shortcuts + sysmon, content pane in the middle, status bar at the bottom (mode · path · branch · sync · cursor pos · clock).

Routes are personality sections (home, projects, photo, servers, user-guide, cv) plus two overlays (⌘K command palette and a `sudo`/404 easter egg). Voice is **vain, silly, direct** — the copy is part of the design and should be carried over verbatim.

## About the Design Files

The files in `preview/` are **design references created in HTML/JSX** — prototypes showing intended look, layout, type, color, and copy. **They are not production code to copy directly.** Specifically:

- `preview/duffle.one.html` is the artboard host and uses `<DesignCanvas>` / `<DCSection>` / `<DCArtboard>` to lay 8 static screens out side-by-side at 760×980 px each. **Do NOT recreate `DesignCanvas` in production** — it's only a presentation wrapper for review.
- `preview/design-canvas.jsx` is the canvas/zoom/drag tooling for the review surface. **Skip it entirely** when implementing.
- `preview/data.jsx` is the single source of truth for **all copy and content** in the site — names, project list, photo metadata, server list, CV, guide. Lift the data verbatim.
- `preview/tty-theme.jsx` defines the design tokens (`T`), the global CSS for the terminal effects (scanlines, vignette, blinking caret, phosphor glow), and four shared atoms: `<Kbd>`, `<Tag>`, `<Prompt>`, `<H2>`.
- `preview/tty-chrome.jsx` is the shell: `<TtyChrome>` + `<TitleBar>` + `<SideBar>` + `<StatusBar>`. This is the layout primitive that wraps every route.
- `preview/tty-screens-1.jsx` → home, projects
- `preview/tty-screens-2.jsx` → photo, gaming/servers, user-guide, command palette
- `preview/tty-screens-3.jsx` → cv, sudo/404 easter egg

Your job is to **recreate these designs in the target codebase's environment** (Next.js / Astro / SvelteKit / whatever) using its established patterns. If no environment exists yet, **Next.js (App Router) + Tailwind + a single global stylesheet for the CRT effects** is a fine pick — the design is fixed-width and content-light, so SSG is ideal.

## Fidelity

**High-fidelity (hifi).** Pixel-perfect mockups with final colors, typography, spacing, exact copy, and intended interactions. Recreate UI 1:1; do not "interpret" or substitute components.

The mocks are **static stills** — no working ⌘K palette, no real navigation, no theme toggle. Implementing actual interactivity is part of the build (see "Interactions & Behavior" below).

---

## Design System

### Colors (lifted from `tty-theme.jsx`)

```ts
const T = {
  // surfaces (near-black, tinted blue-cool)
  bg:    "#0a0c10",   // outermost terminal background
  bg2:   "#10141b",   // titlebar, sidebar, statusbar, side panels
  bg3:   "#161c26",   // active sidebar row, palette selected row
  bg4:   "#1d2533",   // (reserved — not heavily used)

  // text
  fg:    "#e2ebf6",   // primary text (phosphor white)
  dim:   "#7d8a9c",   // secondary text, prompt host
  faint: "#3a4555",   // tertiary, dividers, label captions

  // borders
  border:    "#1f2733",
  borderHi:  "#2a3445",

  // accents — all share chroma 0.18–0.20 + L 78–88%, only hue varies
  green:  "oklch(82% 0.20 145)",   // primary — prompts, "online", caret, glow
  pink:   "oklch(78% 0.20 0)",     // playful/error — traffic light, "vain", 404
  amber:  "oklch(85% 0.18 75)",    // warnings, "silly", section headers
  cyan:   "oklch(82% 0.18 220)",   // paths, "direct", links
  violet: "oklch(78% 0.20 295)",   // CV accent, exit codes
  yellow: "oklch(88% 0.18 100)",   // unused but reserved
};
```

**Use OKLCH literally** — the harmony depends on identical chroma/lightness. Don't substitute hex equivalents; the picked-up `tty-glow-*` text-shadows use the OKLCH form too.

### Typography

Two families, loaded from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
```

| Variable    | Stack                                                      | Used for                                                         |
| ----------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| `T.font`    | `'JetBrains Mono', ui-monospace, Menlo, monospace`         | **Body, terminal text, all prompts, tables, sidebar, statusbar.** Default for the entire app. |
| `T.display` | `'Space Grotesk', 'Inter', sans-serif`                     | **Headings only** — H1 wordmark, project names, server games, role titles, section headers, blockquote pulls. |

Type ramp (px, observed in mocks):

| Role                          | Family  | Size | Weight | Letter-spacing | Line-height |
| ----------------------------- | ------- | ---- | ------ | -------------- | ----------- |
| H1 hero name (Laura/Miller)   | display | 68   | 500    | -1.8           | 0.92        |
| H2 section header             | display | 28   | 400    | -0.5           | 1.0         |
| H3 list-item title            | display | 18–20 | 500   | -0.2 to -0.3   | 1.3         |
| Body / table cell             | mono    | 12–13 | 400    | 0              | 1.7         |
| Sidebar route                 | mono    | 12.5 | 400    | 0              | 1.7         |
| Statusbar / kbd / chrome meta | mono    | 10.5–11 | 400 | 0–0.5          | 1.5         |
| Section eyebrow / labels      | mono    | 10–11 | 400   | **2.0**        | 1           |

Eyebrow labels are `text-transform: uppercase` (or written ALL CAPS in source) with letter-spacing ≥ 2. Tag pills use letter-spacing 1.5 + uppercase.

### Spacing scale

No formal scale — values used in mocks: `4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 26 · 30 · 32 · 34`. Round to a 4 px grid where reasonable; preserve exactly where layouts feel snug.

### Borders, dividers, dotted lines

- Hairline divider: `1px solid #1f2733` (`T.border`)
- Stronger inset border: `1px solid #2a3445` (`T.borderHi`)
- Row separator inside tables: `1px dashed #1f2733`
- Stat-row separator: `1px dotted #1f2733`
- **No border-radius anywhere.** Everything is sharp 90° corners — that's the terminal aesthetic. The only exceptions: traffic-light dots (`border-radius: 5px`) and the ASCII boxes drawn with text.

### Shadows / glow

- Text glow utility classes (apply per-color):
  ```css
  .tty-glow-g { text-shadow: 0 0 10px oklch(82% 0.20 145 / .5); }
  .tty-glow-a { text-shadow: 0 0 10px oklch(85% 0.18 75 / .5); }
  .tty-glow-p { text-shadow: 0 0 10px oklch(78% 0.20 0 / .5); }
  .tty-glow-c { text-shadow: 0 0 10px oklch(82% 0.18 220 / .5); }
  ```
  Apply to: prompts (`$`), wordmark, section accents, error text on the 404, "SEL" badge on the photo grid.

- Whole-window inner shadow: `box-shadow: inset 0 0 120px rgba(0,0,0,0.4)` on the `<TtyChrome>` root.

- Caret box-shadow: `0 0 8px <green>`.

- Selected photo cell glow: `box-shadow: 0 0 0 1px <green>, 0 0 16px oklch(82% 0.20 145 / .25)`.

- Palette modal: `box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 4px oklch(82% 0.20 145 / .08)`.

### Terminal CRT effects (global, attach to `<TtyChrome>` root)

```css
@keyframes ttyblink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

.tty *::-webkit-scrollbar { display: none; }     /* hide scrollbars inside the window */
.tty { position: relative; isolation: isolate; }

/* horizontal scanlines */
.tty-scan::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 1;
  background: repeating-linear-gradient(0deg,
    rgba(255,255,255,.014) 0 1px, transparent 1px 3px);
  mix-blend-mode: overlay;
}

/* CRT corner vignette */
.tty-vig::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 2;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.45));
}

/* blinking phosphor caret */
.tty-caret {
  display: inline-block; width: .55em; height: 1.05em;
  background: oklch(82% 0.20 145);
  vertical-align: -3px; margin-left: 2px;
  animation: ttyblink 1.05s steps(2) infinite;
  box-shadow: 0 0 8px oklch(82% 0.20 145);
}
```

Both `.tty-scan` and `.tty-vig` are applied to the same root, alongside `.tty`. The pseudo-elements sit on z-index 1 and 2; live content sits on z-index 3.

### Shared atoms

| Component   | Behavior                                                                                                                                  |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `<Kbd>`     | `1px 7px` padding, 10.5 px mono, border `T.border`, bg `T.bg3`, color `T.dim`, letter-spacing 0.5, no radius. E.g. `<Kbd>⌘K</Kbd>`.        |
| `<Tag>`     | `2px 8px` padding, 10 px, color = accent, border `1px solid <accent>`, transparent bg, **uppercase**, letter-spacing 1.5. `filled` variant inverts (bg = accent, color = `#001b00`, weight 700). |
| `<Prompt>`  | `host: ~/route $ command` — `host` in `dim`, `:` in `faint`, route in `cyan`, `$` in `green` (optionally glow), command in `fg`.          |
| `<H2>`      | Section header: `§NN` eyebrow (`faint` 11 px ls 2) → display 28 px title → flex spacer with 1 px hairline → `● LIVE` indicator on the right (color = passed-in accent, 10.5 px ls 2). |

---

## Layout primitive: `<TtyChrome>`

Every screen is wrapped in `<TtyChrome>`. Default size in mocks is **760 × 980** but in production the window should fill the viewport (or a max-width container) — design at 760×980 and scale. Internals:

```
┌────────────────────────────────────────┐
│ TitleBar  (40px)                       │   ● ● ●  laura@duffle: ~/<route>      ⌘K  ?  esc
├──────────┬─────────────────────────────┤
│ SideBar  │  Content                    │
│ 200px    │  flex: 1, padding ~30 34    │
│          │                             │
├──────────┴─────────────────────────────┤
│ StatusBar (28px)                       │   NORMAL ~/route main ● synced 2m ago …  utf-8 100% ln1 col1 london 16:42
└────────────────────────────────────────┘
```

### TitleBar

- bg `T.bg2`, border-bottom `T.border`, padding `8 14`, font 12 px
- Three `width:10 height:10 border-radius:5` dots in order **pink → amber → green** (note: this is **not** the macOS red/yellow/green order — pink replaces red intentionally)
- Title text in `T.dim`, format `laura@duffle: ~/<route> — <process>` (e.g. `~ — fish — 96×42`, `~/projects — ls`, `~/photo — feh contact-sheet`, `~/servers — systemctl status`, `~/guide — man laura(1)`, `~/cv — less laura.cv`, `~ — palette`, `~ — sudo: an error has occurred`)
- Right side: three `<Kbd>` pills — `⌘K`, `?`, `esc`

### SideBar

- 200 px wide, bg `T.bg2`, border-right `T.border`, padding `20 0`
- `ROUTES` heading in `faint` 10 ls 2, padding `0 18 12`
- Six route rows, each padding `8 18`:
  - active row: bg `T.bg3`, left border `2px solid <accent>` (accent passed per route — see colors below), text in `fg`, key + arrow in `<accent>`
  - inactive: transparent, text in `dim`, key + bullet (`·`) in `faint`
  - row format: `<key>  <▸ or ·>  <label>`  with widths 10/8/auto
- `SHELL` heading + four shell-shortcut rows: `whoami` (amber), `fortune` (pink), `uptime` (cyan), `sudo hire` (violet) — `$` colored, label in `dim`
- Bottom block (`margin-top: auto`, top-border): **SYS** monitor — three resource bars (cpu green, mem amber, net cyan) rendered as 10-cell █/░ blocks (filled = colored, empty = `faint`), then a `vibe: caffeinated` line (label dim, value pink)

Routes (id, label, key, **header accent color**):

| id       | label      | hotkey | header accent |
| -------- | ---------- | ------ | ------------- |
| home     | home       | 1      | green         |
| projects | projects   | 2      | amber         |
| photo    | photo      | 3      | pink          |
| gaming   | servers    | 4      | cyan          |
| guide    | user-guide | 5      | amber (manpage uses amber labels) |
| cv       | cv         | 6      | violet        |

### StatusBar

Single horizontal flex row, 11 px, bg `T.bg2`, top-border `T.border`. Each cell padded `4 10`, separated by 1 px borders.

| Cell     | Content                                          | Notes                                                                              |
| -------- | ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Mode     | `NORMAL`                                         | bg = current accent, color `#001b00`, weight 700, ls 0.5. Vim-style mode indicator. |
| Path     | `~/<route>`                                      | color `dim`                                                                        |
| Branch   | `main`                                           | color `faint`                                                                      |
| Sync     | `● synced 2m ago`                                | dot in green, label dim                                                            |
| (spacer) | `margin-left: auto`                              |                                                                                    |
| File     | `utf-8 · 100% · ln 1, col 1`                     | color `faint`                                                                      |
| Clock    | `london · 16:42`                                 | color `amber`, separated by left-border                                            |

---

## Screens

All screens are `<TtyChrome route="<id>" title="...">` with content pane padded `~22–30` top, `~26–34` sides.

### 01 — Home (`route="home"`)

ASCII-art wordmark in monospace + display-font hero name + tags + quote pull + social links grid.

- **ASCII wordmark** (`pre`, mono 13 px, line-height 1.18, color green, `tty-glow-g`):
  ```
   ▄▄▄▄  ▄▄  ▄▄  ▄▄▄▄  ▄▄▄▄  ▄▄    ▄▄▄▄
   █  █  █▌  █▌  █▀▀   █▀▀   █     █▀▀
   █▄▄█  █▄▄▄█▄  █     █     █▄▄▄  █▄▄
  ```
- Below: `DUFFLE.ONE · v26.4 · last login: tue 16:38 from 10.0.0.42` in dim 11.5 ls 1.5
- Hairline divider
- Two-column grid, `160px 1fr`, gap 32:
  - **Left**: 160×200 portrait placeholder — bg `bg2` over a 135° striped repeating gradient (`bg3 6px / bg2 6px`), border `borderHi`, four green corner crop-marks (10×10 with 1.5 px corner borders), `[ portrait.jpg ] / 1024×1280` centered in faint 10.5. Below: a 4-row mini-table `STATUS / CITY / WX / NOW` — each row a flex with dotted-bottom border, label in faint, value styled per row (`● online` green, plain dim, plain dim, `typing this` amber).
  - **Right**: display-font name `Laura\nMiller.` at 68/0.92/-1.8 with the trailing period in green + glow. Below: tagline `founding eng · photographer · 3d-print enthusiast.` Three `<Tag>`s — `vain` pink, `silly` amber, `direct` cyan. Then a `cat ./quote.txt` prompt → blockquote in `bg2` with `2px solid amber` left-border, amber `“ ”` punctuation around text, attribution `— mum, allegedly` in faint. Then a `cat ./links.json` prompt → 2×2 grid (gap `8px 22px`) of social cards: each card is a flex row in `bg2` with `2px solid <accent>` left border, padding `8 12` — accent letter glyph (display 18, fixed 18 px wide, centered) + label/handle stack (label fg 12, handle dim 10.5) + `↗` arrow. Accents cycle green/amber/pink/cyan over the four socials.
- `margin-top: auto` empty prompt with blinking caret.

Content (from `data.jsx`):
- name: Laura Miller, domain: duffle.one
- socials: GitHub `@duffle`, Instagram `@duffle`, Steam `duffle`, Read.cv `/duffle`
- quote: "In school, bullies gave her their lunch money."

### 02 — Projects (`route="projects"`)

Manpage-style table + expanded readme card.

- `<H2 n="02" accent={amber}>` `./projects/*` (the `/*` glyph in green)
- Prompt: `find . -type d -maxdepth 1 | sort -r`
- 5-column table: `30px 130px 1fr 70px 90px` for `№ · NAME · SUMMARY · YEAR · STATUS`. Header row in faint 10 ls 2 with bottom border. 4 rows from `SITE.projects`, each:
  - `№` 01–04 in faint
  - `NAME` in display 18 weight 600 ls -0.3, accent cycling green/pink/amber/cyan
  - `SUMMARY` body 12 fg
  - `YEAR` dim 12
  - `STATUS` `<Tag c={accent}>` matching name color (`shipping`, `weekend`, `shipping`, `archive`)
  - Row separator: `1px dashed border`
- **Detail card** (highlight first project, easycal): `1px solid borderHi`, `bg2`, with a header strip (`▸` green + `easycal/README.md` fg + right-aligned `preview · q to close` faint) and a `1fr 200px` two-col body:
  - Left: display 26 `# easycal` (`#` green) + body description + 4 tags `shipping/typescript/llm/solo` in `green/cyan/amber/violet`.
  - Right: bordered stat box `STATS` eyebrow then 4 stat rows `users 4,128 / mrr $2.1k / commits 1,402 / last push 2h ago` (numbers in green/amber/fg/fg) then `↗ visit` faint.
- Footer: `4 entries · git status: clean · press ↵ on a row to expand` (fg/`<Tag>`-ish styling).

### 03 — Photo (`route="photo"`)

Contact sheet + EXIF side panel.

- `<H2 n="04" accent={pink}>` `./photo.roll` — yes the `n` is "04" intentionally as an inside-joke section number, even though it's the 3rd artboard.
- Prompt: `exiftool ./*.{raw,jpg} | head -40`
- Two-column grid `1fr 240px`, gap 14, `flex: 1`:
  - **Left**: 3-column contact sheet. 6 cells from `SITE.photography`. Each cell:
    - Border `T.border` (or green w/ glow if `i === 1` is the selected one — `0 0 0 1px green, 0 0 16px <green>/.25`)
    - Image area: `aspect-ratio 4/5`, **placeholder** is a `repeating-linear-gradient` with per-index angle/hue: `${i*32}deg`, `oklch(${30+i*4}% 0.10 ${30+i*40})` 0–4 px / `oklch(${20+i*3}% 0.12 ${30+i*40})` 4–8 px. Real implementation: replace with actual photos when available, but keep this striped placeholder if not.
    - Caption strip: title in fg 10.5 + `0N.raw · X.Xmb` filename in faint 9.5
    - Selected cell: `▸ SEL` overlay top-left in green 9 ls 1, glowing
- **Right (EXIF panel)**: bordered card in `bg2`. Header strip `EXIF · 02.RAW` faint 10 ls 2. Big 4:5 striped preview thumbnail (60° hue 220). Body in 10.5 dim with display-font 16 title `Subway, 11:42pm` then 8 dotted-bottom rows: camera/lens/iso/shutter/aperture/push/taken/place. Footer link `↗ open in fullscreen · f` in cyan 10.
- Footer hints row: `←/→ navigate · <kbd>f</kbd> fullscreen · <kbd>i</kbd> exif · <kbd>r</kbd> roll-mode` in faint 11.

### 04 — Servers (`route="gaming"`)

systemd-style game-server list.

- `<H2 n="04" accent={cyan}>` `./servers.d/*`
- Prompt: `systemctl --user status game-*.service` + faint subline `game servers I host for friends · join any with the address shown`
- 6-column table: `30px 1.4fr 1.6fr 90px 90px 80px` → `№ · HOST · SERVICE · PLAYERS · UPTIME · STATUS`. 6 rows from `SITE.gaming`. Status color: online=green, idle=amber, offline=faint. Host has a leading `●` in status color; Service in display 15 ls -0.2; Players/Uptime tabular numerics.
- **HOUSE RULES** callout: `bg2` + `2px solid amber` left-border, padding `14 18`. Eyebrow `HOUSE RULES` faint ls 1.5 → italic display-16 text: `"be kind, build cool things, no creepers near my base. ping @duffle for a whitelist."` (`@duffle` in cyan)
- Footer: 4-up stat grid (`HOSTED 06 / ONLINE 04 / REGION EU-W2 / UPTIME 99.2%`), each in a bordered `bg2` 10 12 box, eyebrow faint 10 ls 1.5, value display 24 ls -0.3 in green/cyan/amber/violet.

### 05 — User Guide (`route="guide"`) — `man laura(1)`

Pure manpage layout.

- Top rule: 3-column flex `LAURA(1) · USER COMMANDS · LAURA(1)` in faint 10.5 ls 2 with bottom-border.
- Sections: each has an amber-10.5-ls-2 `NAME / SYNOPSIS / DESCRIPTION / EXIT STATUS` heading and an indented body (padding-left 18).
  - **NAME**: `laura — a person; founding engineer, photographer, 3d-print enthusiast.` (`laura` in green)
  - **SYNOPSIS**: ``laura [--direct] [--silly] [--vain] [--coffee=<oz>] [topic...]`` — flag colors: `--direct/--silly/--vain` cyan, `--coffee=` violet, `<oz>` amber, `topic` pink
  - **DESCRIPTION**: 6 paragraphs from `SITE.guide`. Each: `§N` faint mono 11 + heading in display 16 green, then body in fg 12.5
  - **EXIT STATUS**: `0 all good · 1 needs coffee · 2 needs feedback · 137 meeting ran over` — codes in green/amber/pink/violet
- Bottom rule: `DUFFLE.ONE · v26.4 · 2026-04 · LAURA(1)` (3-col flex, faint 10.5 ls 2)

### 06 — CV (`route="cv"`) — `less laura.cv`

- `<H2 n="06" accent={violet}>` `./cv.txt` (`.txt` in violet)
- Prompt `less ~/cv.txt`
- Summary callout: `bg2` + `2px solid violet` left border. Body 13 lh 1.6 — full text from `SITE.cv.summary`.
- `── EXPERIENCE` amber eyebrow.
- For each of the 4 experiences: 2-col grid `120px 1fr`, gap 18:
  - Left: `when` cyan mono + `loc` faint
  - Right: dashed left-border, padding-left 16. Display 20 role + faint `·` + green `co` (mono). Bulleted list: each bullet is `›` faint + body 12.5 fg.
- Two-col `1fr 1fr` block:
  - **EDUCATION** (amber eyebrow): display 17 `degree · school` (school in green) → dim 11.5 when → fg 12 note
  - **SKILLS** (amber eyebrow): wrap of `<Tag>`s cycling green/cyan/amber/pink/violet across `SITE.cv.skills` (10 entries)
- Footer: `laura@duffle.one  :LINES 1–48 of 48 (END)` faint, top-border.

### 07 — Command Palette (overlay on home)

- `<TtyChrome route="home" title="laura@duffle: ~ — palette">` — same chrome, content pane shows a faded-out home behind a centered modal.
- Behind: `opacity: 0.18` reduction of the home wordmark + tagline (display 56 `Laura\nMiller.` + tagline)
- Overlay: `position: absolute inset:0`, `padding-top: 90`, bg `rgba(10,12,16,0.6)` + `backdrop-filter: blur(2px)`
- Modal: 480 px wide, `bg2`, `1px solid green`, big drop-shadow + 4 px green halo glow.
  - Search row: `›` green prompt + `open` text + caret. Right: `<Kbd>esc</Kbd>`.
  - Faint subline `ROUTES & COMMANDS · 9 results`
  - 9 command rows, first selected (bg `bg3`, `2px solid green` left-border): glyph (column 14 wide, color per command) + label + faint hotkey on the right.
    - go home / projects / photo / gaming → green ▸/λ/◐/▦, hotkeys `g h/p/f/a`
    - open user-guide → green §, `g u`
    - toggle theme → amber ☼, `t`
    - fortune → pink ♣, `f`
    - sudo email me → cyan ✉, `⌘E`
    - easter egg #3 → violet ✦, `?!`
  - Footer: `<Kbd>↑</Kbd><Kbd>↓</Kbd> nav · <Kbd>↵</Kbd> select` left, `fuzzy match enabled` right, in faint 11.

### 08 — sudo / 404 (`route="sudo"`) — easter egg

- Title: `laura@duffle: ~ — sudo: an error has occurred`
- Prompt `sudo hire laura`
- Three error lines (12 px each, with glow): `[sudo] password for guest: ●●●●●●●●●` (label pink-glow, dots fg) → `Sorry, try again.` (amber-glow) ×2 → `sudo: 3 incorrect password attempts` (pink-glow)
- ASCII art `pre` (pink-glow, 12 px, lh 1.18):
  ```
   ┌─────────────────────────┐
   │   ERR · NOT THAT EASY   │
   └────────────┬────────────┘
                │
         ╔══════▼══════╗
         ║   404·ish   ║
         ╚═════════════╝
  ```
- "ALTERNATIVE ROUTES" callout: `borderHi` border + `3px solid amber` left, bg `bg2`, padding `14 16`. Three numbered lines (numbers green): draft email → `laura@duffle.one` (cyan), DM IG, press `<Kbd>?</Kbd>` for guide.
- Footer: `<Tag c={pink} filled>EASTER EGG · 03</Tag>` + faint `9 more hidden in the shell. good luck.`
- Empty prompt with blinking caret at the bottom.

---

## Interactions & Behavior

**The mocks are static.** Implement these as a real interactive site:

1. **Routing.** SPA-feel router. URLs:
   - `/`, `/projects`, `/photo`, `/servers`, `/guide`, `/cv` (note: id is `gaming` in code but route label and url should be `servers`)
   - `/sudo` for the easter egg (also reachable from a 404 / from the palette)
2. **Sidebar navigation.** Click a route row → navigate. Number keys `1`–`6` jump to corresponding routes. Active row gets the route's accent border + bg.
3. **Status bar live.**
   - Mode: stays `NORMAL` unless user types `:` (then `COMMAND`) or `i` (then `INSERT` — purely cosmetic). Mode bg color follows the route accent.
   - Path: live `~/<currentRoute>`
   - Sync timestamp: real "X minutes ago" since page load, ticks every 30 s
   - Clock: real `Europe/London` time, hh:mm, ticks every 60 s
   - Cursor: `ln 1, col 1` is fine to leave static; bonus: tie to scroll position
4. **Command palette.** ⌘K / Ctrl+K opens. Modal exactly as drawn. Real fuzzy match over the 9 commands + the 6 routes. ↑/↓ to move selection (carries the green border + bg highlight), Enter to execute, Esc to close. Backdrop is 60% opacity bg with 2 px blur.
5. **`?` opens the user-guide route** (it's a navigation shortcut, not a separate help modal).
6. **Hover states.** On every interactive row (sidebar route, project row, server row, social link, palette command):
   - Pre-hover: as drawn for inactive rows.
   - Hover: bg lifts to `bg3`, left-border becomes `2px solid <route accent>`, text → `fg`. Same treatment as the "active" state, basically — hover previews activation.
7. **Caret blink.** The `.tty-caret` keyframes already define this — 1.05 s steps(2) infinite. Keep it on every empty-prompt row.
8. **Photo grid.**
   - Click a cell to "select" — moves the green-glow border + `▸ SEL` badge to that cell, updates the EXIF panel to that photo's metadata.
   - `←/→` cycles selection within the grid. `f` opens fullscreen (lightbox over the whole window). `i` toggles the EXIF panel. `r` swaps to a roll-mode (filmstrip) view — out of scope for v1 if budget tight, but the affordance is drawn.
9. **Projects.** Pressing Enter on a focused row expands its readme detail card inline. Only one open at a time. Visual is exactly the `easycal/README.md` card already drawn.
10. **404.** Any unknown route renders the sudo screen.
11. **Theme toggle (palette command "toggle theme")**: out-of-scope for v1, but if implemented, light theme just inverts surfaces — keep accent OKLCH unchanged. Don't ship it unless requested.
12. **Reduce motion.** If `prefers-reduced-motion: reduce`, disable caret blink, scanlines, and any future animations. Keep glow.
13. **Scrolling.** The window itself doesn't scroll; the **content pane** scrolls with hidden scrollbars (`::-webkit-scrollbar { display: none }` already in theme). On long routes (cv, guide), the content pane scrolls vertically.

### Animations & transitions

The mocks don't define route transitions. Suggested:

- Route change: cross-fade content pane in 120 ms, no layout shift on chrome.
- Mode pill (status bar): bg transitions 80 ms ease-out when accent color changes.
- Caret: existing 1.05 s steps(2) blink only.

Don't over-animate — terminal aesthetic is jumpy and instant, not springy.

---

## State Management

Minimal. A single tiny store (Zustand / `useState` / signals — pick what the codebase uses) with:

```ts
type Route = "home" | "projects" | "photo" | "servers" | "guide" | "cv" | "sudo";

type AppState = {
  route: Route;
  mode: "NORMAL" | "COMMAND" | "INSERT";
  paletteOpen: boolean;
  selectedPhotoIndex: number;     // photo route
  expandedProjectId: string | null; // projects route
  syncedAt: number;               // ms timestamp; for "synced 2m ago"
};
```

No data fetching needed for v1 — content is static, lifted from `data.jsx` into a typed `site.ts` module. If projects/servers later go dynamic (live game-server status, GitHub stars), wrap them in a SWR/React Query loader and fall back to the static values.

---

## Design Tokens (copy-paste)

```ts
// site/design-tokens.ts
export const tokens = {
  color: {
    bg:    "#0a0c10",
    bg2:   "#10141b",
    bg3:   "#161c26",
    bg4:   "#1d2533",
    fg:    "#e2ebf6",
    dim:   "#7d8a9c",
    faint: "#3a4555",
    border:    "#1f2733",
    borderHi:  "#2a3445",
    green:  "oklch(82% 0.20 145)",
    pink:   "oklch(78% 0.20 0)",
    amber:  "oklch(85% 0.18 75)",
    cyan:   "oklch(82% 0.18 220)",
    violet: "oklch(78% 0.20 295)",
    yellow: "oklch(88% 0.18 100)",
  },
  font: {
    mono: `'JetBrains Mono', ui-monospace, Menlo, monospace`,
    display: `'Space Grotesk', 'Inter', sans-serif`,
  },
  // no formal scale; use these px values directly
  space: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 30, 32, 34],
} as const;
```

Tailwind users: extend `theme.colors`, set `fontFamily.mono` / `fontFamily.display`, drop the `tty-*` rules in a global stylesheet. **Do not let Tailwind's preflight set `border-radius` on inputs/buttons** — strip it.

---

## Assets

- **Fonts**: JetBrains Mono (400/500/600/700) + Space Grotesk (400/500/600/700) from Google Fonts. Self-host if perf matters; both are SIL OFL.
- **Portrait** (`home`): a 160×200 placeholder is drawn — replace with `portrait.jpg` (1024×1280 source). Keep the four green corner crop-marks as the framing device on top of the real image.
- **Photos** (`photo`): 6 placeholders are striped gradients. Replace with the actual contact sheet — Laura's photography. Captions and EXIF data are in `data.jsx` (`SITE.photography`).
- **No icons / icon library.** All glyphs are typographic (`▸ · ● ◐ ▦ § ☼ ♣ ✉ ✦ ↗ █ ░`) and ASCII art. Do not introduce Lucide / Heroicons / etc. — the visual identity depends on terminal-native characters.
- **Wordmark** (`home`): hand-tuned ASCII (`▄ █ ▌ ▀`). Keep it as a `<pre>` literal; don't render it as an image.

---

## Files

In `preview/`:

```
duffle.one.html          ← artboard host (uses DesignCanvas — IGNORE for prod)
design-canvas.jsx        ← review-surface tooling — IGNORE for prod
data.jsx                 ← content source of truth — port this
tty-theme.jsx            ← tokens + global CSS + atoms (Kbd/Tag/Prompt/H2)
tty-chrome.jsx           ← TtyChrome / TitleBar / SideBar / StatusBar
tty-screens-1.jsx        ← TtyHome, TtyProjects
tty-screens-2.jsx        ← TtyPhoto, TtyGaming, TtyGuide, TtyPalette
tty-screens-3.jsx        ← TtyCV, Tty404
```

Open `duffle.one.html` in a browser to see all 8 screens laid out side-by-side at 760×980 each. Drag to pan, scroll to zoom, click an artboard's grip to focus.

---

## Build order (suggested)

1. Wire fonts + global CSS (`tty-*` keyframes/utilities) + tokens.
2. Build `<TtyChrome>` shell with hardcoded `route="home"`. Verify titlebar/sidebar/statusbar against the mock.
3. Port `data.ts` from `data.jsx`.
4. Build atoms: `<Kbd>`, `<Tag>`, `<Prompt>`, `<H2>`.
5. Implement screens in this order: home → projects → cv → guide → servers → photo → sudo → palette overlay.
6. Wire up router + sidebar nav + number-key hotkeys.
7. Wire ⌘K palette with fuzzy match.
8. Wire photo grid interactions.
9. Live status bar (clock + sync timer + mode).
10. Reduced-motion + a11y pass (focus rings, skip-to-content, semantic headings — the mock uses divs, real implementation should use `<nav>`, `<main>`, `<h1>`/`<h2>`, `<table>` for the table layouts, etc.).

---

## Caveats

- The artboards are sized **760 × 980** — that's the design canvas, not a viewport target. The real site should be **fullscreen** with the chrome filling the viewport (consider a max-width like 1400 px on ultrawide).
- The 760 × 980 size means densities (font sizes, paddings) are tuned for that frame. When the chrome scales up to a full viewport, **don't scale fonts** — they're already at production sizes. Just let the content pane breathe.
- `route="gaming"` in the React code; URL/label is `servers`. Reconcile in production (rename the id to `servers`).
- Section number on the photo route (`§04`) and on the servers route (`§04`) overlap — that's a copy-paste artifact. Renumber: home=01, projects=02, photo=03, servers=04, guide=05, cv=06.
- The mocks use inline-style objects everywhere because they're React prototypes. Don't carry that pattern into prod — use whatever styling system the codebase uses (Tailwind classes, CSS modules, Linaria, etc.).
- `<DesignCanvas>` and `design-canvas.jsx` are review tooling only. Do not implement.
