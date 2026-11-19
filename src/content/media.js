// Vite tracks filenames here. The images themselves are served from /photos/.
const filenames = new Set(Object.keys(import.meta.glob('/public/photos/*.{png,webp}')).map(path => path.split('/').at(-1)))

function photo(filename, alt) {
  return filenames.has(filename) ? { src: '/photos/' + filename, alt } : { src: '', alt: '' }
}

function projectSlots(slug, name) {
  return Object.fromEntries(['cover', 'process', 'interface', 'result'].map(slot =>
    [slot, photo(slug + '-' + slot + '.png', name + ' ' + slot + ' screenshot')]))
}

function projectMedia({ slug, name, descriptions, prefix = slug, cover = photo(slug + '-cover.png', name + ' cover') }) {
  const { process, interface: interfaceImage, result } = projectSlots(slug, name)
  const numbered = [...filenames]
    .filter(filename => filename.startsWith(prefix + '-') && /^\d+\.png$/.test(filename.slice(prefix.length + 1)))
    .map(filename => ({ filename, number: parseInt(filename.slice(prefix.length + 1), 10) }))
    .sort((first, second) => first.number - second.number)
    .map(({ filename, number }) => photo(filename, descriptions[number - 1] || `${name} screenshot ${number}`))

  return { cover, screenshots: [cover, ...numbered, process, interfaceImage, result].filter(image => image.src) }
}

export const media = {
  transpogapo: {
    ...projectSlots('transpogapo', 'TranspoGAPO'),
    cover: photo('transpogapo-cover.png', 'TranspoGAPO homepage introducing jeepney routes and tricycle terminals in Olongapo'),
  },
  resh: projectMedia({ slug: 'resh', name: 'RESH', descriptions: [
    'RESH account registration on mobile', 'RESH mobile spending dashboard', 'RESH receipt scanner',
    'Scanned receipt and extracted details in RESH', 'RESH spending totals and category breakdown',
  ] }),
  landr: projectMedia({ slug: 'landr', name: 'Landr.', descriptions: [
    'New Landr. registration form with a parcel map', 'Selected property on the Landr. map',
    'Landr. smart certificate', 'Landr. record verification result',
  ] }),
  'hiss-n-miss': projectMedia({ slug: 'hiss-n-miss', name: 'Hiss n Miss', prefix: 'hiss',
    cover: {
      ...photo('hiss-n-miss-cover.webp', 'Hiss n Miss gameplay preview'),
      preview: '/photos/hiss-n-miss-preview.webm',
    },
    descriptions: ['Hiss n Miss gameplay with a character dodging obstacles', 'Hiss n Miss end-of-run score screen'],
  }),
}
