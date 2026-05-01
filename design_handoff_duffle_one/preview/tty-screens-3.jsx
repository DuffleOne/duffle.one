// tty.duffle.one — screens part 3: cv, easter-egg/404.

// ── CV (replaces links) ────────────────────────────────────
function TtyCV() {
  return (
    <TtyChrome route="cv" title="laura@duffle: ~/cv — less laura.cv">
      <div style={{ padding: "30px 34px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
        <H2 n="06" accent={T.violet}>./cv<span style={{ color: T.violet }}>.txt</span></H2>
        <div style={{ color: T.dim, fontSize: 11.5 }}>
          <Prompt cmd="less ~/cv.txt" route="cv"/>
        </div>

        <div style={{
          padding: "14px 18px", background: T.bg2, borderLeft: `2px solid ${T.violet}`,
          color: T.fg, fontSize: 13, lineHeight: 1.6,
        }}>
          {SITE.cv.summary}
        </div>

        <div style={{ color: T.amber, fontSize: 10.5, letterSpacing: 2, marginTop: 4 }}>── EXPERIENCE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SITE.cv.experience.map((e, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 18, alignItems: "flex-start" }}>
              <div style={{ color: T.faint, fontSize: 11, letterSpacing: 1.5, paddingTop: 4 }}>
                <div style={{ color: T.cyan, fontFamily: T.font }}>{e.when}</div>
                <div style={{ color: T.faint, marginTop: 2 }}>{e.loc}</div>
              </div>
              <div style={{ borderLeft: `1px dashed ${T.border}`, paddingLeft: 16 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: T.display, fontSize: 20, letterSpacing: -0.3, color: T.fg }}>{e.role}</span>
                  <span style={{ color: T.faint }}>·</span>
                  <span style={{ color: T.green, fontFamily: T.font }}>{e.co}</span>
                </div>
                <ul style={{ margin: "6px 0 0", padding: 0, listStyle: "none", color: T.fg, fontSize: 12.5 }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, padding: "2px 0" }}>
                      <span style={{ color: T.faint }}>›</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 8 }}>
          <div>
            <div style={{ color: T.amber, fontSize: 10.5, letterSpacing: 2, marginBottom: 8 }}>── EDUCATION</div>
            {SITE.cv.education.map((ed, i) => (
              <div key={i}>
                <div style={{ fontFamily: T.display, fontSize: 17, letterSpacing: -0.2 }}>
                  {ed.degree} <span style={{ color: T.faint }}>·</span> <span style={{ color: T.green }}>{ed.school}</span>
                </div>
                <div style={{ color: T.dim, fontSize: 11.5, marginTop: 2 }}>{ed.when}</div>
                <div style={{ color: T.fg, fontSize: 12, marginTop: 4 }}>{ed.note}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: T.amber, fontSize: 10.5, letterSpacing: 2, marginBottom: 8 }}>── SKILLS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {SITE.cv.skills.map((s, i) => (
                <Tag key={i} c={[T.green, T.cyan, T.amber, T.pink, T.violet][i % 5]}>{s}</Tag>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", fontSize: 11, color: T.faint, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
          <span>laura@duffle.one</span><span>:LINES 1–48 of 48 (END)</span>
        </div>
      </div>
    </TtyChrome>
  );
}

// ── 404 / EASTER EGG (sudo hire) ───────────────────────────
function Tty404() {
  return (
    <TtyChrome route="sudo" title="laura@duffle: ~ — sudo: an error has occurred">
      <div style={{ padding: "26px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        <Prompt cmd="sudo hire laura"/>
        <div style={{ color: T.pink, fontSize: 12 }} className="tty-glow-p">
          [sudo] password for guest: <span style={{ color: T.fg }}>•••••••••</span>
        </div>
        <div style={{ color: T.amber, fontSize: 12 }} className="tty-glow-a">
          Sorry, try again.
        </div>
        <div style={{ color: T.amber, fontSize: 12 }} className="tty-glow-a">
          Sorry, try again.
        </div>
        <div style={{ color: T.pink, fontSize: 12 }} className="tty-glow-p">
          sudo: 3 incorrect password attempts
        </div>

        <pre style={{ color: T.pink, margin: "12px 0", fontSize: 12, lineHeight: 1.18 }} className="tty-glow-p">
{` ┌─────────────────────────┐
 │   ERR · NOT THAT EASY   │
 └────────────┬────────────┘
              │
       ╔══════▼══════╗
       ║   404·ish   ║
       ╚═════════════╝`}
        </pre>

        <div style={{
          padding: "14px 16px", border: `1px solid ${T.borderHi}`, background: T.bg2,
          borderLeft: `3px solid ${T.amber}`,
        }}>
          <div style={{ color: T.amber, fontSize: 11, letterSpacing: 2, marginBottom: 4 }}>
            ── ALTERNATIVE ROUTES
          </div>
          <div style={{ color: T.fg, fontSize: 12.5, lineHeight: 1.7 }}>
            <div><span style={{ color: T.green }}>1.</span> draft a real email at <span style={{ color: T.cyan }}>laura@duffle.one</span></div>
            <div><span style={{ color: T.green }}>2.</span> dm me on instagram, but be cute about it</div>
            <div><span style={{ color: T.green }}>3.</span> press <Kbd>?</Kbd> for the user guide first</div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", gap: 14, alignItems: "center" }}>
          <Tag c={T.pink} filled>EASTER EGG · 03</Tag>
          <span style={{ color: T.faint, fontSize: 11 }}>9 more hidden in the shell. good luck.</span>
        </div>

        <Prompt cmd="" route="sudo" glow/>
        <span className="tty-caret" style={{ marginTop: -8 }}/>
      </div>
    </TtyChrome>
  );
}

window.TtyCV = TtyCV;
window.Tty404 = Tty404;
