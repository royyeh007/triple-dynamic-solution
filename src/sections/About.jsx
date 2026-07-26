export default function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container about__inner">
        <div className="about__visual" aria-hidden="true">
          <div className="about__panel">
            <div className="about__panel-glow" />
            <span className="about__panel-label">Placeholder imagery</span>
          </div>
        </div>

        <div className="about__content">
          <span className="section__eyebrow">About us</span>
          <h2 className="section__title">A technology partner, not just a vendor</h2>
          <p>
            Triple Dynamic Solution, LLC was founded on a simple idea: small and mid-sized
            businesses deserve enterprise-grade technology — and enterprise-grade AI —
            without the complexity. We pair deep technical expertise with a genuinely
            people-first approach.
          </p>
          <p>
            Our team works as an extension of yours — learning your operations, putting AI
            and automation to work on the routine, and anticipating problems before they
            happen so technology is an advantage instead of a headache.
          </p>

          <ul className="about__values">
            <li><strong>Reliability</strong> — systems you can count on, around the clock.</li>
            <li><strong>Innovation</strong> — modern AI applied pragmatically, never for hype.</li>
            <li><strong>Transparency</strong> — clear communication and honest pricing.</li>
            <li><strong>Partnership</strong> — your goals drive every recommendation.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
