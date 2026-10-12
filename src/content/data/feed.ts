import type { FeedPost } from '../types'
import { brands } from './brands'
import { site } from '../site'

/**
 * Sezione "Il feed": i post che scorrono nel telefono, con le note a margine.
 * ⚠️ D'esempio. Per usare i tuoi post veri: media: { type: 'image', src: '/images/feed/post-1.jpg', width: 1080, height: 1350, alt: {…} }
 */
export const feedPosts: FeedPost[] = [
  {
    kind: 'carousel',
    author: site.instagram.handle,
    media: {
      type: 'art',
      art: {
        kind: 'post',
        brand: brands.irene,
        variant: 'carousel',
        headline: { it: '3 errori che bruciano il tuo budget ads', en: '3 mistakes burning your ad budget' },
        kicker: { it: '(il secondo lo fai anche tu)', en: '(you’re making the second one)' },
      },
      alt: { it: 'Carosello: 3 errori che bruciano il budget ads', en: 'Carousel: 3 mistakes burning your ad budget' },
    },
    caption: {
      it: 'Salva questo post prima di “mettere in evidenza” il prossimo. Fidati.',
      en: 'Save this before you hit “boost” on your next post. Trust me.',
    },
    likes: 1284,
    note: {
      type: { it: 'Carosello educativo', en: 'Educational carousel' },
      goal: { it: 'Obiettivo: salvataggi', en: 'Goal: saves' },
      result: { it: '4,8% di salvataggi. La media è 1,2%.', en: '4.8% save rate. Average is 1.2%.' },
    },
  },
  {
    kind: 'ad',
    author: 'atelier.ombra',
    media: {
      type: 'art',
      art: {
        kind: 'ad',
        brand: brands.ombra,
        headline: { it: 'Nuova collezione. Stessa voglia di uscire.', en: 'New collection. Same urge to go out.' },
        cta: { it: 'Scopri di più', en: 'Learn more' },
      },
      alt: { it: 'Inserzione Atelier Ombra', en: 'Atelier Ombra ad' },
    },
    caption: { it: 'Primavera, finalmente. Il cappotto può riposare.', en: 'Spring, at last. The coat can take a break.' },
    likes: 932,
    note: {
      type: { it: 'Ad Meta · Atelier Ombra', en: 'Meta ad · Atelier Ombra' },
      goal: { it: 'Hook nei primi 3 secondi, una sola CTA', en: 'Hook in the first 3 seconds, one single CTA' },
      result: { it: 'CPA −38% dopo tre test A/B.', en: 'CPA −38% after three A/B tests.' },
    },
  },
  {
    kind: 'reel',
    author: 'panificio.malva',
    media: {
      type: 'art',
      art: {
        kind: 'post',
        brand: brands.malva,
        variant: 'reel',
        headline: { it: 'POV: sono le 6:30 e il pane è già fuori', en: 'POV: it’s 6:30am and the bread is already out' },
      },
      alt: { it: 'Copertina reel Panificio Malva', en: 'Panificio Malva reel cover' },
    },
    caption: { it: 'Noi svegli dalle 4. Voi dalle 6:30. Ci vediamo al banco.', en: 'We’re up at 4. You at 6:30. See you at the counter.' },
    likes: 4210,
    note: {
      type: { it: 'Reel · Panificio Malva', en: 'Reel · Panificio Malva' },
      goal: { it: 'Obiettivo: persone nuove in zona', en: 'Goal: new people nearby' },
      result: { it: '62k views, 71% da non follower.', en: '62k views, 71% from non-followers.' },
    },
  },
  {
    kind: 'post',
    author: 'bottega.fiore',
    media: {
      type: 'art',
      art: { kind: 'sign', brand: brands.fiore },
      alt: { it: 'Nuova insegna di Bottega Fiore', en: 'Bottega Fiore’s new sign' },
    },
    caption: { it: 'Insegna nuova. Stessi fiori, più foto davanti.', en: 'New sign. Same flowers, more photos in front of it.' },
    likes: 1876,
    note: {
      type: { it: 'Post · Bottega Fiore', en: 'Post · Bottega Fiore' },
      goal: { it: 'Offline che diventa online', en: 'Offline becoming online' },
      result: { it: '+120 tag spontanei in 2 mesi.', en: '+120 organic tags in 2 months.' },
    },
  },
  {
    kind: 'meme',
    author: site.instagram.handle,
    media: {
      type: 'art',
      art: {
        kind: 'post',
        brand: brands.irene,
        variant: 'meme',
        headline: { it: 'Quando il cliente dice: «fallo diventare virale»', en: 'When the client says: “make it go viral”' },
      },
      alt: { it: 'Meme sul marketing', en: 'Marketing meme' },
    },
    caption: { it: 'Lo facciamo diventare utile. Che dura di più.', en: 'We’ll make it useful. It lasts longer.' },
    likes: 3567,
    note: {
      type: { it: 'Meme di settore', en: 'Industry meme' },
      goal: { it: 'Obiettivo: condivisioni', en: 'Goal: shares' },
      result: { it: 'Sì, anche questo è strategia.', en: 'Yes, this is strategy too.' },
    },
  },
  {
    kind: 'ad',
    author: 'osteria.ventitre',
    media: {
      type: 'art',
      art: {
        kind: 'ad',
        brand: brands.ventitre,
        tone: 'acid',
        headline: { it: 'Martedì 23. Il menu cambia, il prezzo no.', en: 'Tuesday 23. The menu changes, the price doesn’t.' },
        cta: { it: 'Prenota', en: 'Book' },
      },
      alt: { it: 'Inserzione Osteria Ventitré', en: 'Osteria Ventitré ad' },
    },
    caption: { it: 'Quattro portate, un prezzo, zero scuse per restare a casa.', en: 'Four courses, one price, zero excuses to stay home.' },
    likes: 1102,
    note: {
      type: { it: 'Campagna locale · Ventitré', en: 'Local campaign · Ventitré' },
      goal: { it: 'Riempire il martedì', en: 'Fill up Tuesdays' },
      result: { it: '11 martedì pieni su 12.', en: '11 full Tuesdays out of 12.' },
    },
  },
]
