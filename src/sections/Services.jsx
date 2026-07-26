const services = [
  {
    icon: '🤖',
    title: 'AI & Automation',
    desc: 'Practical AI that pays for itself — custom copilots, assistants grounded in your own data, and workflow automation that clears the busywork.',
  },
  {
    icon: '🛠️',
    title: 'Managed IT Services',
    desc: 'AI-assisted monitoring that predicts failures before they happen, plus responsive human help desk and network management that keep your team productive.',
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions',
    desc: 'Migration, architecture, and AI-driven cost optimization across AWS, Azure, and Google Cloud — scalable, resilient, and efficient.',
  },
  {
    icon: '🔒',
    title: 'Cybersecurity',
    desc: 'AI-powered threat detection and behavioral analytics, endpoint protection, compliance, and training to keep your data and reputation safe.',
  },
  {
    icon: '💻',
    title: 'Custom Software',
    desc: 'Web and business applications built around your workflows — with AI features like chat assistants, document automation, and predictive insight built in.',
  },
  {
    icon: '📈',
    title: 'IT Consulting & AI Strategy',
    desc: 'Roadmaps, budgeting, and AI-adoption guidance that align your technology investments — and where AI fits — with real business goals.',
  },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">What we do</span>
          <h2 className="section__title">AI-powered solutions built around your business</h2>
          <p className="section__lead">
            One partner for the full technology stack — strategy, build, security, and support,
            with AI applied where it moves the needle.
          </p>
        </div>

        <div className="grid grid--3">
          {services.map((s) => (
            <article key={s.title} className="card">
              <div className="card__icon" aria-hidden="true">{s.icon}</div>
              <h3 className="card__title">{s.title}</h3>
              <p className="card__desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
