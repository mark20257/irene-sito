import { Geist, Geist_Mono } from 'next/font/google'

/**
 * Un solo carattere, pulito e leggibilissimo: Geist (variabile, 100–900).
 * Geist Mono solo per piccoli dettagli numerici.
 */
export const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const mono = Geist_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
})

export const fontVariables = [sans.variable, mono.variable].join(' ')
