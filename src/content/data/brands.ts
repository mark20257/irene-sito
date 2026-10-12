import type { BrandKit } from '../types'

/**
 * Brand d'esempio usati per i visual segnaposto.
 * ⚠️ Sono clienti fittizi: sostituiscili con i tuoi (e con le foto vere dei progetti).
 */
export const brands = {
  ombra: { name: 'Atelier Ombra', mark: 'Ombra', motif: 'arch', face: 'serif', tone: 'ink' },
  malva: { name: 'Panificio Malva', mark: 'MALVA', motif: 'loaf', face: 'display', tone: 'acid' },
  brezza: { name: 'Villa Brezza', mark: 'Brezza', motif: 'wave', face: 'serif', tone: 'paper' },
  nuda: { name: 'Nuda Skincare', mark: 'NUDA', motif: 'drop', face: 'display', tone: 'paper' },
  fiore: { name: 'Bottega Fiore', mark: 'Fiore', motif: 'flower', face: 'serif', tone: 'acid' },
  ventitre: { name: 'Osteria Ventitré', mark: '23', motif: 'plate', face: 'display', tone: 'ink' },
  irene: { name: 'Irene Chies', mark: 'IC', motif: 'spark', face: 'display', tone: 'paper' },
} satisfies Record<string, BrandKit>
