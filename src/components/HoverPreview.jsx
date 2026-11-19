import { useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { mediaPath } from '../sitePath'

export default function HoverPreview({ src, poster, children, showPlayButton = false }) {
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)
  const reducedMotion = useReducedMotion()

  function play() {
    video.current.play().catch(() => {})
  }

  return <div className="hover-preview"
    onPointerEnter={event => { if (event.pointerType !== 'touch' && !reducedMotion) play() }}
    onPointerLeave={event => { if (event.pointerType !== 'touch') video.current.pause() }}>
    {children}
    <video ref={video} src={mediaPath(src)} poster={mediaPath(poster)} data-playing={playing || undefined} aria-hidden="true"
      muted loop playsInline preload="none" onPlay={event => setPlaying(!event.currentTarget.paused)}
      onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />
    {showPlayButton && <button type="button" className="preview-toggle"
      onClick={() => video.current.paused ? play() : video.current.pause()}>
      {playing ? 'Pause preview' : 'Play preview'}
    </button>}
  </div>
}
