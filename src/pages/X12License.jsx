import { useState } from 'react'

// Self-service license portal (#/x12-license): an existing customer enters
// the COMPANY CODE from their onboarding email and the INSTANCE ID from
// their container's Licensing screen; the signing happens server-side in
// the vendor's issuing service — no key material ever reaches this page.
const ISSUE_URL = 'https://ykzolgkulvrhhncouylk.supabase.co/functions/v1/self-license'

export default function X12License() {
  const [companyCode, setCompanyCode] = useState('')
  const [instanceId, setInstanceId] = useState('')
  const [environment, setEnvironment] = useState('production')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [errorInstances, setErrorInstances] = useState(null)
  const [issued, setIssued] = useState(null)

  const ready = companyCode.trim() !== '' && instanceId.trim() !== ''

  const generate = async () => {
    setBusy(true)
    setError(null)
    setErrorInstances(null)
    setIssued(null)
    try {
      const r = await fetch(ISSUE_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ companyCode: companyCode.trim(), instanceId: instanceId.trim(), environment }),
      })
      const body = await r.json().catch(() => ({}))
      if (!r.ok) {
        setError(body.error || 'The issuing service is unavailable — try again shortly')
        // A cap refusal names the instances holding the slots, so "that's
        // our old QA box, please free it" is a one-line email.
        if (Array.isArray(body.instances)) setErrorInstances(body.instances)
        return
      }
      setIssued(body)
      // Hand the file over immediately — it's also re-downloadable by
      // repeating the same request (renewals are always allowed for an
      // instance that already holds a license).
      const blob = new Blob([JSON.stringify(body.file, null, 2) + '\n'], { type: 'application/json' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${body.file.licenseId}.x12license`
      a.click()
      URL.revokeObjectURL(a.href)
    } catch {
      setError('Could not reach the issuing service — check your connection and try again')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="x12 x12lic">
      <style>{`
        .x12lic { max-width: 640px; margin: 0 auto; padding: 140px 20px 80px; }
        .x12lic h1 { font-size: 2rem; margin: 0 0 8px; }
        .x12lic .lead { color: var(--muted); line-height: 1.65; }
        .x12lic .card { background: var(--surface, rgba(255,255,255,.04)); border: 1px solid var(--line, rgba(255,255,255,.12)); border-radius: 14px; padding: 22px; margin-top: 22px; }
        .x12lic label { display: block; font-size: .85rem; font-weight: 600; margin: 14px 0 5px; }
        .x12lic input[type=text] { width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--line, rgba(255,255,255,.18)); background: transparent; color: inherit; font-family: var(--mono); font-size: .95rem; }
        .x12lic .env { display: flex; gap: 18px; margin-top: 6px; }
        .x12lic .env label { display: flex; gap: 7px; align-items: center; font-weight: 500; margin: 0; cursor: pointer; }
        .x12lic .hint { color: var(--muted); font-size: .82rem; line-height: 1.55; margin-top: 5px; }
        .x12lic .err { color: #ff8a7a; background: rgba(255,90,60,.08); border: 1px solid rgba(255,90,60,.3); border-radius: 8px; padding: 10px 13px; margin-top: 14px; line-height: 1.5; }
        .x12lic .ok { border-color: rgba(80,220,150,.4); }
        .x12lic .btn--primary[disabled] { opacity: .5; cursor: default; }
        .x12lic ol { line-height: 1.7; }
        .x12lic code { font-family: var(--mono); font-size: .88em; }
      `}</style>

      <h1>Generate your X12 Studio license</h1>
      <p className="lead">
        For existing customers. You need two things: the <b>company code</b> from your onboarding
        email, and the <b>Instance ID</b> shown on your container's <b>Licensing</b> screen (it has
        a Copy button). The license is issued bound to that instance and recorded with your account.
      </p>

      <div className="card">
        <label htmlFor="lic-code">Company code</label>
        <input id="lic-code" type="text" placeholder="TDS-1A2B3C4D" value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)} autoComplete="off" />

        <label htmlFor="lic-instance">Instance ID</label>
        <input id="lic-instance" type="text" placeholder="1d78b0ce-4252-48c9-b19c-eb91acf3a427"
          value={instanceId} onChange={(e) => setInstanceId(e.target.value)} autoComplete="off" />
        <div className="hint">
          In the studio: <b>Licensing → Instance ID → Copy</b>. Each deployment has its own — issue
          one license per deployment.
        </div>

        <label>Environment</label>
        <div className="env">
          <label>
            <input type="radio" name="env" checked={environment === 'production'}
              onChange={() => setEnvironment('production')} />
            Production
          </label>
          <label>
            <input type="radio" name="env" checked={environment === 'non-production'}
              onChange={() => setEnvironment('non-production')} />
            Non-production (staging / dev)
          </label>
        </div>
        {error && (
          <div className="err">
            {error}
            {errorInstances && (
              <div style={{ marginTop: 8, fontSize: '.82rem' }}>
                Instances currently using your slots:
                <ul style={{ margin: '5px 0 0', paddingLeft: 18 }}>
                  {errorInstances.map((id) => (
                    <li key={id}><code>{id}</code></li>
                  ))}
                </ul>
                If one of these is a retired deployment, tell us which — we'll free the slot.
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          <button className="btn btn--primary" disabled={!ready || busy} onClick={generate}>
            {busy ? 'Generating…' : 'Generate & download license'}
          </button>
        </div>
      </div>

      {issued && (
        <div className="card ok">
          <b>License issued to {issued.licensee}</b> — expires {issued.expiresAt}
          {issued.environment === 'non-production' ? ' · non-production' : ''}. The file downloaded
          as <code>{issued.file.licenseId}.x12license</code>.
          <ol>
            <li>Open your container's <b>Licensing</b> screen.</li>
            <li><b>Upload…</b> the file (or paste its contents) → <b>Install license</b>.</li>
            <li>It takes effect immediately — no restart.</li>
          </ol>
          {issued.slots && (
            <div className="hint" style={{ marginTop: 10 }}>
              <b>
                {issued.slots.remaining} of {issued.slots.cap}
              </b>{' '}
              {issued.environment === 'non-production' ? 'non-production' : 'production'} instance
              slot{issued.slots.cap === 1 ? '' : 's'} left on your account
              {issued.slots.remaining === 0 ? ' — contact us if you need more' : ''}.
            </div>
          )}
          <div className="hint">
            Wrong file or lost it? Run this form again with the same Instance ID — re-issuing for an
            instance you already licensed is always allowed.
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 26 }}>
        Don't have a company code, hit an instance limit, or need to renew your term?{' '}
        <a href="#contact">Contact us</a> — codes are issued when your account is set up.
      </p>
    </main>
  )
}
