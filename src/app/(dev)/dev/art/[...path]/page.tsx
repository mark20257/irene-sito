import { notFound } from 'next/navigation'
import { Art } from '@/components/art/Art'
import { allPlaceholders } from '@/content/data/registry'

export const metadata = { robots: { index: false, follow: false } }

/** Un singolo visual segnaposto a dimensione piena (solo in sviluppo). */
export default async function Page({ params }: { params: Promise<{ path: string[] }> }) {
  if (process.env.NODE_ENV !== 'development') notFound()
  const { path } = await params
  const media = allPlaceholders().find((m) => m.src === `/images/${path.join('/')}.webp`)
  if (!media?.art) notFound()
  return (
    <div id="art" style={{ width: media.width, height: media.height }}>
      <Art spec={media.art} locale="it" label={media.alt.it} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
