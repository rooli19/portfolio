import { useId, useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

export default function WobblyInk({ src, width, height, className = '' }) {
  const id = useId()
  const ref = useRef(null)
  const visible = useInView(ref)
  const reduced = useReducedMotion()

  return <span className={'wobbly-ink ' + className} ref={ref} aria-hidden="true">
    <svg width="0" height="0" focusable="false">
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="turbulence" baseFrequency=".01" numOctaves="2" seed="2" result="ink">
          {visible && !reduced && <animate attributeName="seed" from="2" to="200" dur="40s" repeatCount="indefinite" />}
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="ink" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
    <img src={src} alt="" width={width} height={height} style={{ filter: 'url(#' + id + ')' }} />
  </span>
}
