const reasons = [
  {
    title: 'Fast, human response',
    desc: 'Real engineers, not phone trees. Most support requests are acknowledged in minutes.',
  },
  {
    title: 'Security-first mindset',
    desc: 'Every solution we deliver is built with security and compliance baked in from day one.',
  },
  {
    title: 'Predictable pricing',
    desc: 'Flat-rate plans and clear scopes — no surprise invoices, ever.',
  },
  {
    title: 'Scales with you',
    desc: 'From your first hire to your next office, our solutions grow alongside your business.',
  },
]

export default function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Why Triple Dynamic</span>
          <h2 className="section__title">Businesses choose us because we deliver</h2>
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
