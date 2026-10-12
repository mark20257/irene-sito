import type { Locale } from '@/content'

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

/** Formatta un numero nella lingua giusta (1,2 in italiano, 1.2 in inglese) */
export const formatNumber = (value: number, locale: Locale, decimals = 0) =>
  new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)

export const pad = (n: number, size = 2) => String(n).padStart(size, '0')
