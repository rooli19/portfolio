import { useEffect, useRef } from 'react'
import PaperImage from './PaperImage'
import { advanceLanyard, createLanyard } from '../animation/lanyard'
import portrait from '../assets/portrait.webp'
import clip from '../assets/lanyard-clip.avif'
import strap from '../assets/lanyard-strap.avif'
import './lanyard.css'

const photo = { src: portrait, alt: 'Rholly Cao outdoors wearing glasses and a lanyard' }

export default function Lanyard() {
  const stage = useRef(null)
  const assembly = useRef(null)
  const band = useRef(null)
  const badge = useRef(null)

  useEffect(() => {
    const motionPreference = matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches) return
    const element = stage.current
    const physics = createLanyard()
    const step = 1 / 240
    let frame
    let lastTime
    let remaining = 0
    let pointer = null
    let scale = element.offsetWidth / 326

    function resize() {
      scale = element.offsetWidth / 326
    }
    function move(event) {
      if (event.pointerType !== 'mouse' && event.pointerId !== pointer) return
      const bounds = element.parentElement.getBoundingClientRect()
      const position = (event.clientX - bounds.left) / bounds.width * 2 - 1
      physics.target = Math.max(-1, Math.min(1, position)) * 90
    }
    function release() {
      pointer = null
      physics.target = 0
    }
    function grab(event) {
      pointer = event.pointerId
      element.setPointerCapture(event.pointerId)
      move(event)
    }
    function tick(time) {
      remaining += Math.min((time - (lastTime ?? time)) / 1000, 0.05)
      lastTime = time
      let position
      while (remaining >= step) {
        position = advanceLanyard(physics, step)
        remaining -= step
      }
      if (position) {
        assembly.current.style.transform = 'translate3d(' + position.x * scale + 'px,' + position.y * scale + 'px,0)'
        band.current.style.transform = 'rotate(' + position.strapAngle + 'deg)'
        badge.current.style.transform = 'perspective(1600px) translate3d(0,' + position.stretch * scale + 'px,' + position.depth * scale + 'px) rotate(' + position.cardAngle + 'deg) rotateY(' + position.yaw + 'deg)'
      }
      frame = requestAnimationFrame(tick)
    }

    const hero = element.parentElement
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', release)
    element.addEventListener('pointerdown', grab)
    element.addEventListener('lostpointercapture', release)
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', release)
      element.removeEventListener('pointerdown', grab)
      element.removeEventListener('lostpointercapture', release)
    }
  }, [])

  return <div className="lanyard" ref={stage}>
    <div className="lanyard-assembly" ref={assembly}>
      <div className="lanyard-band" ref={band}>
        <img className="lanyard-strap" src={strap} alt="" draggable={false} />
        <img className="lanyard-clasp lanyard-clasp-back" src={clip} alt="" draggable={false} />
        <div className="lanyard-badge" ref={badge}>
          <div className="hanging-paper">
            <p className="portrait-note sticky handwritten">hello!!! have a nice day</p>
            <PaperImage image={photo} width={512} height={568} eager />
          </div>
        </div>
        <img className="lanyard-clasp lanyard-clasp-front" src={clip} alt="" draggable={false} />
      </div>
    </div>
  </div>
}
