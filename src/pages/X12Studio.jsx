import { useEffect, useRef, useState } from 'react'
import StudioDemo from './StudioDemo.jsx'

// Product page for the self-hosted X12 translation engine (@x12/core). The
// engine is the focal point; the mapping studio and translate API are the
// tooling that drives it. Reached via the #/x12-studio hash route (App.jsx).
const scrollTo = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// The X12 270 eligibility interchange shown in the hero terminal, one entry
// per rendered line so each can fade in on load.
const WIRE_LINES = [
  <><span className="dim">ISA*00*          *00*          *ZZ*</span>CLINIC42       <span className="dim">*ZZ*</span>PAYER07<span className="term">~</span></>,
  <><span className="tag">GS</span>*HS*CLINIC42*PAYER07*20260724*1830*1*X*005010X279A1<span className="term">~</span></>,
  <><span className="tag">ST</span>*270*0001*005010X279A1<span className="term">~</span></>,
  <><span className="tag">BHT</span>*0022*13*10001234*20260724*1830<span className="term">~</span></>,
  <><span className="tag">HL</span>*1**20*1<span className="term">~</span></>,
  <><span className="tag">NM1</span>*PR*2*UNITED HEALTHCARE*****PI*87726<span className="term">~</span></>,
  <><span className="tag">HL</span>*2*1*21*1<span className="term">~</span></>,
  <><span className="tag">NM1</span>*1P*2*BENEFIT CLINIC*****XX*1234567893<span className="term">~</span></>,
  <><span className="tag">TRN</span>*1*93175-012547*9877281234<span className="term">~</span></>,
  <><span className="tag">NM1</span>*IL*1*DOE*JANE****MI*W123456789<span className="term">~</span></>,
  <><span className="tag">DMG</span>*D8*19850315*F<span className="term">~</span></>,
  <><span className="tag">EQ</span>*30<span className="term">~</span>  <span className="dim">SE*13*0001~  GE*1*1~</span></>,
]

// Reveal-on-scroll: adds .reveal--in to every .reveal element as it enters view.
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.x12 .reveal')
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('reveal--in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('reveal--in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Counts up an integer once it scrolls into view.
function CountUp({ end, duration = 1100 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setVal(end)
      return
    }
    let raf
    let start
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const tick = (t) => {
          if (start == null) start = t
          const p = Math.min(1, (t - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(end * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])
  return <span ref={ref}>{val}</span>
}

export default function X12Studio() {
  useScrollReveal()

  return (
    <main className="x12">
      {/* Hero — the engine */}
      <section className="section x12-hero">
        <div className="container x12-hero__grid">
          <div className="x12-hero__copy reveal">
            <span className="section__eyebrow">Self-hosted X12 translation engine</span>
            <h1 className="x12-hero__title">
              See the exact wire <span className="accent x12-shine">before</span> you ship it.
            </h1>
            <p className="x12-hero__lead">
              At its core is a pure, deterministic X12 engine: <strong>33 transaction sets</strong> as
              data, SNIP L1–L7 compliance built in, and <strong>byte-identical</strong> output every
              time. A visual mapping studio and a one-call API come along to drive it — but the engine
              is the product, and it runs entirely inside your network.
            </p>
            <div className="x12-hero__cta">
              <a href="#contact" className="btn btn--primary">Request a demo</a>
              <a href="#x12-engine" className="btn btn--ghost" onClick={scrollTo('x12-engine')}>
                How the engine works
              </a>
            </div>
          </div>

          {/* Wire terminal */}
          <div className="x12-wire reveal" aria-label="Live X12 270 eligibility inquiry preview">
            <div className="x12-wire__bar">
              <span className="x12-wire__dot" />
              <span className="x12-wire__dot" />
              <span className="x12-wire__dot" />
              <span className="x12-wire__label">engine output · 270 eligibility · 005010X279A1</span>
              <span className="x12-wire__pass">✓ passes SNIP L2</span>
            </div>
            <div className="x12-wire__body">
              <div className="x12-wire__scan" aria-hidden="true" />
              <pre>
                {WIRE_LINES.map((line, i) => (
                  <span className="ln" key={i}>{line}</span>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* THE ENGINE — the focal point */}
      <section className="section section--alt" id="x12-engine">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">The engine · @x12/core</span>
            <h2 className="section__title">One pure engine — the preview and production run the same code</h2>
            <p className="section__lead">
              Everything else sits on a single translation engine with no React and no I/O. That&rsquo;s
              what makes the guarantees hold — and it&rsquo;s what you&rsquo;re really buying.
            </p>
          </div>
          <div className="grid grid--2">
            <Principle i={0} k="Deterministic" title="Byte-identical, every time">The studio preview and <code>POST /api/translate</code> execute the same pure <strong>@x12/core</strong> — what you validate is exactly what ships. No “works in the tool, breaks in prod.”</Principle>
            <Principle i={1} k="Spec is data" title="33 sets, typed as data">Rules, code sets, docs, and wire templates are data — adding a transaction set is a data file, not code. Every spec is golden-file tested byte-for-byte.</Principle>
            <Principle i={2} k="Compliance built in" title="SNIP L1–L7 validation">Element syntax through partner-pack rules — balancing, situational, and NPI / ICD-10 checks — enforced by the engine. A mapping that fails can never serve traffic.</Principle>
            <Principle i={3} k="Pure & air-gapped" title="No I/O, zero external calls">The engine makes no network requests; PHI never leaves your box. Fonts bundled locally, no CDNs, no analytics.</Principle>
          </div>
        </div>
      </section>

      {/* Stats — engine substance */}
      <section className="section">
        <div className="container x12-stats">
          <div className="x12-stat reveal"><div className="x12-stat__n"><CountUp end={33} /></div><div className="x12-stat__l"><strong>Transaction sets</strong> installed, healthcare through finance</div></div>
          <div className="x12-stat reveal" style={{ '--reveal-d': '0.08s' }}><div className="x12-stat__n">L1–L7</div><div className="x12-stat__l"><strong>SNIP validation levels</strong> — syntax through partner-pack rules</div></div>
          <div className="x12-stat reveal" style={{ '--reveal-d': '0.16s' }}><div className="x12-stat__n"><CountUp end={0} /></div><div className="x12-stat__l"><strong>External requests</strong> at runtime — air-gapped posture</div></div>
          <div className="x12-stat reveal" style={{ '--reveal-d': '0.24s' }}><div className="x12-stat__n"><CountUp end={1} /></div><div className="x12-stat__l"><strong>Docker container</strong> — engine, studio &amp; API, same origin</div></div>
        </div>
      </section>

      {/* Coverage — engine */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">Installed coverage</span>
            <h2 className="section__title">33 transaction sets — adding one is a data file, not code</h2>
            <p className="section__lead">
              All X12 knowledge — rules, code sets, docs, wire templates — lives as typed
              data in the engine. Every spec has golden-file tests comparing the full pipeline
              byte-for-byte.
            </p>
          </div>

          <div className="x12-cov">
            <CovGroup i={0} title="Healthcare" sub="eligibility · claims · enrollment" codes={['270/271','276/277','278','834','835','837P','837I','837D']} />
            <CovGroup i={1} title="Supply chain" sub="orders · ship · invoice" codes={['850','855','856','860','810','832','846','852']} />
            <CovGroup i={2} title="Warehouse" sub="shipping · receipt · stock" codes={['940','945','944']} />
            <CovGroup i={3} title="Transportation" sub="load tender · status" codes={['204','990','214','210']} />
            <CovGroup i={4} title="Finance" sub="payment order · remittance" codes={['820','823','824']} />
            <CovGroup i={5} title="And more" sub="planning · acknowledgements" codes={['811','830','862','867','997']} />
          </div>
        </div>
      </section>

      {/* ── Secondary: the tooling that drives the engine ── */}

      {/* Studio demo */}
      <section className="section" id="x12-demo">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">Included tooling · the studio</span>
            <h2 className="section__title">A visual studio to drive the engine</h2>
            <p className="section__lead">
              Nobody hand-writes X12. The mapping studio is how analysts feed the engine — here&rsquo;s
              a real 270 eligibility inquiry, mapped field by field, validating to SNIP L2 as the wire
              builds. It&rsquo;s the same engine underneath, so the preview is the output.
            </p>
          </div>
          <StudioDemo />
        </div>
      </section>

      {/* Pipeline */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">Inside the studio</span>
            <h2 className="section__title">Source flows through concepts to the wire</h2>
            <p className="section__lead">
              Map by meaning, not by segment coordinates. Arrays of line items map
              wholesale — target segments repeat per element. The preview and the API
              run the same engine, so what you map is what ships.
            </p>
          </div>

          <div className="x12-pipe">
            <div className="card x12-panel reveal">
              <div className="x12-panel__k">Panel 01 · Source</div>
              <h3 className="card__title">Your JSON document</h3>
              <p className="card__desc">Import, paste, or load a sample. The parser turns any document into a schema tree you can drag from.</p>
            </div>
            <div className="x12-pipe__arrow reveal" aria-hidden="true">⇄</div>
            <div className="card x12-panel reveal" style={{ '--reveal-d': '0.1s' }}>
              <div className="x12-panel__k">Panel 02 · Concepts</div>
              <h3 className="card__title">Business concepts</h3>
              <p className="card__desc">Drop source fields onto named slots. Add conditional logic with ⚙; <span className="accent">⚡ Auto-match</span> proposes the obvious ones.</p>
            </div>
            <div className="x12-pipe__arrow reveal" aria-hidden="true">⇄</div>
            <div className="card x12-panel reveal" style={{ '--reveal-d': '0.2s' }}>
              <div className="x12-panel__k">Panel 03 · Wire</div>
              <h3 className="card__title">Live X12 preview</h3>
              <p className="card__desc">Every keystroke re-renders the wire and re-runs validation. Set ISA/GS envelope values inline; watch the issues pill.</p>
            </div>
          </div>

          <p className="x12-note reveal">
            Both the studio preview and <strong>POST /api/translate</strong> execute the
            same pure <strong>@x12/core</strong> engine — the preview is byte-identical to
            production output. No “works in the tool, breaks in prod.”
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="section" id="x12-flow">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">Concept to live traffic</span>
            <h2 className="section__title">The workflow, start to finish</h2>
            <p className="section__lead">Map once, validate, and pin an immutable revision. A broken mapping can never serve traffic.</p>
          </div>

          <div className="x12-flow">
            <Step i={0} n="1" title="New mapping">Pick a transaction set, then load its sample or import your own JSON.</Step>
            <Step i={1} n="2" title="Map fields">Drag source fields onto concept slots, or click ⚡ Auto-match. Arrays map wholesale — target segments repeat per line item.</Step>
            <Step i={2} n="3" title="Validate to a SNIP level">Choose L1 (element syntax) through L7 (partner-pack rules) — balancing, situational, NPI / ICD-10 checks where the spec defines them.</Step>
            <Step i={3} n="4" title="Save">Appends an immutable revision. Nothing rewrites history; callers pin a revision, so edits never silently change production.</Step>
            <Step i={4} n="5" title="Activate">Set a passing revision live — only validated revisions can be activated. The library shows <code>● LIVE vN</code> per mapping.</Step>
            <Step i={5} n="6" title="Call the API"><code>POST /api/mappings/:id/translate</code> with the runtime payload — omit the revision to use the active one. Values and line counts come from each payload; the mapping stays fixed.</Step>
          </div>
        </div>
      </section>

      {/* More features */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">Beyond the core loop</span>
            <h2 className="section__title">More that the studio does</h2>
            <p className="section__lead">
              The map-validate-ship loop is the center of gravity, but the day-to-day work
              of EDI lives in the details — and the studio covers them.
            </p>
          </div>

          <div className="grid grid--3">
            <Feature i={0} k="⚡ Auto-match" title="Alias-driven suggestions">Proposes the obvious source&nbsp;→&nbsp;concept mappings by matching field names against known aliases. You confirm the rest.</Feature>
            <Feature i={1} k="⚙ Conditional logic" title="Segments that depend on data">Emit a segment or value only when a rule holds — situational elements handled without hand-written code.</Feature>
            <Feature i={2} k="Envelope &amp; control" title="ISA / GS set inline">Interchange and group envelope values, control numbers, and delimiters — configured right beside the mapping.</Feature>
            <Feature i={3} k="Revisions" title="Immutable &amp; pinnable">Every Save appends a version; callers pin one. Only revisions that pass validation can go <code>● LIVE</code> — a broken mapping can never serve traffic.</Feature>
            <Feature i={4} k="Batch" title="Many documents, one interchange">Pass an array of documents and get one ST…SE per document in a single ISA/GS — ST02 increments, SE/GE carry the real counts.</Feature>
            <Feature i={5} k="SNIP L1–L7" title="Dial the strictness">From element syntax to partner-pack rules — balancing, situational, and NPI / ICD-10 checks where the spec defines them.</Feature>
          </div>

          <div className="x12-more reveal">
            <span className="x12-more__label">Also in the box</span>
            <div className="x12-chips">
              <span className="x12-chip">Pop-out panels</span>
              <span className="x12-chip">Exports</span>
              <span className="x12-chip">Base64 transport-safe</span>
              <span className="x12-chip">Local-first storage</span>
              <span className="x12-chip">Schema parser</span>
              <span className="x12-chip">Golden-file tests</span>
            </div>
          </div>
        </div>
      </section>

      {/* API */}
      <section className="section">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">The API</span>
            <h2 className="section__title">One endpoint to translate; a small, honest CRUD around it</h2>
            <p className="section__lead">The same engine behind an HTTP call. Immutable revisions in SQLite via <strong>node:sqlite</strong> — no native deps. One process, one origin, serves the built UI too.</p>
          </div>

          <div className="x12-tablewrap reveal">
            <table className="x12-api">
              <thead><tr><th>Route</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td className="route"><span className="verb">POST</span>/api/mappings/:id/translate</td><td className="desc"><strong>The one call.</strong> Returns <code>x12</code>, <code>x12Base64</code>, <code>valid</code>, <code>issues</code>. <strong>data</strong> may be an array — one ST…SE per document in a single interchange. Omit revision for the active one; 422 if the payload fails validation.</td></tr>
                <tr><td className="route"><span className="verb">GET</span>/api/mappings</td><td className="desc">List mappings with latest + active revision.</td></tr>
                <tr><td className="route"><span className="verb">PUT</span>/api/mappings/:id</td><td className="desc">Append a new immutable revision — what Save does.</td></tr>
                <tr><td className="route"><span className="verb">POST</span>/api/mappings/:id/activate</td><td className="desc">Make a revision live. Refused (409) if it fails validation.</td></tr>
                <tr><td className="route"><span className="verb">POST</span>/api/schemas</td><td className="desc">Parse a source JSON document into a schema tree.</td></tr>
                <tr><td className="route"><span className="verb">GET</span>/api/specs · /api/health</td><td className="desc">Installed specs · liveness.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Run / CTA */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__head reveal">
            <span className="section__eyebrow">Run it</span>
            <h2 className="section__title">One container — the engine, a studio, and the API, same origin</h2>
          </div>

          <div className="x12-run reveal">
            <div className="x12-run__cmd">
              <span className="p">$</span> docker build -t x12-platform <span className="a">.</span>{'\n'}
              <span className="p">$</span> docker run -p 3000:3000 -v x12data:/data x12-platform{'\n'}
              <span className="p"># →</span> <span className="a">http://localhost:3000</span>  engine + studio + API
            </div>
            <a href="#contact" className="btn btn--primary">Talk to us about EDI</a>
            <a href="#/x12-license" className="btn btn--ghost">Existing customer? Generate your license →</a>
          </div>
        </div>
      </section>
    </main>
  )
}

function CovGroup({ i, title, sub, codes }) {
  return (
    <div className="card x12-cov__group reveal" style={{ '--reveal-d': `${(i % 2) * 0.08}s` }}>
      <h4 className="x12-cov__title">{title} <span>{sub}</span></h4>
      <div className="x12-chips">
        {codes.map((c) => <span key={c} className="x12-chip">{c}</span>)}
      </div>
    </div>
  )
}

function Step({ i, n, title, children }) {
  return (
    <div className="x12-step reveal" style={{ '--reveal-d': `${i * 0.06}s` }}>
      <div className="x12-step__n">{n}</div>
      <div>
        <h4 className="x12-step__title">{title}</h4>
        <p className="x12-step__desc">{children}</p>
      </div>
    </div>
  )
}

function Feature({ i, k, title, children }) {
  return (
    <div className="card x12-feature reveal" style={{ '--reveal-d': `${(i % 3) * 0.08}s` }}>
      <div className="x12-feature__k">{k}</div>
      <h3 className="card__title">{title}</h3>
      <p className="card__desc">{children}</p>
    </div>
  )
}

function Principle({ i, k, title, children }) {
  return (
    <div className="card x12-principle reveal" style={{ '--reveal-d': `${(i % 2) * 0.08}s` }}>
      <div className="x12-principle__k">{k}</div>
      <h4 className="card__title">{title}</h4>
      <p className="card__desc">{children}</p>
    </div>
  )
}
