import it, { type Dictionary } from './dictionaries/it'
import en from './dictionaries/en'
import type { L, Locale } from './types'

export type { Dictionary }
export { locales, type Locale, type L } from './types'

const dictionaries: Record<Locale, Dictionary> = { it, en }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]

/** Restituisce il valore nella lingua richiesta */
export const t = <T,>(value: L<T>, locale: Locale): T => value[locale]

export const htmlLang: Record<Locale, string> = { it: 'it-IT', en: 'en' }
export const ogLocale: Record<Locale, string> = { it: 'it_IT', en: 'en_GB' }

/* ------------------------------------------------------------------ */
/*  Percorsi localizzati                                               */
/* ------------------------------------------------------------------ */

export const paths = {
  home: (locale: Locale) => (locale === 'it' ? '/' : '/en'),
  case: (slug: string, locale: Locale) => (locale === 'it' ? `/lavori/${slug}` : `/en/work/${slug}`),
  privacy: (locale: Locale) => (locale === 'it' ? '/privacy' : '/en/privacy'),
  /** Ancora di una sezione della home, es. /#servizi */
  section: (key: keyof Dictionary['sections'], locale: Locale) =>
    `${locale === 'it' ? '/' : '/en'}#${dictionaries[locale].sections[key].id}`,
}

/** Traduce un percorso nell'altra lingua (per lo switch IT/EN e gli hreflang) */
export function translatePath(pathname: string, to: Locale): string {
  const clean = pathname.replace(/\/$/, '') || '/'
  const isEn = clean === '/en' || clean.startsWith('/en/')
  const from: Locale = isEn ? 'en' : 'it'
  if (from === to) return clean

  const caseIt = clean.match(/^\/lavori\/([^/]+)$/)
  const caseEn = clean.match(/^\/en\/work\/([^/]+)$/)
  if (caseIt) return paths.case(caseIt[1], to)
  if (caseEn) return paths.case(caseEn[1], to)
  if (clean === '/privacy' || clean === '/en/privacy') return paths.privacy(to)
  return paths.home(to)
}
