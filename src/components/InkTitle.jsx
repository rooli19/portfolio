import { useRef } from 'react'
import { useInView } from 'motion/react'

export default function InkTitle({ as: Tag = 'h1', children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const words = children.split(' ')
  let letter = 0
  return <Tag ref={ref} aria-label={children} className={'ink-title ' + className} data-writing={inView || undefined}>
    {words.map((word, index) => <span className="ink-word" aria-hidden="true" key={index}>
      {Array.from(word, (character, position) =>
        <span className="ink-letter" style={{ '--letter-delay': letter++ * 36 + 'ms' }} key={position}>{character}</span>)}
      {index < words.length - 1 ? ' ' : ''}
    </span>)}
  </Tag>
}
