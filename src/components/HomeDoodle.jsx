import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { mediaPath } from '../sitePath'

export default function HomeDoodle({ scene }) {
  const anchor = useRef(null)
  const { scrollYProgress } = useScroll({
    target: anchor,
    offset: ['start end', 'end 0.25'],
  })
  const reveal = useTransform(scrollYProgress, [0.08, 0.85], ['100%', '0%'])
  const drift = useTransform(scrollYProgress, [0, 1], ['12px', '-12px'])
  const tilt = useTransform(scrollYProgress, [0, 1], ['3deg', '-3deg'])

  return <div ref={anchor} className={`home-doodle home-doodle--${scene}`} aria-hidden="true">
    <motion.span className="home-doodle-ink" style={{ '--doodle-reveal': reveal }} />
    <motion.span className="home-doodle-cutout" style={{ '--doodle-drift': drift, '--doodle-tilt': tilt }}>
      {scene === 'projects' && <img src={mediaPath('/photos/transpogapo-ticket-cutout.webp')} alt="" loading="lazy" decoding="async" />}
    </motion.span>
  </div>
}
