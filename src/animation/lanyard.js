// The original rig maps its simulated angle to half the usual degrees.
const angleUnit = Math.PI / 90
const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))

export function createLanyard() {
  return {
    x: 0, velocity: 0, target: 0, drop: -600, dropVelocity: 0, delay: 0.1, caught: false,
    stretch: 0, stretchVelocity: 0,
    strap: { angle: 0, velocity: -150 * 0.2 * angleUnit },
    card: { angle: 14 * angleUnit, velocity: -150 * angleUnit },
    depth: { angle: 0, velocity: 0 },
  }
}

function swing(body, acceleration, dt, { length, damping, drive, limit, bounce }) {
  const force = -(2600 * Math.sin(body.angle) + acceleration * drive * Math.cos(body.angle)) / length
  body.velocity += (force - damping * body.velocity) * dt
  body.angle += body.velocity * dt
  if (Math.abs(body.angle) > limit) {
    body.angle = clamp(body.angle, limit)
    if (bounce !== undefined) body.velocity *= -bounce
  }
}

export function advanceLanyard(state, dt) {
  const oldDropVelocity = state.dropVelocity
  if (state.delay > 0) {
    state.delay -= dt
  } else {
    const force = state.caught ? -1200 * state.drop - 26 * state.dropVelocity : 3000
    state.dropVelocity += force * dt
    state.drop += state.dropVelocity * dt
    if (state.drop >= 0) state.caught = true
  }
  const dropAcceleration = (state.dropVelocity - oldDropVelocity) / dt
  state.stretchVelocity += (-dropAcceleration * 0.5 - 900 * state.stretch - 18 * state.stretchVelocity) * dt
  state.stretch = clamp(state.stretch + state.stretchVelocity * dt, 120)

  const acceleration = (state.target - state.x) * 90 - state.velocity * 14
  state.velocity += acceleration * dt
  state.x += state.velocity * dt
  swing(state.strap, acceleration, dt, { length: 620, damping: 2.2, drive: 0.55, limit: 18 * angleUnit })
  swing(state.card, acceleration, dt, { length: 190, damping: 1.15, drive: 1, limit: 62 * angleUnit, bounce: 0.65 })
  swing(state.depth, acceleration, dt, { length: 285, damping: 0.805, drive: 0.7, limit: 1.2 })

  return {
    x: state.x, y: state.drop,
    strapAngle: state.strap.angle / angleUnit, cardAngle: state.card.angle / angleUnit,
    stretch: state.stretch, depth: 40 * Math.sin(state.depth.angle), yaw: clamp(state.card.velocity * 16, 32),
  }
}
