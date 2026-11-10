import { useState } from 'react'
import playIcon from '../assets/play-icon.avif'
import { showreel } from '../content/media'
import InkTitle from './InkTitle'
import WobblyInk from './WobblyInk'
import { mediaPath } from '../sitePath'
import BrushReveal from './BrushReveal'

export default function Showreel() {
  const [playing, setPlaying] = useState(false)
  const poster = mediaPath(showreel.poster)
  return <section className="wrap showreel" aria-label="Selected projects showreel">
    <p className="handwritten kicker">Selected projects | 2024 to 2026</p>
    <BrushReveal className="showreel-frame pencil-frame">
      {playing ? <video src={mediaPath(showreel.src)} poster={poster || undefined} autoPlay controls playsInline aria-label="Portfolio showreel" /> :
        <div className="showreel-screen" style={poster ? { backgroundImage: 'url("' + poster + '")' } : undefined}>
          <button className="showreel-play" type="button" disabled={!showreel.src}
            aria-label={showreel.src ? 'Play showreel' : 'Showreel video to be added'} onClick={() => setPlaying(true)}>
            <WobblyInk src={playIcon} width={52} height={62} />
          </button>
        </div>}
    </BrushReveal>
    <InkTitle as="h2" className="marker">Built by me, built with others</InkTitle>
  </section>
}
