// Fixed, full-viewport animated aurora backdrop that sits behind all content.
// Pure CSS (transform/opacity only) so it stays smooth and GPU-friendly, and
// respects prefers-reduced-motion via .site-bg styles in index.css.
export default function Background() {
  return (
    <div className="site-bg" aria-hidden="true">
      <span className="site-bg__blob site-bg__blob--1" />
      <span className="site-bg__blob site-bg__blob--2" />
      <span className="site-bg__blob site-bg__blob--3" />
      <div className="site-bg__grid" />
    </div>
  )
}
