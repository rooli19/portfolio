import { useEffect, useRef } from 'react'
import letterA from '../assets/about-letter-a.svg'
import letterB from '../assets/about-letter-b.svg'
import letterO from '../assets/about-letter-o.svg'
import letterU from '../assets/about-letter-u.svg'
import letterT from '../assets/about-letter-t.svg'

const artwork = [letterA, letterB, letterO, letterU, letterT]
const primary = 'M0 0 C150 42 385 120 660 120 S1240 65 1440 0'
const secondary = 'M0 21 C270 90 940 174 1440 34'
const width = 1440
const viewHeight = 190

function sample(path) {
  const length = path.getTotalLength()
  return Array.from({ length: 81 }, (_, index) => path.getPointAtLength(index * length / 80))
}

function displace(points, amount) {
  return points.map(({ x, y }, index) =>
    (index === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + (y + amount * Math.sin(Math.PI * x / width)).toFixed(1)).join(' ')
}

export default function AboutRope() {
  const scene = useRef(null)
  const lines = useRef([])
  const cards = useRef([])

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = scene.current
    const paths = lines.current
    const resting = paths.map(sample)
    let y = 0
    let speed = 0
    let pastSide
    let lastKick = 0
    let previousTime
    let frame
    let paperAngle = 0
    let paperSpeed = 0

    function update(time) {
      const dt = Math.min((time - (previousTime ?? time - 16)) / 1000, 0.025)
      previousTime = time
      speed += (-55 * y - 1.6 * speed) * dt
      y += speed * dt
      paperSpeed += ((speed * 0.055 - paperAngle) * 90 - paperSpeed * 5) * dt
      paperAngle += paperSpeed * dt
      paths[0].setAttribute('d', displace(resting[0], y))
      paths[1].setAttribute('d', displace(resting[1], y * 0.8 - speed * 0.06))
      const scale = paths[0].ownerSVGElement.clientHeight / viewHeight
      cards.current.forEach((card, index) => {
        const centerWeight = Math.sin(Math.PI * (0.26 + index * 0.12))
        card.style.translate = '0 ' + y * scale * centerWeight + 'px'
        card.style.rotate = paperAngle * centerWeight + 'deg'
      })
      if (Math.abs(y) + Math.abs(speed) + Math.abs(paperAngle) + Math.abs(paperSpeed) > 0.1) {
        frame = requestAnimationFrame(update)
      } else {
        frame = undefined
        previousTime = undefined
        paths[0].setAttribute('d', primary)
        paths[1].setAttribute('d', secondary)
        cards.current.forEach(card => { card.style.translate = ''; card.style.rotate = '' })
      }
    }

    function pluck(event) {
      const bounds = element.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width
      const yOnRope = (120 * Math.sin(Math.PI * x) + y) / viewHeight * paths[0].ownerSVGElement.clientHeight
      const side = Math.sign(event.clientY - bounds.top - yOnRope)
      const time = performance.now()
      if (pastSide !== undefined && side !== pastSide && time - lastKick > 120) {
        speed += 345 * side
        lastKick = time
        frame ??= requestAnimationFrame(update)
      }
      pastSide = side
    }

    function leave() { pastSide = undefined }
    element.addEventListener('pointermove', pluck)
    element.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', pluck)
      element.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <div className="about-rope" ref={scene}>
    <svg viewBox={'0 0 ' + width + ' ' + viewHeight} preserveAspectRatio="none" aria-hidden="true">
      <path d={primary} ref={node => { lines.current[0] = node }} />
      <path d={secondary} ref={node => { lines.current[1] = node }} />
    </svg>
    <h1 aria-label="About">{artwork.map((src, index) =>
      <span className="about-letter" key={src} ref={node => { cards.current[index] = node }}>
        <img src={src} alt="" width="82" height="97" draggable={false} />
      </span>)}</h1>
  </div>
}
