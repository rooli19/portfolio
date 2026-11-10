import BrushReveal from './BrushReveal'

export default function InkTitle({ as: Tag = 'h1', children, className = '' }) {
  const words = children.split(' ')
  return <BrushReveal as={Tag} aria-label={children} className={'ink-title ' + className}>
    {words.map((word, index) => <span className="ink-word" aria-hidden="true" key={index}>{word}
      {index < words.length - 1 ? ' ' : ''}
    </span>)}
  </BrushReveal>
}
