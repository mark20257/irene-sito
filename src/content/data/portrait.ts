import { brands } from './brands'
import { art, place } from './placeholders'

/**
 * ⚠️ FOTO DI IRENE: sostituisci /public/images/irene/ritratto.webp con una foto vera
 * (verticale 4:5, luce naturale). Stesso nome file → nessuna modifica al codice.
 */
export const portrait = place(
  art({ kind: 'portrait', brand: brands.irene }, { it: 'Ritratto di Irene Chies', en: 'Portrait of Irene Chies' }),
  'irene/ritratto',
)
