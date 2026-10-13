import { notFound } from 'next/navigation'
import { allPlaceholders } from '@/content/data/registry'

export const metadata = { robots: { index: false, follow: false } }

/** Elenco delle immagini segnaposto (solo in sviluppo) — letto da scripts/render-placeholders.mjs */
export default function Page() {
  if (process.env.NODE_ENV !== 'development') notFound()
  const list = allPlaceholders().map((m) => ({ src: m.src, width: m.width, height: m.height }))
  return <pre id="list">{JSON.stringify(list)}</pre>
}
