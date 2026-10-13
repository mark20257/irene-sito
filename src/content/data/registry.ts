import type { Media } from '../types'
import { cases } from './cases'
import { feedPosts } from './feed'
import { portrait } from './portrait'

/** Tutte le immagini segnaposto del sito (usato dal generatore in sviluppo). */
export function allPlaceholders(): Extract<Media, { type: 'image' }>[] {
  const list: Media[] = [
    ...cases.flatMap((c) => [c.cover, ...c.creative.media, ...c.gallery]),
    ...feedPosts.map((p) => p.media),
    portrait,
  ]
  return list.filter((m): m is Extract<Media, { type: 'image' }> => m.type === 'image' && !!m.art)
}
