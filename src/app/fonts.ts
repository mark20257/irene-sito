import { Bricolage_Grotesque, Geist_Mono, Instrument_Serif, Inter_Tight } from 'next/font/google'

/**
 * Sistema tipografico
 * - Display: Bricolage Grotesque (variabile: peso, larghezza, optical size).
 *   Ha le "trappole d'inchiostro" — un dettaglio nato per la stampa.
 * - Testo: Inter Tight, grotesk pulito e compatto.
 * - Voce: Instrument Serif corsivo, solo per le parole che vanno "dette".
 * - Dato: Geist Mono, per etichette, numerazioni e note a margine.
 */

export const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
  preload: false,
})

export const mono = Geist_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
})

export const fontVariables = [display.variable, sans.variable, serif.variable, mono.variable].join(' ')
