import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Background from './components/Background.jsx'
import Hero from './sections/Hero.jsx'
import Services from './sections/Services.jsx'
import Featured from './sections/Featured.jsx'
import About from './sections/About.jsx'
import WhyUs from './sections/WhyUs.jsx'
import Contact from './sections/Contact.jsx'
import X12Studio from './pages/X12Studio.jsx'
import X12License from './pages/X12License.jsx'
import X12Paper from './pages/X12Paper.jsx'

// Minimal dependency-free hash routing. Page routes use a "#/" prefix
// (e.g. #/x12-studio); plain "#section" hashes stay in-page scroll anchors.
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()
  // #/x12-license and #/x12-paper are their own pages; every other #/x12…
  // hash is the studio.
  const isLicense = hash.startsWith('#/x12-license')
  const isPaper = hash.startsWith('#/x12-paper')
  const isStudio = !isLicense && !isPaper && hash.startsWith('#/x12')

  // Reset to top when entering a page route; smooth-scroll to a section anchor
  // when returning to the home page via a "#section" link from another page.
  useEffect(() => {
    if (isStudio || isLicense || isPaper) {
      window.scrollTo(0, 0)
    } else if (hash && !hash.startsWith('#/')) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash, isStudio, isLicense, isPaper])

  return (
    <>
      <Background />
      <Navbar />
      {isLicense ? (
        <X12License />
      ) : isPaper ? (
        <X12Paper />
      ) : isStudio ? (
        <X12Studio />
      ) : (
        <main>
          <Hero />
          <Services />
          <Featured />
          <About />
          <WhyUs />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  )
}
