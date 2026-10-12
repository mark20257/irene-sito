import type { Dictionary } from '@/content'

/**
 * Lo "scontrino" dei risultati: un oggetto stampato, ironico, che riassume il lavoro.
 * Bordo seghettato in CSS, testo in mono, codice a barre generato.
 */
export function Receipt({
  client,
  lines,
  total,
  labels,
  year,
}: {
  client: string
  lines: { item: string; qty: string }[]
  total: string
  labels: Dictionary['caseStudy']['receipt']
  year: string
}) {
  const bars = Array.from(client + year).map((ch) => (ch.charCodeAt(0) % 4) + 1)
  return (
    <div className="relative mx-auto w-full max-w-[22rem] -rotate-[1.5deg] text-ink drop-shadow-[0_24px_30px_rgb(0_0_0/0.28)]" data-reveal>
      <div className="bg-paper px-6 pt-8 pb-8 font-mono text-[0.8rem] leading-relaxed"
      >
        <p className="text-center text-base font-bold tracking-widest uppercase">{client}</p>
        <p className="text-center text-[0.7rem] uppercase">{labels.title}</p>
        <p className="mt-1 text-center text-[0.7rem]">— — — — — — — — — — — —</p>
        <div className="mt-3 flex justify-between text-[0.7rem] uppercase opacity-70">
          <span>{labels.item}</span>
          <span>{labels.qty}</span>
        </div>
        <ul className="mt-2 grid gap-1.5">
          {lines.map((l) => (
            <li key={l.item} className="flex items-baseline gap-2">
              <span>{l.item}</span>
              <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-ink/50" />
              <span className="tabular-nums">{l.qty}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-[0.7rem]">— — — — — — — — — — — —</p>
        <div className="mt-2 flex items-baseline justify-between gap-3 text-sm font-bold uppercase">
          <span>{labels.total}</span>
          <span className="bg-acid px-1 text-right">{total}</span>
        </div>
        <div className="mt-6 flex h-10 items-stretch justify-center gap-[2px]" aria-hidden="true">
          {bars.map((b, i) => (
            <span key={i} className="bg-ink" style={{ width: `${b}px` }} />
          ))}
        </div>
        <p className="mt-3 text-center text-[0.7rem] uppercase">{labels.thanks}</p>
        <p className="text-center text-[0.65rem] opacity-60">{labels.note}</p>
      </div>
      {/* bordo strappato */}
      <div
        aria-hidden="true"
        className="h-3 w-full"
        style={{
          background:
            'linear-gradient(135deg, var(--color-paper) 33%, transparent 33%) 0 0 / 12px 12px repeat-x, linear-gradient(225deg, var(--color-paper) 33%, transparent 33%) 0 0 / 12px 12px repeat-x',
        }}
      />
    </div>
  )
}
