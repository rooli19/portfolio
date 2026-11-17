import { useEffect, useRef, useState } from 'react'
import { mediaPath } from '../sitePath'
import { journey } from '../content/transpogapo'

export function Plane() {
  return <svg viewBox="0 0 100 80" fill="none" aria-hidden="true"><path d="M5 33 94 5 64 73 45 49 27 61 29 42Z" fill="#fffdf3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="m5 33 40 16L94 5 29 42l-2 19 18-12 19 24L55 40 94 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="m29 42 65-37-49 44-18 12Z" fill="#e1ddc9" stroke="currentColor" strokeWidth="1.5"/></svg>
}

export function Photo({ file, alt, caption, className = '' }) {
  const [open, setOpen] = useState(false)
  const [failed, setFailed] = useState(false)
  const dialog = useRef(null)
  const trigger = useRef(null)
  const src = mediaPath('/photos/' + file)
  useEffect(() => {
    if (!open) return
    dialog.current.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous; trigger.current?.focus({ preventScroll: true }) }
  }, [open])
  return <figure className={'tg-photo ' + className}>
    {failed ? <div className="tg-image-missing">Image unavailable. {alt}</div> : <button ref={trigger} className="tg-photo-open" aria-label={'Enlarge ' + caption} onClick={() => setOpen(true)}>
      <img src={src} alt={alt} onError={() => setFailed(true)} loading="eager"/><span aria-hidden="true">↗</span>
    </button>}
    <figcaption>{caption}</figcaption>
    {open && <dialog ref={dialog} className="tg-lightbox" aria-label={caption} onCancel={() => setOpen(false)} onKeyDown={event => { if (event.key === 'Tab') { event.preventDefault(); dialog.current.querySelector('button').focus() } }} onClick={event => { if (event.target === event.currentTarget) setOpen(false) }}>
      <button autoFocus onClick={() => setOpen(false)} aria-label="Close screenshot">Close ×</button>
      <img src={src} alt={alt}/><p>{caption}</p>
    </dialog>}
  </figure>
}

export function Journey() {
  const [selected, setSelected] = useState(0)
  const [label, question, friction, response] = journey[selected]
  return <div className="tg-journey">
    <div className="tg-stops" aria-label="Journey stages">{journey.map(([name], index) => <button key={name} aria-pressed={selected === index} onClick={() => setSelected(index)}><span aria-hidden="true">{index + 1}</span>{index + 1}. {name}</button>)}</div>
    <div className="tg-journey-detail" aria-live="polite"><span className="tg-eyebrow">{label}</span><h3>{question}</h3><p>{friction}</p><p className="tg-response"><strong>Design opportunity</strong>{response}</p></div>
  </div>
}

const layouts = ['Map-first', 'Planner-first', 'Directory-first', 'Desktop split', 'Mobile sheet', 'Refined layout']
export function Wireframes() {
  return <div className="tg-wireframes">{layouts.map((layout, index) => <figure key={layout} className={'tg-wire tg-wire-' + index}>
    <div className="tg-wire-screen" aria-hidden="true"><div className="tg-wire-inputs"><span>Start</span><span>Destination</span></div><div className="tg-wire-map"><svg viewBox="0 0 180 85"><path d="M0 55 50 35 90 60 180 12M25 0 60 85M145 0 100 85" stroke="#c7c3b6" strokeWidth="10" fill="none"/><path d="M24 56 48 42 89 63 153 26" stroke="#665a3e" strokeWidth="3" fill="none" strokeDasharray="5 4"/><circle cx="24" cy="56" r="5" fill="#665a3e"/><circle cx="153" cy="26" r="5" fill="#665a3e"/></svg></div><div className="tg-wire-results"><span>Route · time · fare</span><span>Board → walk → arrive</span></div></div>
    <figcaption>{index + 1}. {layout}{index === 5 ? ' ✓' : ''}</figcaption>
  </figure>)}</div>
}

const prototype = [
  ['Open the map', 'Begin with the map and a clear way to plan a trip.', 'Choose a journey'],
  ['Choose start & destination', 'Example journey: SM City Olongapo Central → Ulo ng Apo. Search, current location, and map pins are entry points in the actual app.', 'Compare trip options'],
  ['Compare the options', 'Review estimated time, fare, and walking together. This reconstruction shows the decision flow; it does not calculate a route.', 'Inspect the itinerary'],
  ['Board → ride → walk', 'Inspect the boarding point, vehicle leg, alighting point, and final walk before setting off.', null],
]
export function Prototype() {
  const [step, setStep] = useState(0)
  const [title, text, action] = prototype[step]
  return <section className="tg-prototype" aria-label="Reconstructed planning prototype">
    <div className="tg-prototype-top"><span>Reconstructed low-fidelity flow</span><span>{step + 1} / 4</span></div>
    <div aria-live="polite"><h3>{title}</h3><p>{text}</p></div>
    <div className="tg-prototype-visual" aria-label="Simplified prototype screen">
      <svg viewBox="0 0 100 80" aria-hidden="true"><path d="m0 20 100 35M20 0l40 80M85 0 35 80" stroke="#d6d0be" strokeWidth="8" fill="none"/><path d="M20 25 45 35 65 60" stroke="#665a3e" strokeWidth="3" strokeDasharray="4 3" fill="none"/><circle cx="20" cy="25" r="5" fill="#315b48"/><circle cx="65" cy="60" r="5" fill="#665a3e"/></svg>
      <div className="tg-prototype-fields">{(step === 0 ? ['Start: choose a place', 'Destination: choose a place'] : step === 1 ? ['Start: SM City Olongapo Central', 'Destination: Ulo ng Apo'] : step === 2 ? ['Recommended · review estimates', 'Alternative · compare walking'] : ['Walk to boarding point', 'Ride → alight → final walk']).map(label => <span key={label}>{label}</span>)}</div>
    </div>
    <div className="tg-prototype-actions">{action && <button className="tg-button" onClick={() => setStep(step + 1)}>{action}<span aria-hidden="true"> →</span></button>}<button onClick={() => setStep(0)}>Reset prototype</button></div>
  </section>
}
