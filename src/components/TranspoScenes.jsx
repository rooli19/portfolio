import { useRef, useSyncExternalStore } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { mediaPath, sitePath } from '../sitePath'

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

function observeMotionPreference(update) {
  motionPreference.addEventListener('change', update)
  return () => motionPreference.removeEventListener('change', update)
}

export function useStoryReducedMotion() {
  return useSyncExternalStore(observeMotionPreference, () => motionPreference.matches)
}

const textTravel = {
  heading: [24, -12],
  body: [12, -6],
  list: [16, -8],
  quote: [30, -14],
}

const readingStages = [0, 1 / 3, 2 / 3, 1]

export function StoryText({ as = 'p', className = '', stagger = 0, effect = 'body', ...props }) {
  const text = useRef(null)
  const reduce = useStoryReducedMotion()
  const Tag = motion[as]
  const [enterY, exitY] = textTravel[effect]
  const headline = effect === 'heading'
  const quote = effect === 'quote'
  const { scrollYProgress } = useScroll({
    target: text,
    offset: [`start ${.9 - stagger * .025}`, `start ${(quote ? .32 : .38) - stagger * .035}`, 'end .1', 'end start'],
  })
  const y = useTransform(scrollYProgress, readingStages, [enterY, 0, 0, exitY])
  const opacity = useTransform(scrollYProgress, readingStages, [headline || quote ? .55 : .67, 1, 1, .58])
  const clipPath = useTransform(scrollYProgress, [0, 1 / 3], ['inset(0 0 24% 0)', 'inset(0 0 0% 0)'])
  const filter = useTransform(scrollYProgress, [0, 1 / 3], ['blur(3px)', 'blur(0px)'])

  return <Tag {...props} ref={text} className={`tg-text-reveal ${className}`}
    style={{
      y: reduce ? 0 : y,
      opacity: reduce ? 1 : opacity,
      clipPath: reduce || !headline ? 'none' : clipPath,
      filter: reduce || !(headline || quote) ? 'none' : filter,
    }}/>
}

export function Cutout({ name, className, style, eager = false }) {
  return <motion.img
    className={`tg-cutout ${className}`}
    src={mediaPath(`/photos/transpogapo-${name}-cutout.webp`)}
    alt=""
    aria-hidden="true"
    decoding="async"
    loading={eager ? 'eager' : 'lazy'}
    style={style}
    onError={event => { event.currentTarget.hidden = true }}
  />
}

export function ParallaxCutout({ name, className, distance = 64 }) {
  const art = useRef(null)
  const reduce = useStoryReducedMotion()
  const { scrollYProgress } = useScroll({ target: art, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return <div ref={art} className={className} aria-hidden="true">
    <Cutout name={name} className="tg-parallax-image" style={{ y: reduce ? 0 : y }}/>
  </div>
}

function StreetMap() {
  return <svg className="tg-street-map" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <pattern id="tg-street-grid" width="86" height="54" patternUnits="userSpaceOnUse" patternTransform="rotate(-21)">
        <path d="M0 0H86V54H0Z M22 0V54 M51 0V54 M22 23H86" fill="none" stroke="currentColor" strokeWidth="1"/>
      </pattern>
    </defs>
    <path d="M0 28C113 150 85 278 212 357S305 469 294 583 370 727 421 800H1200V0H0Z" fill="url(#tg-street-grid)"/>
    <path d="M0 28C113 150 85 278 212 357S305 469 294 583 370 727 421 800 M-40 663C162 621 257 675 383 560S679 455 724 326 986 164 1240 197 M-50 222C256 178 392 289 612 264S1079 336 1240 460" className="tg-map-main"/>
  </svg>
}

export function StoryBackdrop({ article }) {
  const reduce = useStoryReducedMotion()
  const { scrollYProgress } = useScroll({
    target: article,
    offset: ['start start', 'end end'],
    trackContentSize: true,
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, 28])
  const y = useTransform(scrollYProgress, [0, 1], [0, -92])
  const route = useTransform(scrollYProgress, [0, 1], [.06, 1])
  const path = 'M9 16V101L18 125V211L10 232V304L21 333V425L10 455V531L18 557V650L9 679V784'

  return <div className="tg-backdrop" aria-hidden="true">
    <div className="tg-backdrop-viewport">
      <motion.div className="tg-map-layer" style={{ x: reduce ? 0 : x, y: reduce ? 0 : y }}>
        <StreetMap/>
      </motion.div>
      <svg className="tg-map-margin" viewBox="0 0 30 800" preserveAspectRatio="none">
        <path className="tg-map-track" d={path} vectorEffect="non-scaling-stroke"/>
        <motion.path className="tg-map-route" d={path} vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : route }}/>
      </svg>
    </div>
  </div>
}

export function OpeningScene() {
  const runway = useRef(null)
  const reduce = useStoryReducedMotion()
  const { scrollYProgress } = useScroll({ target: runway, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -118])
  const titleOpacity = useTransform(scrollYProgress, [0, .58, 1], [1, 1, .22])
  const jeepX = useTransform(scrollYProgress, [0, .18, .9, 1], ['0vw', '10vw', '112vw', '112vw'])
  const jeepY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const ticketY = useTransform(scrollYProgress, [0, 1], [0, -136])
  const ticketTurn = useTransform(scrollYProgress, [0, 1], [-13, 9])

  return <header id="title" tabIndex={-1} className="tg-title-scene">
    <div ref={runway} className="tg-title-runway" aria-hidden="true"/>
    <div className="tg-title-stage">
      <a className="tg-all-projects" href={sitePath('works.html')}>← All projects</a>
      <motion.div className="tg-title-type" style={{ y: reduce ? 0 : titleY, opacity: reduce ? 1 : titleOpacity }}>
        <p className="tg-title-caption">Olongapo City, Philippines <span aria-hidden="true">/</span> 2026</p>
        <h1>TranspoGAPO</h1>
        <p className="tg-title-description">Planning jeepney and tricycle trips in Olongapo City.</p>
      </motion.div>
      <Cutout name="jeepney" className="tg-title-jeepney" style={{ x: reduce ? 0 : jeepX, y: reduce ? 0 : jeepY }} eager/>
      <Cutout name="ticket" className="tg-title-ticket" style={{ y: reduce ? 0 : ticketY, rotate: reduce ? -13 : ticketTurn }} eager/>
      <a className="tg-start-link" href="#overview"><span aria-hidden="true">↓</span> Start the journey</a>
    </div>
  </header>
}

export function LandingScene() {
  const scene = useRef(null)
  const reduce = useStoryReducedMotion()
  const { scrollYProgress } = useScroll({ target: scene, offset: ['start end', 'end end'] })
  const streetY = useTransform(scrollYProgress, [0, 1], ['35%', '0%'])
  const titleY = useTransform(scrollYProgress, [0, 1], [75, 0])
  return <div ref={scene} className="tg-landing-scene" aria-hidden="true">
    <motion.p style={{ y: reduce ? 0 : titleY }}>TranspoGAPO</motion.p>
    <Cutout name="street" className="tg-landing-street" style={{ y: reduce ? 0 : streetY }}/>
  </div>
}

export function RouteDrawing({ flow = false, activeStop }) {
  const drawing = useRef(null)
  const reduce = useStoryReducedMotion()
  const { scrollYProgress } = useScroll({ target: drawing, offset: ['start .94', 'end .44'] })
  const path = flow
    ? 'M80 63H270Q307 63 326 38T373 16H524Q564 16 588 43T640 63H820'
    : 'M66 67H198Q232 67 250 45T293 24H385L465 68H590Q622 68 646 47T694 29H834'
  const stops = flow ? [[80,63], [450,16], [820,63]] : [[66,67], [263,34], [465,68], [646,47], [834,29]]
  return <svg ref={drawing} className="tg-route-drawing" viewBox="0 0 900 94" aria-hidden="true">
    <path d={path} className="tg-drawing-track"/>
    <motion.path d={path} className="tg-drawing-ink" style={{ pathLength: reduce ? 1 : scrollYProgress }}/>
    {stops.map(([x, y], index) => <circle key={x} cx={x} cy={y} r="7" data-active={index === activeStop || undefined}/>)}
  </svg>
}

export function StoryMeter({ value }) {
  const meter = useRef(null)
  const reduce = useStoryReducedMotion()
  const { scrollYProgress } = useScroll({ target: meter, offset: ['start .95', 'end .56'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, value])
  return <span ref={meter} className="tg-meter" aria-hidden="true">
    <motion.span style={{ scaleX: reduce ? value : fill }}/>
  </span>
}

export function StoryStatistic({ children }) {
  const statistic = useRef(null)
  const reduce = useStoryReducedMotion()
  const { scrollYProgress } = useScroll({ target: statistic, offset: ['start .98', 'end .66'] })
  const y = useTransform(scrollYProgress, [0, 1], [32, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [.55, 1])
  return <motion.strong ref={statistic} style={reduce ? undefined : { y, opacity }}>{children}</motion.strong>
}
