// Put new media in public/photos. Use paths such as /photos/transpogapo-map.webp.
const blank = () => ({ src: '', alt: '' })
const projectSlots = () => ({ cover: blank(), process: blank(), interface: blank(), result: blank() })

export const media = {
  transpogapo: projectSlots(),
  resh: projectSlots(),
  landr: projectSlots(),
  'hiss-n-miss': projectSlots(),
}

export const playgroundPhotos = [
  { ...blank(), caption: 'Experiments and explorations' },
  { ...blank(), caption: 'Creative work' },
  blank(),
  { ...blank(), caption: 'Ideas in progress' },
  blank(),
]

export const showreel = { src: '', poster: '' }
export const cameraPhotos = [
  blank(), blank(), blank(), blank(),
  blank(), blank(), blank(), blank(),
].map((photo, index) => ({ id: index + 1, ...photo }))
