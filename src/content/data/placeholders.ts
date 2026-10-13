import type { ArtKind, ArtSpec, L, Media } from '../types'

/**
 * Visual segnaposto: ogni "ricetta" (ArtSpec) è stata renderizzata una volta in
 * /public/images/... come WebP. Il sito usa solo le immagini (next/image → AVIF/WebP).
 *
 * Per usare le foto vere basta sostituire il file con lo stesso nome
 * (stesse proporzioni) oppure cambiare `src`, `width` e `height`.
 */

/** Dimensioni (px) dei file generati per ciascun tipo di visual */
export const artSize: Record<ArtKind, [number, number]> = {
  cover: [1200, 1500],
  feed: [1400, 1400],
  ad: [1200, 1500],
  print: [1600, 1200],
  sign: [1600, 1000],
  pack: [1400, 1400],
  story: [900, 1600],
  search: [1500, 1000],
  chart: [1500, 1000],
  post: [1200, 1500],
  portrait: [1200, 1500],
}

/** Ricetta in attesa di un percorso (lo assegna `place`) */
export type Pending = { art: ArtSpec; alt: L; caption?: L }

export const art = (spec: ArtSpec, alt: L, caption?: L): Pending => ({ art: spec, alt, caption })

export const place = (p: Pending, path: string): Media => {
  const [width, height] = artSize[p.art.kind]
  return { type: 'image', src: `/images/${path}.webp`, width, height, alt: p.alt, caption: p.caption, art: p.art }
}
