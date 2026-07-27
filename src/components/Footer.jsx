import Logo from './Logo.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo />
          <p className="footer__tagline">
            AI-powered IT services, cloud, and cybersecurity for growing businesses.
          </p>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#why">Why Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <a href="#services">AI &amp; Automation</a>
          <a href="#services">Managed IT</a>
          <a href="#services">Cloud Solutions</a>
          <a href="#services">Cybersecurity</a>
          <a href="#services">Custom Software</a>
        </div>

        <div className="footer__col">
          <h4>Get in touch</h4>
          <a href="mailto:hello@tdsolve.com">hello@tdsolve.com</a>
          <span className="footer__muted">Mon–Fri, 9am–6pm</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} Triple Dynamic Solution, LLC. All rights reserved.</span>
        <span className="footer__muted">tdsolve.com</span>
      </div>
    </footer>
  )
}
