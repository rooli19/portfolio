import { useId, useRef } from 'react'
import { useInView } from 'motion/react'

const bands = [0, 0.19, 0.38, 0.57, 0.76]

export default function BrushReveal({ as: Tag = 'div', ready = true, className = '', style, children, ...props }) {
  const ref = useRef(null)
  const id = 'brush-' + useId().replace(/[^a-z0-9_-]/gi, '')
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })
  const brushing = inView && ready
  return <>
    {brushing && <svg className="brush-defs" aria-hidden="true" focusable="false" width="0" height="0">
      <defs>
        <mask id={id} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
          {bands.map((top, index) => <path key={top} fill="white"
            d={`M-.32 ${top} H1.4 L1.24 ${top + .19} l-.09 .025 -.11 -.008 -.14 .046 H-.48 Z`}
            style={{ '--stroke-start': index % 2 ? '125%' : '-125%', '--stroke-delay': index * 155 + 'ms' }} />)}
        </mask>
      </defs>
    </svg>}
    <Tag {...props} ref={ref} className={'brush-reveal ' + className} data-brushing={brushing || undefined}
      style={{ ...style, '--brush-mask': 'url(#' + id + ')' }}>
      {children}
    </Tag>
  </>
}
