import {
  AmbientLight, BufferGeometry, CanvasTexture, DirectionalLight, DoubleSide, Group, Line, LineBasicMaterial,
  LineDashedMaterial, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, Scene,
  Vector3, WebGLRenderer,
} from 'three'
import { loadPaperArtwork, paintPaper } from './paperTexture'

const radians = Math.PI / 180
const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))
const wrap = (value, span) => ((value % span) + span) % span

function makeShadow() {
  const canvas = document.createElement('canvas')
  canvas.width = 160
  canvas.height = 200
  const brush = canvas.getContext('2d')
  brush.shadowColor = '#000'
  brush.shadowBlur = 21
  brush.shadowOffsetX = 256
  brush.fillRect(26 - 256, 26, 108, 148)
  const texture = new CanvasTexture(canvas)
  return new MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.19, depthWrite: false })
}

function makeCard(photo, image, paper, width, wireLength, shadowMaterial) {
  const { texture, height } = paintPaper(photo, image, paper, width)
  const geometry = new PlaneGeometry(width, height, 10, 6).translate(0, -height / 2, 0)
  const material = new MeshLambertMaterial({ map: texture, side: DoubleSide })
  const sheet = new Mesh(geometry, material)
  sheet.frustumCulled = false
  const shadow = new Mesh(new PlaneGeometry(width * 1.46, height * 1.35), shadowMaterial)
  shadow.position.set(0, -height / 2 - 13, -6)
  shadow.renderOrder = -1
  const clip = new Line(
    new BufferGeometry().setFromPoints([new Vector3(0, 0, 2), new Vector3(0, -15, 2),
      new Vector3(3, -19, 2), new Vector3(6, -16, 2), new Vector3(6, -9, 2)]),
    new LineBasicMaterial({ color: 0x77746d }),
  )
  const wire = new Line(
    new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, wireLength, 0)]),
    new LineDashedMaterial({ color: 0x858585, dashSize: 1, gapSize: 2 }),
  )
  wire.computeLineDistances()
  const hanger = new Group()
  hanger.add(shadow, sheet, clip, wire)
  const count = geometry.attributes.position.count
  return {
    hanger, sheet, clip, wire, shadow, texture, height, width,
    angle: 0, angularVelocity: 0, nudge: 0, cursorX: 0, cursorY: 0,
    depth: new Float32Array(count), depthVelocity: new Float32Array(count),
  }
}

function bendPaper(card, time, dt, air, seed) {
  const vertices = card.sheet.geometry.attributes.position
  for (let index = 0; index < vertices.count; index++) {
    const x = vertices.getX(index)
    const y = vertices.getY(index)
    const across = x / card.width * 2
    const down = -y / card.height
    const loose = Math.min(1, Math.hypot(across * 0.5, down) * 1.4)
    const curl = 4 * across * across * (0.35 + down * 0.65)
    const flutter = air * loose * (5 * Math.sin(across * 2.4 - time * 4.2 + down * 2.8 + seed) +
      2 * Math.sin(across * 9 + down * 6.5 - time * 11 + seed))
    const distance = (x - card.cursorX) ** 2 + (y - card.cursorY) ** 2
    const ripple = card.nudge * Math.exp(-distance / 7200) * loose
    card.depthVelocity[index] += ((curl + flutter + ripple - card.depth[index]) * 58 - card.depthVelocity[index] * 8) * dt
    card.depth[index] += card.depthVelocity[index] * dt
    vertices.setZ(index, card.depth[index])
  }
  vertices.needsUpdate = true
  card.sheet.geometry.computeVertexNormals()
}

function disposeCard(card) {
  for (const item of [card.sheet, card.clip, card.wire]) {
    item.geometry.dispose()
    item.material.dispose()
  }
  card.texture.dispose()
  card.shadow.geometry.dispose()
}

export function startGallery(stage, canvas, photos, onReady, onUnavailable) {
  let renderer
  try {
    const context = canvas.getContext('webgl2', { alpha: true, antialias: true })
    if (!context) return onUnavailable()
    renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true })
  } catch {
    return onUnavailable()
  }

  const scene = new Scene()
  const camera = new PerspectiveCamera(30, 1, 1, 20_000)
  const key = new DirectionalLight(0xfffdf4, 0.85)
  key.position.set(-1, 2, 5)
  scene.add(new AmbientLight(0xffffff, 2), key)
  const shadowMaterial = makeShadow()
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setClearColor(0, 0)

  let width = 0
  let height = 0
  let spacing = 0
  let wireLength = 0
  let offset = 0
  let dragDelta = 0
  let dragVelocity = 0
  let fling = 0
  let wheel = 0
  let scrollVelocity = 0
  let air = 0
  let lastScroll = scrollY
  let drag = null
  let cards = []
  let artwork
  let disposed = false
  let visible = true
  let frame
  let previousTime

  function rebuild() {
    if (!artwork || disposed) return
    width = stage.clientWidth
    height = stage.clientHeight
    if (!width || !height) return
    const columns = width < 810 ? 1.5 : width < 1200 ? 3 : 4.5
    const gap = 56
    const columnWidth = (width - gap * (columns - 1)) / columns
    spacing = columnWidth + gap
    wireLength = innerHeight * 0.25
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.position.z = height / (2 * Math.tan(15 * radians))
    camera.updateProjectionMatrix()
    for (const card of cards) {
      scene.remove(card.hanger)
      disposeCard(card)
    }
    const count = photos.length * Math.ceil((columns + 2) / photos.length)
    cards = Array.from({ length: count }, (_, index) => {
      const photo = index % photos.length
      const card = makeCard(photos[photo], artwork.images[photo], artwork.paper, columnWidth * 0.9, wireLength, shadowMaterial)
      scene.add(card.hanger)
      return card
    })
  }

  function update(time) {
    if (disposed) return
    frame = requestAnimationFrame(update)
    const dt = Math.min((time - (previousTime ?? time)) / 1000, 0.04)
    previousTime = time
    if (dt <= 0 || !visible || document.hidden || !cards.length) return

    const scrollDelta = scrollY - lastScroll
    lastScroll = scrollY
    const inputVelocity = clamp((scrollDelta || wheel) / dt, 5000)
    wheel = 0
    const response = Math.abs(inputVelocity) > Math.abs(scrollVelocity) ? 0.02 : 0.15
    scrollVelocity += (inputVelocity - scrollVelocity) * (1 - Math.exp(-dt / response))
    if (drag) {
      dragVelocity += (dragDelta / dt - dragVelocity) * Math.min(1, dt * 20)
      fling = dragVelocity
    } else {
      fling *= Math.exp(-dt * 2.6)
    }

    const travel = (drag ? 0 : -32 + fling) - scrollVelocity * 1.3
    offset += travel * dt + dragDelta
    dragDelta = 0
    const speed = drag ? dragVelocity : travel
    air += (Math.min(1.6, Math.abs(speed) / 600) + 0.34 - air) * Math.min(1, dt * 3)

    cards.forEach((card, index) => {
      const seed = index * 2.37
      const breeze = Math.sin(time / 1000 * (0.5 + index % 3 * 0.23) + seed) * 3.4 * 38
      card.angularVelocity += (-38 * card.angle - 3.2 * card.angularVelocity + speed * 0.49 + breeze) * dt
      card.angle = clamp(card.angle + card.angularVelocity * dt, 3)
      const wireAngle = card.angle * 0.12 * radians
      const x = wrap(index * spacing + offset + spacing, cards.length * spacing) - spacing + (spacing - 56) / 2
      const center = x - wireLength * Math.sin(wireAngle)
      card.hanger.visible = center + card.width > 0 && center - card.width < width
      if (!card.hanger.visible) return
      card.hanger.position.set(center - width / 2, height / 2 - wireLength * Math.cos(wireAngle), 0)
      card.sheet.rotation.z = -card.angle * radians
      card.sheet.rotation.y = clamp(card.angularVelocity * 0.12, 35) * radians
      card.shadow.rotation.copy(card.sheet.rotation)
      card.wire.rotation.z = -wireAngle
      card.nudge *= Math.exp(-dt * 6)
      bendPaper(card, time / 1000, dt, air, seed)
    })
    renderer.render(scene, camera)
  }

  function pointerDown(event) {
    if (!event.isPrimary || event.button !== 0) return
    drag = { id: event.pointerId, x: event.clientX }
    dragVelocity = 0
    stage.setPointerCapture(event.pointerId)
    stage.dataset.dragging = 'true'
  }
  function pointerMove(event) {
    if (drag?.id === event.pointerId) {
      dragDelta += event.clientX - drag.x
      drag.x = event.clientX
      return
    }
    if (event.pointerType !== 'mouse') return
    const bounds = stage.getBoundingClientRect()
    const x = event.clientX - bounds.left - width / 2
    const y = height / 2 - (event.clientY - bounds.top)
    const card = cards.find(item => item.hanger.visible &&
      Math.abs(x - item.hanger.position.x) < item.width / 2 &&
      y <= item.hanger.position.y && y >= item.hanger.position.y - item.height)
    if (card) {
      card.cursorX = x - card.hanger.position.x
      card.cursorY = y - card.hanger.position.y
      card.nudge += clamp(event.movementX + event.movementY * 0.5, 12) * 0.5
    }
  }
  function pointerUp() {
    drag = null
    delete stage.dataset.dragging
  }
  function onWheel(event) {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    wheel += delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)
  }
  function onKey(event) {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return
    event.preventDefault()
    fling = event.key === 'ArrowRight' ? -550 : 550
  }
  const listeners = [
    ['pointerdown', pointerDown], ['pointermove', pointerMove], ['lostpointercapture', pointerUp],
    ['pointercancel', pointerUp], ['wheel', onWheel], ['keydown', onKey],
  ]
  listeners.forEach(([event, listener]) => stage.addEventListener(event, listener, { passive: event === 'wheel' }))
  const resize = new ResizeObserver(rebuild)
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    lastScroll = scrollY
  })
  resize.observe(stage)
  intersection.observe(stage)
  const contextLost = () => {
    onUnavailable()
  }
  canvas.addEventListener('webglcontextlost', contextLost)
  loadPaperArtwork(photos).then(result => {
    if (disposed) return
    artwork = result
    rebuild()
    previousTime = performance.now() - 16
    update(performance.now())
    onReady()
  }).catch(() => {
    if (!disposed) onUnavailable()
  })

  return () => {
    disposed = true
    cancelAnimationFrame(frame)
    resize.disconnect()
    intersection.disconnect()
    canvas.removeEventListener('webglcontextlost', contextLost)
    listeners.forEach(([event, listener]) => stage.removeEventListener(event, listener))
    cards.forEach(disposeCard)
    shadowMaterial.map.dispose()
    shadowMaterial.dispose()
    renderer.dispose()
  }
}
