import { useState } from 'react'
import { mediaPath } from '../sitePath'
import BrushReveal from './BrushReveal'

export default function PaperImage({ image, className = '', width = 960, height = 640, eager = false }) {
  const [failedSrc, setFailedSrc] = useState('')
  const [loadedSrc, setLoadedSrc] = useState('')
  return <BrushReveal className={'paper-image ' + className} style={{ '--aspect': width + ' / ' + height }}
    ready={!image?.src || image.src === loadedSrc || image.src === failedSrc}>
    {image?.src && failedSrc !== image.src &&
      <img src={mediaPath(image.src)} alt={image.alt} width={width} height={height}
        loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false}
        onLoad={() => setLoadedSrc(image.src)}
        onError={() => setFailedSrc(image.src)} />}
  </BrushReveal>
}
