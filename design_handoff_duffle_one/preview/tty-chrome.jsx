// tty.duffle.one — chrome (titlebar / sidebar / statusbar / page wrapper).
// Visual-only.

function TtyChrome({ route, children, w = 760, h = 980, mode = "NORMAL", title, accent = T.green }) {
  return (
    <div className="tty tty-scan tty-vig" style={{
      width: w, height: h, background: T.bg, color: T.fg,
      fontFamily: T.font, fontSize: 13, lineHeight: 1.7,
      display: "flex", flexDirection: "column", overflow: "hidden",
      border: `1px solid ${T.border}`,
      boxShadow: "inset 0 0 120px rgba(0,0,0,0.4)",
    }}>
      <TitleBar title={title || `laura@duffle: ~/${route}`}/>
      <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative", zIndex: 3 }}>
        <SideBar route={route} accent={accent}/>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
          {children}
        </div>
      </div>
      <StatusBar route={route} mode={mode} accent={accent}/>
    </div>
  );
}

function TitleBar({ title }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 14px", borderBottom: `1px solid ${T.border}`,
      background: T.bg2, fontSize: 12, position: "relative", zIndex: 3,
    }}>
      <div style={{ display: "flex", gap: 6 }}>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: T.pink, opacity: 0.85 }}/>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: T.amber, opacity: 0.85 }}/>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: T.green, opacity: 0.85 }}/>
      </div>
      <span style={{ color: T.dim, marginLeft: 4 }}>{title}</span>
      <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
        <Kbd>⌘K</Kbd><Kbd>?</Kbd><Kbd>esc</Kbd>
      </span>
    </div>
  );
}

function SideBar({ route, accent = T.green }) {
  return (
    <div style={{
      width: 200, background: T.bg2, borderRight: `1px solid ${T.border}`,
      display: "flex", flexDirection: "column", padding: "20px 0", fontSize: 12.5,
    }}>
      <div style={{ padding: "0 18px 12px", color: T.faint, fontSize: 10, letterSpacing: 2 }}>ROUTES</div>
      {ROUTES.map(r => {
        const on = r.id === route;
        return (
          <div key={r.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 18px",
            background: on ? T.bg3 : "transparent",
            borderLeft: on ? `2px solid ${accent}` : "2px solid transparent",
            color: on ? T.fg : T.dim,
          }}>
            <span style={{ color: on ? accent : T.faint, width: 10 }}>{r.key}</span>
            <span style={{ color: on ? accent : T.faint, width: 8 }}>{on ? "▸" : "·"}</span>
            <span>{r.label}</span>
          </div>
        );
      })}
      <div style={{ padding: "22px 18px 8px", color: T.faint, fontSize: 10, letterSpacing: 2 }}>SHELL</div>
      {[
        ["whoami",   T.amber],
        ["fortune",  T.pink],
        ["uptime",   T.cyan],
        ["sudo hire",T.violet],
      ].map(([k, c]) => (
        <div key={k} style={{ padding: "5px 18px", color: T.dim, display: "flex", gap: 10 }}>
          <span style={{ color: c }}>$</span><span>{k}</span>
        </div>
      ))}
      <div style={{ marginTop: "auto", padding: "16px 18px 4px", borderTop: `1px solid ${T.border}`, fontSize: 10.5 }}>
        <div style={{ color: T.faint, letterSpacing: 1.5, marginBottom: 8 }}>SYS</div>
        {[
          ["cpu",  6, T.green],
          ["mem",  4, T.amber],
          ["net",  8, T.cyan],
        ].map(([k, n, c]) => (
          <div key={k} style={{ color: T.dim, display: "flex", justifyContent: "space-between" }}>
            <span>{k}</span>
            <span>
              {Array.from({length:10}).map((_, i) => (
                <span key={i} style={{ color: i < n ? c : T.faint }}>{i < n ? "█" : "░"}</span>
              ))}
            </span>
          </div>
        ))}
        <div style={{ color: T.dim, display: "flex", justifyContent: "space-between" }}>
          <span>vibe</span><span style={{ color: T.pink }}>caffeinated</span>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ route, mode = "NORMAL", accent = T.green }) {
  return (
    <div style={{
      display: "flex", alignItems: "stretch", borderTop: `1px solid ${T.border}`,
      fontSize: 11, background: T.bg2, position: "relative", zIndex: 3,
    }}>
      <span style={{ background: accent, color: "#001b00", padding: "4px 10px", fontWeight: 700, letterSpacing: 0.5 }}>
        {mode}
      </span>
      <span style={{ padding: "4px 10px", color: T.dim, borderRight: `1px solid ${T.border}` }}>~/{route}</span>
      <span style={{ padding: "4px 10px", color: T.faint, borderRight: `1px solid ${T.border}` }}>main</span>
      <span style={{ padding: "4px 10px", color: T.dim }}>
        <span style={{ color: T.green }}>●</span> synced 2m ago
      </span>
      <span style={{ marginLeft: "auto", padding: "4px 10px", color: T.faint }}>
        utf-8 · 100% · ln 1, col 1
      </span>
      <span style={{ padding: "4px 10px", color: T.amber, borderLeft: `1px solid ${T.border}` }}>
        london · 16:42
      </span>
    </div>
  );
}

window.TtyChrome = TtyChrome;
