import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cases, getCase } from '@/content/data/cases'
import { CasePage } from '@/components/case/CasePage'
import { caseMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<'/en/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const c = getCase(slug)
  return c ? caseMetadata(c, 'en') : {}
}

export default async function Page({ params }: PageProps<'/en/work/[slug]'>) {
  const { slug } = await params
  const c = getCase(slug)
  if (!c) notFound()
  return <CasePage c={c} locale="en" />
}
