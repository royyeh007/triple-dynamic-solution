const reasons = [
  {
    title: 'Fast, human response',
    desc: 'Real engineers, not phone trees — with AI triage that routes and resolves the routine instantly, so people focus on what matters.',
  },
  {
    title: 'AI where it counts',
    desc: 'We apply AI where it delivers real ROI — automation, insight, and support — and skip the hype where it doesn’t.',
  },
  {
    title: 'Security-first mindset',
    desc: 'AI-driven threat detection and compliance are baked into every solution we deliver, from day one.',
  },
  {
    title: 'Predictable pricing',
    desc: 'Flat-rate plans and clear scopes — no surprise invoices, ever.',
  },
  {
    title: 'Scales with you',
    desc: 'From your first hire to your next office, our solutions grow alongside your business.',
  },
  {
    title: 'Future-ready',
    desc: 'We keep your stack ready for what’s next, so adopting new AI capabilities is a step — not a rebuild.',
  },
]

export default function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Why Triple Dynamic</span>
          <h2 className="section__title">Businesses choose us because we deliver — intelligently</h2>
        </div>

        <div className="grid grid--2">
          {reasons.map((r, i) => (
            <div key={r.title} className="reason">
              <span className="reason__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="reason__title">{r.title}</h3>
                <p className="reason__desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
