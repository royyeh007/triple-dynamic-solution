// Placeholder logo — swap this out when the real brand design is ready.
// Renders the mark (three dynamic triangles) plus the wordmark.
export default function Logo({ showText = true }) {
  return (
    <span className="logo">
      <svg
        className="logo__mark"
        viewBox="0 0 64 64"
        width="36"
        height="36"
        role="img"
        aria-label="Triple Dynamic Solutions"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#0b1220" />
        <path d="M32 12 L42 30 L22 30 Z" fill="url(#logoGradient)" />
        <path d="M20 34 L30 52 L10 52 Z" fill="#38bdf8" opacity="0.85" />
        <path d="M44 34 L54 52 L34 52 Z" fill="#6366f1" opacity="0.85" />
      </svg>
      {showText && (
        <span className="logo__text">
          Triple Dynamic<span className="logo__text-accent"> Solutions</span>
        </span>
      )}
    </span>
  )
}
