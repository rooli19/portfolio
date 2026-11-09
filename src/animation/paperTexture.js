import { CanvasTexture, SRGBColorSpace } from 'three'
import paperUrl from '../assets/paper.avif'
import { mediaPath } from '../sitePath'

function loadImage(src) {
  if (!src) return Promise.resolve(null)
  return new Promise(resolve => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => resolve(null)
    image.src = mediaPath(src)
  })
}

export async function loadPaperArtwork(photos) {
  const [paper, ...images] = await Promise.all([loadImage(paperUrl), ...photos.map(photo => loadImage(photo.src))])
  await document.fonts.load('700 16px Caveat').catch(() => {})
  return { paper, images }
}

export function paintPaper(photo, image, paper, width) {
  const border = 12
  const top = photo.caption ? 46 : 18
  const innerWidth = width - border * 2
  const innerHeight = innerWidth / 0.8
  const height = top + innerHeight + border
  const canvas = document.createElement('canvas')
  canvas.width = Math.ceil(width * 2)
  canvas.height = Math.ceil(height * 2)
  const context = canvas.getContext('2d')
  context.scale(2, 2)
  context.fillStyle = '#fafaf7'
  context.fillRect(0, 0, width, height)

  if (photo.caption) {
    context.font = '700 16px Caveat, cursive'
    context.textAlign = 'center'
    context.fillStyle = '#171717'
    context.fillText(photo.caption, width / 2, 32, innerWidth)
  }

  context.fillStyle = '#eae7db'
  context.fillRect(border, top, innerWidth, innerHeight)
  if (image) {
    const scale = Math.max(innerWidth / image.width, innerHeight / image.height)
    const sourceWidth = innerWidth / scale
    const sourceHeight = innerHeight / scale
    context.drawImage(image, (image.width - sourceWidth) / 2, (image.height - sourceHeight) / 2,
      sourceWidth, sourceHeight, border, top, innerWidth, innerHeight)
  }
  if (paper) {
    context.globalAlpha = image ? 0.13 : 0.4
    context.drawImage(paper, border, top, innerWidth, innerHeight)
    context.globalAlpha = 1
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return { texture, height }
}
