import { useState } from 'react'

const technologies = [
  ['JS', 'JavaScript'], ['Py', 'Python'], ['C', 'C'], ['php', 'PHP'],
  ['< >', 'HTML'], ['{ }', 'CSS'], ['SQL', 'SQL'],
  ['⚛︎', 'React'], ['B', 'Bootstrap'], ['≈', 'Tailwind CSS'],
  ['⬡', 'Node.js'], ['↱', 'Leaflet.js'], ['OCR', 'Tesseract.js'],
  ['N p', 'NumPy'], ['▶', 'Pygame'], ['My', 'MySQL'], ['◈', 'Firebase Firestore'],
]

export default function TechMarquee() {
  const [paused, setPaused] = useState(false)
  return <section className="tech-section" aria-labelledby="tech-title">
    <div className="wrap tech-heading">
      <h2 id="tech-title" className="handwritten">What I build with</h2>
      <button className="tech-pause handwritten" type="button" onClick={() => setPaused(value => !value)}>
        {paused ? 'Resume scrolling' : 'Pause scrolling'}
      </button>
    </div>
    <div className="tech-window">
      <div className="tech-track" data-paused={paused}>
        {[false, true].map(copy => <ul key={String(copy)} className="tech-list" aria-hidden={copy || undefined}>
          {technologies.map(([mark, name]) => <li key={name} className="tech-badge">
            <span className="tech-mark" aria-hidden="true">{mark}</span>
            <span>{name}</span>
          </li>)}
        </ul>)}
      </div>
    </div>
  </section>
}
