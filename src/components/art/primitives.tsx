import type { CSSProperties, ReactNode } from 'react'
import type { Face, Motif, Tone } from '@/content/types'

/* Palette fissa: i visual segnaposto parlano la stessa lingua del sito. */
export const C = {
  paper: '#F7F5FF',
  paper2: '#ECE6FF',
  paper3: '#DCD2FD',
  ink: '#160B33',
  ink2: '#2B1D5C',
  acid: '#A78BFA', // lilla
  acid2: '#9373F7',
  violet: '#6B3CF6',
  white: '#FFFFFF',
  mid: '#9A90BC',
}

export type Palette = { bg: string; fg: string; accent: string; soft: string; on: string }

export const palette = (tone: Tone): Palette =>
  ({
    paper: { bg: C.paper2, fg: C.ink, accent: C.violet, soft: C.paper3, on: C.ink },
    ink: { bg: C.ink, fg: C.paper, accent: C.acid, soft: C.ink2, on: C.ink },
    acid: { bg: C.violet, fg: C.white, accent: C.paper, soft: '#7B52F7', on: C.ink },
  })[tone]

export const font = {
  display: { fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '-0.04em' } as CSSProperties,
  serif: { fontFamily: 'var(--font-sans)', fontWeight: 300, letterSpacing: '-0.03em' } as CSSProperties,
  mono: { fontFamily: 'var(--font-mono)', fontWeight: 400, letterSpacing: '0.02em' } as CSSProperties,
  sans: { fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '-0.02em' } as CSSProperties,
}

/** Larghezza media dei glifi (in em) per stimare la dimensione del testo nei visual */
const widthFactor: Record<Face, number> = { display: 0.72, serif: 0.62, mono: 0.62 }

export const fitSize = (text: string, face: Face, maxWidth: number, maxSize: number) =>
  Math.min(maxSize, maxWidth / Math.max(1, text.length * widthFactor[face]))

/** A capo manuale per i testi dentro gli SVG */
export function wrap(text: string, max: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word
    if (next.length > max && line) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}

/** Numeri pseudo-casuali ma stabili (stesso brand → stesso visual) */
export function seeded(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

/* ────────────────────────── Motivi grafici ────────────────────────── */

export function MotifShape({ type, x, y, size, fill, stroke }: { type: Motif; x: number; y: number; size: number; fill: string; stroke?: string }) {
  const s = size / 100
  const common = { fill, stroke, strokeWidth: stroke ? 2 / s : undefined }
  let shape: ReactNode
  switch (type) {
    case 'arch':
      shape = <path d="M8 100V46a42 42 0 0 1 84 0v54z" {...common} />
      break
    case 'loaf':
      shape = (
        <g>
          <rect x="4" y="22" width="92" height="62" rx="31" {...common} />
          <path d="M30 34l-8 26M50 32l-8 28M70 34l-8 26" stroke={stroke ?? 'rgba(0,0,0,.25)'} strokeWidth={4} strokeLinecap="round" fill="none" />
        </g>
      )
      break
    case 'wave':
      shape = (
        <g>
          <circle cx="50" cy="38" r="26" {...common} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M0 ${66 + i * 9} q12.5 -6 25 0 t25 0 t25 0 t25 0`} fill="none" stroke={fill} strokeWidth={4.2} />
          ))}
        </g>
      )
      break
    case 'drop':
      shape = <path d="M50 4C50 4 86 44 86 66a36 36 0 0 1-72 0C14 44 50 4 50 4z" {...common} />
      break
    case 'flower':
      shape = (
        <g>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2
            return <circle key={i} cx={50 + Math.cos(a) * 27} cy={50 + Math.sin(a) * 27} r="21" {...common} />
          })}
          <circle cx="50" cy="50" r="15" fill={stroke ?? 'rgba(0,0,0,.18)'} />
        </g>
      )
      break
    case 'plate':
      shape = (
        <g>
          <circle cx="50" cy="50" r="48" {...common} />
          <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth={1.5} />
        </g>
      )
      break
    case 'spark':
    default:
      shape = <path d="M50 0C54 36 64 46 100 50 64 54 54 64 50 100 46 64 36 54 0 50 36 46 46 36 50 0z" {...common} />
  }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{shape}</g>
}

/** Retino a punti (mezzatinta) */
export function Halftone({ id, color, size = 9, r = 2.1, angle = 45 }: { id: string; color: string; size?: number; r?: number; angle?: number }) {
  return (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill={color} />
    </pattern>
  )
}

/** Sfumatura usata come maschera (per far "sfumare" il retino) */
export function FadeMask({ id, dir = 'down' }: { id: string; dir?: 'down' | 'up' | 'radial' }) {
  return (
    <mask id={id} maskContentUnits="objectBoundingBox">
      {dir === 'radial' ? (
        <>
          <radialGradient id={`${id}-g`}>
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <rect width="1" height="1" fill={`url(#${id}-g)`} />
        </>
      ) : (
        <>
          <linearGradient id={`${id}-g`} x1="0" y1={dir === 'down' ? 0 : 1} x2="0" y2={dir === 'down' ? 1 : 0}>
            <stop offset="0" stopColor="#000" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <rect width="1" height="1" fill={`url(#${id}-g)`} />
        </>
      )}
    </mask>
  )
}

/** Crocini di taglio dentro gli SVG */
export function CropMarksSvg({ w, h, inset = 26, len = 18, color }: { w: number; h: number; inset?: number; len?: number; color: string }) {
  const g = inset
  const lines: [number, number, number, number][] = [
    [g - len - 6, g, g - 6, g],
    [g, g - len - 6, g, g - 6],
    [w - g + 6, g, w - g + len + 6, g],
    [w - g, g - len - 6, w - g, g - 6],
    [g - len - 6, h - g, g - 6, h - g],
    [g, h - g + 6, g, h - g + len + 6],
    [w - g + 6, h - g, w - g + len + 6, h - g],
    [w - g, h - g + 6, w - g, h - g + len + 6],
  ]
  return (
    <g stroke={color} strokeWidth={1.2} opacity={0.7}>
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
    </g>
  )
}

/** Testo su più righe */
export function Lines({
  lines,
  x,
  y,
  size,
  lh = 1,
  style,
  fill,
  anchor = 'start',
}: {
  lines: string[]
  x: number
  y: number
  size: number
  lh?: number
  style: CSSProperties
  fill: string
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <text x={x} y={y} fontSize={size} style={style} fill={fill} textAnchor={anchor}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * lh}>
          {l}
        </tspan>
      ))}
    </text>
  )
}

/** Mini grafico a barre: il "dato" che diventa grafica */
export function Bars({ x, y, w, h, n = 7, seed, fill, accent }: { x: number; y: number; w: number; h: number; n?: number; seed: string; fill: string; accent: string }) {
  const rnd = seeded(seed)
  const bw = w / (n * 1.6)
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const v = 0.25 + (i / (n - 1)) * 0.55 + rnd() * 0.2
        const bh = Math.min(1, v) * h
        return <rect key={i} x={x + i * bw * 1.6} y={y + h - bh} width={bw} height={bh} fill={i === n - 1 ? accent : fill} />
      })}
    </g>
  )
}
