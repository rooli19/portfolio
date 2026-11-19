import { useEffect, useRef, useState } from 'react'
import { mediaPath } from '../sitePath'
import MikaSketch from './MikaSketch'
import { journey } from '../content/transpogapo'
import { RouteDrawing } from './TranspoScenes'

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

const moods = ['curious', 'unsure', 'anxious', 'focused', 'relieved']

export function Journey() {
  const [selected, setSelected] = useState(0)
  const [label, question, friction, response] = journey[selected]
  const mood = moods[selected]
  return <div className="tg-journey">
    <RouteDrawing activeStop={selected}/>
    <div className="tg-stops" aria-label="Journey stages">{journey.map(([name], index) => <button key={name} aria-pressed={selected === index} onClick={() => setSelected(index)}><span aria-hidden="true">{index + 1}</span>{index + 1}. {name}</button>)}</div>
    <div className="tg-journey-detail" aria-live="polite"><span className="tg-eyebrow">{label}</span><div key={selected} className="tg-step-content"><div className="tg-journey-question"><div><h3>{question}</h3><p>{friction}</p></div><div className="tg-mood"><MikaSketch mood={mood}/><span>{mood}</span></div></div><p className="tg-response"><strong>Design response</strong>{response}</p></div></div>
  </div>
}

export function PaperComparison() {
  const [split, setSplit] = useState(45)
  const [traced, setTraced] = useState(false)
  const [folded, setFolded] = useState(false)
  const [missing, setMissing] = useState(false)

  function toggleTrace() {
    setTraced(!traced)
    if (!traced) setSplit(0)
  }

  return <section className="tg-paper-comparison" aria-labelledby="tg-paper-heading">
    <h3 id="tg-paper-heading">From sketch to screen</h3>
    <div className="tg-comparison-stage" style={{ '--tg-split': `${split}%` }}
      data-folded={folded || undefined} data-split={(!folded && !missing && split > 0 && split < 100) || undefined}>
      {missing
        ? <p className="tg-comparison-missing">Planner screenshot unavailable.</p>
        : <img src={mediaPath('/photos/transpogapo-planner.png')} alt="Current TranspoGAPO planner showing a map and suggested journeys" loading="lazy" onError={() => setMissing(true)}/>}
      <div className="tg-sketch-reveal" aria-hidden="true">
        <div className="tg-sketch-sheet">
          <svg viewBox="0 0 880 610">
            <g className="tg-sketch-ink" transform="scale(1 1.32)">
              <path d="M36 31Q440 26 841 33L845 425Q415 433 37 423Z M38 75L841 73 M266 76L263 425 M55 158L238 156 239 189 54 190Z M55 203L238 204 238 238 56 239Z M55 258L238 257 239 298 54 296Z"/>
              <path d="M271 273Q414 278 481 236T614 187Q691 201 844 136 M311 424Q421 340 406 264T389 75 M545 425Q574 353 544 282T544 74 M269 327Q453 344 555 330T846 281 M701 425L669 331 689 230 728 167 706 75 M268 132Q468 141 587 124T839 113" opacity=".45"/>
              <path d="M357 363Q459 331 476 278T534 218Q627 202 668 144" className="tg-pencil-line" pathLength="1" data-traced={traced || undefined}/>
              <circle cx="357" cy="363" r="10"/><circle cx="668" cy="144" r="10"/>
            </g>
            <g className="tg-sketch-label" transform="scale(1 1.32)">
              <text x="56" y="61">TranspoGAPO</text>
              <text x="58" y="130">Plan your trip</text>
              <text x="65" y="180">Starting point</text>
              <text x="65" y="224">Destination</text>
              <text x="75" y="284">Find routes →</text>
              <text x="374" y="389">Board here</text>
              <text x="682" y="151">Arrive</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div className="tg-comparison-slider">
      <span aria-hidden="true">Paper sketch</span>
      <input type="range" min="0" max="100" value={split} disabled={folded || missing}
        aria-label="Compare sketch and live planner" aria-valuetext={`${split}% live planner`}
        onChange={event => setSplit(Number(event.target.value))}/>
      <span aria-hidden="true">Live planner</span>
    </div>
    <div className="tg-paper-actions">
      <button type="button" aria-pressed={traced} disabled={folded} onClick={toggleTrace}>Trace the route</button>
      <button type="button" aria-pressed={folded} onClick={() => setFolded(!folded)}>{folded ? 'Unfold the sketch' : 'Fold the sketch away'}</button>
    </div>
  </section>
}

const wireframeStates = [
  { title: 'Plan a trip', panel: null },
  { title: 'Compare trips', panel: ['Suggested journeys', 'Tricycle · recommended', 'Walk only', 'Jeepney + walk'] },
  { title: 'Read directions', panel: ['Trip directions', 'Walk to the jeepney stop', 'Ride the J-03 jeepney', 'Walk to your destination'] },
]

export function Wireframes() {
  const [selected, setSelected] = useState(0)
  const { title, panel } = wireframeStates[selected]

  return <section aria-label="Low-fidelity wireframes of the live app">
    <p className="tg-caption">Low-fidelity redraw of the live TranspoGAPO map and planner.</p>
    <div className="tg-screen-tabs">{wireframeStates.map((state, index) =>
      <button key={state.title} aria-pressed={selected === index} onClick={() => setSelected(index)}>{state.title}</button>
    )}</div>
    <figure key={title} className="tg-live-wire tg-step-content" aria-label={title}>
      <div className="tg-live-wire-header"><strong>TranspoGAPO</strong><span>Routes · Terminals · Spots</span></div>
      <div className="tg-live-wire-body">
        <div className="tg-live-wire-sidebar">
          <span>Jeepneys · Terminals</span>
          <span>Landmarks · Get There</span>
          <strong>Plan Your Trip</strong>
          <span>Start · SM City Olongapo Central</span>
          <span>Destination · Ulo ng Apo</span>
          <strong className="tg-live-wire-action">Get Directions</strong>
        </div>
        <div className="tg-live-wire-map">
          <svg viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 120 65 84l56 10 71-34 108 20M20 0l68 200M130 0l-18 200M265 0l-58 200M0 153l300 1M0 40l300 5" stroke="#ccc" strokeWidth="7" fill="none"/>
            <path d="M62 108 89 84l32 10 71-34 49 9" stroke="#555" strokeWidth="3" strokeDasharray="7 5" fill="none"/>
            <circle cx="62" cy="108" r="6" fill="#555"/><circle cx="241" cy="69" r="6" fill="#555"/>
          </svg>
          <span className="tg-live-wire-map-label">Olongapo map</span>
          {panel && <div className="tg-live-wire-panel"><strong>{panel[0]}</strong>{panel.slice(1).map(row => <span key={row}>{row}</span>)}</div>}
        </div>
      </div>
    </figure>
  </section>
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
    <div aria-live="polite"><div key={step} className="tg-step-content"><h3>{title}</h3><p>{text}</p></div></div>
    <div key={step} className="tg-prototype-visual" aria-label="Simplified prototype screen">
      <svg viewBox="0 0 100 80" aria-hidden="true"><path d="m0 20 100 35M20 0l40 80M85 0 35 80" stroke="#d6d0be" strokeWidth="8" fill="none"/><path d="M20 25 45 35 65 60" stroke="#665a3e" strokeWidth="3" strokeDasharray="4 3" fill="none"/><circle cx="20" cy="25" r="5" fill="#315b48"/><circle cx="65" cy="60" r="5" fill="#665a3e"/></svg>
      <div className="tg-prototype-fields">{(step === 0 ? ['Start: choose a place', 'Destination: choose a place'] : step === 1 ? ['Start: SM City Olongapo Central', 'Destination: Ulo ng Apo'] : step === 2 ? ['Recommended · review estimates', 'Alternative · compare walking'] : ['Walk to boarding point', 'Ride → alight → final walk']).map(label => <span key={label}>{label}</span>)}</div>
    </div>
    <div className="tg-prototype-actions">{action && <button className="tg-button" onClick={() => setStep(step + 1)}>{action}<span aria-hidden="true"> →</span></button>}<button onClick={() => setStep(0)}>Reset prototype</button></div>
  </section>
}
