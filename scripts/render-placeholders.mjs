/**
 * Rigenera le immagini segnaposto (public/images/**.webp) dai "visual generativi".
 * Serve solo finché non hai le foto vere.
 *
 *   npm i --no-save playwright && npx playwright install chromium   # la prima volta
 *   npm run dev                                                      # in un terminale
 *   node scripts/render-placeholders.mjs [http://localhost:3000]     # in un altro
 *
 * Non sovrascrive i file che hai già sostituito con foto vere se aggiungi --skip-existing.
 */
import { createRequire } from 'node:module'
import { mkdir, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const sharp = require('sharp')

const base = process.argv.find((a) => a.startsWith('http')) || 'http://localhost:3000'
const skipExisting = process.argv.includes('--skip-existing')
const root = join(dirname(new URL(import.meta.url).pathname), '..', 'public')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(`${base}/dev/art`, { waitUntil: 'networkidle' })
const list = JSON.parse(await page.locator('#list').textContent())

for (const item of list) {
  const out = join(root, item.src)
  if (skipExisting) {
    try {
      await access(out)
      console.log('salto (esiste già)', item.src)
      continue
    } catch {}
  }
  await page.setViewportSize({ width: item.width, height: item.height })
  await page.goto(`${base}/dev/art${item.src.replace('/images', '').replace(/\.webp$/, '')}`, { waitUntil: 'networkidle' })
  // nasconde l'indicatore di sviluppo di Next.js
  await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' })
  await page.evaluate(() => document.fonts.ready)
  const png = await page.locator('#art').screenshot({ type: 'png' })
  await mkdir(dirname(out), { recursive: true })
  await sharp(png).webp({ quality: 80, effort: 6 }).toFile(out)
  console.log('✓', item.src)
}
await browser.close()
