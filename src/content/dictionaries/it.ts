import { site } from '../site'

/**
 * ─────────────────────────────────────────────────────────────────────
 *  COPY — ITALIANO
 *  Mini-sintassi nei testi:
 *    *parola*    → corsivo editoriale (Instrument Serif)
 *    ==parola==  → evidenziatore acido
 *  Le ancore (id) delle sezioni sono in `sections.*.id`.
 * ─────────────────────────────────────────────────────────────────────
 */

const it = {
  locale: 'it',
  meta: {
    title: `Irene Chies — Social Media Manager e Advertiser Meta & Google a ${site.city}`,
    description: `Social media manager, advertiser certificata Meta Ads e Google Ads e graphic designer a ${site.city}. Strategia, campagne e grafica online e offline per brand che vogliono crescere davvero.`,
    ogAlt: 'Irene Chies — Social, Ads, Design. Faccio crescere brand, online e offline.',
    keywords: [
      `social media manager ${site.city}`,
      `advertiser Meta Google ${site.city}`,
      `Meta Ads ${site.city}`,
      `Google Ads ${site.city}`,
      `graphic designer ${site.city}`,
      `gestione social ${site.city}`,
      'social media manager freelance',
      'consulente Meta Ads',
    ],
    jobTitle: 'Social Media Manager, Advertiser Meta & Google, Graphic Designer',
  },

  a11y: {
    skip: 'Vai al contenuto',
    home: 'Irene Chies — torna alla home',
    menuOpen: 'Apri il menu',
    menuClose: 'Chiudi il menu',
    newTab: '(si apre in una nuova scheda)',
    backToTop: 'Torna su',
    language: 'Lingua',
    switchTo: 'Read in English',
    mainNav: 'Navigazione principale',
  },

  nav: {
    cta: 'Parliamo',
    menu: 'Menu',
    close: 'Chiudi',
    menuNote: 'Scrivimi. Risponde una persona, non un bot.',
    curtain: 'In stampa…',
  },

  sections: {
    hero: { id: 'inizio', label: 'Inizio' },
    manifesto: { id: 'manifesto', label: 'Manifesto' },
    services: { id: 'servizi', label: 'Servizi' },
    work: { id: 'lavori', label: 'Lavori' },
    feed: { id: 'feed', label: 'Il feed' },
    numbers: { id: 'numeri', label: 'Numeri' },
    method: { id: 'metodo', label: 'Metodo' },
    clients: { id: 'clienti', label: 'Clienti' },
    about: { id: 'chi-sono', label: 'Chi sono' },
    contact: { id: 'contatti', label: 'Contatti' },
  },

  /** Voci del menu (riferite alle chiavi di `sections`) */
  menuItems: ['services', 'work', 'method', 'about', 'contact'] as const,

  hero: {
    eyebrow: 'Portfolio — 2026',
    location: `Base a ${site.city}. Lavoro ovunque ci sia il wi-fi.`,
    roles: ['Social Media Manager', 'Advertiser Meta & Google', 'Graphic Designer'],
    rotating: ['Social', 'Ads', 'Design'],
    rotatingLabel: 'Mi occupo di',
    claim: 'Faccio crescere brand.',
    growWord: 'crescere',
    claimAccent: 'Online e offline.',
    sub: `Social media manager, advertiser certificata Meta & Google e graphic designer a ${site.city}. Non faccio post: costruisco brand che crescono e campagne che convertono.`,
    ctaPrimary: 'Parliamo del tuo brand',
    ctaSecondary: 'Guarda i lavori',
    scroll: 'Scorri. Ne vale la pena.',
  },

  manifesto: {
    text: 'I like fanno piacere. I clienti fanno ==fatturato.== Io lavoro per i secondi: parto dai *dati,* li trasformo in idee che *si vedono* e misuro tutto. Se una cosa non funziona, la cambio. ==Anche se era bellissima.==',
    signature: 'Irene',
  },

  services: {
    title: 'Tre mestieri. *Un solo* obiettivo.',
    intro: 'Social, ads e grafica di solito li fanno tre persone che non si parlano. Io li faccio parlare — nella stessa testa. Il risultato è un brand coerente, dal feed alla vetrina.',
    labels: { includes: 'Cosa include', forWho: 'Per chi è', outcome: 'Risultato atteso', expand: 'Apri il dettaglio', collapse: 'Chiudi il dettaglio' },
    items: [
      {
        key: 'social',
        title: 'Social Media Management',
        tagline: 'Il feed è la tua vetrina. Lo tratto come tale.',
        includes: [
          'Audit del profilo e analisi dei competitor',
          'Strategia e tono di voce',
          'Piano editoriale mensile',
          'Grafiche, caroselli e reel',
          'Copywriting (sì, anche le caption)',
          'Community management',
          'Report mensile con KPI veri, non solo like',
        ],
        forWho: 'Attività locali e brand che pubblicano “quando capita” e vogliono un metodo. E-commerce che vogliono un profilo che vende anche quando non sponsorizzano.',
        outcome: 'Un profilo riconoscibile in tre secondi di scroll, una community che risponde e un calendario che non dipende dall’ispirazione del lunedì mattina.',
        kpi: { value: '+180%', label: 'follower medi in 6 mesi' },
      },
      {
        key: 'ads',
        title: 'Advertising Meta & Google',
        tagline: 'Ogni euro ha un compito. E un report.',
        includes: [
          'Setup tecnico: Pixel, API Conversioni, GA4, Tag Manager',
          'Strategia di funnel, dalla scoperta all’acquisto',
          'Campagne Meta Ads (Facebook e Instagram)',
          'Google Ads: Search, Performance Max, Shopping, YouTube',
          'Creatività ads e test A/B',
          'Ottimizzazione settimanale',
          'Report chiari, in italiano (non in “marketese”)',
        ],
        forWho: 'Chi ha provato a “mettere in evidenza” un post e ha visto sparire il budget. E-commerce, attività locali e servizi che vogliono contatti e vendite misurabili.',
        outcome: 'Costo per contatto sotto controllo, ROAS leggibile, decisioni prese sui dati e non a sensazione. Sai sempre dove va ogni euro.',
        kpi: { value: '4,6×', label: 'ROAS medio e-commerce' },
      },
      {
        key: 'design',
        title: 'Grafica online & offline',
        tagline: 'Dal post al packaging, stessa voce.',
        includes: [
          'Brand identity e logo',
          'Social design e template',
          'Volantini, flyer e menu',
          'Packaging ed etichette',
          'Cataloghi e brochure',
          'Insegne, vetrofanie, allestimenti',
          'File pronti per la stampa, crocini compresi',
        ],
        forWho: 'Brand che online sembrano una cosa e in negozio un’altra. Chi deve andare in stampa e non vuole sorprese dalla tipografia.',
        outcome: 'Un’identità coerente ovunque: feed, sito, vetrina, scaffale. E file per cui il tipografo ti ringrazia.',
        kpi: { value: '0', label: 'ristampe per errori di file' },
      },
    ],
  },

  work: {
    title: 'Prove, *non* promesse.',
    intro: 'Sei brand, sei problemi diversi, un metodo. Apri un progetto: trovi la sfida, le scelte fatte e i numeri — anche quelli che all’inizio non tornavano.',
    views: { label: 'Cambia vista', grid: 'Griglia', index: 'Indice' },
    cursor: 'Apri',
    columns: { client: 'Cliente', sector: 'Settore', services: 'Servizi', year: 'Anno', result: 'Risultato' },
  },

  feed: {
    title: 'Sembra spontaneo. *È tutto pianificato.*',
    intro: 'Scorri come farebbe un tuo cliente. Le note a margine sono quelle che vedo io.',
    phone: { following: 'Segui già', sponsored: 'Sponsorizzato', likes: 'Mi piace', stories: ['Lavori', 'Tips', 'Backstage', 'Clienti', 'Q&A'] },
    noteLabels: { goal: 'Obiettivo', result: 'Risultato' },
    end: 'Fine del feed. Inizio dei risultati.',
    progress: 'Post',
  },

  numbers: {
    title: 'Numeri. Perché le parole *sono gratis.*',
    footnote: 'Medie calcolate sui clienti attivi 2022–2026. I risultati dipendono da settore, budget e punto di partenza: chi ti promette numeri sicuri ti sta vendendo qualcosa.',
  },

  method: {
    title: 'Quattro step. *Nessuna magia.*',
    intro: 'Chi compra un servizio vuole sapere cosa succede dopo la firma. Eccolo.',
    hint: 'Scorri',
    deliverables: 'Cosa ricevi',
    steps: [
      {
        title: 'Ascolto',
        lead: 'Prima di parlare, ascolto.',
        body: 'Brief, audit dei canali, analisi dei competitor e — quando si può — due chiacchiere con i tuoi clienti veri. Capisco cosa funziona, cosa no e perché.',
        deliverables: ['Audit social e ads', 'Analisi competitor', 'Mappa del pubblico'],
        time: 'Settimana 1',
      },
      {
        title: 'Strategia',
        lead: 'Obiettivi con un numero accanto.',
        body: 'Posizionamento, tono di voce, piano editoriale, struttura del funnel e budget. Tutto scritto, tutto misurabile, niente fuffa.',
        deliverables: ['Documento strategico', 'KPI e obiettivi', 'Piano editoriale e media'],
        time: 'Settimana 2',
      },
      {
        title: 'Creazione',
        lead: 'La parte che si vede (e si ricorda).',
        body: 'Contenuti, grafiche, campagne e materiali offline. Stessa voce ovunque, dal reel al volantino.',
        deliverables: ['Contenuti e grafiche', 'Campagne online', 'File per la stampa'],
        time: 'Settimane 3–4',
      },
      {
        title: 'Ottimizzazione',
        lead: 'I numeri parlano. Io ascolto (di nuovo).',
        body: 'Monitoraggio, test A/B, aggiustamenti settimanali e un report mensile che si legge in cinque minuti.',
        deliverables: ['Test A/B', 'Report mensile', 'Prossime mosse'],
        time: 'Sempre',
      },
    ],
    loop: 'Poi si ricomincia. *Più veloci,* con più dati.',
  },

  clients: {
    title: 'Hanno scelto *di crescere.*',
    marqueeLabel: 'Alcuni dei brand con cui ho lavorato',
    testimonialsTitle: 'Dicono di me (senza che li paghi)',
  },

  about: {
    title: 'Ciao, sono *Irene.*',
    bio: [
      'Ho iniziato disegnando volantini per il bar sotto casa. Poi sono arrivati i social, le prime campagne, i primi budget a cinque cifre — e la scoperta che la grafica più bella del mondo non serve a niente se nessuno la vede.',
      `Oggi lavoro con piccole attività e brand in crescita, tra ${site.city} e il resto d’Italia. Seguo tutto il percorso: dalla strategia alla campagna, dal post al volantino. Mi piacciono i report puliti, le stampe che escono dritte e i clienti che dicono «proviamo».`,
      'Fuori orario: mercatini dell’usato, film dell’orrore e pasta fatta a mano. Non necessariamente in quest’ordine.',
    ],
    photoAlt: `Ritratto di Irene Chies a ${site.city}`,
    photoCaption: `Irene, ${site.city}, 2026. Foto vera, luce vera.`,
    certTitle: 'Certificazioni',
    certVerify: 'Verifica',
    toolsTitle: 'La cassetta degli attrezzi',
    statsTitle: 'Irene in numeri (non ufficiali)',
    stats: [
      { value: '3', label: 'caffè al giorno', note: 'non ottimizzabile' },
      { value: '7', label: 'bozze prima del definitivo', note: 'in media' },
      { value: '0', label: 'report consegnati in ritardo', note: 'dato verificato' },
      { value: '∞', label: 'volte che ho detto «facciamo un test»', note: 'e lo rifarei' },
    ],
  },

  contact: {
    title: 'Parliamo del tuo *brand.*',
    lead: 'Raccontami a che punto sei. Ti rispondo entro 24 ore lavorative con una prima idea — gratis, senza impegno e senza giri di parole.',
    form: {
      name: 'Come ti chiami?',
      email: 'La tua email',
      brand: 'Il tuo brand (o il profilo Instagram)',
      budget: 'Budget indicativo al mese',
      budgetOptions: ['Meno di 500 €', '500–1.500 €', '1.500–5.000 €', 'Oltre 5.000 €', 'Non lo so ancora'],
      message: 'Raccontami tutto (o quasi)',
      messagePlaceholder: 'Cosa vendi, a chi, cosa non sta funzionando…',
      privacy: 'Ho letto l’informativa privacy e acconsento al trattamento dei miei dati per ricevere una risposta.',
      privacyLink: 'informativa privacy',
      submit: 'Invia il messaggio',
      sending: 'Invio in corso…',
      required: 'obbligatorio',
      errors: {
        required: 'Questo mi serve per risponderti.',
        email: 'Questa email non mi convince. Ricontrolli?',
        privacy: 'Serve il consenso, altrimenti non posso risponderti.',
        generic: 'Qualcosa è andato storto. Scrivimi su WhatsApp o via email: arrivo lo stesso.',
      },
      success: {
        title: 'Ricevuto!',
        body: 'Ti rispondo entro 24 ore lavorative (di solito prima, se il caffè fa il suo dovere).',
        again: 'Invia un altro messaggio',
      },
      fallback: {
        title: 'Quasi fatto.',
        body: 'Il modulo non è ancora collegato alla mia casella. Ho preparato il messaggio: scegli tu come mandarlo.',
        whatsapp: 'Invia su WhatsApp',
        email: 'Invia via email',
      },
      subject: 'Nuovo contatto dal sito',
    },
    direct: {
      title: 'Preferisci scrivere?',
      whatsapp: 'Scrivimi su WhatsApp',
      whatsappText: 'Ciao Irene! Ti scrivo dal sito: vorrei parlarti del mio brand.',
      email: 'Email',
      copy: 'Copia',
      copied: 'Copiata!',
      calendly: 'Prenota una call di 20 minuti',
      response: 'Rispondo entro 24 ore lavorative.',
      social: 'Social',
    },
  },

  footer: {
    kicker: 'Ancora qui?',
    title: 'Allora *parliamo.*',
    cta: 'Scrivimi',
    menu: 'Menu',
    social: 'Social',
    contacts: 'Contatti',
    time: 'Ora locale',
    end: 'Fine. Grazie per aver scrollato fino a qui.',
    privacy: 'Privacy',
    cookies: 'Nessun cookie di profilazione. Solo biscotti.',
    vat: 'P.IVA',
  },

  caseStudy: {
    back: 'Tutti i lavori',
    facts: { client: 'Cliente', sector: 'Settore', services: 'Servizi', channels: 'Canali', duration: 'Durata', year: 'Anno' },
    chapters: { challenge: 'La sfida', strategy: 'La strategia', creative: 'La creatività', results: 'I risultati', gallery: 'Gallery' },
    moves: 'Le mosse',
    summary: { title: 'Il lavoro, in quantità', total: 'Risultato' },
    next: 'Prossimo lavoro',
    ctaKicker: 'Ti piacciono questi numeri?',
    ctaTitle: 'Facciamo i *tuoi.*',
    ctaButton: 'Parliamo del tuo brand',
    metaSuffix: 'case study di social, ads e design',
  },

  services_short: { social: 'Social', ads: 'Ads', design: 'Design' },

  notFound: {
    title: 'Pagina non trovata.',
    body: 'Questo link ha un CTR del 100% e un tasso di conversione dello 0%. Torniamo dove succedono le cose?',
    cta: 'Torna alla home',
  },

  privacy: {
    title: 'Privacy',
    updated: 'Ultimo aggiornamento: ottobre 2026',
  },
}

export default it
export type Dictionary = typeof it
