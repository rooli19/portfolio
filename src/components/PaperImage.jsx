import { useState } from 'react'
import { mediaPath } from '../sitePath'

export default function PaperImage({ image, className = '', width = 960, height = 640, eager = false }) {
  const [failedSrc, setFailedSrc] = useState('')
  return <div className={'paper-image ' + className} style={{ '--aspect': width + ' / ' + height }}>
    {image?.src && failedSrc !== image.src &&
      <img src={mediaPath(image.src)} alt={image.alt} width={width} height={height}
        loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false}
        onError={() => setFailedSrc(image.src)} />}
  </div>
}
