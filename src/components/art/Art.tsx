import { useId, type CSSProperties } from 'react'
import type { ArtSpec, Locale } from '@/content/types'
import {
  Bars,
  C,
  CropMarksSvg,
  FadeMask,
  Halftone,
  Lines,
  MotifShape,
  fitSize,
  font,
  palette,
  seeded,
  wrap,
  type Palette,
} from './primitives'

/* ════════════════════════════════════════════════════════════════════
   Visual generativi — segnaposto art-directed per i progetti.
   Niente stock: poster, feed, ads, stampati, insegne e grafici costruiti
   con la palette del sito e il "kit" di ogni brand.
   Quando hai le foto vere, usa `{ type: 'image', src }` nei contenuti.
   ════════════════════════════════════════════════════════════════════ */

/** Micro-testi dentro i visual */
const L10N = {
  it: {
    open: 'aperto',
    hours: 'MAR–DOM 7:00–19:30',
    madeWell: 'fatto bene',
    swipe: 'Scorri →',
    budget: 'IL BUDGET: 50 €',
    sponsored: 'SPONSORIZZATO',
    query: 'hotel lago con spa',
    chips: ['Camere', 'Spa', 'Offerte'],
    price: '€ 3,50 / ETTO',
    page: 'p. 01',
  },
  en: {
    open: 'open',
    hours: 'TUE–SUN 7AM–7:30PM',
    madeWell: 'made right',
    swipe: 'Swipe →',
    budget: 'THE BUDGET: €50',
    sponsored: 'SPONSORED',
    query: 'lake hotel with spa',
    chips: ['Rooms', 'Spa', 'Offers'],
    price: '€3.50 / 100 G',
    page: 'p. 01',
  },
}

export const artRatio: Record<ArtSpec['kind'], [number, number]> = {
  cover: [800, 1000],
  feed: [1000, 1000],
  ad: [800, 1000],
  print: [1200, 900],
  sign: [1600, 1000],
  pack: [1000, 1000],
  story: [900, 1600],
  search: [1200, 800],
  chart: [1200, 800],
  post: [1000, 1250],
  portrait: [800, 1000],
}

type Props = { spec: ArtSpec; locale: Locale; label: string; className?: string; style?: CSSProperties }

export function Art({ spec, locale, label, className, style }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const [w, h] = artRatio[spec.kind]
  const p = palette(spec.tone ?? spec.brand.tone)
  const tx = (v?: { it: string; en: string }) => (v ? v[locale] : '')
  const ctx = { spec, p, uid, w, h, tx, locale, l: L10N[locale] }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className={className} style={style} preserveAspectRatio="xMidYMid slice">
      {spec.kind === 'cover' && <Cover {...ctx} />}
      {spec.kind === 'feed' && <Feed {...ctx} />}
      {spec.kind === 'ad' && <Ad {...ctx} />}
      {spec.kind === 'print' && <Print {...ctx} />}
      {spec.kind === 'sign' && <Sign {...ctx} />}
      {spec.kind === 'pack' && <Pack {...ctx} />}
      {spec.kind === 'story' && <Story {...ctx} />}
      {spec.kind === 'search' && <Search {...ctx} />}
      {spec.kind === 'chart' && <Chart {...ctx} />}
      {spec.kind === 'post' && <Post {...ctx} />}
      {spec.kind === 'portrait' && <Portrait {...ctx} />}
    </svg>
  )
}

type Ctx = {
  spec: ArtSpec
  p: Palette
  uid: string
  w: number
  h: number
  tx: (v?: { it: string; en: string }) => string
  locale: Locale
  l: (typeof L10N)['it']
}

/** Il marchio del brand, nello stile del suo kit */
function Mark({ spec, x, y, maxW, maxSize, fill, anchor = 'start' }: { spec: ArtSpec; x: number; y: number; maxW: number; maxSize: number; fill: string; anchor?: 'start' | 'middle' | 'end' }) {
  const { face, mark } = spec.brand
  const text = face === 'display' ? mark.toUpperCase() : mark
  const size = fitSize(text, face, maxW, maxSize)
  return (
    <text x={x} y={y} fontSize={size} style={font[face]} fill={fill} textAnchor={anchor}>
      {text}
    </text>
  )
}

/* ─────────────────────────── COVER (poster) ─────────────────────────── */
function Cover({ spec, p, uid, w, h, tx }: Ctx) {
  const motifFill = spec.brand.tone === 'acid' || spec.tone === 'acid' ? C.ink : p.accent
  const rnd = seeded(spec.brand.name + (spec.tone ?? ''))
  const shift = Math.round(rnd() * 80)
  return (
    <g>
      <defs>
        <Halftone id={`${uid}ht`} color={p.fg} size={10} r={2.4} />
        <FadeMask id={`${uid}fm`} dir="down" />
      </defs>
      <rect width={w} height={h} fill={p.bg} />
      <MotifShape type={spec.brand.motif} x={150 + shift} y={330} size={720} fill={motifFill} />
      <rect x="0" y="560" width={w} height={h - 560} fill={`url(#${uid}ht)`} mask={`url(#${uid}fm)`} opacity={0.55} />
      <Mark spec={spec} x={56} y={spec.brand.face === 'serif' ? 290 : 310} maxW={690} maxSize={spec.brand.mark.length <= 2 ? 330 : 250} fill={p.fg} />
      <text x={w - 56} y={84} fontSize={18} style={font.mono} fill={p.fg} textAnchor="end">
        N° {String(Math.floor(rnd() * 90) + 10)} — 2026
      </text>
      <text x={56} y={84} fontSize={18} style={font.mono} fill={p.fg}>
        {spec.brand.name.toUpperCase()}
      </text>
      <rect x="40" y={h - 118} width={Math.min(560, tx(spec.kicker).length * 14 + 40)} height="58" fill={p.fg} />
      <text x={60} y={h - 80} fontSize={22} style={font.mono} fill={p.bg}>
        {tx(spec.kicker).toUpperCase()}
      </text>
      <Bars x={w - 170} y={h - 150} w={120} h={88} seed={spec.brand.name} fill={p.fg} accent={motifFill === C.ink ? C.paper : C.acid} />
      <CropMarksSvg w={w} h={h} color={p.fg} />
    </g>
  )
}

/* ─────────────────────────── FEED (griglia 3×3) ─────────────────────── */
function Feed({ spec, uid, w, tx }: Ctx) {
  const gap = 8
  const size = (w - gap * 2) / 3
  const tones = [palette('paper'), palette('ink'), palette('acid')]
  const base = ['paper', 'ink', 'acid'].indexOf(spec.brand.tone)
  const rnd = seeded(spec.brand.name + 'feed')
  const words = [spec.brand.mark, '−30%', 'NEW', '01', '★', 'SS26', '6:30', 'Q&A', '→']
  return (
    <g>
      <defs>
        <Halftone id={`${uid}ht`} color={C.ink} size={8} r={2} />
      </defs>
      <rect width={w} height={w} fill={C.paper} />
      {Array.from({ length: 9 }, (_, i) => {
        const x = (i % 3) * (size + gap)
        const y = Math.floor(i / 3) * (size + gap)
        const t = tones[(base + i) % 3]
        const kind = i % 4
        return (
          <g key={i}>
            <rect x={x} y={y} width={size} height={size} fill={t.bg} />
            {kind === 0 && <MotifShape type={spec.brand.motif} x={x + size * 0.15} y={y + size * 0.15} size={size * 0.7} fill={t.accent === C.paper ? C.ink : t.accent} />}
            {kind === 1 && (
              <text x={x + size / 2} y={y + size / 2 + size * 0.11} fontSize={size * 0.32} textAnchor="middle" style={font[spec.brand.face]} fill={t.fg}>
                {i === 1 ? (spec.brand.face === 'display' ? spec.brand.mark.toUpperCase() : spec.brand.mark).slice(0, 6) : words[Math.floor(rnd() * words.length)]}
              </text>
            )}
            {kind === 2 && (
              <g>
                <rect x={x} y={y} width={size} height={size} fill={`url(#${uid}ht)`} opacity={0.35} />
                <circle cx={x + size * 0.5} cy={y + size * 0.62} r={size * 0.3} fill={t.fg} opacity={0.85} />
                <circle cx={x + size * 0.5} cy={y + size * 0.3} r={size * 0.14} fill={t.fg} opacity={0.85} />
              </g>
            )}
            {kind === 3 && (
              <g>
                <Lines lines={wrap(tx(spec.headline) || spec.brand.name, 12).slice(0, 3)} x={x + 22} y={y + 60} size={34} lh={1.05} style={font.sans} fill={t.fg} />
                <text x={x + 22} y={y + size - 24} fontSize={16} style={font.mono} fill={t.fg}>
                  1/5 →
                </text>
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}

/* ─────────────────────────── AD (creatività 4:5) ────────────────────── */
function Ad({ spec, p, uid, w, h, tx }: Ctx) {
  const lines = wrap(tx(spec.headline), 15)
  const ctaH = 110
  return (
    <g>
      <defs>
        <Halftone id={`${uid}ht`} color={p.fg} size={11} r={2.6} />
        <FadeMask id={`${uid}fm`} dir="radial" />
      </defs>
      <rect width={w} height={h} fill={p.bg} />
      <MotifShape type={spec.brand.motif} x={330} y={360} size={520} fill={p.accent === C.paper ? C.ink : p.accent} />
      <rect x="250" y="300" width="560" height="560" fill={`url(#${uid}ht)`} mask={`url(#${uid}fm)`} opacity={0.5} />
      <Lines lines={lines} x={52} y={128} size={lines.length > 3 ? 62 : 74} lh={1.02} style={{ ...font.display, letterSpacing: '-0.02em' }} fill={p.fg} />
      <g transform={`translate(52 ${h - ctaH - 140})`}>
        <Mark spec={spec} x={0} y={0} maxW={260} maxSize={56} fill={p.fg} />
      </g>
      <rect y={h - ctaH} width={w} height={ctaH} fill={p.fg} />
      <text x={52} y={h - ctaH / 2 + 10} fontSize={30} style={font.sans} fill={p.bg}>
        {tx(spec.cta)}
      </text>
      <path d={`M${w - 92} ${h - ctaH / 2 - 14}l14 14-14 14`} stroke={p.bg} strokeWidth={4} fill="none" />
    </g>
  )
}

/* ─────────────────────────── PRINT (stampato su tavolo) ─────────────── */
function Print({ spec, uid, w, h, tx, l }: Ctx) {
  const variant = spec.variant ?? 'card'
  const sheetP = palette(spec.brand.tone === 'ink' ? 'paper' : spec.brand.tone)
  const sw = variant === 'card' ? 560 : 470
  const sh = variant === 'card' ? 400 : 660
  const title = tx(spec.headline)
  return (
    <g>
      <defs>
        <filter id={`${uid}sh`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <Halftone id={`${uid}ht`} color={C.ink} size={7} r={1.6} />
      </defs>
      <rect width={w} height={h} fill={spec.brand.tone === 'ink' ? C.ink : C.paper3} />
      {/* secondo foglio sotto, ruotato */}
      <g transform={`translate(${w / 2 + 40} ${h / 2 + 10}) rotate(7)`}>
        <rect x={-sw / 2} y={-sh / 2} width={sw} height={sh} fill={C.paper} filter={`url(#${uid}sh)`} />
        <rect x={-sw / 2} y={-sh / 2} width={sw} height={sh} fill={`url(#${uid}ht)`} opacity={0.12} />
      </g>
      <g transform={`translate(${w / 2 - 30} ${h / 2}) rotate(-4)`}>
        <rect x={-sw / 2} y={-sh / 2} width={sw} height={sh} fill={sheetP.bg === C.acid ? C.acid : C.paper} filter={`url(#${uid}sh)`} />
        <g transform={`translate(${-sw / 2} ${-sh / 2})`}>
          {variant === 'menu' && (
            <g>
              <text x={sw / 2} y={150} fontSize={150} textAnchor="middle" style={font.display} fill={C.ink}>
                23
              </text>
              <text x={sw / 2} y={200} fontSize={26} textAnchor="middle" style={font.serif} fill={C.ink}>
                {title}
              </text>
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i}>
                  <rect x={46} y={250 + i * 70} width={sw * (0.42 + ((i * 37) % 30) / 100)} height={12} fill={C.ink} opacity={0.85} />
                  <rect x={46} y={270 + i * 70} width={sw * 0.5} height={7} fill={C.ink} opacity={0.3} />
                  <text x={sw - 46} y={262 + i * 70} fontSize={20} textAnchor="end" style={font.mono} fill={C.ink}>
                    {12 + i * 3}
                  </text>
                </g>
              ))}
              <rect x={46} y={sh - 70} width={sw - 92} height={34} fill={C.acid} />
              <text x={sw / 2} y={sh - 47} fontSize={16} textAnchor="middle" style={font.mono} fill={C.ink}>
                {spec.brand.name.toUpperCase()}
              </text>
            </g>
          )}
          {variant === 'lookbook' && (
            <g>
              <rect x={30} y={30} width={sw - 60} height={sh * 0.62} fill={C.ink} />
              <MotifShape type={spec.brand.motif} x={sw / 2 - 130} y={70} size={260} fill={C.acid} />
              <text x={34} y={sh * 0.62 + 110} fontSize={76} style={font.serif} fill={C.ink}>
                {spec.brand.mark}
              </text>
              <text x={36} y={sh * 0.62 + 150} fontSize={18} style={font.mono} fill={C.ink}>
                {title.toUpperCase()}
              </text>
              <text x={sw - 36} y={sh - 30} fontSize={16} textAnchor="end" style={font.mono} fill={C.ink}>
                {l.page}
              </text>
            </g>
          )}
          {variant === 'label' && (
            <g>
              <circle cx={sw / 2} cy={sh * 0.38} r={170} fill={C.ink} />
              <circle cx={sw / 2} cy={sh * 0.38} r={150} fill="none" stroke={C.acid} strokeWidth={3} strokeDasharray="4 8" />
              <Mark spec={spec} x={sw / 2} y={sh * 0.38 + 30} maxW={260} maxSize={110} fill={C.acid} anchor="middle" />
              <text x={sw / 2} y={sh * 0.75} fontSize={40} textAnchor="middle" style={font.serif} fill={C.ink}>
                {title}
              </text>
              <text x={sw / 2} y={sh * 0.75 + 50} fontSize={18} textAnchor="middle" style={font.mono} fill={C.ink}>
                {l.price}
              </text>
            </g>
          )}
          {variant === 'card' && (
            <g>
              <MotifShape type={spec.brand.motif} x={sw - 230} y={40} size={190} fill={C.ink} />
              <text x={40} y={sh - 120} fontSize={60} style={font.serif} fill={C.ink}>
                {title}
              </text>
              <text x={42} y={sh - 70} fontSize={18} style={font.mono} fill={C.ink}>
                {spec.brand.name.toUpperCase()}
              </text>
              <rect x={40} y={40} width={110} height={28} fill={C.acid} />
              <text x={50} y={60} fontSize={15} style={font.mono} fill={C.ink}>
                A6 · 350g
              </text>
            </g>
          )}
        </g>
        <CropMarksSvg w={sw} h={sh} inset={0} len={22} color={spec.brand.tone === 'ink' ? C.paper : C.ink} />
      </g>
    </g>
  )
}

/* ─────────────────────────── SIGN (insegna) ─────────────────────────── */
function Sign({ spec, p, uid, w, h, l }: Ctx) {
  const boardFill = spec.brand.tone === 'paper' ? C.ink : p.bg
  const textFill = spec.brand.tone === 'paper' ? C.acid : p.fg
  return (
    <g>
      <defs>
        <Halftone id={`${uid}ht`} color={C.ink} size={6} r={1.2} />
        <linearGradient id={`${uid}gl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={C.paper2} />
      <rect width={w} height={h} fill={`url(#${uid}ht)`} opacity={0.12} />
      {/* fascia insegna */}
      <rect x={120} y={110} width={w - 240} height={230} fill={boardFill} />
      <Mark spec={spec} x={w / 2} y={spec.brand.face === 'serif' ? 270 : 290} maxW={w - 420} maxSize={190} fill={textFill} anchor="middle" />
      <text x={150} y={318} fontSize={18} style={font.mono} fill={textFill} opacity={0.8}>
        EST. 19{String(40 + (spec.brand.name.length * 7) % 59)}
      </text>
      {/* vetrine e porta */}
      <rect x={120} y={370} width={560} height={480} fill={C.ink} />
      <rect x={720} y={370} width={160} height={530} fill={C.ink2} />
      <rect x={920} y={370} width={560} height={480} fill={C.ink} />
      <rect x={120} y={370} width={560} height={480} fill={`url(#${uid}gl)`} />
      <rect x={920} y={370} width={560} height={480} fill={`url(#${uid}gl)`} />
      <MotifShape type={spec.brand.motif} x={240} y={520} size={300} fill={C.acid} />
      <text x={1200} y={640} fontSize={56} textAnchor="middle" style={font.serif} fill={C.paper}>
        {l.open}
      </text>
      <text x={1200} y={690} fontSize={18} textAnchor="middle" style={font.mono} fill={C.paper} opacity={0.7}>
        {l.hours}
      </text>
      <circle cx={860} cy={640} r={7} fill={C.acid} />
      <rect y={900} width={w} height={100} fill={C.paper3} />
      <CropMarksSvg w={w} h={h} color={C.ink} />
    </g>
  )
}

/* ─────────────────────────── PACK (packaging) ───────────────────────── */
function Pack({ spec, p, uid, w, h, tx, l }: Ctx) {
  const bag = spec.brand.tone === 'ink' ? C.paper : p.bg === C.paper2 ? C.paper : p.bg
  return (
    <g>
      <defs>
        <filter id={`${uid}sh`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="22" stdDeviation="22" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={spec.brand.tone === 'acid' ? C.ink : C.paper3} />
      {/* sacchetto */}
      <g filter={`url(#${uid}sh)`}>
        <path d="M250 230h440l40 640H210z" fill={bag} />
        <path d="M250 230l-20 -40h480l-20 40z" fill={C.paper3} opacity={0.9} />
        <path d="M330 230 q140 -150 280 0" fill="none" stroke={C.ink} strokeWidth={10} />
      </g>
      <MotifShape type={spec.brand.motif} x={350} y={330} size={240} fill={C.ink} />
      <Mark spec={spec} x={470} y={690} maxW={380} maxSize={120} fill={C.ink} anchor="middle" />
      <text x={470} y={745} fontSize={22} textAnchor="middle" style={font.serif} fill={C.ink}>
        {tx(spec.headline)}
      </text>
      {/* etichetta tonda */}
      <g transform="translate(760 760) rotate(-12)">
        <circle r={120} fill={C.acid} />
        <circle r={104} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="3 7" />
        <text y={-12} fontSize={26} textAnchor="middle" style={font.mono} fill={C.ink}>
          100%
        </text>
        <text y={28} fontSize={30} textAnchor="middle" style={font.serif} fill={C.ink}>
          {l.madeWell}
        </text>
      </g>
    </g>
  )
}

/* ─────────────────────────── STORY (9:16) ───────────────────────────── */
function Story({ spec, p, uid, w, h, tx }: Ctx) {
  const lines = wrap(tx(spec.headline), 13)
  const [a, b] = tx(spec.cta).split(' / ')
  return (
    <g>
      <defs>
        <Halftone id={`${uid}ht`} color={p.fg} size={12} r={3} />
        <FadeMask id={`${uid}fm`} dir="up" />
      </defs>
      <rect width={w} height={h} fill={p.bg} />
      <rect y={h * 0.45} width={w} height={h * 0.55} fill={`url(#${uid}ht)`} mask={`url(#${uid}fm)`} opacity={0.45} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={30 + i * ((w - 60) / 4)} y={34} width={(w - 60) / 4 - 10} height={6} rx={3} fill={p.fg} opacity={i === 0 ? 1 : 0.3} />
      ))}
      <circle cx={70} cy={100} r={28} fill={p.accent === C.paper ? C.ink : p.accent} />
      <text x={112} y={110} fontSize={28} style={font.sans} fill={p.fg}>
        {spec.brand.name.toLowerCase().replace(/\s/g, '.')}
      </text>
      <MotifShape type={spec.brand.motif} x={w / 2 - 260} y={300} size={520} fill={p.accent === C.paper ? C.ink : p.accent} />
      <Lines lines={lines} x={w / 2} y={h * 0.6} size={lines.length > 2 ? 92 : 108} lh={1} style={font.display} fill={p.fg} anchor="middle" />
      {b !== undefined ? (
        <g transform={`translate(${w / 2 - 300} ${h - 330})`}>
          <rect width={600} height={170} rx={26} fill={C.paper} />
          <rect x={20} y={20} width={270} height={130} rx={18} fill={C.acid} />
          <text x={155} y={100} fontSize={42} textAnchor="middle" style={font.sans} fill={C.ink}>
            {a}
          </text>
          <text x={445} y={100} fontSize={42} textAnchor="middle" style={font.sans} fill={C.ink}>
            {b}
          </text>
        </g>
      ) : (
        <g transform={`translate(${w / 2 - 230} ${h - 300})`}>
          <rect width={460} height={110} rx={55} fill={C.paper} />
          <text x={230} y={70} fontSize={38} textAnchor="middle" style={font.sans} fill={C.ink}>
            {a} →
          </text>
        </g>
      )}
    </g>
  )
}

/* ─────────────────────────── SEARCH (annuncio di ricerca) ───────────── */
function Search({ spec, uid, w, h, tx, l }: Ctx) {
  const domain = `${spec.brand.name.toLowerCase().replace(/\s/g, '')}.it`
  const titleLines = wrap(tx(spec.headline), 34)
  const descLines = wrap(tx(spec.kicker), 62)
  return (
    <g>
      <defs>
        <Halftone id={`${uid}ht`} color={C.ink} size={8} r={1.4} />
      </defs>
      <rect width={w} height={h} fill={C.paper2} />
      <rect width={w} height={h} fill={`url(#${uid}ht)`} opacity={0.1} />
      <rect x={80} y={70} width={w - 160} height={86} rx={43} fill={C.paper} stroke={C.ink} strokeWidth={2} />
      <circle cx={136} cy={113} r={14} fill="none" stroke={C.ink} strokeWidth={3} />
      <path d="M146 123l12 12" stroke={C.ink} strokeWidth={3} />
      <text x={180} y={124} fontSize={30} style={font.sans} fill={C.ink}>
        {l.query}
      </text>
      <rect x={80} y={210} width={w - 160} height={460} fill={C.paper} />
      <text x={120} y={272} fontSize={20} style={font.mono} fill={C.ink}>
        {l.sponsored} · {domain}
      </text>
      <Lines lines={titleLines} x={120} y={340} size={46} lh={1.12} style={font.sans} fill={C.ink} />
      <rect x={116} y={350 + (titleLines.length - 1) * 51} width={Math.min(900, titleLines[titleLines.length - 1].length * 22)} height={6} fill={C.acid} />
      <Lines lines={descLines} x={120} y={430 + (titleLines.length - 1) * 51} size={26} lh={1.4} style={{ ...font.sans, fontWeight: 400 }} fill={C.ink2} />
      {l.chips.map((s, i) => (
        <g key={s}>
          <rect x={120 + i * 190} y={590} width={170} height={48} rx={24} fill="none" stroke={C.ink} strokeWidth={1.5} />
          <text x={205 + i * 190} y={621} fontSize={22} textAnchor="middle" style={font.sans} fill={C.ink}>
            {s}
          </text>
        </g>
      ))}
      <text x={w - 80} y={740} fontSize={18} textAnchor="end" style={font.mono} fill={C.ink}>
        CTR 11,4% · QS 9/10
      </text>
    </g>
  )
}

/* ─────────────────────────── CHART (risultati) ──────────────────────── */
function Chart({ spec, w, h, locale }: Ctx) {
  const series = spec.series ?? [10, 20, 30, 40]
  const max = Math.max(...series) * 1.15
  const x0 = 110
  const y0 = h - 120
  const cw = w - 200
  const ch = h - 260
  const bw = (cw / series.length) * 0.56
  const fmt = new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB', { maximumFractionDigits: 1 })
  return (
    <g>
      <rect width={w} height={h} fill={C.ink} />
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={x0} x2={x0 + cw} y1={y0 - ch * t} y2={y0 - ch * t} stroke={C.paper} strokeOpacity={t === 0 ? 0.6 : 0.12} />
          <text x={x0 - 18} y={y0 - ch * t + 6} fontSize={18} textAnchor="end" style={font.mono} fill={C.paper} opacity={0.5}>
            {fmt.format(max * t)}
          </text>
        </g>
      ))}
      {series.map((v, i) => {
        const bh = (v / max) * ch
        const x = x0 + (cw / series.length) * i + (cw / series.length - bw) / 2
        const last = i === series.length - 1
        return (
          <g key={i}>
            <rect x={x} y={y0 - bh} width={bw} height={bh} fill={last ? C.acid : C.paper} opacity={last ? 1 : 0.85} />
            <text x={x + bw / 2} y={y0 + 38} fontSize={18} textAnchor="middle" style={font.mono} fill={C.paper} opacity={0.6}>
              {String(i + 1).padStart(2, '0')}
            </text>
            {last && (
              <text x={x + bw / 2} y={y0 - bh - 22} fontSize={44} textAnchor="middle" style={font.display} fill={C.acid}>
                {fmt.format(v)}
              </text>
            )}
          </g>
        )
      })}
      <text x={x0} y={90} fontSize={22} style={font.mono} fill={C.paper}>
        {spec.brand.name.toUpperCase()} — REPORT
      </text>
      <circle cx={w - 110} cy={83} r={8} fill={C.acid} />
    </g>
  )
}

/* ─────────────────────────── POST (social) ──────────────────────────── */
function Post({ spec, p, uid, w, h, tx, l }: Ctx) {
  const variant = spec.variant ?? 'quote'
  const title = tx(spec.headline)
  if (variant === 'carousel') {
    const lines = wrap(title, 14)
    return (
      <g>
        <rect width={w} height={h} fill={C.acid} />
        <text x={70} y={110} fontSize={26} style={font.mono} fill={C.ink}>
          IRENE CHIES · ADS 101
        </text>
        <text x={w - 70} y={110} fontSize={26} textAnchor="end" style={font.mono} fill={C.ink}>
          1/6
        </text>
        <Lines lines={lines} x={70} y={330} size={118} lh={0.95} style={{ ...font.display, letterSpacing: '-0.02em' }} fill={C.ink} />
        <text x={72} y={330 + lines.length * 112 + 30} fontSize={52} style={font.serif} fill={C.ink}>
          {tx(spec.kicker)}
        </text>
        <rect x={70} y={h - 170} width={240} height={84} rx={42} fill={C.ink} />
        <text x={190} y={h - 116} fontSize={30} textAnchor="middle" style={font.sans} fill={C.acid}>
          {l.swipe}
        </text>
        <MotifShape type="spark" x={w - 300} y={h - 330} size={220} fill={C.ink} />
      </g>
    )
  }
  if (variant === 'reel') {
    const lines = wrap(title, 15)
    return (
      <g>
        <defs>
          <Halftone id={`${uid}ht`} color={C.acid} size={14} r={3.6} />
          <FadeMask id={`${uid}fm`} dir="radial" />
        </defs>
        <rect width={w} height={h} fill={C.ink} />
        <rect x={0} y={200} width={w} height={800} fill={`url(#${uid}ht)`} mask={`url(#${uid}fm)`} opacity={0.6} />
        <MotifShape type={spec.brand.motif} x={190} y={330} size={620} fill={C.acid} />
        <Lines lines={lines} x={w / 2} y={170} size={78} lh={1} style={font.display} fill={C.paper} anchor="middle" />
        <circle cx={w / 2} cy={h / 2 + 90} r={80} fill={C.paper} opacity={0.92} />
        <path d={`M${w / 2 - 22} ${h / 2 + 50}v80l66-40z`} fill={C.ink} />
        <text x={60} y={h - 60} fontSize={26} style={font.mono} fill={C.paper}>
          ▶ 62.4K
        </text>
      </g>
    )
  }
  if (variant === 'meme') {
    const lines = wrap(title, 22)
    return (
      <g>
        <rect width={w} height={h} fill={C.paper} />
        <Lines lines={lines} x={60} y={120} size={58} lh={1.1} style={font.sans} fill={C.ink} />
        <rect x={60} y={360} width={w - 120} height={h - 440} fill={C.ink} />
        {/* faccina disegnata: occhi sbarrati, nessuna immagine stock */}
        <circle cx={w / 2} cy={760} r={250} fill={C.acid} />
        <circle cx={w / 2 - 90} cy={710} r={52} fill={C.paper} />
        <circle cx={w / 2 + 90} cy={710} r={52} fill={C.paper} />
        <circle cx={w / 2 - 90} cy={716} r={16} fill={C.ink} />
        <circle cx={w / 2 + 90} cy={716} r={16} fill={C.ink} />
        <path d={`M${w / 2 - 70} 870q70 -30 140 0`} stroke={C.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
        <text x={w / 2} y={h - 110} fontSize={30} textAnchor="middle" style={font.mono} fill={C.paper}>
          {l.budget}
        </text>
      </g>
    )
  }
  // quote
  const lines = wrap(title, 16)
  return (
    <g>
      <rect width={w} height={h} fill={p.bg} />
      <text x={70} y={330} fontSize={360} style={font.serif} fill={p.accent === C.paper ? C.ink : p.accent}>
        “
      </text>
      <Lines lines={lines} x={70} y={520} size={104} lh={1} style={font.display} fill={p.fg} />
      <Mark spec={spec} x={72} y={h - 90} maxW={380} maxSize={64} fill={p.fg} />
    </g>
  )
}

/* ─────────────────────────── PORTRAIT (segnaposto foto) ─────────────── */
function Portrait({ uid, w, h }: Ctx) {
  return (
    <g>
      <defs>
        <Halftone id={`${uid}ht`} color={C.ink} size={9} r={2.6} angle={30} />
        <FadeMask id={`${uid}fm`} dir="up" />
        <clipPath id={`${uid}cp`}>
          <circle cx={w / 2} cy={390} r={170} />
          <path d={`M${w / 2 - 300} ${h}c0-220 120-330 300-330s300 110 300 330z`} />
        </clipPath>
      </defs>
      <rect width={w} height={h} fill={C.paper2} />
      <rect width={w} height={h} fill={C.acid} clipPath={`url(#${uid}cp)`} />
      <rect width={w} height={h} fill={`url(#${uid}ht)`} clipPath={`url(#${uid}cp)`} mask={`url(#${uid}fm)`} />
      <text x={40} y={70} fontSize={18} style={font.mono} fill={C.ink}>
        IC — 2026 — 35MM
      </text>
      <text x={w - 40} y={70} fontSize={18} textAnchor="end" style={font.mono} fill={C.ink}>
        ▸ 12A
      </text>
      <CropMarksSvg w={w} h={h} color={C.ink} />
    </g>
  )
}
