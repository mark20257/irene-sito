import type { MetadataRoute } from 'next'
import { paths } from '@/content'
import { cases } from '@/content/data/cases'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pair = (it: string, en: string, priority: number): MetadataRoute.Sitemap =>
    [it, en].map((url) => ({
      url: absoluteUrl(url),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: url === it ? priority : priority - 0.1,
      alternates: { languages: { 'it-IT': absoluteUrl(it), en: absoluteUrl(en) } },
    }))

  return [
    ...pair(paths.home('it'), paths.home('en'), 1),
    ...cases.flatMap((c) => pair(paths.case(c.slug, 'it'), paths.case(c.slug, 'en'), 0.8)),
  ]
}
