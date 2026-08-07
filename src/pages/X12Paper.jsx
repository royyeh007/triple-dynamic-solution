// Technical brief (#/x12-paper): a mini white paper on @x12/core for a
// technologist audience — why the engine is built the way it is and how that
// differs from cloud EDI APIs, legacy translators, and hand-rolled parsers.
// Prose-first document layout; deliberately no scroll animations.

function Aside({ title, children }) {
  return (
    <aside className="paper__aside">
      <span className="paper__aside-k">{title}</span>
      {children}
    </aside>
  )
}

export default function X12Paper() {
  return (
    <main className="x12 paper">
      <style>{`
        .paper { max-width: 760px; margin: 0 auto; padding: 140px 22px 90px; }
        .paper .back { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: .85rem; margin-bottom: 26px; transition: color .15s ease; }
        .paper .back:hover { color: var(--accent); }
        .paper__kicker { font-family: var(--mono); font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); }
        .paper h1 { font-size: clamp(1.9rem, 4.5vw, 2.7rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.12; margin: 12px 0 14px; }
        .paper__sub { color: var(--muted); font-size: 1.06rem; line-height: 1.7; }
        .paper__meta { display: flex; flex-wrap: wrap; gap: 8px 18px; font-family: var(--mono); font-size: .74rem; color: var(--muted); margin: 22px 0 0; padding-top: 16px; border-top: 1px solid var(--border); }
        .paper__abstract { margin: 40px 0 0; border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 0 12px 12px 0; background: rgba(56, 189, 248, .05); padding: 20px 24px; }
        .paper__abstract h2 { font-family: var(--mono); font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin: 0 0 10px; }
        .paper__abstract p { color: var(--text); font-size: .98rem; line-height: 1.75; }
        .paper section { margin-top: 54px; }
        .paper h2.paper__h { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.25; margin: 0 0 6px; }
        .paper h2.paper__h .n { color: var(--accent); font-family: var(--mono); font-size: .95rem; font-weight: 600; margin-right: 10px; }
        .paper h3 { font-size: 1.05rem; font-weight: 700; margin: 26px 0 6px; }
        .paper p { color: var(--muted); line-height: 1.8; margin-top: 14px; }
        .paper p strong, .paper li strong { color: var(--text); font-weight: 600; }
        .paper ul { margin: 14px 0 0 2px; padding-left: 20px; }
        .paper li { color: var(--muted); line-height: 1.8; margin-top: 8px; }
        .paper code { font-family: var(--mono); font-size: .86em; background: rgba(148, 163, 184, .12); border: 1px solid var(--border); border-radius: 5px; padding: 1px 6px; color: var(--text); }
        .paper__sig { display: block; margin: 22px 0 0; border: 1px solid var(--border); border-radius: 12px; background: rgba(15, 23, 41, .75); padding: 18px 20px; font-family: var(--mono); font-size: .82rem; line-height: 1.75; color: var(--text); overflow-x: auto; }
        .paper__sig .c { color: var(--muted); }
        .paper__sig .a { color: var(--accent); }
        .paper__aside { margin: 24px 0 0; border-left: 2px solid var(--border); padding: 4px 0 4px 18px; }
        .paper__aside-k { display: block; font-family: var(--mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
        .paper__aside p { margin-top: 0; font-size: .92rem; }
        .paper__fig { margin: 26px 0 0; border: 1px solid var(--border); border-radius: 12px; background: rgba(15, 23, 41, .75); padding: 22px; }
        .paper__fig-row { display: flex; align-items: stretch; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .paper__fig-box { flex: 1 1 150px; max-width: 220px; border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; text-align: center; }
        .paper__fig-box b { display: block; font-size: .88rem; color: var(--text); }
        .paper__fig-box span { font-family: var(--mono); font-size: .7rem; color: var(--muted); }
        .paper__fig-box--core { border-color: var(--accent); background: rgba(56, 189, 248, .07); }
        .paper__fig-arrow { align-self: center; color: var(--muted); font-family: var(--mono); }
        .paper__fig-cap { text-align: center; font-size: .82rem; color: var(--muted); margin-top: 14px; }
        .paper__tablewrap { margin-top: 26px; overflow-x: auto; border: 1px solid var(--border); border-radius: 12px; }
        .paper__cmp { width: 100%; border-collapse: collapse; min-width: 720px; font-size: .88rem; }
        .paper__cmp th, .paper__cmp td { text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--border); vertical-align: top; line-height: 1.6; }
        .paper__cmp thead th { font-family: var(--mono); font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); background: rgba(15, 23, 41, .8); }
        .paper__cmp tbody tr:last-child td { border-bottom: 0; }
        .paper__cmp td:first-child { color: var(--text); font-weight: 600; white-space: nowrap; }
        .paper__cmp td { color: var(--muted); }
        .paper__cmp td.us { color: var(--text); background: rgba(56, 189, 248, .05); }
        .paper__cta { margin-top: 60px; border: 1px solid var(--border); border-radius: var(--radius); background: rgba(15, 23, 41, .75); padding: 30px 28px; text-align: center; }
        .paper__cta h2 { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }
        .paper__cta p { margin: 0 auto 20px; max-width: 460px; }
        .paper__cta .row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      `}</style>

      <a className="back" href="#/x12-studio">← Back to the X12 Engine</a>

      <header>
        <span className="paper__kicker">Technical brief · @x12/core</span>
        <h1>Why the engine is the product</h1>
        <p className="paper__sub">
          Four design decisions behind <strong>@x12/core</strong>, our self-hosted X12 translation
          engine — and why they matter more to an EDI program than any feature list.
        </p>
        <div className="paper__meta">
          <span>Triple Dynamic Solutions</span>
          <span>2026</span>
          <span>~8 min read</span>
          <span>Audience: engineers &amp; architects</span>
        </div>
      </header>

      <div className="paper__abstract">
        <h2>Abstract</h2>
        <p>
          Most EDI incidents are not parsing failures — they are drift failures. The mapping that
          passed in the test tool emits different bytes in production; the validator disagrees with
          the translator; an edit silently changes what a live endpoint returns. @x12/core is built
          to make drift impossible by construction: the engine is a pure function, the X12
          specification is typed data rather than code, SNIP validation runs inside the engine
          rather than beside it, and every mapping is an immutable revision that must pass
          validation before it can serve traffic. This brief walks through each decision and its
          consequences, then compares the result with the three common alternatives.
        </p>
      </div>

      <section>
        <h2 className="paper__h"><span className="n">01</span>Where EDI tooling goes wrong</h2>
        <p>
          Thirty years in, teams that need to speak X12 still choose between three shapes of
          tooling, each with a structural weakness:
        </p>
        <ul>
          <li>
            <strong>Cloud translation APIs and clearinghouses.</strong> Convenient, but your
            documents — in healthcare, PHI — leave your network on every call, and the translator
            is a black box: you cannot run it in CI, diff its output offline, or audit exactly what
            it will emit before it emits it.
          </li>
          <li>
            <strong>Legacy on-prem translators.</strong> Mappings live in a proprietary designer
            and compile into an opaque runtime. The design-time preview and the production path are
            different code, so "works in the tool, breaks on the wire" is a routine failure mode —
            and every new transaction set is a consulting engagement.
          </li>
          <li>
            <strong>Hand-rolled parsers and open-source libraries.</strong> Parsing segments is the
            easy 10%. The hard 90% is the specification itself — loops, situational rules, code
            sets, balancing — which ends up re-implemented as scattered application code, with
            validation coverage that stops at "it parsed."
          </li>
        </ul>
        <p>
          The common thread: in all three, <strong>the thing that validates, the thing that
          translates, and the thing you tested are not the same thing.</strong> That gap is where
          EDI programs bleed time. @x12/core closes it by making one engine the single source of
          truth — everything else in the product exists to drive it.
        </p>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">02</span>Decision 1 — the engine is a pure function</h2>
        <p>
          @x12/core contains no I/O. It never touches the network or the filesystem, reads no
          clock, and draws no randomness — everything that varies, including envelope values and
          control numbers, enters as explicit input. Conceptually, translation is one function:
        </p>
        <code className="paper__sig">
          translate(<span className="a">spec</span>, <span className="a">mapping</span>, <span className="a">payload</span>) <span className="c">→</span> {'{'} x12, valid, issues {'}'}<br />
          <span className="c">// same inputs → byte-identical output. always.</span>
        </code>
        <p>
          Purity sounds academic; its consequences are anything but:
        </p>
        <ul>
          <li>
            <strong>The preview is the product.</strong> The mapping studio and{' '}
            <code>POST /api/translate</code> execute the same engine, so the wire an analyst sees
            while mapping is byte-identical to what production ships. There is no second
            implementation to drift.
          </li>
          <li>
            <strong>It is trivially testable.</strong> Deterministic output makes golden-file
            testing honest: every installed spec is verified byte-for-byte through the full
            pipeline, and you can diff engine output in your own CI the same way.
          </li>
          <li>
            <strong>It runs air-gapped.</strong> A function that performs no I/O has nothing to
            phone home to. Zero external requests at runtime is not a policy — it is a property.
          </li>
        </ul>
        <div className="paper__fig" role="img" aria-label="The studio preview and the translate API both call the same @x12/core engine, producing identical bytes">
          <div className="paper__fig-row">
            <div className="paper__fig-box"><b>Studio preview</b><span>analyst mapping</span></div>
            <div className="paper__fig-arrow">→</div>
            <div className="paper__fig-box paper__fig-box--core"><b>@x12/core</b><span>pure · no I/O</span></div>
            <div className="paper__fig-arrow">→</div>
            <div className="paper__fig-box"><b>The wire</b><span>identical bytes</span></div>
          </div>
          <div className="paper__fig-row" style={{ marginTop: 12 }}>
            <div className="paper__fig-box"><b>POST /api/translate</b><span>production traffic</span></div>
            <div className="paper__fig-arrow">↗</div>
          </div>
          <p className="paper__fig-cap">One engine, two drivers. What you validate is exactly what ships.</p>
        </div>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">03</span>Decision 2 — the specification is data, not code</h2>
        <p>
          Everything the engine knows about X12 — segment and element rules, code sets,
          documentation, wire templates — lives as typed data, not as branching logic. The engine
          is a small, stable interpreter of that data; the 33 installed transaction sets, from
          270/271 eligibility through 837 claims to 850 purchase orders and 820 remittance, are
          data files it walks.
        </p>
        <p>
          This inverts the economics of coverage. In a conventional translator, each transaction
          set is code, so each addition risks the ones that already work. Here,{' '}
          <strong>adding a transaction set is a data file, not a code change</strong> — and every
          spec ships with golden-file tests comparing the full pipeline byte-for-byte, so coverage
          grows without destabilizing the core. It is also why the studio can render
          documentation, sample payloads, and live validation for every set uniformly: they are
          all views of the same data.
        </p>
        <Aside title="Why it matters to you">
          <p>
            When a partner asks for a transaction set you don't run yet, the answer is a data file
            with tests — not a project, not a version migration, not a consultant.
          </p>
        </Aside>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">04</span>Decision 3 — validation lives inside the engine</h2>
        <p>
          SNIP validation levels L1 through L7 — element syntax, structural rules, balancing,
          situational requirements, code-set membership, and partner-pack rules including NPI and
          ICD-10 checks where the spec defines them — are enforced by the engine itself, not by a
          separate validator product. The validator can never disagree with the translator, because
          they are the same code walking the same spec data.
        </p>
        <p>
          Because validation is intrinsic, it gates every stage with the same rules:
        </p>
        <ul>
          <li><strong>Design time</strong> — the studio re-validates on every keystroke as the wire preview builds.</li>
          <li><strong>Activation time</strong> — a revision that fails its chosen SNIP level is refused activation (<code>409</code>). A broken mapping can never serve traffic.</li>
          <li><strong>Runtime</strong> — a payload that fails validation is refused (<code>422</code>) with structured issues, before a malformed interchange ever reaches a partner.</li>
        </ul>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">05</span>Decision 4 — history is immutable</h2>
        <p>
          Saving a mapping never edits it — it appends a new revision. Callers pin the revision
          they were certified against, or omit it to follow the explicitly activated one. Only
          revisions that pass validation can be activated, and nothing rewrites history, so an
          edit can never silently change what a production endpoint emits. Rollback is re-pinning,
          and reproducing last month's bytes is running last month's revision — same engine, same
          inputs, same output.
        </p>
        <p>
          Combined with determinism, this gives an EDI program something it rarely has:{' '}
          <strong>a complete, replayable audit trail</strong>. Any interchange you ever produced
          can be regenerated exactly, from the revision that produced it.
        </p>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">06</span>The deployment model follows from the architecture</h2>
        <p>
          Because the engine is pure and the spec is data, the whole platform collapses into one
          container: engine, mapping studio, and API in a single process on a single origin, with
          immutable revisions stored in SQLite via <code>node:sqlite</code> — no native
          dependencies, no external database. It makes zero external requests at runtime; fonts
          are bundled and there are no CDNs and no analytics. Your documents, and in healthcare
          your PHI, never leave your network — the software runs where the data already is,
          including fully air-gapped environments.
        </p>
        <p>
          For a security review, the surface to reason about is one process you host, whose engine
          provably performs no I/O. That is a materially shorter conversation than a cloud data
          processing agreement.
        </p>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">07</span>Side by side</h2>
        <div className="paper__tablewrap">
          <table className="paper__cmp">
            <thead>
              <tr>
                <th></th>
                <th>Cloud EDI APIs</th>
                <th>Legacy translators</th>
                <th>DIY libraries</th>
                <th>@x12/core</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Where your data goes</td>
                <td>Vendor's cloud, every call</td>
                <td>Stays on-prem</td>
                <td>Stays in-house</td>
                <td className="us">Your network only — zero external requests</td>
              </tr>
              <tr>
                <td>Preview vs production</td>
                <td>Black box — test against live service</td>
                <td>Separate designer &amp; runtime; drift is routine</td>
                <td>Whatever you build</td>
                <td className="us">Same pure engine — byte-identical</td>
              </tr>
              <tr>
                <td>Spec knowledge</td>
                <td>Vendor-maintained, opaque</td>
                <td>Compiled into maps per project</td>
                <td>Re-implemented as app code</td>
                <td className="us">Typed data, 33 sets, golden-file tested</td>
              </tr>
              <tr>
                <td>Validation</td>
                <td>Varies; often a separate step</td>
                <td>Separate validator product</td>
                <td>Usually stops at "it parsed"</td>
                <td className="us">SNIP L1–L7 inside the engine, gating every stage</td>
              </tr>
              <tr>
                <td>Change safety</td>
                <td>Vendor release cycle</td>
                <td>Edits go live on deploy</td>
                <td>Code review, hopefully</td>
                <td className="us">Immutable pinned revisions; only validated revisions activate</td>
              </tr>
              <tr>
                <td>Runs in CI / air-gapped</td>
                <td>No</td>
                <td>Rarely — heavyweight installs</td>
                <td>Yes, minus the spec</td>
                <td className="us">Yes — one container, deterministic output</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="paper__h"><span className="n">08</span>What this buys you in practice</h2>
        <ul>
          <li><strong>Certification without ceremony.</strong> Partner testing runs against the same bytes production will send — diff engine output in CI like any other artifact.</li>
          <li><strong>Compliance posture by construction.</strong> Self-hosted, air-gapped, no third-party data processor in the path of PHI.</li>
          <li><strong>Incidents that end in minutes.</strong> Pinned revisions plus determinism mean any historical output is exactly reproducible — no "what was the mapping doing that day?"</li>
          <li><strong>A team that scales.</strong> Analysts map by business concept in the studio; engineers integrate one <code>POST /api/translate</code> call. Neither hand-writes X12.</li>
        </ul>
        <p>
          None of these are features bolted onto the product. Each one falls out of the four
          decisions above — which is the point. Features can be copied; properties have to be
          designed in from the start. The engine is the product.
        </p>
      </section>

      <div className="paper__cta">
        <h2>Read enough theory?</h2>
        <p>
          See the engine drive a real 270 eligibility mapping on the product page, or talk to us
          about your interchange volumes and transaction sets.
        </p>
        <div className="row">
          <a href="#contact" className="btn btn--primary">Request a demo</a>
          <a href="#/x12-studio" className="btn btn--ghost">Back to the X12 Engine</a>
        </div>
      </div>
    </main>
  )
}
