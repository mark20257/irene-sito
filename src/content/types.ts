/**
 * Tipi condivisi dei contenuti.
 * Tutti i testi del sito vivono in `src/content`: per cambiare copy, numeri o progetti
 * non serve toccare i componenti.
 */

export const locales = ['it', 'en'] as const
export type Locale = (typeof locales)[number]

/** Valore localizzato: `{ it: '…', en: '…' }` */
export type L<T = string> = Record<Locale, T>

export type ServiceKey = 'social' | 'ads' | 'design'

/* ------------------------------------------------------------------ */
/*  Visual: segnaposto generativi (SVG) oppure foto/video veri         */
/* ------------------------------------------------------------------ */

export type Tone = 'paper' | 'ink' | 'acid'
export type Motif = 'arch' | 'loaf' | 'wave' | 'drop' | 'flower' | 'plate' | 'spark'
export type Face = 'display' | 'serif' | 'mono'

/** Kit grafico di un brand: usato per generare i visual segnaposto. */
export type BrandKit = {
  name: string
  /** Versione corta/marchio (es. "OMBRA") */
  mark: string
  motif: Motif
  face: Face
  tone: Tone
}

export type ArtKind =
  | 'cover'
  | 'feed'
  | 'ad'
  | 'print'
  | 'sign'
  | 'pack'
  | 'story'
  | 'search'
  | 'chart'
  | 'post'
  | 'portrait'

export type ArtSpec = {
  kind: ArtKind
  brand: BrandKit
  /** Tono alternativo rispetto al kit */
  tone?: Tone
  /** Titolo grande dentro il visual */
  headline?: L
  /** Testo piccolo / sottotitolo */
  kicker?: L
  /** Call to action (ads, story) */
  cta?: L
  /** Serie di valori per i grafici */
  series?: number[]
  /** Variante libera del template (es. 'menu' | 'card' | 'meme') */
  variant?: string
}

export type Media =
  | {
      type: 'image'
      src: string
      width: number
      height: number
      alt: L
      caption?: L
      /** Ricetta del visual segnaposto (usata solo per rigenerare l'immagine in sviluppo) */
      art?: ArtSpec
    }
  | { type: 'video'; src: string; poster?: string; alt: L; caption?: L }

/* ------------------------------------------------------------------ */
/*  Case study                                                         */
/* ------------------------------------------------------------------ */

export type Metric = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: L
  /** Nota a piè di pagina, opzionale */
  note?: L
}

export type CaseStudy = {
  slug: string
  client: string
  brand: BrandKit
  sector: L
  year: string
  services: ServiceKey[]
  channels: string[]
  duration: L
  excerpt: L
  /** Il numero che compare nella griglia */
  highlight: { value: string; label: L }
  cover: Media
  challenge: { title: L; body: L }
  strategy: { title: L; body: L; moves: L[] }
  creative: { title: L; body: L; media: Media[] }
  results: {
    title: L
    body: L
    metrics: Metric[]
    chart?: { label: L; unit?: string; series: number[]; labels: string[] }
    receipt: { item: L; qty: string }[]
    total: L
  }
  gallery: Media[]
  testimonial?: { quote: L; author: string; role: L }
}

/* ------------------------------------------------------------------ */
/*  Feed, testimonianze, clienti, about                                */
/* ------------------------------------------------------------------ */

export type FeedPost = {
  kind: 'carousel' | 'ad' | 'reel' | 'post' | 'meme'
  author: string
  media: Media
  caption: L
  likes: number
  note: { type: L; goal: L; result: L }
}

export type Testimonial = {
  quote: L
  author: string
  role: L
  brand: string
  result: L
}

export type ClientLogo = {
  name: string
  style: 'serif' | 'display' | 'mono' | 'condensed' | 'wide'
}

export type Certification = {
  name: string
  issuer: 'Meta' | 'Google'
  year: string
  /** Link di verifica (Credly, Skillshop…) */
  url?: string
}
