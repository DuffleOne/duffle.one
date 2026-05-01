// tty.duffle.one — screens (visual-only).
// Each function below is a self-contained artboard composition.

// ── HOME ───────────────────────────────────────────────────
function TtyHome() {
  const wordmark =
    ` ▄▄▄▄  ▄▄  ▄▄  ▄▄▄▄  ▄▄▄▄  ▄▄    ▄▄▄▄
 █  █  █▌  █▌  █▀▀   █▀▀   █     █▀▀
 █▄▄█  █▄▄▄█▄  █     █     █▄▄▄  █▄▄`;
  return (
    <TtyChrome route="home" title="laura@duffle: ~ — fish — 96×42">
      <div style={{ padding: "30px 34px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 18, minHeight: 0 }}>
        <pre style={{ color: T.green, margin: 0, fontSize: 13, lineHeight: 1.18 }} className="tty-glow-g">{wordmark}</pre>
        <div style={{ color: T.dim, fontSize: 11.5, letterSpacing: 1.5 }}>
          DUFFLE.ONE · v26.4 · last login: tue 16:38 from 10.0.0.42
        </div>
        <div style={{ height: 1, background: T.border }} />

        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 32, alignItems: "flex-start" }}>
          <div>
            <div style={{
              width: 160, height: 200,
              border: `1px solid ${T.borderHi}`, background: T.bg2,
              backgroundImage: `repeating-linear-gradient(135deg, ${T.bg3} 0 6px, ${T.bg2} 6px 12px)`,
              position: "relative",
            }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: T.faint, fontSize: 10.5, letterSpacing: 1, textAlign: "center" }}>
                [ portrait.jpg ]<br />
                <span style={{ fontSize: 9 }}>1024×1280</span>
              </div>
              <div style={{ position: "absolute", left: 6, top: 6, fontSize: 9, color: T.green, letterSpacing: 1 }}>◉ FRAME 01</div>
              {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: x ? "auto" : 4, right: x ? 4 : "auto",
                  top: y ? "auto" : 4, bottom: y ? 4 : "auto",
                  width: 10, height: 10,
                  borderLeft: x ? "none" : `1.5px solid ${T.green}`,
                  borderRight: x ? `1.5px solid ${T.green}` : "none",
                  borderTop: y ? "none" : `1.5px solid ${T.green}`,
                  borderBottom: y ? `1.5px solid ${T.green}` : "none",
                }} />
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 10.5, color: T.dim, lineHeight: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dotted ${T.border}` }}>
                <span style={{ color: T.faint }}>STATUS</span><span style={{ color: T.green }}>● online</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dotted ${T.border}` }}>
                <span style={{ color: T.faint }}>CITY</span><span>London, UK</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dotted ${T.border}` }}>
                <span style={{ color: T.faint }}>WX</span><span>11° drizzle</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: T.faint }}>NOW</span><span style={{ color: T.amber }}>typing this</span>
              </div>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: T.display, fontSize: 68, lineHeight: 0.92, letterSpacing: -1.8, color: T.fg, fontWeight: 500 }}>
              Laura<br />Miller<span style={{ color: T.green }} className="tty-glow-g">.</span>
            </div>
            <div style={{ marginTop: 18, color: T.fg }}>
              founding eng · photographer · 3d-print enthusiast.
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <Tag c={T.pink}>vain</Tag><Tag c={T.amber}>silly</Tag><Tag c={T.cyan}>direct</Tag>
            </div>

            <div style={{ marginTop: 22, color: T.dim }}>
              <Prompt cmd="cat ./quote.txt" route="home" glow />
            </div>
            <div style={{
              marginTop: 10, padding: "14px 18px",
              borderLeft: `2px solid ${T.amber}`, background: T.bg2,
            }}>
              <span style={{ color: T.amber }}>“</span>{SITE.quote}<span style={{ color: T.amber }}>”</span>
              <div style={{ color: T.faint, fontSize: 11, marginTop: 6 }}>— mum, allegedly</div>
            </div>

            <div style={{ marginTop: 20 }}>
              <Prompt cmd="cat ./links.json" route="home" />
            </div>
            <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 22px" }}>
              {SITE.socials.map((s, i) => {
                const cs = [T.green, T.amber, T.pink, T.cyan];
                return (
                  <div key={s.id} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 12px", background: T.bg2,
                    borderLeft: `2px solid ${cs[i]}`,
                  }}>
                    <span style={{ color: cs[i], fontFamily: T.display, fontSize: 18, width: 18, textAlign: "center" }}>
                      {s.label[0]}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: T.fg, fontSize: 12 }}>{s.label}</div>
                      <div style={{ color: T.dim, fontSize: 10.5 }}>{s.handle}</div>
                    </div>
                    <span style={{ color: T.faint, fontSize: 11 }}>↗</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", color: T.dim }}>
          <Prompt cmd="" route="home" glow /><span className="tty-caret" />
        </div>
      </div>
    </TtyChrome>
  );
}

// ── PROJECTS ───────────────────────────────────────────────
function TtyProjects() {
  return (
    <TtyChrome route="projects" title="laura@duffle: ~/projects — ls">
      <div style={{ padding: "30px 34px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
        <H2 n="02" accent={T.amber}>
          ./projects<span style={{ color: T.green }}>/*</span>
        </H2>
        <div style={{ color: T.dim, fontSize: 11.5 }}>
          <Prompt cmd="find . -type d -maxdepth 1 | sort -r" route="projects" />
        </div>

        {/* table head */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "30px 130px 1fr 70px 90px",
          gap: 14, padding: "6px 0",
          fontSize: 10, letterSpacing: 2, color: T.faint,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <span>№</span><span>NAME</span><span>SUMMARY</span><span>YEAR</span><span>STATUS</span>
        </div>
        {SITE.projects.map((p, i) => {
          const cs = [T.green, T.pink, T.amber, T.cyan];
          return (
            <div key={p.id} style={{
              display: "grid",
              gridTemplateColumns: "30px 130px 1fr 70px 90px",
              gap: 14, alignItems: "center", padding: "16px 0",
              borderBottom: `1px dashed ${T.border}`,
            }}>
              <span style={{ color: T.faint }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ color: cs[i], fontWeight: 600, fontFamily: T.display, fontSize: 18, letterSpacing: -0.3 }}>
                {p.name}
              </span>
              <span style={{ color: T.fg, fontSize: 12 }}>{p.blurb}</span>
              <span style={{ color: T.dim, fontSize: 12 }}>{p.year}</span>
              <Tag c={cs[i]}>{p.tag}</Tag>
            </div>
          );
        })}

        {/* highlighted detail card */}
        <div style={{ marginTop: 6, border: `1px solid ${T.borderHi}`, background: T.bg2 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 12px", borderBottom: `1px solid ${T.border}`,
            fontSize: 11, color: T.dim, letterSpacing: 1,
          }}>
            <span style={{ color: T.green }}>▸</span>
            <span style={{ color: T.fg }}>easycal/README.md</span>
            <span style={{ marginLeft: "auto", color: T.faint }}>preview · q to close</span>
          </div>
          <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 200px", gap: 18 }}>
            <div>
              <div style={{ fontFamily: T.display, fontSize: 26, letterSpacing: -0.3, marginBottom: 6 }}>
                <span style={{ color: T.green }}># </span>easycal
              </div>
              <div style={{ color: T.fg, fontSize: 12, lineHeight: 1.55 }}>
                Calendar that reads your mind, mostly. Type "lunch with sam tuesday"
                and it figures the rest out. Built on a stack of duct tape and Whisper.
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Tag c={T.green}>shipping</Tag>
                <Tag c={T.cyan}>typescript</Tag>
                <Tag c={T.amber}>llm</Tag>
                <Tag c={T.violet}>solo</Tag>
              </div>
            </div>
            <div style={{
              border: `1px solid ${T.border}`, padding: 8, fontSize: 10.5, color: T.dim, lineHeight: 1.6,
            }}>
              <div style={{ color: T.faint, letterSpacing: 1.5, marginBottom: 4 }}>STATS</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>users</span><span style={{ color: T.green }}>4,128</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>mrr</span><span style={{ color: T.amber }}>$2.1k</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>commits</span><span>1,402</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>last push</span><span>2h ago</span></div>
              <div style={{ marginTop: 8, color: T.faint, fontSize: 9.5, letterSpacing: 1 }}>↗ visit</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", color: T.dim, fontSize: 11.5 }}>
          4 entries · git status: <span style={{ color: T.green }}>clean</span> · press <Kbd>↵</Kbd> on a row to expand
        </div>
      </div>
    </TtyChrome>
  );
}

window.TtyHome = TtyHome;
window.TtyProjects = TtyProjects;
