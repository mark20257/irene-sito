import type { CaseStudy, Media, ArtSpec, L } from '../types'
import { brands } from './brands'

/**
 * ─────────────────────────────────────────────────────────────────────
 *  CASE STUDY
 *  ⚠️  Progetti, numeri e testimonianze qui sotto sono D'ESEMPIO.
 *      Sostituiscili con i tuoi prima di pubblicare.
 *
 *  Per usare foto vere al posto dei visual generati:
 *    cover: { type: 'image', src: '/images/lavori/ombra-cover.jpg', width: 1600, height: 2000, alt: { it: '…', en: '…' } }
 *  (metti i file in /public/images/lavori — Next li converte in AVIF/WebP)
 * ─────────────────────────────────────────────────────────────────────
 */

const art = (spec: ArtSpec, alt: L, caption?: L): Media => ({ type: 'art', art: spec, alt, caption })

export const cases: CaseStudy[] = [
  /* ------------------------------------------------------------ 01 */
  {
    slug: 'atelier-ombra',
    client: 'Atelier Ombra',
    brand: brands.ombra,
    sector: { it: 'Moda · Boutique + e-commerce', en: 'Fashion · Boutique + e-commerce' },
    year: '2025',
    services: ['social', 'ads'],
    channels: ['Instagram', 'Facebook', 'Meta Ads', 'TikTok'],
    duration: { it: '8 mesi (e si continua)', en: '8 months (and counting)' },
    excerpt: {
      it: 'Da profilo-catalogo a brand che si riconosce in tre secondi di scroll.',
      en: 'From catalogue-style profile to a brand you recognise in three seconds of scrolling.',
    },
    highlight: { value: '5,4×', label: { it: 'ROAS medio', en: 'average ROAS' } },
    cover: art(
      { kind: 'cover', brand: brands.ombra, kicker: { it: 'Collezione SS26', en: 'SS26 Collection' } },
      { it: 'Poster della campagna Atelier Ombra', en: 'Atelier Ombra campaign poster' },
    ),
    challenge: {
      title: { it: 'Bei vestiti, profilo da catalogo.', en: 'Beautiful clothes, catalogue profile.' },
      body: {
        it: 'Foto su sfondo bianco, caption “disponibile in negozio”, zero storie. Il negozio fisico andava bene; l’e-commerce, aperto da un anno, vendeva quasi solo ad amici e parenti. Le sponsorizzate? Post messi “in evidenza” a caso, con il budget che spariva in tre giorni.',
        en: 'White-background photos, “available in store” captions, zero stories. The shop did fine; the e-commerce, open for a year, sold mostly to friends and family. Ads? Random “boosted” posts, with the budget gone in three days.',
      },
    },
    strategy: {
      title: { it: 'Smettere di mostrare i vestiti. Mostrare chi li indossa.', en: 'Stop showing the clothes. Show who wears them.' },
      body: {
        it: 'Abbiamo spostato il racconto dal prodotto alle persone, e costruito un funnel che accompagna chi scopre il brand fino al carrello — senza urlare “saldi” ogni settimana.',
        en: 'We moved the story from product to people, and built a funnel that walks new followers all the way to checkout — without shouting “sale” every week.',
      },
      moves: [
        { it: 'Tono di voce ironico e femminile, mai patinato.', en: 'Witty, feminine tone of voice. Never glossy.' },
        { it: 'Piano editoriale su tre pilastri: stile, dietro le quinte, community.', en: 'Editorial plan on three pillars: style, behind the scenes, community.' },
        { it: 'Funnel Meta Ads: video in awareness, caroselli in considerazione, catalogo dinamico in retargeting.', en: 'Meta Ads funnel: video for awareness, carousels for consideration, dynamic catalogue for retargeting.' },
        { it: 'UGC ogni mese: clienti vere, con i capi veri.', en: 'Monthly UGC: real customers, wearing the real thing.' },
      ],
    },
    creative: {
      title: { it: 'Luce vera, hook veloci, feed riconoscibile.', en: 'Real light, fast hooks, a recognisable feed.' },
      body: {
        it: 'Shooting in negozio con luce naturale, caroselli “come lo abbino”, reel da 7 secondi con l’hook nel primo fotogramma. Template grafici per tenere il feed coerente anche quando pubblica lo staff.',
        en: 'In-store shoots with natural light, “how to style it” carousels, 7-second reels with the hook in the first frame. Graphic templates keep the feed consistent even when the staff posts.',
      },
      media: [
        art({ kind: 'feed', brand: brands.ombra }, { it: 'Griglia del feed Instagram di Atelier Ombra', en: 'Atelier Ombra Instagram feed grid' }, { it: 'Il feed dopo tre mesi: riconoscibile anche senza logo.', en: 'The feed after three months: recognisable even without the logo.' }),
        art(
          { kind: 'ad', brand: brands.ombra, headline: { it: 'Nuova collezione. Stessa voglia di uscire.', en: 'New collection. Same urge to go out.' }, cta: { it: 'Scopri la collezione', en: 'Shop the collection' } },
          { it: 'Inserzione Meta per la nuova collezione', en: 'Meta ad for the new collection' },
          { it: 'Variante B: ha vinto il test con un CTR doppio.', en: 'Variant B: won the test with twice the CTR.' },
        ),
        art(
          { kind: 'story', brand: brands.ombra, headline: { it: 'Lo abbini così?', en: 'Would you style it like this?' }, cta: { it: 'Sì / Mai', en: 'Yes / Never' } },
          { it: 'Storia Instagram con sondaggio', en: 'Instagram story with a poll' },
          { it: 'Sondaggi nelle storie: +31% risposte in DM.', en: 'Story polls: +31% DM replies.' },
        ),
      ],
    },
    results: {
      title: { it: 'Numeri che non stanno solo nel report.', en: 'Numbers that live outside the report too.' },
      body: {
        it: 'Più follower, sì. Ma soprattutto più vendite online, a un costo che il margine regge.',
        en: 'More followers, sure. But above all more online sales, at a cost the margin can carry.',
      },
      metrics: [
        { value: 186, prefix: '+', suffix: '%', label: { it: 'follower in 6 mesi', en: 'followers in 6 months' } },
        { value: 5.4, decimals: 1, suffix: '×', label: { it: 'ROAS medio Meta Ads', en: 'average Meta Ads ROAS' } },
        { value: 38, prefix: '+', suffix: '%', label: { it: 'vendite online', en: 'online sales' } },
        { value: 3, suffix: '×', label: { it: 'salvataggi per post', en: 'saves per post' } },
      ],
      chart: {
        label: { it: 'Vendite online al mese (indice, mese 1 = 100)', en: 'Monthly online sales (index, month 1 = 100)' },
        series: [100, 104, 112, 121, 118, 129, 134, 138],
        labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'],
      },
      receipt: [
        { item: { it: 'Shooting in negozio', en: 'In-store shoots' }, qty: '×4' },
        { item: { it: 'Reel', en: 'Reels' }, qty: '×48' },
        { item: { it: 'Caroselli', en: 'Carousels' }, qty: '×36' },
        { item: { it: 'Campagne Meta', en: 'Meta campaigns' }, qty: '×6' },
        { item: { it: 'Test A/B', en: 'A/B tests' }, qty: '×14' },
        { item: { it: 'Post “tanto per”', en: '“Just because” posts' }, qty: '×0' },
      ],
      total: { it: 'Un brand che si riconosce', en: 'A brand people recognise' },
    },
    gallery: [
      art({ kind: 'print', brand: brands.ombra, variant: 'lookbook', headline: { it: 'Lookbook SS26', en: 'SS26 Lookbook' } }, { it: 'Lookbook stampato', en: 'Printed lookbook' }, { it: 'Lookbook stampato per il negozio: stessa voce del feed.', en: 'Printed in-store lookbook: same voice as the feed.' }),
      art({ kind: 'cover', brand: brands.ombra, tone: 'paper', kicker: { it: 'Saldi? No: scelte.', en: 'Sale? No: choices.' } }, { it: 'Poster di fine stagione', en: 'End-of-season poster' }),
      art({ kind: 'post', brand: brands.ombra, variant: 'quote', headline: { it: 'Vestirsi è una scelta. Anche il martedì.', en: 'Getting dressed is a choice. Even on Tuesdays.' } }, { it: 'Post con citazione del brand', en: 'Brand quote post' }),
    ],
    testimonial: {
      quote: {
        it: 'Prima pubblicavamo quando avevamo tempo. Ora abbiamo un piano, un tono di voce e — dettaglio non da poco — clienti nuove ogni settimana.',
        en: 'We used to post when we had time. Now we have a plan, a tone of voice and — no small detail — new customers every week.',
      },
      author: 'Giulia R.',
      role: { it: 'Titolare, Atelier Ombra', en: 'Owner, Atelier Ombra' },
    },
  },

  /* ------------------------------------------------------------ 02 */
  {
    slug: 'panificio-malva',
    client: 'Panificio Malva',
    brand: brands.malva,
    sector: { it: 'Food · Panificio artigianale', en: 'Food · Artisan bakery' },
    year: '2025',
    services: ['design', 'social'],
    channels: ['Instagram', 'Meta Ads', 'Packaging', 'Insegna'],
    duration: { it: '5 mesi', en: '5 months' },
    excerpt: {
      it: 'Tre generazioni di fornai, un’identità nuova e un quartiere che finalmente entra.',
      en: 'Three generations of bakers, a new identity and a neighbourhood that finally walks in.',
    },
    highlight: { value: '+240%', label: { it: 'reach locale', en: 'local reach' } },
    cover: art(
      { kind: 'cover', brand: brands.malva, kicker: { it: 'Pane vero dalle 6:30', en: 'Real bread from 6:30am' } },
      { it: 'Poster di Panificio Malva', en: 'Panificio Malva poster' },
    ),
    challenge: {
      title: { it: 'Pane buonissimo, comunicazione inesistente.', en: 'Great bread, zero communication.' },
      body: {
        it: 'Un logo disegnato nel 1994, sacchetti anonimi e una pagina Facebook aggiornata a Natale. I clienti storici c’erano, ma i più giovani del quartiere passavano davanti senza entrare.',
        en: 'A logo drawn in 1994, anonymous paper bags and a Facebook page updated at Christmas. The loyal customers were there, but younger locals walked past without coming in.',
      },
    },
    strategy: {
      title: { it: 'Raccontare il mestiere, non il prodotto.', en: 'Tell the craft, not the product.' },
      body: {
        it: 'Il pane lo fanno tutti. Le mani alle quattro del mattino, no. Abbiamo rinnovato l’identità rispettando la storia e portato il forno sul telefono di chi abita a tre chilometri.',
        en: 'Everyone sells bread. Hands in the dough at 4am, not so much. We refreshed the identity while respecting its history, and brought the oven to the phones of people living within three kilometres.',
      },
      moves: [
        { it: 'Restyling del marchio: stessa anima, finalmente leggibile.', en: 'Logo refresh: same soul, finally legible.' },
        { it: 'Packaging e sacchetti riconoscibili da lontano.', en: 'Packaging and bags you can spot from across the street.' },
        { it: 'Reel all’alba: il format “POV 6:30”.', en: 'Dawn reels: the “POV 6:30am” format.' },
        { it: 'Campagne Meta geolocalizzate in un raggio di 3 km.', en: 'Meta campaigns geo-targeted within a 3 km radius.' },
      ],
    },
    creative: {
      title: { it: 'Dal sacchetto al feed, stessa farina.', en: 'From paper bag to feed, same flour.' },
      body: {
        it: 'Un sistema grafico semplice — un colore acido, un font pieno, tanta carta — che funziona sul sacchetto, sull’insegna e su un reel girato col telefono alle sei del mattino.',
        en: 'A simple graphic system — one acid colour, a bold typeface, lots of paper — that works on the bag, on the sign and on a reel shot on a phone at 6am.',
      },
      media: [
        art({ kind: 'pack', brand: brands.malva, headline: { it: 'Pane di ieri? Mai.', en: 'Yesterday’s bread? Never.' } }, { it: 'Sacchetto per il pane con il nuovo marchio', en: 'Bread bag with the new logo' }, { it: 'Sacchetti: il primo media che il cliente si porta a casa.', en: 'Bags: the first medium customers take home.' }),
        art({ kind: 'sign', brand: brands.malva }, { it: 'Nuova insegna del panificio', en: 'New bakery sign' }, { it: 'Insegna nuova: leggibile anche dalla rotonda.', en: 'New sign: readable from the roundabout.' }),
        art({ kind: 'story', brand: brands.malva, tone: 'ink', headline: { it: 'POV: sono le 6:30', en: 'POV: it’s 6:30am' }, cta: { it: 'Guarda il reel', en: 'Watch the reel' } }, { it: 'Copertina del reel POV 6:30', en: 'POV 6:30am reel cover' }, { it: '62k visualizzazioni, 71% da non follower.', en: '62k views, 71% from non-followers.' }),
      ],
    },
    results: {
      title: { it: 'Il quartiere ha iniziato a entrare.', en: 'The neighbourhood started walking in.' },
      body: {
        it: 'Più persone nuove, più giovani, e uno scontrino medio che cresce perché ora “già che ci sei” prendi anche la focaccia.',
        en: 'More new faces, younger ones, and a growing average ticket — because now you grab the focaccia too.',
      },
      metrics: [
        { value: 240, prefix: '+', suffix: '%', label: { it: 'reach locale', en: 'local reach' } },
        { value: 62, suffix: 'k', label: { it: 'views del reel migliore', en: 'views on the top reel' } },
        { value: 45, prefix: '+', suffix: '%', label: { it: 'clienti under 35', en: 'under-35 customers' }, note: { it: 'stima da sondaggio in cassa', en: 'estimate from a till survey' } },
        { value: 12, prefix: '+', suffix: '%', label: { it: 'scontrino medio', en: 'average ticket' } },
      ],
      chart: {
        label: { it: 'Persone raggiunte entro 3 km (migliaia / mese)', en: 'People reached within 3 km (thousands / month)' },
        series: [5, 6, 9, 13, 15, 17],
        labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
      },
      receipt: [
        { item: { it: 'Restyling marchio', en: 'Logo refresh' }, qty: '×1' },
        { item: { it: 'Sacchetti e etichette', en: 'Bags and labels' }, qty: '×5' },
        { item: { it: 'Insegna', en: 'Shop sign' }, qty: '×1' },
        { item: { it: 'Reel all’alba', en: 'Dawn reels' }, qty: '×22' },
        { item: { it: 'Sveglie alle 5:30', en: '5:30am alarms' }, qty: '×22' },
      ],
      total: { it: 'Un quartiere che entra', en: 'A neighbourhood that walks in' },
    },
    gallery: [
      art({ kind: 'feed', brand: brands.malva }, { it: 'Feed Instagram del panificio', en: 'Bakery Instagram feed' }),
      art({ kind: 'print', brand: brands.malva, variant: 'label', headline: { it: 'Focaccia di casa', en: 'House focaccia' } }, { it: 'Etichette per i prodotti da banco', en: 'Labels for counter products' }, { it: 'Etichette da banco: prezzo leggibile, storia breve.', en: 'Counter labels: readable price, short story.' }),
      art({ kind: 'post', brand: brands.malva, variant: 'quote', headline: { it: 'Il pane si sveglia prima di te.', en: 'The bread wakes up before you do.' } }, { it: 'Post con citazione', en: 'Quote post' }),
    ],
    testimonial: {
      quote: {
        it: 'Avevo paura di perdere la nostra storia. Invece Irene l’ha messa in vetrina.',
        en: 'I was afraid we’d lose our story. Instead, Irene put it in the shop window.',
      },
      author: 'Paolo M.',
      role: { it: 'Terza generazione, Panificio Malva', en: 'Third generation, Panificio Malva' },
    },
  },

  /* ------------------------------------------------------------ 03 */
  {
    slug: 'villa-brezza',
    client: 'Villa Brezza',
    brand: brands.brezza,
    sector: { it: 'Hospitality · Boutique hotel', en: 'Hospitality · Boutique hotel' },
    year: '2024',
    services: ['ads', 'social'],
    channels: ['Google Ads', 'Meta Ads', 'Instagram', 'GA4'],
    duration: { it: '12 mesi', en: '12 months' },
    excerpt: {
      it: 'Prenotazioni dirette quasi raddoppiate, commissioni OTA giù.',
      en: 'Direct bookings nearly doubled, OTA commissions down.',
    },
    highlight: { value: '+62%', label: { it: 'prenotazioni dirette', en: 'direct bookings' } },
    cover: art(
      { kind: 'cover', brand: brands.brezza, kicker: { it: '18 camere sul lago', en: '18 rooms on the lake' } },
      { it: 'Poster di Villa Brezza', en: 'Villa Brezza poster' },
    ),
    challenge: {
      title: { it: 'Pieni, ma con le commissioni degli altri.', en: 'Fully booked — on other people’s commission.' },
      body: {
        it: 'L’80% delle prenotazioni passava dai portali: commissioni al 18% e ospiti che, a fine soggiorno, non ricordavano nemmeno il nome dell’hotel. Le campagne Google c’erano, ma spendevano sulle parole sbagliate.',
        en: '80% of bookings came through OTAs: 18% commission and guests who couldn’t remember the hotel’s name at checkout. Google campaigns existed, but spent on the wrong keywords.',
      },
    },
    strategy: {
      title: { it: 'Portare le prenotazioni a casa.', en: 'Bring the bookings home.' },
      body: {
        it: 'Prima il tracciamento, poi il budget. Abbiamo misurato ogni passaggio — dalla ricerca al motore di prenotazione — e spostato i soldi dove nascevano le prenotazioni vere.',
        en: 'Tracking first, budget second. We measured every step — from search to booking engine — and moved the money to where real bookings were born.',
      },
      moves: [
        { it: 'Tracciamento completo: GA4, Tag Manager e motore di prenotazione.', en: 'Full tracking: GA4, Tag Manager and booking engine.' },
        { it: 'Google Ads Search su brand e intenti ad alto valore (“hotel lago con spa”).', en: 'Google Ads Search on brand and high-intent terms (“lake hotel with spa”).' },
        { it: 'Remarketing Meta per chi aveva visto le camere ma non prenotato.', en: 'Meta remarketing for people who viewed rooms but didn’t book.' },
        { it: 'Un vantaggio esclusivo per chi prenota diretto: colazione in terrazza inclusa.', en: 'An exclusive perk for direct bookings: breakfast on the terrace included.' },
      ],
    },
    creative: {
      title: { it: 'Annunci che sembrano una cartolina (e funzionano come un form).', en: 'Ads that look like a postcard (and work like a form).' },
      body: {
        it: 'Annunci di ricerca scritti per chi ha già deciso di partire, creatività Meta con il lago come protagonista e un feed che vende il soggiorno, non la camera.',
        en: 'Search ads written for people who have already decided to go, Meta creatives starring the lake, and a feed that sells the stay, not the room.',
      },
      media: [
        art({ kind: 'search', brand: brands.brezza, headline: { it: 'Hotel sul lago con spa | Prenota diretto e risparmia', en: 'Lake hotel with spa | Book direct and save' }, kicker: { it: 'Colazione in terrazza inclusa solo sul sito ufficiale. 18 camere, vista lago.', en: 'Terrace breakfast included only on the official site. 18 rooms, lake view.' } }, { it: 'Annuncio Google Ads di ricerca', en: 'Google Search ad' }, { it: 'Annuncio di ricerca: CTR 11,4% sulle parole di brand.', en: 'Search ad: 11.4% CTR on brand keywords.' }),
        art({ kind: 'ad', brand: brands.brezza, headline: { it: 'Il lago ti aspetta. La colazione pure.', en: 'The lake is waiting. So is breakfast.' }, cta: { it: 'Prenota diretto', en: 'Book direct' } }, { it: 'Inserzione Meta di remarketing', en: 'Meta remarketing ad' }),
        art({ kind: 'feed', brand: brands.brezza }, { it: 'Feed Instagram di Villa Brezza', en: 'Villa Brezza Instagram feed' }),
      ],
    },
    results: {
      title: { it: 'Stesso budget, più prenotazioni (e più margine).', en: 'Same budget, more bookings (and more margin).' },
      body: {
        it: 'Le prenotazioni dirette sono passate dal 20% al 34% del totale. Le commissioni risparmiate hanno pagato le campagne. Due volte.',
        en: 'Direct bookings went from 20% to 34% of the total. Saved commissions paid for the campaigns. Twice.',
      },
      metrics: [
        { value: 62, prefix: '+', suffix: '%', label: { it: 'prenotazioni dirette', en: 'direct bookings' } },
        { value: 41, prefix: '−', suffix: '%', label: { it: 'costo per prenotazione', en: 'cost per booking' } },
        { value: 7.8, decimals: 1, suffix: '×', label: { it: 'ROAS Google Ads', en: 'Google Ads ROAS' } },
        { value: 38, prefix: '€', suffix: 'k', label: { it: 'commissioni OTA risparmiate', en: 'OTA commission saved' } },
      ],
      chart: {
        label: { it: 'Quota prenotazioni dirette (%)', en: 'Direct booking share (%)' },
        unit: '%',
        series: [20, 21, 24, 26, 29, 31, 33, 34],
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'],
      },
      receipt: [
        { item: { it: 'Setup tracciamento', en: 'Tracking setup' }, qty: '×1' },
        { item: { it: 'Parole chiave escluse', en: 'Negative keywords' }, qty: '×312' },
        { item: { it: 'Annunci di ricerca', en: 'Search ads' }, qty: '×24' },
        { item: { it: 'Creatività Meta', en: 'Meta creatives' }, qty: '×18' },
        { item: { it: 'Colazioni in terrazza', en: 'Terrace breakfasts' }, qty: '×∞' },
      ],
      total: { it: 'Prenotazioni a casa', en: 'Bookings brought home' },
    },
    gallery: [
      art({ kind: 'print', brand: brands.brezza, variant: 'card', headline: { it: 'Ben tornati.', en: 'Welcome back.' } }, { it: 'Cartolina di benvenuto in camera', en: 'In-room welcome postcard' }, { it: 'Cartolina in camera con codice per il prossimo soggiorno diretto.', en: 'In-room postcard with a code for the next direct stay.' }),
      art({ kind: 'story', brand: brands.brezza, tone: 'ink', headline: { it: 'Ultime 3 camere per ottobre', en: 'Last 3 rooms for October' }, cta: { it: 'Prenota', en: 'Book now' } }, { it: 'Storia con urgenza', en: 'Urgency story' }),
      art({ kind: 'sign', brand: brands.brezza }, { it: 'Insegna all’ingresso di Villa Brezza', en: 'Villa Brezza entrance sign' }),
    ],
    testimonial: {
      quote: {
        it: 'Irene ha smontato le nostre campagne in un pomeriggio e le ha rimontate meglio. Stesso budget, quasi il doppio delle prenotazioni dirette.',
        en: 'Irene took our campaigns apart in an afternoon and put them back together better. Same budget, almost twice the direct bookings.',
      },
      author: 'Marco T.',
      role: { it: 'Direttore, Villa Brezza', en: 'General manager, Villa Brezza' },
    },
  },

  /* ------------------------------------------------------------ 04 */
  {
    slug: 'nuda-skincare',
    client: 'Nuda Skincare',
    brand: brands.nuda,
    sector: { it: 'E-commerce · Cosmetica naturale', en: 'E-commerce · Natural skincare' },
    year: '2025',
    services: ['ads', 'design'],
    channels: ['Meta Ads', 'Google Shopping', 'Performance Max', 'UGC'],
    duration: { it: '6 mesi', en: '6 months' },
    excerpt: {
      it: 'Meno “compra ora”, più “ecco perché funziona”. Il CPA ringrazia.',
      en: 'Less “buy now”, more “here’s why it works”. The CPA says thanks.',
    },
    highlight: { value: '−35%', label: { it: 'costo per acquisto', en: 'cost per purchase' } },
    cover: art(
      { kind: 'cover', brand: brands.nuda, kicker: { it: 'Siero 01 · 30 ml', en: 'Serum 01 · 30 ml' } },
      { it: 'Poster prodotto Nuda Skincare', en: 'Nuda Skincare product poster' },
    ),
    challenge: {
      title: { it: 'Più budget ogni mese. Meno ritorno ogni mese.', en: 'More budget every month. Less return every month.' },
      body: {
        it: 'Prodotti ottimi, ads con foto da catalogo e un costo per acquisto che si mangiava il margine. Le creatività erano sempre le stesse da mesi: l’algoritmo si annoiava, il pubblico pure.',
        en: 'Great products, catalogue-photo ads and a cost per purchase eating the margin. The same creatives had run for months: the algorithm was bored, and so was the audience.',
      },
    },
    strategy: {
      title: { it: 'Testare come un laboratorio.', en: 'Test like a lab.' },
      body: {
        it: 'Un sistema di test creativo con regole semplici: tre hook, tre formati, due settimane. Quello che vince scala, quello che perde insegna qualcosa.',
        en: 'A creative testing system with simple rules: three hooks, three formats, two weeks. Winners scale, losers teach something.',
      },
      moves: [
        { it: 'Framework di test: 3 hook × 3 formati ogni 2 settimane.', en: 'Testing framework: 3 hooks × 3 formats every 2 weeks.' },
        { it: 'UGC e video “texture” al posto dello still life.', en: 'UGC and “texture” videos instead of still life.' },
        { it: 'Landing dedicate per tipo di pelle.', en: 'Dedicated landing pages per skin type.' },
        { it: 'Performance Max e Shopping con esclusioni pulite.', en: 'Performance Max and Shopping with clean exclusions.' },
      ],
    },
    creative: {
      title: { it: 'La pelle vera vende più della pelle perfetta.', en: 'Real skin sells better than perfect skin.' },
      body: {
        it: 'Creatività costruite sulle domande vere delle clienti, packaging ridisegnato per funzionare anche in un quadratino da 120 pixel nel feed Shopping.',
        en: 'Creatives built on customers’ real questions, and packaging redesigned to work even as a 120-pixel square in the Shopping feed.',
      },
      media: [
        art({ kind: 'ad', brand: brands.nuda, headline: { it: '“Unge?” No. Guarda la texture.', en: '“Is it greasy?” No. Look at the texture.' }, cta: { it: 'Acquista ora', en: 'Shop now' } }, { it: 'Inserzione con hook a domanda', en: 'Question-hook ad' }, { it: 'Hook a domanda: il vincitore del round 3.', en: 'Question hook: winner of round 3.' }),
        art({ kind: 'ad', brand: brands.nuda, tone: 'acid', headline: { it: '30 giorni. Una pelle che si fa notare.', en: '30 days. Skin that gets noticed.' }, cta: { it: 'Scopri il siero', en: 'Discover the serum' } }, { it: 'Inserzione con promessa di risultato', en: 'Outcome-promise ad' }, { it: 'Hook a promessa: ottimo CTR, meno conversioni. Archiviato.', en: 'Promise hook: great CTR, fewer conversions. Archived.' }),
        art({ kind: 'pack', brand: brands.nuda, headline: { it: 'Siero 01', en: 'Serum 01' } }, { it: 'Packaging ridisegnato del siero', en: 'Redesigned serum packaging' }),
      ],
    },
    results: {
      title: { it: 'Il margine è tornato a respirare.', en: 'The margin can breathe again.' },
      body: {
        it: 'Stesso budget del semestre precedente, più del doppio del fatturato da ads. E un archivio di test che vale oro per i prossimi lanci.',
        en: 'Same budget as the previous half-year, more than double the ad revenue. And a test library worth its weight in gold for the next launches.',
      },
      metrics: [
        { value: 4.8, decimals: 1, suffix: '×', label: { it: 'ROAS medio', en: 'average ROAS' } },
        { value: 35, prefix: '−', suffix: '%', label: { it: 'costo per acquisto', en: 'cost per purchase' } },
        { value: 3.3, decimals: 1, suffix: '%', label: { it: 'tasso di conversione (era 1,4%)', en: 'conversion rate (was 1.4%)' } },
        { value: 128, prefix: '+', suffix: '%', label: { it: 'fatturato da ads', en: 'ad-driven revenue' } },
      ],
      chart: {
        label: { it: 'ROAS per round di test', en: 'ROAS by test round' },
        unit: '×',
        series: [2.1, 2.6, 3.4, 3.9, 4.4, 4.8],
        labels: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6'],
      },
      receipt: [
        { item: { it: 'Hook testati', en: 'Hooks tested' }, qty: '×54' },
        { item: { it: 'Video UGC', en: 'UGC videos' }, qty: '×27' },
        { item: { it: 'Landing page', en: 'Landing pages' }, qty: '×4' },
        { item: { it: 'Foto da catalogo', en: 'Catalogue photos' }, qty: '×0' },
      ],
      total: { it: 'Un margine che respira', en: 'A margin that breathes' },
    },
    gallery: [
      art({ kind: 'feed', brand: brands.nuda }, { it: 'Feed Instagram di Nuda', en: 'Nuda Instagram feed' }),
      art({ kind: 'story', brand: brands.nuda, headline: { it: 'Pelle secca o mista?', en: 'Dry or combination skin?' }, cta: { it: 'Fai il test', en: 'Take the quiz' } }, { it: 'Storia con quiz', en: 'Quiz story' }),
      art({ kind: 'post', brand: brands.nuda, variant: 'quote', headline: { it: 'La pelle vera vende di più.', en: 'Real skin sells better.' } }, { it: 'Post manifesto del brand', en: 'Brand manifesto post' }),
    ],
    testimonial: {
      quote: {
        it: 'Le bastano dieci minuti di brief per capire cosa vuoi, e due settimane per farti capire cosa ti serve davvero.',
        en: 'She needs ten minutes of briefing to understand what you want, and two weeks to make you understand what you actually need.',
      },
      author: 'Elena B.',
      role: { it: 'Founder, Nuda Skincare', en: 'Founder, Nuda Skincare' },
    },
  },

  /* ------------------------------------------------------------ 05 */
  {
    slug: 'bottega-fiore',
    client: 'Bottega Fiore',
    brand: brands.fiore,
    sector: { it: 'Retail locale · Fioraio & concept store', en: 'Local retail · Florist & concept store' },
    year: '2024',
    services: ['design', 'social'],
    channels: ['Brand identity', 'Packaging', 'Insegna', 'Instagram'],
    duration: { it: '3 mesi', en: '3 months' },
    excerpt: {
      it: 'Un’identità che profuma come il negozio. Dall’insegna al nastro.',
      en: 'An identity that smells like the shop. From the sign to the ribbon.',
    },
    highlight: { value: '3×', label: { it: 'ordini da Instagram', en: 'orders from Instagram' } },
    cover: art(
      { kind: 'cover', brand: brands.fiore, kicker: { it: 'Fiori, cose belle, dal 1987', en: 'Flowers & lovely things, since 1987' } },
      { it: 'Poster di Bottega Fiore', en: 'Bottega Fiore poster' },
    ),
    challenge: {
      title: { it: 'Un negozio bellissimo, un’identità che non gli somigliava.', en: 'A beautiful shop with an identity that didn’t look like it.' },
      body: {
        it: 'Logo in clipart, biglietti da visita di tre colori diversi, insegna sbiadita dal sole. Dentro, invece, uno dei negozi più belli della città. Online e offline raccontavano due storie diverse.',
        en: 'Clipart logo, business cards in three different colours, a sign bleached by the sun. Inside, one of the most beautiful shops in town. Online and offline told two different stories.',
      },
    },
    strategy: {
      title: { it: 'Partire da quello che c’era già: il negozio.', en: 'Start from what was already there: the shop.' },
      body: {
        it: 'Abbiamo preso colori, materiali e gesti del negozio e li abbiamo trasformati in un sistema: marchio, palette, carta, nastri, vetrine e template social.',
        en: 'We took the shop’s colours, materials and gestures and turned them into a system: logo, palette, paper, ribbons, windows and social templates.',
      },
      moves: [
        { it: 'Nuovo marchio e palette ispirati alla carta da pacchi.', en: 'New logo and palette inspired by wrapping paper.' },
        { it: 'Sistema di packaging: carta, nastri, etichette, biglietti.', en: 'Packaging system: paper, ribbons, labels, cards.' },
        { it: 'Insegna e vetrofanie pensate per essere fotografate.', en: 'Sign and window graphics designed to be photographed.' },
        { it: 'Template social per far pubblicare il team in autonomia.', en: 'Social templates so the team can post on its own.' },
      ],
    },
    creative: {
      title: { it: 'Un sistema, non solo un logo.', en: 'A system, not just a logo.' },
      body: {
        it: 'Il marchio funziona in piccolo sul nastro e in grande sull’insegna. La palette è quella del negozio: carta, verde foglia, un giallo acido che si vede dall’altra parte della strada.',
        en: 'The logo works small on a ribbon and big on the sign. The palette is the shop’s own: paper, leaf green and an acid yellow you can see from across the street.',
      },
      media: [
        art({ kind: 'sign', brand: brands.fiore }, { it: 'Insegna del negozio', en: 'Shop sign' }, { it: 'Insegna: la foto più taggata del quartiere.', en: 'The sign: the most tagged photo in the neighbourhood.' }),
        art({ kind: 'pack', brand: brands.fiore, headline: { it: 'Per te, e basta.', en: 'For you. That’s it.' } }, { it: 'Biglietto e packaging', en: 'Card and packaging' }),
        art({ kind: 'print', brand: brands.fiore, variant: 'card', headline: { it: 'Grazie di cuore', en: 'Thank you, truly' } }, { it: 'Biglietti di ringraziamento', en: 'Thank-you cards' }),
      ],
    },
    results: {
      title: { it: 'Riconoscibile. Ovunque.', en: 'Recognisable. Everywhere.' },
      body: {
        it: 'Le persone fotografano l’insegna, taggano il negozio e scrivono in DM per ordinare. Il marchio lavora anche quando la bottega è chiusa.',
        en: 'People photograph the sign, tag the shop and order via DM. The brand works even when the shop is closed.',
      },
      metrics: [
        { value: 3, suffix: '×', label: { it: 'ordini da Instagram', en: 'orders from Instagram' } },
        { value: 40, prefix: '+', suffix: '%', label: { it: 'matrimoni prenotati', en: 'weddings booked' } },
        { value: 120, prefix: '+', label: { it: 'tag spontanei in 2 mesi', en: 'organic tags in 2 months' } },
        { value: 8, suffix: '/10', label: { it: 'ricordano il marchio', en: 'recall the brand' }, note: { it: 'sondaggio tra clienti', en: 'customer survey' } },
      ],
      receipt: [
        { item: { it: 'Marchio', en: 'Logo' }, qty: '×1' },
        { item: { it: 'Elementi di packaging', en: 'Packaging pieces' }, qty: '×9' },
        { item: { it: 'Insegna + vetrofanie', en: 'Sign + window graphics' }, qty: '×3' },
        { item: { it: 'Template social', en: 'Social templates' }, qty: '×12' },
        { item: { it: 'Fiori nel moodboard', en: 'Flowers in the moodboard' }, qty: '×214' },
      ],
      total: { it: 'Un marchio che lavora da solo', en: 'A brand that works on its own' },
    },
    gallery: [
      art({ kind: 'feed', brand: brands.fiore }, { it: 'Feed Instagram di Bottega Fiore', en: 'Bottega Fiore Instagram feed' }),
      art({ kind: 'cover', brand: brands.fiore, tone: 'ink', kicker: { it: 'San Valentino? Ogni giorno.', en: 'Valentine’s? Every day.' } }, { it: 'Poster stagionale', en: 'Seasonal poster' }),
      art({ kind: 'story', brand: brands.fiore, headline: { it: 'Bouquet del giorno', en: 'Bouquet of the day' }, cta: { it: 'Ordina in DM', en: 'Order via DM' } }, { it: 'Storia bouquet del giorno', en: 'Bouquet of the day story' }),
    ],
  },

  /* ------------------------------------------------------------ 06 */
  {
    slug: 'osteria-ventitre',
    client: 'Osteria Ventitré',
    brand: brands.ventitre,
    sector: { it: 'Ristorazione · Osteria', en: 'Restaurants · Osteria' },
    year: '2026',
    services: ['social', 'ads', 'design'],
    channels: ['Instagram', 'Meta Ads', 'Google Ads', 'Menu'],
    duration: { it: '4 mesi', en: '4 months' },
    excerpt: {
      it: 'Martedì pieni: come spalmare la domanda invece di urlare più forte.',
      en: 'Full Tuesdays: spreading demand instead of shouting louder.',
    },
    highlight: { value: '+70%', label: { it: 'prenotazioni', en: 'bookings' } },
    cover: art(
      { kind: 'cover', brand: brands.ventitre, kicker: { it: 'Martedì 23 — menu degustazione', en: 'Tuesday 23 — tasting menu' } },
      { it: 'Poster di Osteria Ventitré', en: 'Osteria Ventitré poster' },
    ),
    challenge: {
      title: { it: 'Sabato pieno, martedì vuoto.', en: 'Packed Saturdays, empty Tuesdays.' },
      body: {
        it: 'Il sabato si rifiutavano tavoli, il martedì la sala era mezza vuota. Più visibilità generica avrebbe solo allungato la lista d’attesa del weekend. Serviva spostare la domanda, non solo aumentarla.',
        en: 'On Saturdays they turned tables away; on Tuesdays the room was half empty. More generic visibility would only lengthen the weekend waiting list. Demand had to move, not just grow.',
      },
    },
    strategy: {
      title: { it: 'Dare a qualcuno un motivo per uscire di martedì.', en: 'Give people a reason to go out on a Tuesday.' },
      body: {
        it: 'Un format riconoscibile, un prezzo chiaro e campagne che parlano solo a chi abita vicino, solo nei giorni giusti.',
        en: 'A recognisable format, a clear price and campaigns that only speak to locals, only on the right days.',
      },
      moves: [
        { it: 'Il format “Martedì 23”: menu degustazione a prezzo fisso.', en: 'The “Tuesday 23” format: fixed-price tasting menu.' },
        { it: 'Meta Ads geolocalizzate (10 km), attive solo lunedì e martedì.', en: 'Meta Ads geo-targeted (10 km), live only Monday and Tuesday.' },
        { it: 'Scheda Google ottimizzata + campagne locali.', en: 'Optimised Google Business Profile + local campaigns.' },
        { it: 'Menu cartaceo ridisegnato, coordinato con il feed.', en: 'Redesigned paper menu, coordinated with the feed.' },
      ],
    },
    creative: {
      title: { it: 'Un numero che diventa un appuntamento.', en: 'A number that becomes a date.' },
      body: {
        it: 'Il 23 è diventato un segno grafico: sul menu, nelle storie, sui segnaposto. Riconoscibile al primo colpo, impossibile da confondere.',
        en: 'The 23 became a graphic sign: on the menu, in stories, on place cards. Recognisable at first glance, impossible to mistake.',
      },
      media: [
        art({ kind: 'print', brand: brands.ventitre, variant: 'menu', headline: { it: 'Menu del martedì', en: 'Tuesday menu' } }, { it: 'Menu cartaceo ridisegnato', en: 'Redesigned paper menu' }, { it: 'Menu: stampato su carta uncoated, si sporca bene.', en: 'Menu: printed on uncoated paper. It ages well.' }),
        art({ kind: 'ad', brand: brands.ventitre, headline: { it: 'Martedì 23. Il menu cambia, il prezzo no.', en: 'Tuesday 23. The menu changes, the price doesn’t.' }, cta: { it: 'Prenota un tavolo', en: 'Book a table' } }, { it: 'Inserzione Meta per il martedì', en: 'Meta ad for Tuesdays' }),
        art({ kind: 'story', brand: brands.ventitre, tone: 'acid', headline: { it: 'Stasera: 4 portate, 1 prezzo', en: 'Tonight: 4 courses, 1 price' }, cta: { it: 'Prenota', en: 'Book' } }, { it: 'Storia del martedì', en: 'Tuesday story' }),
      ],
    },
    results: {
      title: { it: 'Il martedì è diventato una serata.', en: 'Tuesday became a night out.' },
      body: {
        it: 'Undici martedì pieni su dodici, recensioni in salita e un costo per prenotazione che sta in un caffè e mezzo.',
        en: 'Eleven full Tuesdays out of twelve, rising reviews and a cost per booking you could cover with a coffee and a half.',
      },
      metrics: [
        { value: 70, prefix: '+', suffix: '%', label: { it: 'prenotazioni in 3 mesi', en: 'bookings in 3 months' } },
        { value: 11, suffix: '/12', label: { it: 'martedì pieni', en: 'full Tuesdays' } },
        { value: 4.7, decimals: 1, suffix: '★', label: { it: 'recensioni Google (era 4,2)', en: 'Google rating (was 4.2)' } },
        { value: 2.1, decimals: 2, prefix: '€', label: { it: 'costo per prenotazione', en: 'cost per booking' } },
      ],
      chart: {
        label: { it: 'Coperti del martedì (media mensile)', en: 'Tuesday covers (monthly average)' },
        series: [18, 26, 37, 44],
        labels: ['M0', 'M1', 'M2', 'M3'],
      },
      receipt: [
        { item: { it: 'Menu ridisegnato', en: 'Menu redesign' }, qty: '×1' },
        { item: { it: 'Campagne locali', en: 'Local campaigns' }, qty: '×8' },
        { item: { it: 'Storie del martedì', en: 'Tuesday stories' }, qty: '×48' },
        { item: { it: 'Tavoli rifiutati il sabato', en: 'Saturday tables refused' }, qty: '−32%' },
      ],
      total: { it: 'Una serata in più a settimana', en: 'One more night a week' },
    },
    gallery: [
      art({ kind: 'feed', brand: brands.ventitre }, { it: 'Feed Instagram di Osteria Ventitré', en: 'Osteria Ventitré Instagram feed' }),
      art({ kind: 'sign', brand: brands.ventitre }, { it: 'Insegna dell’osteria', en: 'Osteria sign' }),
      art({ kind: 'post', brand: brands.ventitre, variant: 'quote', headline: { it: 'Il martedì è il nuovo sabato.', en: 'Tuesday is the new Saturday.' } }, { it: 'Post con slogan', en: 'Slogan post' }),
    ],
    testimonial: {
      quote: {
        it: 'Pensavo servisse più pubblicità. Serviva un’idea. Poi anche la pubblicità, ma fatta bene.',
        en: 'I thought we needed more advertising. We needed an idea. Then advertising too — done right.',
      },
      author: 'Chiara V.',
      role: { it: 'Chef e titolare, Osteria Ventitré', en: 'Chef & owner, Osteria Ventitré' },
    },
  },
]

export const getCase = (slug: string) => cases.find((c) => c.slug === slug)

export const getNextCase = (slug: string) => {
  const i = cases.findIndex((c) => c.slug === slug)
  return cases[(i + 1) % cases.length]
}
