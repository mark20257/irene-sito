import type { Locale } from '@/content'

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

/** Formatta un numero nella lingua giusta (1,2 in italiano, 1.2 in inglese) */
export const formatNumber = (value: number, locale: Locale, decimals = 0) =>
  new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)

export const pad = (n: number, size = 2) => String(n).padStart(size, '0')

/**
 * Rimanda `fn` a quando il thread è libero (dopo il primo paint): le animazioni si preparano
 * senza rallentare il caricamento. Restituisce la funzione che annulla l'attesa.
 * Con useGSAP passare `contextSafe(fn)`, così il contesto ripulisce anche ciò che `fn` crea.
 */
export function whenIdle(fn: () => unknown, timeout = 1200) {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(() => fn(), { timeout })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(fn, 50)
  return () => window.clearTimeout(id)
}
