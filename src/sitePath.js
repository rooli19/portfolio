export function sitePath(path = '') {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

export function mediaPath(path) {
  if (!path?.startsWith('/') || path.startsWith('//') || path.startsWith(import.meta.env.BASE_URL)) return path
  return sitePath(path)
}
