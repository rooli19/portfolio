import { lazy, Suspense, useCallback, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import PaperImage from './PaperImage'
import { Recovery } from './Shell'
import './playground.css'

const Canvas = lazy(() => import('./PlaygroundCanvas'))

export default function PaperGallery({ photos }) {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  const onUnavailable = useCallback(() => setUnavailable(true), [])
  const moving = ready && !reduced && !unavailable
  return <div className="gallery-stage" role="region" aria-label="Hanging photos" tabIndex={0} data-moving={moving}>
    {!moving && <div className="gallery-still">
      {photos.map((photo, index) => <figure className="gallery-photo" key={index}>
        {photo.caption && <figcaption className="handwritten">{photo.caption}</figcaption>}
        <PaperImage image={photo} width={400} height={500} />
      </figure>)}
    </div>}
    {!reduced && !unavailable && <Recovery fallback={null}>
      <Suspense fallback={null}><Canvas photos={photos} onReady={onReady} onUnavailable={onUnavailable} /></Suspense>
    </Recovery>}
    {moving && <ul className="sr-only">
      {photos.map((photo, index) => <li key={index}>{photo.caption || 'Hanging photo ' + (index + 1)}{photo.alt && ' — ' + photo.alt}</li>)}
    </ul>}
  </div>
}
