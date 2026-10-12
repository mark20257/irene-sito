import type { Locale } from '@/content'
import { formatNumber } from '@/lib/utils'

/**
 * Grafico a barre di una sola serie (andamento nel tempo).
 * - una serie → nessuna legenda: il titolo la nomina
 * - estremità superiori arrotondate (4px), ancorate alla linea di base
 * - etichette dirette solo su primo e ultimo valore; gli altri al passaggio del mouse/focus
 * - tabella equivalente per gli screen reader
 */
export function ResultsChart({
  label,
  series,
  labels,
  unit = '',
  locale,
}: {
  label: string
  series: number[]
  labels: string[]
  unit?: string
  locale: Locale
}) {
  const W = 640
  const H = 300
  const pad = { t: 36, r: 8, b: 34, l: 8 }
  const max = Math.max(...series) * 1.12
  const cw = W - pad.l - pad.r
  const ch = H - pad.t - pad.b
  const slot = cw / series.length
  const bw = Math.min(56, slot - 2 - slot * 0.3)
  const decimals = series.some((v) => !Number.isInteger(v)) ? 1 : 0
  const fmt = (v: number) => `${formatNumber(v, locale, decimals)}${unit}`
  const first = series[0]
  const last = series[series.length - 1]
  const delta = first ? Math.round(((last - first) / first) * 100) : 0

  return (
    <figure className="w-full">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="label">{label}</span>
        <span className="label rounded-full bg-ink px-2 py-1 text-acid">
          {delta >= 0 ? '+' : '−'}
          {Math.abs(delta)}%
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full overflow-visible" role="img" aria-label={`${label}: ${series.map((v, i) => `${labels[i]} ${fmt(v)}`).join(', ')}`}>
        {/* griglia recessiva */}
        {[0.5, 1].map((t) => (
          <line key={t} x1={pad.l} x2={W - pad.r} y1={pad.t + ch * (1 - t)} y2={pad.t + ch * (1 - t)} stroke="currentColor" strokeOpacity="0.14" strokeDasharray="2 4" />
        ))}
        {series.map((v, i) => {
          const h = Math.max(2, (v / max) * ch)
          const x = pad.l + slot * i + (slot - bw) / 2
          const y = pad.t + ch - h
          const r = Math.min(4, bw / 2)
          const isEdge = i === 0 || i === series.length - 1
          return (
            <g key={i} className="group" tabIndex={0} aria-label={`${labels[i]}: ${fmt(v)}`}>
              <title>{`${labels[i]}: ${fmt(v)}`}</title>
              {/* area di hover più grande della barra */}
              <rect x={pad.l + slot * i} y={pad.t} width={slot} height={ch} fill="transparent" />
              <path
                d={`M${x} ${pad.t + ch}V${y + r}a${r} ${r} 0 0 1 ${r}-${r}h${bw - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}V${pad.t + ch}z`}
                fill="currentColor"
                fillOpacity={i === series.length - 1 ? 1 : 0.78}
                className="transition-[fill-opacity] duration-200 group-hover:fill-opacity-100 group-focus:fill-opacity-100"
              />
              <text
                x={x + bw / 2}
                y={y - 10}
                textAnchor="middle"
                fontSize={i === series.length - 1 ? 22 : 16}
                fill="currentColor"
                style={{ fontFamily: i === series.length - 1 ? 'var(--font-display)' : 'var(--font-mono)', fontWeight: i === series.length - 1 ? 800 : 400 }}
                className={isEdge ? '' : 'opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100'}
              >
                {fmt(v)}
              </text>
              <text x={x + bw / 2} y={H - 10} textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.7" style={{ fontFamily: 'var(--font-mono)' }}>
                {labels[i]}
              </text>
            </g>
          )
        })}
        <line x1={pad.l} x2={W - pad.r} y1={pad.t + ch} y2={pad.t + ch} stroke="currentColor" strokeOpacity="0.6" />
      </svg>
      <table className="sr-only">
        <caption>{label}</caption>
        <tbody>
          {series.map((v, i) => (
            <tr key={i}>
              <th scope="row">{labels[i]}</th>
              <td>{fmt(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
