# Irene Chies — Portfolio

**Social Media Manager · Advertiser Meta & Google · Graphic Designer**

Concept: _“Faccio crescere brand”_. Un sito pulito e leggibile, in viola: un solo carattere (Geist), tanto spazio, card morbide e un oggetto 3D al centro dell’hero, una sfera “liquida” che si deforma, segue il mouse e cresce con lo scroll, come i brand che Irene fa crescere. Prima si capisce chi è e cosa ottiene, poi arriva l’effetto.

Stack: **Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText) · Lenis · WebGL** · TypeScript.

---

## Avvio rapido

Serve Node.js **20.9 o superiore**.

```bash
npm install
npm run dev        # http://localhost:3000
```

Produzione:

```bash
npm run build
npm start          # http://localhost:3000
```

Controlli: `npm run lint` · `npm run typecheck`.

### Vederla online in 2 minuti

- **Vercel** (consigliato): [vercel.com/new](https://vercel.com/new) → importa il repository → scegli il branch → _Deploy_. Ottieni un link pubblico da aprire su Chrome, anche dal telefono.
- **CodeSandbox**: apri `https://codesandbox.io/p/github/<utente>/<repo>` e lascia partire `npm run dev`.

---

## Design system

| | |
|---|---|
| **Palette** | Viola elettrico `#6B3CF6` (azioni, accenti) · Lilla `#C4B5FD` / `#E4DBFF` · Viola profondo `#0F0726` (sezioni scure) · Inchiostro `#160C2E` · Fondo `#FBFAFF` |
| **Sfera** | viola pieno, dalla luce all'ombra: `#F0DCFF` → `#A34DFF` → `#5A17C9` → `#2E0866` (3D, logo, intro, anteprime social, icone) |
| **Carattere** | Geist (titoli 600, testi 400) · un solo font, niente serif o mono decorativi |
| **Forme** | card con angoli morbidi, ombre leggere, aloni viola sfumati, pillole |
| **Temi di sezione** | `theme-light` · `theme-soft` · `theme-violet` · `theme-dark`: l’header cambia colore in base alla sezione sotto |
| **Contrasto** | testi AA ovunque (anche sul viola: bianco ≥ 90%) |

Tutto è in `src/app/globals.css` (token Tailwind 4 in `@theme`).

---

## Prima di pubblicare: cosa sostituire

Tutti i contenuti sono in `src/content`. **Numeri, clienti, progetti e testimonianze sono d’esempio**: vanno sostituiti con quelli reali (le recensioni solo con il consenso dei clienti).

| Cosa | Dove |
|---|---|
| Città, email, telefono, WhatsApp, Instagram, LinkedIn, Calendly, P.IVA, disponibilità | `src/content/site.ts` |
| Tutti i testi in italiano / inglese | `src/content/dictionaries/it.ts` · `en.ts` |
| Case study (sfida, strategia, creatività, risultati, gallery) | `src/content/data/cases.ts` |
| Numeri chiave, clienti del marquee, testimonianze, certificazioni, strumenti | `src/content/data/proof.ts` |
| Post del “feed” nel telefono | `src/content/data/feed.ts` |
| Foto di Irene | `public/images/irene/ritratto.webp` (vedi sotto) |
| Informativa privacy (testo d’esempio da far verificare) | `src/components/sections/PrivacyView.tsx` |
| URL pubblico del sito | variabile `NEXT_PUBLIC_SITE_URL` |

**Mini-sintassi nei testi**: `*parola*` → tono “voce” (più leggero, viola) · `==parola==` → parola in gradiente viola.

### Foto vere al posto dei visual segnaposto

I visual dei progetti, del feed e il ritratto sono **segnaposto generati dal codice** (niente stock), già esportati in WebP in `public/images/`:

```
public/images/
  irene/ritratto.webp            → 1200×1500 (4:5)
  lavori/<progetto>/*.webp       → copertine 1200×1500, gallery nelle proporzioni indicate
  feed/post-1…6.webp             → post del telefono
```

Per usare le foto vere hai due strade:

1. **Stesso nome, stesse proporzioni**: sostituisci il file `.webp` e basta, senza toccare il codice.
2. **File nuovo**: nei contenuti cambia `src`, `width`, `height` (e `alt`) del media:

```ts
cover: {
  type: 'image',
  src: '/images/lavori/atelier-ombra-cover.jpg',
  width: 1600,
  height: 2000,
  alt: { it: 'Campagna SS26 di Atelier Ombra', en: 'Atelier Ombra SS26 campaign' },
}
```

Next.js le serve in **AVIF/WebP**, ridimensionate e in lazy loading. È supportato anche `type: 'video'` (loop muto). Il campo `art` dei media è la “ricetta” del segnaposto: quando metti una foto vera puoi cancellarlo.

Per rigenerare i segnaposto (serve solo se cambi le ricette in `src/content/data`):

```bash
npm i --no-save playwright && npx playwright install chromium   # la prima volta
npm run dev                                                      # in un terminale
node scripts/render-placeholders.mjs                             # in un altro
```

Lo script legge le ricette da `/dev/art` (una pagina che esiste solo in sviluppo) e riscrive tutti i WebP. Con `--skip-existing` crea solo i file che mancano, così non tocca le foto vere che hai già messo al loro posto.

---

## Form contatti

Il form invia a `POST /api/contact`, che inoltra l’email con [Resend](https://resend.com). Copia `.env.example` in `.env.local` e imposta:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=ciao@tuodominio.it
CONTACT_FROM_EMAIL="Sito Irene Chies <form@tuodominio.it>"
```

Senza queste variabili il form **non perde contatti**: propone in automatico di inviare lo stesso messaggio, già compilato, via WhatsApp o email. Anti-spam: honeypot + tempo minimo di compilazione.

---

## Struttura

```
src/
  app/
    (it)/                 → sito in italiano (/, /lavori/[slug], /privacy)
    (en)/en/              → sito in inglese (/en, /en/work/[slug], /en/privacy)
    (dev)/dev/art/        → solo in sviluppo: ricette dei segnaposto per lo script
    api/contact/          → invio del form
    sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.tsx, og.png/
    globals.css           → design system (token, temi, tipografia, intro, variante `pinned:`)
    fonts.ts              → Geist
  components/
    layout/               → Header + menu, Footer, Intro, StickyCta (mobile), LangSwitch
    motion/               → MotionProvider (Lenis + GSAP), Blob3D (WebGL), Cursor, PageTransition, Marquee
    sections/             → Hero, Manifesto, Services, Work, Feed, Numbers, Method, Clients, About, Contact
    case/                 → pagina case study, grafico risultati
    art/                  → visual generativi SVG (usati solo per creare i segnaposto)
  content/                → TUTTI i contenuti (vedi sopra)
  lib/                    → SEO e JSON-LD, immagini OG, GSAP, utility
scripts/
  render-placeholders.mjs → esporta i segnaposto in WebP
```

## Note di progetto

- **Oggetto 3D**: WebGL puro, senza librerie (un fragment shader in raymarching, `src/components/motion/Blob3D.tsx`). I colori sono le costanti `deep`, `violet`, `plum`, `lilac`, `orchid` nello shader. Parte (contesto WebGL compreso) a pagina caricata e thread libero, si ferma fuori schermo o a scheda nascosta, abbassa la risoluzione (o si ferma su un fotogramma) se il dispositivo fatica. Senza GPU vera (rendering software) o senza WebGL resta una sfera in CSS identica nei colori.
- **Intro ~1,5 s in CSS puro**: parte al primo paint senza aspettare il JavaScript, non blocca i click e non si ripete nella stessa sessione.
- **Movimento**: smooth scroll Lenis + GSAP ScrollTrigger; titoli riga per riga (SplitText), manifesto che si accende parola per parola, cursore custom, anteprima che segue il cursore nell’indice lavori, contatori, feed nel telefono e metodo orizzontale con pin, bottoni magnetici, card che si inclinano, marquee che reagisce alla velocità dello scroll. Solo `transform`/`opacity` dove possibile.
- **Leggero al caricamento**: le animazioni si preparano a thread libero (`whenIdle`), le entrate usano un unico IntersectionObserver invece di decine di ScrollTrigger, i testi si dividono in righe solo quando si avvicinano, il menu mobile si monta alla prima apertura, la seconda copia dei marquee nasce nel browser. Il layout delle sezioni con pin lo decide il CSS (variante `pinned:` = JS attivo + movimento consentito), così dopo l’idratazione nulla si sposta (CLS 0).
- **prefers-reduced-motion**: niente intro, niente smooth scroll, niente pin (il metodo diventa un carosello nativo, il feed uno scroll interno con tutte le note), 3D fermo, valori finali subito visibili.
- **Accessibilità**: skip link, focus visibili, menu con trappola del focus ed Esc, accordion con `aria-expanded`, form con errori collegati (`aria-describedby`), grafici con tabella equivalente, contrasti AA (verificati con axe-core su home, case study e menu).
- **SEO**: metadata e hreflang IT/EN, Open Graph generati in build, sitemap, robots, dati strutturati `Person` + `ProfessionalService` + `WebSite`, `CreativeWork`/`BreadcrumbList` sui case study.
- **i18n**: l’inglese è già tradotto; per aggiungere una lingua, duplica `en.ts` e il gruppo di route.
- **Cookie**: il sito non ne usa di profilazione. Se aggiungi Meta Pixel o Google Analytics, serve un banner di consenso (Consent Mode v2) e va aggiornata l’informativa.

### Lighthouse (build di produzione, in locale)

| | Performance | Accessibilità | Best practice | SEO |
|---|---|---|---|---|
| Desktop | 99–100 | 100 | 100 | 100 |
| Mobile (Moto G simulato, 4G lento) | 85–91 | 100 | 100 | 100 |
| Case study mobile | 94–97 | 100 | 100 | 100 |

Sul mobile la performance oscilla da un test all’altro: il peso viene dall’idratazione di una home molto ricca (pin, feed nel telefono, 3D). Se serve un margine più ampio, le leve sono: una home più corta, il feed con meno post, oppure niente Lenis su touch.

## Licenze

Font: SIL Open Font License (Geist, via `next/font`). Codice: proprietà di Irene Chies.
