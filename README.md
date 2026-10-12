# Irene Chies — Portfolio

**Social Media Manager · Advertiser Meta & Google · Graphic Designer**
Concept: _“Strategia che si vede”_ — carta, inchiostro e un evidenziatore acido. Il dato (griglie, numeri, note a margine) e la creatività (tipografia gigante, colore, dettagli da stampa) parlano la stessa lingua.

Stack: **Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText) · Lenis** · TypeScript.

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

## Prima di pubblicare: cosa sostituire

Tutti i contenuti sono in `src/content`. **Numeri, clienti, progetti e testimonianze sono d’esempio**: vanno sostituiti con quelli reali (le recensioni solo con il consenso dei clienti).

| Cosa | Dove |
|---|---|
| Città, email, telefono, WhatsApp, Instagram, LinkedIn, Calendly, P.IVA, disponibilità | `src/content/site.ts` |
| Tutti i testi in italiano / inglese | `src/content/dictionaries/it.ts` · `en.ts` |
| Case study (sfida, strategia, creatività, risultati, gallery) | `src/content/data/cases.ts` |
| Numeri chiave, clienti del marquee, testimonianze, certificazioni, strumenti | `src/content/data/proof.ts` |
| Post del “feed” nel telefono | `src/content/data/feed.ts` |
| Foto di Irene | `src/components/sections/About.tsx` (commento in alto) |
| Informativa privacy (testo d’esempio da far verificare) | `src/components/sections/PrivacyView.tsx` |
| URL pubblico del sito | variabile `NEXT_PUBLIC_SITE_URL` |

**Mini-sintassi nei testi**: `*parola*` → corsivo editoriale · `==parola==` → evidenziatore acido.

### Foto e video veri al posto dei visual generati

I visual dei progetti sono segnaposto SVG generati dal codice (niente stock). Per usare le foto vere, mettile in `public/images/...` e nei contenuti sostituisci il media:

```ts
cover: {
  type: 'image',
  src: '/images/lavori/atelier-ombra-cover.jpg',
  width: 1600,
  height: 2000,
  alt: { it: 'Campagna SS26 di Atelier Ombra', en: 'Atelier Ombra SS26 campaign' },
}
```

Next.js le serve automaticamente in **AVIF/WebP**, ridimensionate e in lazy loading. Supportato anche `type: 'video'` (loop muto).

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
    api/contact/          → invio del form
    sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.tsx, og.png/
    globals.css           → design system (token, tipografia, crocini, grana, intro)
    fonts.ts              → Bricolage Grotesque, Inter Tight, Instrument Serif, Geist Mono
  components/
    layout/               → Header + menu, Footer, Intro, StickyCta (mobile), LangSwitch
    motion/               → MotionProvider (Lenis + GSAP), Cursor, PageTransition, StrategyMode, Marquee
    sections/             → Hero, Manifesto, Services, Work, Feed, Numbers, Method, Clients, About, Contact
    case/                 → pagina case study, grafico risultati, "scontrino"
    art/                  → visual generativi SVG (poster, feed, ads, stampati, insegne…)
  content/                → TUTTI i contenuti (vedi sopra)
  lib/                    → SEO e JSON-LD, immagini OG, GSAP, utility
```

## Note di progetto

- **“Vedi la strategia”** (interruttore nell’header o tasto **G**): mostra la griglia a 12 colonne e le note a margine con il motivo di ogni scelta. È il concept reso interattivo.
- **Intro < 2 s in CSS puro**: parte al primo paint senza aspettare il JavaScript, non blocca i click e non si ripete nella stessa sessione.
- **Movimento**: smooth scroll Lenis + GSAP ScrollTrigger; testi riga per riga (SplitText), manifesto che si colora allo scroll, cursore custom (“Apri”), anteprima che segue il cursore nell’indice lavori, contatori, feed nel telefono e metodo orizzontale con pin, bottoni magnetici, marquee che reagisce alla velocità dello scroll. Solo `transform`/`opacity` dove possibile.
- **prefers-reduced-motion**: niente intro, niente smooth scroll, niente pin (il metodo diventa un carosello nativo, il feed uno scroll interno), valori finali subito visibili.
- **Accessibilità**: skip link, focus visibili, menu con trappola del focus ed Esc, accordion con `aria-expanded`, form con errori collegati (`aria-describedby`), grafici con tabella equivalente, contrasti AA (l’acido non è mai usato per testo su carta).
- **SEO**: metadata e hreflang IT/EN, Open Graph generati in build, sitemap, robots, dati strutturati `Person` + `ProfessionalService` + `CreativeWork`/`BreadcrumbList` sui case study.
- **i18n**: l’inglese è già tradotto; per aggiungere una lingua, duplica `en.ts` e il gruppo di route.
- **Cookie**: il sito non ne usa di profilazione. Se aggiungi Meta Pixel o Google Analytics, serve un banner di consenso (Consent Mode v2) e va aggiornata l’informativa.

## Licenze

Font: SIL Open Font License (Google Fonts). Codice: proprietà di Irene Chies.
