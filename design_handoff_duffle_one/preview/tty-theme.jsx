// tty.duffle.one — shared theme + chrome.
// Visual-only, static. Phosphor on near-black, Space Grotesk display,
// JetBrains Mono body. Saturated oklch accents (same chroma/lightness, hue
// varies) so they harmonize.

const T = {
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
  font:    "'JetBrains Mono', ui-monospace, Menlo, monospace",
  display: "'Space Grotesk', 'Inter', sans-serif",
};

if (typeof document !== "undefined" && !document.getElementById("tty-css")) {
  const s = document.createElement("style");
  s.id = "tty-css";
  s.textContent = `
    @keyframes ttyblink{0%,49%{opacity:1}50%,100%{opacity:0}}
    .tty *::-webkit-scrollbar{display:none}
    .tty{position:relative;isolation:isolate}
    .tty-scan::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;
      background:repeating-linear-gradient(0deg,rgba(255,255,255,.014) 0 1px,transparent 1px 3px);
      mix-blend-mode:overlay}
    .tty-vig::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:2;
      background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,.45))}
    .tty-caret{display:inline-block;width:.55em;height:1.05em;background:${T.green};
      vertical-align:-3px;margin-left:2px;animation:ttyblink 1.05s steps(2) infinite;
      box-shadow:0 0 8px ${T.green}}
    .tty-glow-g{text-shadow:0 0 10px oklch(82% 0.20 145 / .5)}
    .tty-glow-a{text-shadow:0 0 10px oklch(85% 0.18 75 / .5)}
    .tty-glow-p{text-shadow:0 0 10px oklch(78% 0.20 0 / .5)}
    .tty-glow-c{text-shadow:0 0 10px oklch(82% 0.18 220 / .5)}
  `;
  document.head.appendChild(s);
}

const ROUTES = [
  { id: "home",     label: "home",       key: "1" },
  { id: "projects", label: "projects",   key: "2" },
  { id: "photo",    label: "photo",      key: "3" },
  { id: "gaming",   label: "servers",    key: "4" },
  { id: "guide",    label: "user-guide", key: "5" },
  { id: "cv",       label: "cv",         key: "6" },
];

function Kbd({ children, c = T.dim }) {
  return <span style={{
    fontSize: 10.5, padding: "1px 7px", borderRadius: 3,
    border: `1px solid ${T.border}`, background: T.bg3, color: c,
    letterSpacing: 0.5, fontFamily: T.font,
  }}>{children}</span>;
}

function Tag({ children, c = T.green, filled }) {
  return <span style={{
    fontSize: 10, padding: "2px 8px",
    border: `1px solid ${c}`,
    color: filled ? "#001b00" : c,
    background: filled ? c : "transparent",
    letterSpacing: 1.5, textTransform: "uppercase",
    fontWeight: filled ? 700 : 400,
    whiteSpace: "nowrap",
  }}>{children}</span>;
}

function Prompt({ cmd, route = "home", host = "laura@duffle", glow }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
      <span style={{ color: T.dim }}>{host}</span>
      <span style={{ color: T.faint }}>:</span>
      <span style={{ color: T.cyan }}>~/{route}</span>
      <span style={{ color: T.green }} className={glow ? "tty-glow-g" : ""}>$</span>
      <span style={{ color: T.fg }}>{cmd}</span>
    </div>
  );
}

function H2({ children, accent = T.amber, n }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      {n != null && <span style={{ color: T.faint, fontSize: 11, letterSpacing: 2 }}>§{n}</span>}
      <div style={{
        fontFamily: T.display, fontSize: 28, lineHeight: 1, letterSpacing: -0.5,
      }}>{children}</div>
      <span style={{ flex: 1, height: 1, background: T.border, margin: "0 4px" }}/>
      <span style={{ color: accent, fontSize: 10.5, letterSpacing: 2 }}>● LIVE</span>
    </div>
  );
}

window.T = T;
window.ROUTES = ROUTES;
window.Kbd = Kbd;
window.Tag = Tag;
window.Prompt = Prompt;
window.H2 = H2;
