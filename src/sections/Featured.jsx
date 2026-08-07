// Homepage teaser for the X12 Mapping Studio platform page (#/x12-studio).
export default function Featured() {
  return (
    <section className="section" id="platform">
      <div className="container">
        <a className="featured" href="#/x12-studio" aria-label="Explore X12 Mapping Studio">
          <div className="featured__glow" aria-hidden="true" />

          <div className="featured__body">
            <span className="section__eyebrow">Our EDI engine</span>
            <h2 className="featured__title">X12 Translation Engine</h2>
            <p className="featured__lead">
              A pure, self-hosted X12 engine: 33 transaction sets as data, SNIP compliance
              built in, and byte-identical output every time. A visual studio and one-call
              API come along to drive it — all in a single container, zero external requests.
            </p>
            <div className="featured__stats">
              <div><strong>33</strong><span>transaction sets</span></div>
              <div><strong>L1–L7</strong><span>SNIP validation</span></div>
              <div><strong>0</strong><span>external requests</span></div>
            </div>
            <span className="btn btn--primary featured__cta">Explore the X12 engine →</span>
          </div>

          <div className="featured__wire" aria-hidden="true">
            <div className="featured__wire-bar">
              <span /><span /><span />
              <em>wire preview · 270</em>
            </div>
            <pre>
<span className="tag">ST</span>*270*0001*005010X279A1<span className="term">~</span>{'\n'}
<span className="tag">HL</span>*1**20*1<span className="term">~</span>{'\n'}
<span className="tag">NM1</span>*PR*2*UNITED HEALTHCARE<span className="term">~</span>{'\n'}
<span className="tag">TRN</span>*1*93175-012547*9877<span className="term">~</span>{'\n'}
<span className="tag">EQ</span>*30<span className="term">~</span>
            </pre>
          </div>
        </a>
      </div>
    </section>
  )
}
