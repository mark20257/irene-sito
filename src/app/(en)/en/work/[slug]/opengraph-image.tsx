import { getCase, cases } from '@/content/data/cases'
import { caseOgImage, ogContentType, ogSize } from '@/lib/og'

export const alt = 'Case study — Irene Chies'
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug) ?? cases[0]
  return caseOgImage({ client: c.client, excerpt: c.excerpt.en, metric: c.highlight.value, metricLabel: c.highlight.label.en, kicker: `Case study — ${c.sector.en}` })
}
