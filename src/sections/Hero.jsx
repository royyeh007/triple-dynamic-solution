export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Triple Dynamic Solution, LLC</span>
          <h1 className="hero__title">
            Technology that moves your business <span className="accent">forward</span>.
          </h1>
          <p className="hero__subtitle">
            We design, secure, and manage the IT that growing companies rely on — from
            cloud infrastructure to cybersecurity and custom software, delivered with a
            personal touch.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">Get a Free Consultation</a>
            <a href="#services" className="btn btn--ghost">Explore Services</a>
          </div>

          <div className="hero__stats">
            <div>
              <strong>24/7</strong>
              <span>Monitoring &amp; support</span>
            </div>
            <div>
              <strong>99.9%</strong>
              <span>Uptime commitment</span>
            </div>
            <div>
              <strong>15+ yrs</strong>
              <span>Industry experience</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card hero__card--1">
            <span className="dot dot--green" /> Systems operational
          </div>
          <div className="hero__card hero__card--2">
            <span className="dot dot--blue" /> Backup complete
          </div>
          <div className="hero__orb" />
        </div>
      </div>
    </section>
  )
}
