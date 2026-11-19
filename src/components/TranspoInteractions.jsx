import { useEffect, useRef, useState } from 'react'
import { mediaPath } from '../sitePath'
import MikaSketch from './MikaSketch'
import { journey, screens } from '../content/transpogapo'
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

function WireMap({ traced, ...props }) {
  return <svg viewBox="0 0 560 467" aria-hidden="true" {...props}>
    <rect width="560" height="467" fill="#eef0f2"/>
    <path d="M0 90 50 116 82 163 78 204 125 274 101 328 145 387 172 467H0Z" fill="#d4d9df"/>
    <g fill="#e2e5e9">
      <path d="m124 0 117 0 12 67-81 77-70-44Z"/>
      <path d="m157 249 66-76 41 2 47 55-56 84-75 9Z"/>
      <path d="m343 0 134 0 33 105-72 46-84-42Z"/>
      <path d="m371 237 91-58 98 82v111l-129 19-61-62Z"/>
    </g>
    <g className="tg-wire-roads">
      <path d="M48 0c37 130 36 194 87 255s69 142 116 212M195 0c38 98 37 142-13 222s4 173 16 245M377 0c-8 91-34 148-77 203s-67 163-56 264M478 0c-53 83-18 153-84 214s-83 149-70 253M0 69c141 60 223 57 310 30s171-39 250-10M72 200c63 13 170 12 244-44s169-54 244-26M113 324c128 7 200-39 289-40s109 10 158 22M142 398c70-33 203-20 271-35s98-17 147-8"/>
      <path d="m233 103 118 160m-195-52 146 151m75-204 150 112M278 65l164 29m-212 77 55-60m-96 207 29-49m100 91 27 56"/>
    </g>
    <path className="tg-wire-route" data-traced={traced || undefined} pathLength="1" d="M266 250c10 7 24 5 33-2l17-16-17-19-17 5"/>
    <g className="tg-wire-pins">
      <circle cx="266" cy="250" r="7"/><circle cx="282" cy="218" r="7"/>
    </g>
  </svg>
}

function DesktopWireframe({ traced }) {
  return <svg viewBox="0 0 1440 1000" role="img" aria-label="Grayscale planner wireframe with trip fields, a map, and suggested journeys">
    <rect width="1440" height="1000" fill="#fff"/>
    <WireMap x="320" y="67" width="1120" height="933" traced={traced}/>
    <g fill="#d9dde2">
      <rect x="63" y="20" width="27" height="27" rx="7"/>
      <rect x="102" y="24" width="125" height="19" rx="9.5"/>
      <rect x="788" y="28" width="39" height="11" rx="5.5"/>
      <rect x="851" y="28" width="44" height="11" rx="5.5"/>
      <rect x="922" y="28" width="49" height="11" rx="5.5"/>
      <rect x="999" y="28" width="40" height="11" rx="5.5"/>
      <rect x="1066" y="28" width="41" height="11" rx="5.5"/>
      <rect x="1151" y="11" width="168" height="44" rx="22"/>
      <circle cx="1358" cy="33" r="22"/>
      <rect x="50" y="193" width="100" height="13" rx="6.5"/>
      <rect x="50" y="216" width="236" height="9" rx="4.5"/>
      <rect x="50" y="232" width="188" height="9" rx="4.5"/>
      <rect x="16" y="383" width="287" height="40" rx="20"/>
    </g>
    <g fill="#eceef1">
      <rect x="12" y="77" width="145" height="46" rx="23"/>
      <rect x="163" y="77" width="144" height="46" rx="23"/>
      <rect x="12" y="129" width="145" height="36" rx="18"/>
      <rect x="16" y="262" width="287" height="110" rx="20"/>
    </g>
    <rect x="163" y="129" width="144" height="36" rx="18" fill="#c8cdd4"/>
    <g fill="#fff" stroke="#c7cdd4" strokeWidth="2">
      <rect x="53" y="275" width="196" height="39" rx="19.5"/>
      <rect x="53" y="320" width="196" height="39" rx="19.5"/>
      <rect x="336" y="637" width="280" height="340" rx="20"/>
    </g>
    <g fill="#d9dde2">
      <rect x="371" y="655" width="124" height="12" rx="6"/>
      <rect x="371" y="723" width="198" height="10" rx="5"/>
      <rect x="371" y="746" width="159" height="10" rx="5"/>
      <rect x="350" y="779" width="105" height="10" rx="5"/>
    </g>
    <g fill="#edf0f2">
      <rect x="349" y="801" width="254" height="109" rx="15"/>
      <rect x="349" y="920" width="254" height="45" rx="15"/>
    </g>
  </svg>
}

function MobileWireframe({ traced }) {
  return <svg viewBox="0 0 402 874" role="img" aria-label="Grayscale mobile wireframe with a map and an ordered walking and jeepney itinerary">
    <rect width="402" height="874" fill="#fff"/>
    <WireMap x="0" y="65" width="402" height="142" preserveAspectRatio="xMidYMid slice" traced={traced}/>
    <rect x="0" y="179" width="402" height="634" rx="18" fill="#fff"/>
    <g fill="#d9dde2">
      <rect x="23" y="19" width="25" height="25" rx="5"/>
      <rect x="59" y="24" width="110" height="15" rx="7.5"/>
      <circle cx="310" cy="32" r="21"/><circle cx="361" cy="32" r="21"/>
      <rect x="183" y="186" width="36" height="4" rx="2"/>
      <rect x="15" y="204" width="157" height="14" rx="7"/>
      <rect x="12" y="245" width="88" height="22" rx="11"/>
      <rect x="287" y="245" width="104" height="22" rx="11"/>
      <rect x="19" y="310" width="364" height="4" rx="2"/>
      <rect x="175" y="326" width="52" height="10" rx="5"/>
      <rect x="0" y="350" width="402" height="31" fill="#edf0f2"/>
    </g>
    {[390, 519, 674].map((y, index) => <g key={y}>
      <rect x="10" y={y} width="382" height={index === 1 ? 146 : 120} rx="13" fill="#fff" stroke="#d9dde2"/>
      <rect x="18" y={y + 8} width="34" height={index === 1 ? 130 : 104} rx="8" fill={index === 1 ? '#aeb7c2' : '#cdd3da'}/>
      <g fill="#d9dde2">
        <rect x="63" y={y + 14} width="126" height="10" rx="5"/>
        <rect x="314" y={y + 14} width="64" height="9" rx="4.5"/>
        <circle cx="73" cy={y + 52} r="10"/>
        <rect x="91" y={y + 47} width="180" height="10" rx="5"/>
        <circle cx="73" cy={y + 86} r="10"/>
        <rect x="91" y={y + 81} width="148" height="10" rx="5"/>
      </g>
    </g>)}
    <path d="M0 813H402" stroke="#d9dde2"/>
    <g fill="#d9dde2">
      {[40, 120, 201, 281, 361].map(x => <g key={x}>
        <rect x={x - 9} y="825" width="18" height="18" rx="5"/>
        <rect x={x - 18} y="850" width="36" height="6" rx="3"/>
      </g>)}
    </g>
  </svg>
}

function ComparisonView({ device }) {
  const [split, setSplit] = useState(45)
  const [traced, setTraced] = useState(false)
  const [missing, setMissing] = useState(false)
  const live = missing ? 0 : split
  const mobile = device === 'mobile'
  const Wireframe = mobile ? MobileWireframe : DesktopWireframe
  const screen = screens.find(screen => screen.id === (mobile ? 'mobile' : 'planner'))

  function toggleTrace() {
    setTraced(!traced)
    if (!traced) setSplit(0)
  }

  return <div className="tg-comparison-view" data-device={device}>
    <div className="tg-comparison-stage" style={{ '--tg-split': `${live}%` }}
      data-split={(live > 0 && live < 100) || undefined}>
      {!missing && <img src={mediaPath('/photos/' + screen.file)}
        alt={screen.alt} aria-hidden={live === 0}
        loading="lazy" onError={() => setMissing(true)}/>}
      <div className="tg-wire-reveal" aria-hidden={live === 100}>
        <Wireframe traced={traced}/>
      </div>
    </div>
    {missing && <p className="tg-caption" role="status">Planner screenshot unavailable.</p>}
    <div className="tg-comparison-slider">
      <span>Wireframe</span>
      <input type="range" min="0" max="100" value={live} disabled={missing}
        aria-label="Compare wireframe and live planner" aria-valuetext={`${live}% live planner`}
        onChange={event => setSplit(Number(event.target.value))}/>
      <span>Live planner</span>
    </div>
    <button type="button" className="tg-wire-trace" aria-pressed={traced} onClick={toggleTrace}>Trace the route</button>
  </div>
}

export function WireframeComparison() {
  const [device, setDevice] = useState('mobile')

  return <section className="tg-wire-comparison" aria-labelledby="tg-wire-comparison-heading">
    <h3 id="tg-wire-comparison-heading">From sketch to screen</h3>
    <div className="tg-comparison-devices" role="group" aria-label="Comparison layout">
      <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}>Mobile</button>
      <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}>Desktop</button>
    </div>
    <ComparisonView key={device} device={device}/>
  </section>
}

export function Wireframes() {
  return <section className="tg-wire-redraw" aria-labelledby="tg-wire-redraw-heading">
    <h3 id="tg-wire-redraw-heading">Low-fidelity redraw</h3>
    <div className="tg-wireframes">
      <article className="tg-wire-card">
        <h4>Plan a trip</h4>
        <WireMap className="tg-wire-card-map" preserveAspectRatio="xMidYMid slice"/>
        <div className="tg-wire-fields">
          <div><span>Start</span><strong>SM City Olongapo Central</strong></div>
          <div><span>Destination</span><strong>Ulo ng Apo</strong></div>
        </div>
        <span className="tg-wire-outline">Get directions</span>
      </article>
      <article className="tg-wire-card">
        <h4>Compare trips</h4>
        <WireMap className="tg-wire-card-map" preserveAspectRatio="xMidYMid slice" traced/>
        <strong className="tg-wire-list-heading">Suggested journeys</strong>
        <ul className="tg-wire-rows">
          <li><strong>Tricycle</strong><span>Recommended</span></li>
          <li><strong>Walk only</strong></li>
          <li><strong>Jeepney + walk</strong></li>
        </ul>
      </article>
      <article className="tg-wire-card">
        <h4>Read directions</h4>
        <WireMap className="tg-wire-card-map" preserveAspectRatio="xMidYMid slice" traced/>
        <strong className="tg-wire-list-heading">Trip directions</strong>
        <ol className="tg-wire-steps">
          <li>Walk to the jeepney stop</li>
          <li>Ride the J-03 jeepney</li>
          <li>Walk to your destination</li>
        </ol>
      </article>
    </div>
  </section>
}
