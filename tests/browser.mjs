import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { gzipSync } from 'node:zlib'
import { chromium, firefox, webkit } from 'playwright'

const dist = resolve('dist')
const results = resolve('test-results')
const base = process.env.PORTFOLIO_BASE || '/'
const routes = {
  '/': 'I’m Rholly Cao',
  '/about.html': 'About',
  '/works.html': 'Works',
  '/playground.html': 'Playground',
  '/contact.html': 'Say hello',
  '/works/transpogapo.html': 'TranspoGAPO',
  '/works/resh.html': 'RESH',
  '/works/landr.html': 'Landr.',
  '/works/hiss-n-miss.html': 'Hiss n Miss',
}
const aliases = { zen: 'transpogapo', uno: 'resh', danang: 'landr', katagina: 'hiss-n-miss' }
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname
  const relative = pathname.slice(base.length)
  const file = resolve(dist, './' + (relative || 'index.html'))
  try {
    if (!pathname.startsWith(base) || !file.startsWith(dist + sep)) throw new Error('Outside build')
    const content = await readFile(file)
    const type = extname(file)
    const compress = ['.html', '.js', '.css', '.svg'].includes(type)
    response.writeHead(200, {
      'Content-Type': mime[type] || 'application/octet-stream',
      ...(compress ? { 'Content-Encoding': 'gzip' } : {}),
    })
    response.end(compress ? gzipSync(content) : content)
  } catch {
    response.writeHead(404, { 'Content-Type': mime['.html'] })
    response.end(await readFile(resolve(dist, '404.html')))
  }
})

await new Promise((done, fail) => {
  server.once('error', fail)
  server.listen(0, '127.0.0.1', done)
})
const origin = 'http://127.0.0.1:' + server.address().port
const site = origin + base.slice(0, -1)
const mobile = { width: 402, height: 874 }
const desktop = { width: 1440, height: 900 }
await mkdir(results, { recursive: true })

async function checkPage(page, route, title) {
  await page.getByRole('navigation', { name: 'Main navigation' }).waitFor()
  const heading = page.getByRole('heading', { name: title, exact: true, level: 1 })
  await heading.waitFor({ state: route === '/playground.html' ? 'attached' : 'visible' })
  assert.equal(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible(), true)
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route + ' has horizontal overflow')
  const levels = await page.locator('main :is(h1, h2, h3)').evaluateAll(headings => headings.map(item => Number(item.tagName[1])))
  assert.ok(levels.every((level, index) => index === 0 ? level === 1 : level <= levels[index - 1] + 1), route + ' skips a heading level')
}

function watch(page) {
  const failures = []
  page.on('pageerror', error => failures.push(error.message))
  page.on('response', response => {
    if (response.status() >= 400) failures.push(response.status() + ' ' + response.url())
  })
  page.on('requestfailed', request => {
    const error = request.failure()?.errorText
    if (!/ABORT|cancelled|interrupted/i.test(error || '')) failures.push(error + ' ' + request.url())
  })
  page.on('request', request => {
    if (!request.url().startsWith(origin + '/')) failures.push('External request: ' + request.url())
  })
  return failures
}

async function reportTransfer(page) {
  return page.evaluate(() => {
    const entries = performance.getEntriesByType('resource')
    return {
      javascriptGzip: entries.filter(entry => new URL(entry.name).pathname.endsWith('.js'))
        .reduce((total, entry) => total + entry.encodedBodySize, 0),
      totalTransfer: entries.reduce((total, entry) => total + entry.transferSize, performance.getEntriesByType('navigation')[0].transferSize),
    }
  })
}

async function smoke(engine, browser) {
  const transfer = {}
  for (const viewport of [desktop, mobile]) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce', hasTouch: viewport === mobile })
    const failures = watch(page)
    for (const [route, title] of Object.entries(routes)) {
      const response = await page.goto(site + route)
      assert.equal(response.status(), 200, route)
      await checkPage(page, route, title)
      if (route === '/playground.html') {
        assert.equal(await page.locator('.gallery-photo').count(), 5)
        assert.equal(await page.locator('.playground-canvas').count(), 0)
      }
      if (engine === 'chromium') {
        await page.locator('img').evaluateAll(images =>
          Promise.all(images.filter(image => image.getBoundingClientRect().top < innerHeight)
            .map(image => image.decode())))
        await page.evaluate(() => document.fonts.ready)
        await page.waitForLoadState('networkidle')
        const name = route === '/' ? 'home' : route.slice(1, -5).replaceAll('/', '-')
        await page.screenshot({ path: resolve(results, viewport.width + '-' + name + '.png'), animations: 'disabled' })
        const sizes = await reportTransfer(page)
        transfer[viewport.width + ' ' + route] = sizes
      }
    }
    await page.close()
    assert.deepEqual(failures, [], engine + ' ' + viewport.width)
  }

  const page = await browser.newPage({ viewport: mobile })
  for (const [old, slug] of Object.entries(aliases)) {
    await page.goto(site + '/works/' + old + '.html?ref=old#main')
    await page.waitForURL(site + '/works/' + slug + '.html?ref=old#main')
  }
  await page.goto(site + '/works.html')
  await page.getByRole('link', { name: /TranspoGAPO/ }).click()
  await checkPage(page, '/works/transpogapo.html', routes['/works/transpogapo.html'])
  await page.reload()
  await checkPage(page, '/works/transpogapo.html', routes['/works/transpogapo.html'])
  await page.goBack()
  await checkPage(page, '/works.html', 'Works')
  await page.goForward()
  await checkPage(page, '/works/transpogapo.html', 'TranspoGAPO')
  const response = await page.goto(site + '/missing.html')
  assert.equal(response.status(), 404)
  await page.getByRole('heading', { name: 'Page not found' }).waitFor()
  await page.close()
  return transfer
}

async function repeatNavigation(browser) {
  await Promise.all(Array.from({ length: 5 }, async () => {
    const page = await browser.newPage({
      viewport: mobile, deviceScaleFactor: 3, hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 Version/18.6 Mobile/15E148 Safari/604.1',
    })
    const failures = watch(page)
    await page.goto(site + '/')
    for (const section of ['works', 'about', 'playground', 'contact']) {
      const route = '/' + section + '.html'
      await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: section, exact: true }).click()
      await checkPage(page, route, routes[route])
      await page.waitForTimeout(10000)
      await checkPage(page, route, routes[route])
    }
    await page.close()
    assert.deepEqual(failures, [])
  }))
}

async function regressions(browser) {
  const page = await browser.newPage({ viewport: mobile })
  await page.route('**/assets/PlaygroundCanvas-*.js', route => route.abort())
  await page.goto(site + '/playground.html')
  await checkPage(page, '/playground.html', 'Playground')
  await page.locator('.gallery-photo').first().waitFor()
  assert.equal(await page.locator('.playground-canvas').count(), 0)
  await page.close()

  const noWebGL = await browser.newPage({ viewport: mobile })
  await noWebGL.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.startsWith('webgl') ? null : original.call(this, type, ...args)
    }
  })
  await noWebGL.goto(site + '/playground.html')
  await checkPage(noWebGL, '/playground.html', 'Playground')
  await noWebGL.locator('.gallery-photo').first().waitFor()
  await noWebGL.close()

  const boot = await browser.newPage()
  await boot.route('**/assets/*.js', route => route.abort())
  await boot.goto(site + '/works.html')
  await boot.getByText('This page could not load.', { exact: false }).waitFor()
  assert.equal(await boot.getByRole('link', { name: 'Home', exact: true }).isVisible(), true)
  await boot.close()

  const normal = await browser.newPage({ viewport: desktop })
  await normal.route('**/assets/portrait-*.webp', route => route.abort())
  await normal.goto(site + '/')
  await normal.locator('.lanyard .paper-image img').waitFor({ state: 'detached' })
  assert.equal(await normal.locator('.lanyard .paper-image').isVisible(), true)
  await normal.mouse.move(1100, 425)
  await normal.waitForFunction(() =>
    new DOMMatrix(getComputedStyle(document.querySelector('.lanyard-assembly')).transform).m41 > 20)
  assert.ok(await normal.getByRole('button', { name: 'Showreel video to be added' }).isDisabled())
  await normal.getByRole('button', { name: 'Next photo', exact: true }).click()
  assert.equal(await normal.locator('.camera-counter').textContent(), '002–008')
  await normal.getByRole('button', { name: 'Previous photo' }).click()
  assert.equal(await normal.locator('.camera-counter').textContent(), '001–008')
  await normal.getByRole('button', { name: 'Take a snapshot' }).click()
  assert.equal(await normal.locator('.camera-flash').count(), 1)
  await normal.getByRole('button', { name: 'Move photo to end of the roll' }).click()
  assert.equal(await normal.locator('.camera-photo').count() > 0, true)
  const notebook = normal.locator('.notebook-section')
  await notebook.evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + scrollY + element.offsetHeight * 0.35))
  await notebook.locator('[data-revealed="true"]').waitFor()
  await notebook.evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + scrollY))
  await notebook.locator('[data-revealed="false"]').waitFor()
  await normal.locator('.notebook-cover').click()
  assert.ok(await normal.getByLabel('Your name').isVisible())
  await normal.unroute('**/assets/portrait-*.webp')
  await normal.goto(site + '/about.html')
  const rope = normal.locator('.about-rope')
  const path = rope.locator('path').first()
  const resting = await path.getAttribute('d')
  const ropeBox = await rope.boundingBox()
  await normal.mouse.move(ropeBox.x + ropeBox.width / 2, ropeBox.y + 15)
  await normal.mouse.move(ropeBox.x + ropeBox.width / 2, ropeBox.y + ropeBox.height * 0.86, { steps: 6 })
  await normal.waitForFunction(rest => document.querySelector('.about-rope path').getAttribute('d') !== rest, resting)
  await normal.goto(site + '/playground.html')
  const gallery = normal.locator('.gallery-stage[data-moving="true"]')
  await gallery.waitFor()
  const canvas = gallery.locator('canvas')
  const before = await canvas.screenshot()
  await normal.mouse.move(570, 350)
  await normal.mouse.down()
  await normal.mouse.move(870, 350, { steps: 10 })
  assert.equal(await gallery.getAttribute('data-dragging'), 'true')
  await normal.mouse.up()
  assert.notDeepEqual(await canvas.screenshot(), before)
  await normal.goto(site + '/works.html')
  await normal.waitForFunction(() => {
    const title = document.querySelector('.ink-title')
    const picture = document.querySelector('.project-card .paper-image')
    return title && picture && [title, picture].every(item => getComputedStyle(item).maskImage.startsWith('url('))
  })
  await normal.waitForFunction(() => getComputedStyle(document.querySelector('.ink-title')).maskImage === 'none')
  const aboutLink = normal.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'about' })
  await aboutLink.hover()
  assert.equal(await aboutLink.evaluate(link => getComputedStyle(link, '::after').animationName), 'draw-on')
  const newTab = normal.context().waitForEvent('page')
  await normal.getByRole('link', { name: /TranspoGAPO/ }).click({ modifiers: ['ControlOrMeta'] })
  const opened = await newTab
  await opened.waitForURL('**/works/transpogapo.html')
  assert.equal(new URL(normal.url()).pathname, base + 'works.html')
  await opened.close()
  await normal.keyboard.press('Tab')
  await normal.keyboard.press('Tab')
  assert.ok(await normal.evaluate(() => document.activeElement.matches(':focus-visible')))
  await normal.goto(site + '/contact.html')
  const form = normal.locator('form')
  assert.equal(await form.evaluate(element => element.checkValidity()), false)
  await normal.getByLabel('Your name').fill('Test & Name')
  await normal.getByLabel('Email address').fill('bad-address')
  await normal.getByLabel('Message').fill('Hello?')
  assert.equal(await form.evaluate(element => element.checkValidity()), false)
  await normal.getByLabel('Email address').fill('test@example.com')
  assert.equal(await form.evaluate(element => element.checkValidity()), true)
  // Inspect the attempted navigation without opening the desktop email app.
  const cdp = await normal.context().newCDPSession(normal)
  await cdp.send('Page.enable')
  const draft = new Promise(done => cdp.once('Page.frameRequestedNavigation', done))
  await normal.getByRole('button', { name: 'Send it' }).click()
  const draftRequest = await Promise.race([draft, new Promise(done => setTimeout(() => done(null), 2500))])
  assert.ok(draftRequest, 'No email draft was requested')
  const mailto = new URL(draftRequest.url)
  assert.equal(mailto.protocol, 'mailto:')
  assert.equal(mailto.pathname, 'caorholly14@gmail.com')
  assert.equal(mailto.searchParams.get('subject'), 'Portfolio enquiry from Test & Name')
  assert.equal(mailto.searchParams.get('body'), 'Hello?\n\nFrom Test & Name\nReply to test@example.com')
  for (const width of [360, 768]) {
    await normal.setViewportSize({ width, height: 874 })
    for (const [route, title] of Object.entries(routes)) {
      await normal.goto(site + route)
      await checkPage(normal, route, title)
    }
  }
  await normal.route('**/assets/*.js', async route => {
    await new Promise(done => setTimeout(done, 600))
    await route.continue()
  })
  await normal.goto(site + '/works.html', { waitUntil: 'commit' })
  await normal.getByText('Loading portfolio…').waitFor()
  await checkPage(normal, '/works.html', 'Works')
  await normal.close()

  const touch = await browser.newPage({ viewport: mobile, hasTouch: true, isMobile: true })
  await touch.goto(site + '/')
  const portrait = touch.locator('.lanyard')
  await portrait.waitFor()
  const photoBox = await portrait.boundingBox()
  const x = Math.round(photoBox.x + photoBox.width / 2)
  const y = Math.round(photoBox.y + photoBox.height / 2)
  const touchSession = await touch.context().newCDPSession(touch)
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + 30, y }] })
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + 43, y }] })
  await touch.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('.lanyard-assembly')).transform).m41 > 8)
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await touch.waitForFunction(() => Math.abs(new DOMMatrix(getComputedStyle(document.querySelector('.lanyard-assembly')).transform).m41) < 2)
  await touch.goto(site + '/playground.html')
  const touchGallery = touch.locator('.gallery-stage[data-moving="true"]')
  await touchGallery.waitFor()
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 215, y: 350 }] })
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 150, y: 350 }] })
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 80, y: 350 }] })
  assert.equal(await touchGallery.getAttribute('data-dragging'), 'true')
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await touch.close()
}

try {
  const runs = await Promise.allSettled(Object.entries({ chromium, firefox, webkit }).map(async ([engine, type]) => {
    const browser = await type.launch(engine === 'chromium' ? { args: ['--enable-unsafe-swiftshader'] } : {})
    try {
      const transfer = await smoke(engine, browser)
      console.log(engine + ': direct routes, redirects, navigation, and both viewports passed')
      if (engine === 'chromium') {
        await writeFile(resolve(results, 'transfer.json'), JSON.stringify(transfer, null, 2))
        await regressions(browser)
        console.log(engine + ': gallery and lanyard motion, camera, notebook, fallbacks, keyboard, contact, and slow load passed')
      }
      if (engine === 'firefox') {
        await repeatNavigation(browser)
        console.log(engine + ': 20 mobile transitions stayed visible for 10 seconds each')
      }
    } finally {
      await browser.close()
    }
  }))
  for (const run of runs) {
    if (run.status === 'rejected') {
      console.error(run.reason)
      process.exitCode = 1
    }
  }
} finally {
  server.close()
}
