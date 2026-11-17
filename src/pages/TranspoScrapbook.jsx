import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { chapters } from '../content/transpogapo'
import { Plane } from '../components/TranspoInteractions'
import TranspoChapters from '../components/TranspoChapters'
import { sitePath } from '../sitePath'
import './transpogapo.css'

function chapterFromHash() {
  return Math.max(0, chapters.findIndex(chapter => '#' + chapter.id === window.location.hash))
}

export default function TranspoScrapbook() {
  const [index, setIndex] = useState(chapterFromHash)
  const [flying, setFlying] = useState(false)
  const [flightStart, setFlightStart] = useState({ left: 0, top: 0 })
  const reducedMotion = useReducedMotion()
  const heading = useRef(null)
  const planeButton = useRef(null)
  const pending = useRef(null)
  const timer = useRef(null)
  const focusOnArrival = useRef(false)
  const chapter = chapters[index]

  useEffect(() => {
    function sync() {
      clearTimeout(timer.current)
      pending.current = null
      setFlying(false)
      focusOnArrival.current = true
      setIndex(chapterFromHash())
    }
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      clearTimeout(timer.current)
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  useEffect(() => {
    if (!focusOnArrival.current) return
    heading.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
    focusOnArrival.current = false
  }, [index])

  function go(next) {
    if (next === index || next < 0 || next >= chapters.length || pending.current !== null) return
    pending.current = next
    function arrive() {
      window.history.pushState(null, '', '#' + chapters[next].id)
      focusOnArrival.current = true
      setIndex(next)
      setFlying(false)
      pending.current = null
    }
    if (reducedMotion) arrive()
    else {
      const rect = planeButton.current.querySelector('svg').getBoundingClientRect()
      setFlightStart({ left: rect.left, top: rect.top })
      setFlying(true)
      timer.current = setTimeout(arrive, 620)
    }
  }

  return <article className="tg-scrapbook wrap">
    <header className="tg-masthead"><a href={sitePath('works.html')}>← All projects</a><h1>TranspoGAPO</h1><span>A case study, in eight chapters</span></header>
    <div className="tg-book" data-flying={flying || undefined}>
      <nav className="tg-tabs" aria-label="Scrapbook chapters">{chapters.map((item, i) => <a key={item.id} href={'#' + item.id} aria-current={index === i ? 'step' : undefined} onClick={event => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); go(i) } }}><span>{String(i + 1).padStart(2, '0')}</span>{item.label}</a>)}</nav>
      <motion.section key={chapter.id} className="tg-spread" data-chapter={chapter.id} aria-labelledby="chapter-heading" initial={reducedMotion ? false : { opacity: 0, y: 12, rotate: .4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: reducedMotion ? 0 : .35 }}>
        <header className="tg-chapter-header"><p className="tg-eyebrow">{chapter.note}</p><h2 ref={heading} tabIndex={-1} id="chapter-heading" className="tg-heading">{chapter.title}</h2></header>
        <TranspoChapters index={index}/>
        <span className="tg-page-number" aria-hidden="true">R.C. / {String(index + 1).padStart(2, '0')}</span>
      </motion.section>
      {flying && !reducedMotion && <motion.div className="tg-flying-plane" style={flightStart} aria-hidden="true" initial={{ x: '0vw', y: 0, rotate: -10, opacity: 1 }} animate={{ x: ['0vw', '-22vw', '-35vw', '-12vw', '25vw'], y: [0, -150, -270, -330, -400], rotate: [-10, -35, 15, 40, 0], opacity: [1, 1, 1, 1, 0] }} transition={{ duration: .62, ease: 'easeInOut' }}><Plane/></motion.div>}
      <footer className="tg-navigation"><button onClick={() => go(index - 1)} disabled={index === 0 || flying}>← Previous</button><p aria-live="polite" aria-atomic="true"><span>{String(index + 1).padStart(2, '0')}</span> / 08 <small>{chapter.label}</small></p><button ref={planeButton} className="tg-next" aria-label={index === 7 ? 'Return to first chapter' : 'Fly to next chapter'} onClick={() => go(index === 7 ? 0 : index + 1)} disabled={flying}><span>{index === 7 ? 'Fly to the beginning' : 'On to the next chapter'}<small>{index === 7 ? 'Take another look' : 'Give the plane a little nudge'}</small></span><Plane/></button></footer>
    </div>
  </article>
}
