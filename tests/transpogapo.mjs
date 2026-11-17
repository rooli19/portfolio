import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const origin = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5174'
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(origin + '/works/transpogapo.html')
  await page.getByRole('navigation', { name: 'Scrapbook chapters' }).waitFor({ timeout: 5000 })
  assert.equal(await page.locator('.tg-tabs a').count(), 8)
  await page.getByRole('button', { name: 'Fly to next chapter' }).click()
  await page.getByRole('heading', { name: 'Start with the people' }).waitFor()
  assert.ok(page.url().endsWith('#people'))
  await page.reload()
  await page.getByRole('heading', { name: 'Start with the people' }).waitFor()
  await page.locator('.tg-tabs a[href="#journey"]').click()
  await page.getByRole('button', { name: '4. Ride & transfer' }).click()
  await page.getByText('Where do I change vehicles?', { exact: true }).waitFor()
  await page.goBack()
  await page.getByRole('heading', { name: 'Start with the people' }).waitFor()
  await page.locator('.tg-tabs a[href="#design"]').click()
  for (const label of ['Choose a journey', 'Compare trip options', 'Inspect the itinerary']) {
    await page.getByRole('button', { name: label, exact: true }).click()
  }
  await page.getByText('Board → ride → walk', { exact: true }).waitFor()
  await page.getByRole('button', { name: 'Reset prototype' }).click()
  await page.getByRole('button', { name: 'Choose a journey', exact: true }).waitFor()
  await page.locator('.tg-tabs a[href="#system"]').click()
  await page.getByRole('button', { name: /Enlarge/ }).first().click()
  await page.getByRole('dialog').waitFor()
  await page.keyboard.press('Tab')
  assert.equal(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), true)
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('dialog').count(), 0)
  assert.match(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), /Enlarge/)
  for (const name of ['Explore routes', 'Locate a terminal', 'Plan a trip', 'Follow directions']) {
    await page.getByRole('button', { name, exact: true }).click()
    await page.locator('.tg-system-view img').evaluate(image => image.decode())
    assert.equal(await page.locator('.tg-system-view img').evaluate(image => image.complete && image.naturalWidth > 0), true)
  }
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const id of ['overview', 'people', 'journey', 'design', 'system', 'build', 'evaluation', 'next']) {
      await page.locator(`.tg-tabs a[href="#${id}"]`).click()
      assert.equal(await page.locator('.tg-spread').getAttribute('data-chapter'), id)
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id} overflows at ${width}`)
    }
  }
  await page.goto(origin + '/works/transpogapo.html#unknown')
  await page.getByRole('heading', { name: 'A little less lost.' }).waitFor()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.getByRole('button', { name: 'Fly to next chapter' }).evaluate(button => { button.click(); button.click(); button.click() })
  await page.getByRole('heading', { name: 'Start with the people' }).waitFor()
  await page.waitForFunction(() => !document.querySelector('.tg-book').hasAttribute('data-flying'))
  assert.ok(page.url().endsWith('#people'))
  assert.equal(await page.locator('.tg-heading').evaluate(el => el === document.activeElement), true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.locator('.tg-tabs a[href="#next"]').focus()
  await page.keyboard.press('Enter')
  await page.getByRole('heading', { name: 'Keep checking the real journey' }).waitFor()
  await page.getByRole('button', { name: 'Return to first chapter' }).click()
  await page.getByRole('heading', { name: 'A little less lost.' }).waitFor()
  await page.route('**/photos/transpogapo-planner.png', route => route.abort())
  await page.reload()
  await page.getByText(/Image unavailable/).waitFor()
  await page.getByRole('button', { name: 'Fly to next chapter' }).click()
  await page.getByRole('heading', { name: 'Start with the people' }).waitFor()
  assert.deepEqual(errors, [])
  console.log('TranspoGAPO: chapters, history, prototype, journey, dialog, responsive layouts, reduced motion, and rapid navigation passed')
} finally {
  await browser.close()
}
