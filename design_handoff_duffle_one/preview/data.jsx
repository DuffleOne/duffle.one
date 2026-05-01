// Shared content across all three design directions.
// Edit here once; all three artboards re-render.

const SITE = {
  name: "Laura Miller",
  domain: "duffle.one",
  tagline: "Founding engineer, photographer, 3D designer.",
  personality: ["vain", "silly", "direct"],
  quote: "In school, bullies gave her their lunch money.",
  socials: [
    { id: "github", label: "GitHub",    handle: "@duffle", href: "#" },
    { id: "ig",     label: "Instagram", handle: "@duffle", href: "#" },
    { id: "steam",  label: "Steam",     handle: "duffle",  href: "#" },
    { id: "rd",     label: "Read.cv",   handle: "/duffle", href: "#" },
  ],
  now: [
    "Founding eng at a stealth-mode startup.",
    "Shooting Mamiya 7 on Portra 400.",
    "Printing a 1:1 replica of my left hand.",
    "Re-reading Borges. Again.",
  ],
  projects: [
    { id: "easycal",   name: "easycal",     blurb: "Calendar that reads your mind, mostly.",       year: "2025", tag: "shipping" },
    { id: "tflgame",   name: "TFLGame",     blurb: "Tube-line trivia for nerds in transit.",       year: "2024", tag: "weekend" },
    { id: "latex",     name: "Latex stock", blurb: "Inventory tracker for the rubber-curious.",    year: "2024", tag: "shipping" },
    { id: "jellycats", name: "Jellycats",   blurb: "A sticker pack. Don't ask.",                   year: "2023", tag: "archive" },
  ],
  photography: [
    { id: "p1", title: "Tulip, after rain",      meta: "Mamiya 7 · 80mm · Portra 400" },
    { id: "p2", title: "Subway, 11:42pm",        meta: "X100V · iso6400 · push 2" },
    { id: "p3", title: "Self, hotel mirror",     meta: "Hasselblad · TX 400" },
    { id: "p4", title: "Father's hands",         meta: "Leica M6 · 50mm · HP5" },
    { id: "p5", title: "Studio, sunday",         meta: "iPhone, ProRAW" },
    { id: "p6", title: "Berlin u-bahn",          meta: "Pentax 67 · Ektar" },
  ],
  gaming: [
    { id: "g1", title: "minecraft.duffle.one",  game: "Minecraft · Vanilla 1.21",  status: "online",  players: "4 / 12", uptime: "82d" },
    { id: "g2", title: "valheim.duffle.one",    game: "Valheim · Mistlands",       status: "online",  players: "2 / 10", uptime: "31d" },
    { id: "g3", title: "factorio.duffle.one",   game: "Factorio · Space Age",      status: "online",  players: "1 / 8",  uptime: "12d" },
    { id: "g4", title: "palworld.duffle.one",   game: "Palworld",                  status: "idle",    players: "0 / 16", uptime: "210d" },
    { id: "g5", title: "ts3.duffle.one",        game: "TeamSpeak 3",               status: "online",  players: "3 / 32", uptime: "412d" },
    { id: "g6", title: "tf2.duffle.one",        game: "Team Fortress 2 · pl_",     status: "offline", players: "—",      uptime: "—"    },
  ],
  cv: {
    summary: "Founding engineer building 0→1 products. Photographer on the side. Fluent in TypeScript, distributed nonsense, and shipping things scared.",
    experience: [
      { co: "Stealth, Inc.",   role: "Founding Engineer",      when: "2024 — now",  loc: "London",        bullets: ["Built the first version end-to-end. Shipped to 4k users in 11 weeks.", "Wrote the auth, the billing, the inference layer, and the marketing site.", "Hired engineers 2–4."] },
      { co: "Linear",          role: "Senior Software Engineer", when: "2021 — 2024", loc: "Remote / NYC",  bullets: ["Owned the sync engine rewrite. Cut p95 op-apply 38%.", "Shipped Insights, Cycles v2, and the GitHub integration.", "Mentored 5 ICs."] },
      { co: "Stripe",          role: "Software Engineer",      when: "2018 — 2021", loc: "Dublin",        bullets: ["Payments reliability on the EU edge. Fewer pages, more sleep.", "Wrote the postmortem template still in use today, allegedly."] },
      { co: "Self-employed",   role: "iOS Contractor",         when: "2016 — 2018", loc: "Various",       bullets: ["Shipped 9 apps. Two are still in the App Store. One is mine."] },
    ],
    education: [
      { school: "UCL",         degree: "BSc Computer Science", when: "2013 — 2016", note: "First class. Dissertation on lock-free queues; nobody read it." },
    ],
    skills: ["TypeScript", "Go", "Swift", "Postgres", "Rust (sometimes)", "K8s (reluctantly)", "Figma", "Lightroom", "Fusion 360", "Stoic deadlines"],
  },
  guide: [
    { h: "How to talk to me",     b: "Direct is good. Vague is expensive. Tell me the real thing first; we can figure out tone after." },
    { h: "When I'm best",         b: "Mornings before standup. Late nights after 10pm. Don't book me 2–4pm — that's reading hour." },
    { h: "How I take feedback",   b: "Specific > kind. 'This sucks because X' is useful. 'Looks great!' is sweet but useless." },
    { h: "What I'm bad at",       b: "Estimates. Small talk in groups > 6. Saying no to a good bug." },
    { h: "What I'm good at",      b: "Making the first version. Killing it. Making the next one." },
    { h: "If you want to work",   b: "Pitch me a problem, not a solution. Bonus: a screenshot of the broken thing." },
  ],
};

window.SITE = SITE;
