// tty.duffle.one — screens part 2: photo, gaming, guide, command palette.

// ── PHOTO (contact sheet w/ exif preview) ──────────────────
function TtyPhoto() {
  return (
    <TtyChrome route="photo" title="laura@duffle: ~/photo — feh contact-sheet">
      <div style={{ padding: "22px 26px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <H2 n="04" accent={T.pink}>
          ./photo<span style={{ color: T.pink }}>.roll</span>
        </H2>
        <div style={{ color: T.dim, fontSize: 11.5 }}>
          <Prompt cmd="exiftool ./*.{raw,jpg} | head -40" route="photo"/>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 14, flex: 1, minHeight: 0 }}>
          {/* contact sheet */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {SITE.photography.map((p, i) => {
              const sel = i === 1;
              return (
                <div key={p.id} style={{
                  border: sel ? `1px solid ${T.green}` : `1px solid ${T.border}`,
                  background: T.bg2, position: "relative",
                  boxShadow: sel ? `0 0 0 1px ${T.green}, 0 0 16px oklch(82% 0.20 145 / .25)` : "none",
                }}>
                  <div style={{
                    aspectRatio: "4 / 5",
                    backgroundImage: `repeating-linear-gradient(${i*32}deg,
                      oklch(${30 + i*4}% 0.10 ${30 + i*40}) 0 4px,
                      oklch(${20 + i*3}% 0.12 ${30 + i*40}) 4px 8px)`,
                  }}/>
                  <div style={{ padding: "5px 8px", borderTop: `1px solid ${T.border}`, fontSize: 10.5 }}>
                    <div style={{ color: T.fg }}>{p.title}</div>
                    <div style={{ color: T.faint, fontSize: 9.5, marginTop: 1 }}>0{i+1}.raw · {(2.4+i*0.3).toFixed(1)}mb</div>
                  </div>
                  {sel && (
                    <div style={{
                      position: "absolute", top: 6, left: 6, fontSize: 9, color: T.green, letterSpacing: 1,
                    }} className="tty-glow-g">▸ SEL</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* exif side panel */}
          <div style={{
            border: `1px solid ${T.borderHi}`, background: T.bg2,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              padding: "8px 12px", borderBottom: `1px solid ${T.border}`,
              fontSize: 10, color: T.faint, letterSpacing: 2,
            }}>EXIF · 02.RAW</div>
            <div style={{
              aspectRatio: "4 / 5",
              backgroundImage: `repeating-linear-gradient(60deg,
                oklch(38% 0.08 220) 0 4px,
                oklch(28% 0.10 220) 4px 8px)`,
              borderBottom: `1px solid ${T.border}`,
            }}/>
            <div style={{ padding: "10px 12px", fontSize: 10.5, color: T.dim, lineHeight: 1.6 }}>
              <div style={{ color: T.fg, fontFamily: T.display, fontSize: 16, letterSpacing: -0.3, marginBottom: 6 }}>
                Subway, 11:42pm
              </div>
              {[
                ["camera", "Fuji X100V"],
                ["lens",   "23mm f/2"],
                ["iso",    "6400"],
                ["shutter","1/60"],
                ["aperture","f/2.0"],
                ["push",   "+2 stops"],
                ["taken",  "2025-11-04"],
                ["place",  "Kennington"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dotted ${T.border}` }}>
                  <span style={{ color: T.faint }}>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, color: T.cyan, fontSize: 10 }}>↗ open in fullscreen · f</div>
            </div>
          </div>
        </div>

        <div style={{ color: T.faint, fontSize: 11 }}>
          ←/→ navigate · <Kbd>f</Kbd> fullscreen · <Kbd>i</Kbd> exif · <Kbd>r</Kbd> roll-mode
        </div>
      </div>
    </TtyChrome>
  );
}

// ── SERVERS (game servers I host) ──────────────────────────
function TtyGaming() {
  return (
    <TtyChrome route="gaming" title="laura@duffle: ~/servers — systemctl status">
      <div style={{ padding: "30px 34px", flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
        <H2 n="04" accent={T.cyan}>./servers<span style={{ color: T.cyan }}>.d/*</span></H2>
        <div style={{ color: T.dim, fontSize: 11.5 }}>
          <Prompt cmd="systemctl --user status game-*.service" route="servers"/>
          <div style={{ color: T.faint, marginTop: 4 }}>game servers I host for friends · join any with the address shown</div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "30px 1.4fr 1.6fr 90px 90px 80px",
          gap: 14, padding: "8px 0", fontSize: 10, letterSpacing: 2, color: T.faint,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <span>№</span><span>HOST</span><span>SERVICE</span><span>PLAYERS</span><span>UPTIME</span><span>STATUS</span>
        </div>
        {SITE.gaming.map((s, i) => {
          const c = s.status === "online" ? T.green : s.status === "idle" ? T.amber : T.faint;
          return (
            <div key={s.id} style={{
              display: "grid", gridTemplateColumns: "30px 1.4fr 1.6fr 90px 90px 80px",
              gap: 14, alignItems: "center", padding: "12px 0",
              borderBottom: `1px dashed ${T.border}`, fontSize: 12.5,
            }}>
              <span style={{ color: T.faint }}>{String(i+1).padStart(2,"0")}</span>
              <span style={{ color: c, fontFamily: T.font }}>
                <span style={{ color: c, marginRight: 6 }}>●</span>{s.title}
              </span>
              <span style={{ color: T.fg, fontFamily: T.display, fontSize: 15, letterSpacing: -0.2 }}>{s.game}</span>
              <span style={{ color: T.dim, fontFeatureSettings: '"tnum"' }}>{s.players}</span>
              <span style={{ color: T.dim, fontFeatureSettings: '"tnum"' }}>{s.uptime}</span>
              <Tag c={c}>{s.status}</Tag>
            </div>
          );
        })}

        <div style={{
          marginTop: 8, padding: "14px 18px",
          background: T.bg2, borderLeft: `2px solid ${T.amber}`,
        }}>
          <div style={{ fontSize: 10.5, color: T.faint, letterSpacing: 1.5, marginBottom: 6 }}>
            HOUSE RULES
          </div>
          <div style={{ color: T.fg, fontFamily: T.display, fontSize: 16, lineHeight: 1.5, fontStyle: "italic" }}>
            "be kind, build cool things, no creepers near my base.
            ping <span style={{ color: T.cyan }}>@duffle</span> for a whitelist."
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, fontSize: 11 }}>
          {[
            ["HOSTED",  "06",     T.green],
            ["ONLINE",  "04",     T.cyan],
            ["REGION",  "EU-W2",  T.amber],
            ["UPTIME",  "99.2%",  T.violet],
          ].map(([k, v, c]) => (
            <div key={k} style={{ border: `1px solid ${T.border}`, padding: "10px 12px", background: T.bg2 }}>
              <div style={{ color: T.faint, letterSpacing: 1.5, fontSize: 10 }}>{k}</div>
              <div style={{ color: c, fontFamily: T.display, fontSize: 24, letterSpacing: -0.3 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </TtyChrome>
  );
}

// ── USER GUIDE (man page) ──────────────────────────────────
function TtyGuide() {
  return (
    <TtyChrome route="guide" title="laura@duffle: ~/guide — man laura(1)">
      <div style={{ padding: "22px 26px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontSize: 10.5, color: T.faint, letterSpacing: 2,
          paddingBottom: 6, borderBottom: `1px solid ${T.border}`,
        }}>
          <span>LAURA(1)</span>
          <span>USER COMMANDS</span>
          <span>LAURA(1)</span>
        </div>

        <div>
          <div style={{ color: T.amber, fontSize: 10.5, letterSpacing: 2, marginBottom: 4 }}>NAME</div>
          <div style={{ color: T.fg, paddingLeft: 18 }}>
            <span style={{ color: T.green }}>laura</span> — a person; founding engineer,
            photographer, 3d-print enthusiast.
          </div>
        </div>

        <div>
          <div style={{ color: T.amber, fontSize: 10.5, letterSpacing: 2, marginBottom: 4 }}>SYNOPSIS</div>
          <div style={{ paddingLeft: 18, color: T.fg, fontFamily: T.font }}>
            <span style={{ color: T.green }}>laura</span>{" "}
            [<span style={{ color: T.cyan }}>--direct</span>]{" "}
            [<span style={{ color: T.cyan }}>--silly</span>]{" "}
            [<span style={{ color: T.cyan }}>--vain</span>]{" "}
            [<span style={{ color: T.violet }}>--coffee=</span><span style={{ color: T.amber }}>{`<oz>`}</span>]{" "}
            [<span style={{ color: T.pink }}>topic</span>...]
          </div>
        </div>

        <div>
          <div style={{ color: T.amber, fontSize: 10.5, letterSpacing: 2, marginBottom: 4 }}>DESCRIPTION</div>
          <div style={{ paddingLeft: 18 }}>
            {SITE.guide.map((g, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ color: T.green, fontFamily: T.display, fontSize: 16, letterSpacing: -0.2 }}>
                  <span style={{ color: T.faint, fontFamily: T.font, fontSize: 11, marginRight: 8 }}>§{i+1}</span>
                  {g.h}
                </div>
                <div style={{ color: T.fg, fontSize: 12.5, marginTop: 2 }}>{g.b}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ color: T.amber, fontSize: 10.5, letterSpacing: 2, marginBottom: 4 }}>EXIT STATUS</div>
          <div style={{ paddingLeft: 18, color: T.dim, fontSize: 12 }}>
            <span style={{ color: T.green }}>0</span> all good ·
            <span style={{ color: T.amber }}>  1</span> needs coffee ·
            <span style={{ color: T.pink }}>  2</span> needs feedback ·
            <span style={{ color: T.violet }}> 137</span> meeting ran over
          </div>
        </div>

        <div style={{
          marginTop: "auto", paddingTop: 8, borderTop: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between",
          fontSize: 10.5, color: T.faint, letterSpacing: 2,
        }}>
          <span>DUFFLE.ONE</span><span>v26.4 · 2026-04</span><span>LAURA(1)</span>
        </div>
      </div>
    </TtyChrome>
  );
}

// ── COMMAND PALETTE OVERLAY ────────────────────────────────
function TtyPalette() {
  const cmds = [
    { k: "go home",        h: "g h", c: T.green,  i: "▸" },
    { k: "go projects",    h: "g p", c: T.green,  i: "λ" },
    { k: "go photo",       h: "g f", c: T.green,  i: "◐" },
    { k: "go gaming",      h: "g a", c: T.green,  i: "▦" },
    { k: "open user-guide",h: "g u", c: T.green,  i: "§" },
    { k: "toggle theme",   h: "t",   c: T.amber,  i: "☼" },
    { k: "fortune",        h: "f",   c: T.pink,   i: "♣" },
    { k: "sudo email me",  h: "⌘E",  c: T.cyan,   i: "✉" },
    { k: "easter egg #3",  h: "?!",  c: T.violet, i: "✦" },
  ];
  return (
    <TtyChrome route="home" title="laura@duffle: ~ — palette">
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        {/* faded bg */}
        <div style={{ padding: "22px 26px", opacity: 0.18, pointerEvents: "none" }}>
          <div style={{ fontFamily: T.display, fontSize: 56, letterSpacing: -1.4 }}>
            Laura<br/>Miller.
          </div>
          <div style={{ color: T.dim, marginTop: 8 }}>founding eng · photographer · 3d-print enthusiast</div>
        </div>

        <div style={{
          position: "absolute", inset: 0, paddingTop: 90,
          background: "rgba(10,12,16,0.6)",
          backdropFilter: "blur(2px)",
          display: "flex", justifyContent: "center", alignItems: "flex-start",
        }}>
          <div style={{
            width: 480, background: T.bg2,
            border: `1px solid ${T.green}`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 4px oklch(82% 0.20 145 / .08)`,
          }}>
            <div style={{
              display: "flex", gap: 10, alignItems: "center",
              padding: "12px 14px", borderBottom: `1px solid ${T.border}`,
            }}>
              <span style={{ color: T.green }}>›</span>
              <span style={{ color: T.fg }}>open</span>
              <span className="tty-caret"/>
              <span style={{ marginLeft: "auto", color: T.faint, fontSize: 11, display: "flex", gap: 6 }}>
                <Kbd>esc</Kbd>
              </span>
            </div>
            <div style={{ fontSize: 10.5, padding: "5px 14px", color: T.faint, letterSpacing: 1.5 }}>
              ROUTES & COMMANDS · 9 results
            </div>
            <div>
              {cmds.map((c, i) => {
                const sel = i === 0;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "8px 14px", color: sel ? T.fg : T.dim,
                    background: sel ? T.bg3 : "transparent",
                    borderLeft: sel ? `2px solid ${T.green}` : "2px solid transparent",
                  }}>
                    <span style={{ color: c.c, width: 14, textAlign: "center" }}>{c.i}</span>
                    <span style={{ flex: 1 }}>{c.k}</span>
                    <span style={{ color: T.faint, fontSize: 10.5 }}>{c.h}</span>
                  </div>
                );
              })}
            </div>
            <div style={{
              padding: "8px 14px", borderTop: `1px solid ${T.border}`,
              color: T.faint, fontSize: 11, display: "flex", justifyContent: "space-between",
            }}>
              <span><Kbd>↑</Kbd><Kbd>↓</Kbd> nav · <Kbd>↵</Kbd> select</span>
              <span>fuzzy match enabled</span>
            </div>
          </div>
        </div>
      </div>
    </TtyChrome>
  );
}

window.TtyPhoto = TtyPhoto;
window.TtyGaming = TtyGaming;
window.TtyGuide = TtyGuide;
window.TtyPalette = TtyPalette;
