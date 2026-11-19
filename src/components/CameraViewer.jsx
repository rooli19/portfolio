import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import listen from '../assets/camera-listen.webp'
import sketch from '../assets/camera-sketch.webp'
import build from '../assets/camera-build.webp'
import test from '../assets/camera-test.webp'
import InkTitle from './InkTitle'
import PaperImage from './PaperImage'

const scenes = [
  { title: 'Listen', src: listen, caption: 'I start by listening to the people who’ll use it.' },
  { title: 'Sketch', src: sketch, caption: 'I sketch the simplest way through the problem.' },
  { title: 'Build', src: build, caption: 'I build a small version and get it working.' },
  { title: 'Test', src: test, caption: 'I watch where people get stuck, then fix what’s in their way.' },
]

const threeDigits = number => String(number).padStart(3, '0')
const photoAnimation = {
  enter: ({ direction }) => ({ x: direction * 56 + '%', scale: 0.84, opacity: 0 }),
  screen: { x: 0, y: 0, scale: 1, opacity: 1 },
  leave: ({ direction, discarding }) => discarding
    ? { y: '100%', rotate: -12, opacity: 0 }
    : { x: direction * -36 + '%', opacity: 0 },
}

function CameraScene({ scene }) {
  return <>
    <img src={scene.src} alt="" draggable={false} />
    <figcaption><strong>{scene.title}.</strong> {scene.caption}</figcaption>
  </>
}

export default function CameraViewer() {
  const [roll, setRoll] = useState({ photos: scenes, index: 0, direction: 1, discarding: false })
  const [flash, setFlash] = useState(0)
  const audio = useRef(null)
  const reduced = useReducedMotion()
  const { photos, index } = roll
  const scene = photos[index]

  useEffect(() => () => { audio.current?.close().catch(() => {}) }, [])

  function turn(step) {
    setRoll(current => ({ ...current, direction: step, discarding: false,
      index: (current.index + step + current.photos.length) % current.photos.length }))
  }

  function moveToEnd() {
    setRoll(({ photos, index }) => ({
      photos: [...photos.slice(0, index), ...photos.slice(index + 1), photos[index]],
      index: index === photos.length - 1 ? 0 : index,
      direction: 1,
      discarding: true,
    }))
  }

  function shutter() {
    if (!reduced) setFlash(count => count + 1)
    if (!window.AudioContext) return
    const context = audio.current ??= new AudioContext()
    if (context.state === 'suspended') context.resume().catch(() => {})
    const click = context.createOscillator()
    const volume = context.createGain()
    const time = context.currentTime
    click.type = 'square'
    click.frequency.setValueAtTime(1500, time)
    click.frequency.exponentialRampToValueAtTime(140, time + 0.075)
    volume.gain.setValueAtTime(0.08, time)
    volume.gain.exponentialRampToValueAtTime(0.001, time + 0.09)
    click.connect(volume).connect(context.destination)
    click.start()
    click.stop(time + 0.1)
  }

  return <section className="camera-section" aria-labelledby="camera-heading">
    <h2 id="camera-heading" className="marker">How I solve problems</h2>
    <div className="camera-stage">
      <div className="camera-filmstrip" aria-hidden="true">
        {photos.slice(index + 1).concat(photos.slice(0, index)).map(photo =>
          <PaperImage key={photo.title} image={{ src: photo.src, alt: '' }} className="pencil-frame" width={320} height={240} />)}
      </div>
      <div className="camera-body">
        <div className="camera-display">
          <div className="camera-screen">
            {reduced
              ? <figure className="camera-photo" aria-hidden="true"><CameraScene scene={scene} /></figure>
              : <AnimatePresence initial={false} custom={roll}>
                <motion.figure className="camera-photo" key={scene.title} aria-hidden="true" variants={photoAnimation}
                  custom={roll} initial="enter" animate="screen" exit="leave"
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
                  <CameraScene scene={scene} />
                </motion.figure>
              </AnimatePresence>}
            <span className="camera-screen-label" aria-hidden="true">▶</span>
            <span className="camera-counter" aria-hidden="true">{threeDigits(index + 1)}–{threeDigits(photos.length)}</span>
            {flash > 0 && !reduced && <span key={flash} className="camera-flash" aria-hidden="true" />}
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Scene {index + 1} of {photos.length}. {scene.title}. {scene.caption}
          </p>
          <span className="camera-brand" aria-hidden="true">WIREFRAME</span>
        </div>
        <div className="camera-controls">
          <div className="camera-dial">
            <button type="button" aria-label="Previous scene" onClick={() => turn(-1)}>◀</button>
            <button type="button" className="camera-ok" aria-label="Take a snapshot" onClick={shutter}>OK</button>
            <button type="button" aria-label="Next scene" onClick={() => turn(1)}>▶</button>
          </div>
          <button className="camera-trash" type="button" aria-label="Move scene to end of the roll" onClick={moveToEnd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M4 6h16M9 6V3h6v3m3 0-1 15H7L6 6m4 4v7m4-7v7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
}
