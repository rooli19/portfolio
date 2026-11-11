// Vite tracks filenames here. The images themselves are served from /photos/.
const filenames = new Set(Object.keys(import.meta.glob('/public/photos/*.png')).map(path => path.split('/').at(-1)))

function photo(filename, alt) {
  return filenames.has(filename) ? { src: '/photos/' + filename, alt } : { src: '', alt: '' }
}

function projectSlots(slug, name) {
  return Object.fromEntries(['cover', 'process', 'interface', 'result'].map(slot =>
    [slot, photo(slug + '-' + slot + '.png', name + ' ' + slot + ' screenshot')]))
}

const numberedPhoto = (group, index) => photo(group + '-' + String(index + 1).padStart(2, '0') + '.png', group + ' photo ' + (index + 1))

export const media = {
  transpogapo: {
    ...projectSlots('transpogapo', 'TranspoGAPO'),
    cover: photo('transpogapo-cover.png', 'TranspoGAPO’s route browser showing the hand signals for the two Yellow Line destinations'),
  },
  resh: projectSlots('resh', 'RESH'),
  landr: projectSlots('landr', 'Landr.'),
  'hiss-n-miss': projectSlots('hiss-n-miss', 'Hiss n Miss'),
}

export const playgroundPhotos = [
  'Experiments and explorations',
  'Creative work',
  '',
  'Ideas in progress',
  '',
].map((caption, index) => ({ ...numberedPhoto('playground', index), caption }))

export const cameraPhotos = Array.from({ length: 8 }, (_, index) => ({ id: index + 1, ...numberedPhoto('camera', index) }))
