import { useEffect, useRef } from 'react'
import { startGallery } from '../animation/galleryScene'

export default function PlaygroundCanvas({ photos, onReady, onUnavailable }) {
  const canvas = useRef(null)
  useEffect(() => {
    const element = canvas.current
    return startGallery(element.parentElement, element, photos, onReady, onUnavailable)
  }, [photos, onReady, onUnavailable])
  return <canvas className="playground-canvas" ref={canvas} aria-hidden="true" />
}
