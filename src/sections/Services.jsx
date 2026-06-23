const services = [
  {
    icon: '🛠️',
    title: 'Managed IT Services',
    desc: 'Proactive monitoring, help desk support, and infrastructure management so your team stays productive and your systems stay healthy.',
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions',
    desc: 'Migration, architecture, and optimization across AWS, Azure, and Google Cloud — scalable, resilient, and cost-efficient.',
  },
  {
    icon: '🔒',
    title: 'Cybersecurity',
    desc: 'Threat detection, endpoint protection, compliance, and employee training to keep your data and reputation safe.',
  },
  {
    icon: '💻',
    title: 'Custom Software',
    desc: 'Web and business applications built around your workflows, integrated cleanly with the tools you already use.',
  },
  {
    icon: '🌐',
    title: 'Networking & Infrastructure',
    desc: 'Design and deployment of secure, high-performance networks for offices, remote teams, and hybrid environments.',
  },
  {
    icon: '📈',
    title: 'IT Consulting & Strategy',
    desc: 'Roadmaps, budgeting, and vendor guidance that align your technology investments with real business goals.',
  },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">What we do</span>
          <h2 className="section__title">Solutions built around your business</h2>
          <p className="section__lead">
            One partner for the full technology stack — strategy, build, security, and support.
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
