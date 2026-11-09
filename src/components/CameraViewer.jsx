import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cameraPhotos } from '../content/media'
import PaperImage from './PaperImage'
import InkTitle from './InkTitle'
import WobblyInk from './WobblyInk'
import arrow from '../assets/pencil-arrow.svg'

const threeDigits = number => String(number).padStart(3, '0')
const photoAnimation = {
  enter: ({ direction, reduced }) => ({ x: reduced ? 0 : direction * 56 + '%', scale: reduced ? 1 : 0.84, opacity: 0 }),
  screen: { x: 0, y: 0, scale: 1, opacity: 1 },
  leave: ({ direction, discarding, reduced }) => {
    if (reduced) return { opacity: 0 }
    if (discarding) return { y: '100%', rotate: -12, opacity: 0 }
    return { x: direction * -36 + '%', opacity: 0 }
  },
}

export default function CameraViewer() {
  const [photos, setPhotos] = useState(cameraPhotos)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [discarding, setDiscarding] = useState(false)
  const [flash, setFlash] = useState(0)
  const audio = useRef(null)
  const reduced = useReducedMotion()
  const photo = photos[index]
  const transition = { direction, discarding, reduced }

  useEffect(() => () => { audio.current?.close().catch(() => {}) }, [])

  function turn(step) {
    setDiscarding(false)
    setDirection(step)
    setIndex(current => (current + step + photos.length) % photos.length)
  }

  function moveToEnd() {
    setDiscarding(true)
    setDirection(1)
    setPhotos(current => [...current.slice(0, index), ...current.slice(index + 1), current[index]])
    if (index === photos.length - 1) setIndex(0)
  }

  function shutter() {
    setFlash(count => count + 1)
    if (!window.AudioContext) return
    const context = audio.current ??= new AudioContext()
    if (context.state === 'suspended') context.resume().catch(() => {})
    const click = context.createOscillator()
    const volume = context.createGain()
    const time = context.currentTime
    click.type = 'square'
    click.frequency.setValueAtTime(700, time)
    click.frequency.exponentialRampToValueAtTime(150, time + 0.12)
    volume.gain.setValueAtTime(0.04, time)
    volume.gain.exponentialRampToValueAtTime(0.001, time + 0.15)
    click.connect(volume).connect(context.destination)
    click.start()
    click.stop(time + 0.15)
  }

  return <section className="camera-section">
    <InkTitle as="h2" className="marker">Things I pointed my camera at</InkTitle>
    <p className="sticky handwritten">A few moments beyond the screen</p>
    <div className="camera-stage">
      <div className="camera-filmstrip" aria-hidden="true">
        {photos.slice(index + 1).concat(photos.slice(0, index)).slice(0, 3).map(item =>
          <PaperImage key={item.id} image={{ ...item, alt: '' }} className="pencil-frame" width={320} height={240} />)}
      </div>
      <div className="camera-body">
        <div className="camera-display">
          <div className="camera-screen">
            <AnimatePresence initial={false} custom={transition}>
              <motion.div className="camera-photo" key={photo.id} variants={photoAnimation}
                custom={transition} initial="enter" animate="screen" exit="leave"
                transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}>
                <PaperImage image={photo} width={640} height={480} eager />
              </motion.div>
            </AnimatePresence>
            <div className="camera-screen-label" aria-hidden="true">▶</div>
            <output className="camera-counter" aria-label="Current camera photo">
              {threeDigits(index + 1)}–{threeDigits(photos.length)}
            </output>
            {flash > 0 && !reduced && <span key={flash} className="camera-flash" aria-hidden="true" />}
          </div>
          <span className="camera-brand">WIREFRAME</span>
        </div>
        <div className="camera-controls">
          <div className="camera-dial">
            <button type="button" aria-label="Previous photo" onClick={() => turn(-1)}>◀</button>
            <button type="button" className="camera-ok" aria-label="Take a snapshot" onClick={shutter}>OK</button>
            <button type="button" aria-label="Next photo" onClick={() => turn(1)}>▶</button>
          </div>
          <button className="camera-trash" type="button" aria-label="Move photo to end of the roll" onClick={moveToEnd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M4 6h16M9 6V3h6v3m3 0-1 15H7L6 6m4 4v7m4-7v7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <p className="handwritten camera-caption"><WobblyInk src={arrow} width={58} height={22} /> photos and moments</p>
  </section>
}
