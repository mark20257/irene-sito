/**
 * ─────────────────────────────────────────────────────────────────────
 *  CONFIGURAZIONE DEL SITO
 *  ⚠️  Valori d'esempio: sostituiscili con quelli reali prima di pubblicare.
 * ─────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Irene Chies',
  /** Dominio pubblico — usato per canonical, sitemap e Open Graph */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.irenechies.it').replace(/\/$/, ''),

  /** Città base: entra in titoli SEO, copy e dati strutturati */
  city: 'Treviso',
  region: 'Veneto',
  countryCode: 'IT',
  timeZone: 'Europe/Rome',

  email: 'ciao@irenechies.it',
  phone: '+39 333 000 0000',
  /** Numero WhatsApp in formato internazionale, solo cifre */
  whatsapp: '393330000000',
  instagram: { handle: '@irenechies', url: 'https://www.instagram.com/irenechies' },
  linkedin: 'https://www.linkedin.com/in/irenechies',
  calendly: 'https://calendly.com/irenechies/20min',

  /** Partita IVA (obbligatoria sul sito di un professionista in Italia) */
  vat: '00000000000',

  /** Disponibilità mostrata nell'header */
  availability: { it: 'Disponibile per 2 nuovi brand da novembre', en: 'Taking on 2 new brands from November' },

  /** Anno di inizio attività (usato in qualche nota) */
  since: 2018,
} as const

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
