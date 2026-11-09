import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import ContactForm from './ContactForm'
import { sitePath } from '../sitePath'
import './notebook.css'

export default function ContactNotebook() {
  const section = useRef(null)
  const form = useRef(null)
  const [open, setOpen] = useState(false)
  const [manual, setManual] = useState(false)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const angle = useTransform(scrollYProgress, [0.18, 0.77], [0, -155])
  useMotionValueEvent(scrollYProgress, 'change', progress => setOpen(progress > 0.53))

  useEffect(() => {
    if (manual) form.current.querySelector('input')?.focus()
  }, [manual])

  const revealed = manual || reduced || open
  return <footer className="notebook-section" ref={section}>
    <div className="notebook-sticky">
      <div className="contact-notebook" data-revealed={revealed}>
        <div className="notebook-page" ref={form} inert={!revealed}>
          <ContactForm title="Let’s build something!" />
        </div>
        {!reduced && <motion.div className="notebook-lid" style={{ rotateY: manual ? -155 : angle }}>
          <button className="notebook-cover" type="button" aria-expanded={revealed}
            onClick={() => setManual(true)} inert={revealed}>
            <span>Let’s<br /> make<br /> something</span>
          </button>
          <div className="notebook-back" aria-hidden="true" />
        </motion.div>}
      </div>
      <a className="handwritten notebook-contact-link" href={sitePath('contact.html')}>Contact page ↗</a>
    </div>
  </footer>
}
