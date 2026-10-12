import type { Certification, ClientLogo, Metric, Testimonial, L } from '../types'

/**
 * Numeri, clienti, testimonianze, certificazioni e strumenti.
 * ⚠️ VALORI D'ESEMPIO: sostituiscili con i tuoi numeri reali e recensioni vere
 *    (con il consenso dei clienti) prima di pubblicare.
 */

export const metrics: Metric[] = [
  { value: 40, suffix: '+', label: { it: 'brand seguiti', en: 'brands managed' }, note: { it: 'dal 2018 a oggi', en: 'since 2018' } },
  { value: 1.2, decimals: 1, prefix: '€', suffix: 'M', label: { it: 'di budget ads gestito', en: 'in ad spend managed' }, note: { it: 'Meta + Google', en: 'Meta + Google' } },
  { value: 4.6, decimals: 1, suffix: '×', label: { it: 'ROAS medio e-commerce', en: 'average e-commerce ROAS' }, note: { it: 'ultimi 12 mesi', en: 'last 12 months' } },
  { value: 180, prefix: '+', suffix: '%', label: { it: 'follower nei primi 6 mesi', en: 'followers in the first 6 months' }, note: { it: 'media dei profili gestiti', en: 'average across managed profiles' } },
  { value: 320, suffix: '+', label: { it: 'campagne lanciate e ottimizzate', en: 'campaigns launched and optimised' } },
]

export const clients: ClientLogo[] = [
  { name: 'Atelier Ombra', style: 'serif' },
  { name: 'Panificio Malva', style: 'display' },
  { name: 'Villa Brezza', style: 'serif' },
  { name: 'NUDA', style: 'wide' },
  { name: 'Bottega Fiore', style: 'serif' },
  { name: 'Osteria 23', style: 'condensed' },
  { name: 'Cantina Ronchi', style: 'condensed' },
  { name: 'aria pilates', style: 'mono' },
  { name: 'Ferramenta Zanin', style: 'display' },
  { name: 'Gelateria Polo', style: 'wide' },
  { name: 'Ottica Lume', style: 'serif' },
  { name: 'libreria margini', style: 'mono' },
]

export const testimonials: Testimonial[] = [
  {
    quote: {
      it: 'Prima pubblicavamo quando avevamo tempo. Ora abbiamo un piano, un tono di voce e — dettaglio non da poco — clienti nuove ogni settimana.',
      en: 'We used to post when we had time. Now we have a plan, a tone of voice and — no small detail — new customers every week.',
    },
    author: 'Giulia R.',
    role: { it: 'Titolare', en: 'Owner' },
    brand: 'Atelier Ombra',
    result: { it: 'ROAS 5,4×', en: '5.4× ROAS' },
  },
  {
    quote: {
      it: 'Irene ha smontato le nostre campagne in un pomeriggio e le ha rimontate meglio. Stesso budget, quasi il doppio delle prenotazioni dirette.',
      en: 'Irene took our campaigns apart in an afternoon and put them back together better. Same budget, almost twice the direct bookings.',
    },
    author: 'Marco T.',
    role: { it: 'Direttore', en: 'General manager' },
    brand: 'Villa Brezza',
    result: { it: '+62% prenotazioni dirette', en: '+62% direct bookings' },
  },
  {
    quote: {
      it: 'Le bastano dieci minuti di brief per capire cosa vuoi, e due settimane per farti capire cosa ti serve davvero. Il secondo è il motivo per cui la richiamiamo.',
      en: 'She needs ten minutes of briefing to understand what you want, and two weeks to make you understand what you actually need. The second is why we keep calling her back.',
    },
    author: 'Elena B.',
    role: { it: 'Founder', en: 'Founder' },
    brand: 'Nuda Skincare',
    result: { it: 'CPA −35%', en: '−35% CPA' },
  },
]

/** Verifica i nomi esatti e aggiungi i link pubblici (Credly per Meta, Skillshop per Google). */
export const certifications: Certification[] = [
  { name: 'Meta Certified Media Buying Professional', issuer: 'Meta', year: '2025' },
  { name: 'Meta Certified Digital Marketing Associate', issuer: 'Meta', year: '2023' },
  { name: 'Google Ads Search Certification', issuer: 'Google', year: '2025' },
  { name: 'Google Ads Display Certification', issuer: 'Google', year: '2025' },
  { name: 'Google Ads Measurement Certification', issuer: 'Google', year: '2024' },
]

export const tools: { group: L; items: string[] }[] = [
  { group: { it: 'Ads & dati', en: 'Ads & data' }, items: ['Meta Ads Manager', 'Google Ads', 'GA4', 'Tag Manager', 'Looker Studio'] },
  { group: { it: 'Social', en: 'Social' }, items: ['Meta Business Suite', 'Metricool', 'CapCut', 'Lightroom'] },
  { group: { it: 'Design', en: 'Design' }, items: ['Illustrator', 'Photoshop', 'InDesign', 'Figma', 'Canva'] },
]
