import { useEffect, useState } from 'react'

// Auto-playing recreation of the studio's core loop for a real 005010X279A1
// 270 eligibility inquiry: map each source field onto a business concept and
// watch the X12 wire build + validate to SNIP L2. Field names, segments, and
// values mirror packages/core/src/specs/t270.ts in the real product.

const VALUES = {
  payerName: 'United Healthcare',
  payerId: '87726',
  orgName: 'Benefit Clinic',
  npi: '1234567893',
  lastName: 'Doe',
  firstName: 'Jane',
  memberId: 'W123456789',
  dob: '1985-03-15',
  gender: 'F',
  serviceType: '30',
}

// Order fields are mapped in — one concept per step, as a drag would produce.
const ORDER = [
  'payerName', 'payerId', 'orgName', 'npi',
  'lastName', 'firstName', 'memberId', 'dob', 'gender', 'serviceType',
]
const TOTAL = ORDER.length
const REQUIRED = ['payerName', 'payerId', 'orgName', 'npi', 'lastName', 'firstName', 'memberId', 'serviceType']

// Left panel: the source JSON, leaf rows tagged with the concept they feed.
const SOURCE_ROWS = [
  { txt: '{' },
  { key: '  "payer": {' },
  { key: '    "name":', val: '"United Healthcare",', id: 'payerName' },
  { key: '    "id":', val: '"87726"', id: 'payerId' },
  { key: '  },' },
  { key: '  "provider": {' },
  { key: '    "name":', val: '"Benefit Clinic",', id: 'orgName' },
  { key: '    "npi":', val: '"1234567893"', id: 'npi' },
  { key: '  },' },
  { key: '  "subscriber": {' },
  { key: '    "lastName":', val: '"Doe",', id: 'lastName' },
  { key: '    "firstName":', val: '"Jane",', id: 'firstName' },
  { key: '    "memberId":', val: '"W123456789",', id: 'memberId' },
  { key: '    "dob":', val: '"1985-03-15",', id: 'dob' },
  { key: '    "gender":', val: '"F"', id: 'gender' },
  { key: '  },' },
  { key: '  "serviceType":', val: '"30"', id: 'serviceType' },
  { txt: '}' },
]

// Middle panel: concept slots, grouped by loop as in the studio.
const CONCEPT_GROUPS = [
  { g: 'Information source · 2100A', items: [
    { id: 'payerName', label: 'Payer name', seg: 'NM1·PR', el: '03' },
    { id: 'payerId', label: 'Payer ID', seg: 'NM1·PR', el: '09' },
  ] },
  { g: 'Information receiver · 2100B', items: [
    { id: 'orgName', label: 'Organization name', seg: 'NM1·1P', el: '03' },
    { id: 'npi', label: 'NPI', seg: 'NM1·1P', el: '09' },
  ] },
  { g: 'Subscriber · 2100C', items: [
    { id: 'lastName', label: 'Last name', seg: 'NM1·IL', el: '03' },
    { id: 'firstName', label: 'First name', seg: 'NM1·IL', el: '04' },
    { id: 'memberId', label: 'Member ID', seg: 'NM1·IL', el: '09' },
    { id: 'dob', label: 'Date of birth', seg: 'DMG', el: '02' },
    { id: 'gender', label: 'Gender', seg: 'DMG', el: '03' },
  ] },
  { g: 'Eligibility inquiry · 2110C', items: [
    { id: 'serviceType', label: 'Service type code', seg: 'EQ', el: '01' },
  ] },
]

const up = (s) => s.toUpperCase()

// Right panel: the wire. Structural segments come from the envelope/HL frame;
// mapped segments appear once every concept feeding them is mapped.
const WIRE = [
  { tag: 'ST', rest: '*270*0001*005010X279A1', structural: true },
  { tag: 'BHT', rest: '*0022*13*10001234*20260724*1830', structural: true },
  { tag: 'HL', rest: '*1**20*1', structural: true },
  { tag: 'NM1', needs: ['payerName', 'payerId'], build: (v) => `*PR*2*${up(v.payerName)}*****PI*${v.payerId}` },
  { tag: 'HL', rest: '*2*1*21*1', structural: true },
  { tag: 'NM1', needs: ['orgName', 'npi'], build: (v) => `*1P*2*${up(v.orgName)}*****XX*${v.npi}` },
  { tag: 'HL', rest: '*3*2*22*0', structural: true },
  { tag: 'NM1', needs: ['lastName', 'firstName', 'memberId'], build: (v) => `*IL*1*${up(v.lastName)}*${up(v.firstName)}****MI*${v.memberId}` },
  { tag: 'DMG', needs: ['dob', 'gender'], build: (v) => `*D8*${v.dob.replace(/-/g, '')}*${v.gender}` },
  { tag: 'EQ', needs: ['serviceType'], build: (v) => `*${v.serviceType}` },
  { tag: 'SE', rest: '*11*0001', footer: true },
]

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function StudioDemo() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduced()) { setStep(TOTAL); return }
    let t
    if (step < TOTAL) {
      t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 650 : 720)
    } else {
      t = setTimeout(() => setStep(0), 2800) // hold on the finished mapping, then loop
    }
    return () => clearTimeout(t)
  }, [step])

  const mapped = new Set(ORDER.slice(0, step))
  const activeId = step > 0 && step <= TOTAL ? ORDER[step - 1] : null
  const issues = REQUIRED.filter((id) => !mapped.has(id)).length
  const done = step >= TOTAL

  const rowClass = (id) =>
    id === activeId ? 'demo-src__row is-active' : mapped.has(id) ? 'demo-src__row is-done' : 'demo-src__row'

  const visibleWire = WIRE.filter((seg) => {
    if (seg.structural) return true
    if (seg.footer) return done
    return seg.needs.every((id) => mapped.has(id))
  })

  return (
    <div className="demo reveal" role="img" aria-label="Animated demo: mapping a 270 eligibility inquiry to X12 and validating to SNIP L2">
      <div className="demo__bar">
        <span className="demo__live">● live demo</span>
        <span className="demo__file">270_eligibility.json → 005010X279A1</span>
        <span className={`demo__snip ${done ? 'is-pass' : ''}`}>
          {done ? '✓ passes SNIP L2' : `${issues} issue${issues === 1 ? '' : 's'} · SNIP L2`}
        </span>
      </div>

      <div className="demo__panes">
        {/* Source */}
        <div className="demo__pane demo__pane--code">
          <div className="demo__ptitle">Source · JSON</div>
          <pre className="demo-src">
            {SOURCE_ROWS.map((r, i) =>
              r.id ? (
                <span key={i} className={rowClass(r.id)}>
                  <span className="k">{r.key}</span> <span className="v">{r.val}</span>
                  <span className="tick">✓</span>
                </span>
              ) : (
                <span key={i} className="demo-src__row demo-src__row--plain">{r.txt ?? r.key}</span>
              )
            )}
          </pre>
        </div>

        {/* Concepts */}
        <div className="demo__pane demo__pane--concepts">
          <div className="demo__ptitle">Concepts</div>
          <div className="demo-con">
            {CONCEPT_GROUPS.map((grp) => (
              <div className="demo-con__group" key={grp.g}>
                <div className="demo-con__glabel">{grp.g}</div>
                {grp.items.map((c) => {
                  const isMapped = mapped.has(c.id)
                  const isActive = c.id === activeId
                  return (
                    <div key={c.id} className={`demo-con__slot ${isMapped ? 'is-mapped' : ''} ${isActive ? 'is-active' : ''}`}>
                      <span className="demo-con__label">{c.label}</span>
                      <span className="demo-con__seg">{c.seg}·{c.el}</span>
                      <span className="demo-con__val">{isMapped ? VALUES[c.id] : 'unmapped'}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Wire */}
        <div className="demo__pane demo__pane--code demo__pane--wire">
          <div className="demo__ptitle">Live X12 wire</div>
          <pre className="demo-wire">
            {visibleWire.map((seg, i) => (
              <span key={`${seg.tag}-${i}`} className={`demo-wire__ln ${seg.structural ? 'is-struct' : ''}`}>
                <span className="tag">{seg.tag}</span>
                {seg.structural || seg.footer ? seg.rest : seg.build(VALUES)}
                <span className="term">~</span>
              </span>
            ))}
            {!done && <span className="demo-wire__cursor">▋</span>}
          </pre>
        </div>
      </div>
    </div>
  )
}
