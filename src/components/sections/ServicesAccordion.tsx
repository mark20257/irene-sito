'use client'

import { useState } from 'react'
import type { Dictionary } from '@/content'
import { cn } from '@/lib/utils'
import { Plus } from '@/components/ui/Icons'

type Item = Dictionary['services']['items'][number]
type Labels = Dictionary['services']['labels']

/** Tre blocchi espandibili. Altezza animata via CSS grid (0fr → 1fr), nessuna misura JS. */
export function ServicesAccordion({ items, labels }: { items: Item[]; labels: Labels }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mt-[clamp(3rem,7vw,7rem)] border-t border-[var(--rule)]" data-reveal-group>
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `svc-btn-${i}`
        const panelId = `svc-panel-${i}`
        return (
          <article key={item.key} className="border-b border-[var(--rule)]" data-reveal-item>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group relative grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-2 overflow-hidden py-6 text-left sm:gap-x-8 lg:grid-cols-[6rem_1fr_auto_auto] lg:items-center lg:py-9"
              >
                {/* riempimento d'inchiostro all'hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-y-100 motion-reduce:hidden"
                />
                <span className="label relative z-10 pt-2 transition-colors duration-500 group-hover:text-paper lg:pt-0">0{i + 1}</span>
                <span className="relative z-10 transition-colors duration-500 group-hover:text-paper">
                  <span className="t-h3 block uppercase transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                    {item.title}
                  </span>
                  <span className="ital mt-2 block text-[clamp(1.25rem,1rem+1vw,1.9rem)] leading-tight">{item.tagline}</span>
                </span>
                <span className="relative z-10 hidden text-right lg:block">
                  <span className="t-display block text-5xl leading-none transition-colors duration-500 group-hover:text-acid">{item.kpi.value}</span>
                  <span className="label muted block transition-colors duration-500 group-hover:text-paper/70">{item.kpi.label}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative z-10 grid h-12 w-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_currentColor] transition-[transform,color,background-color] duration-700 ease-out-expo group-hover:bg-acid group-hover:text-ink group-hover:shadow-none',
                    isOpen && 'rotate-45 bg-ink text-paper',
                  )}
                >
                  <Plus size={18} />
                </span>
                <span className="sr-only">{isOpen ? labels.collapse : labels.expand}</span>
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={btnId} className="acc-panel" data-open={isOpen} inert={!isOpen}>
              <div>
                <div className="grid gap-10 pt-2 pb-12 lg:grid-cols-12 lg:gap-6 lg:pb-16">
                  <div className="lg:col-span-4 lg:col-start-2">
                    <p className="label muted mb-4">{labels.includes}</p>
                    <ul className="grid gap-0">
                      {item.includes.map((inc, j) => (
                        <li key={inc} className="flex gap-4 border-t border-[var(--rule)] py-3 text-lg leading-snug">
                          <span className="label muted pt-1">{String(j + 1).padStart(2, '0')}</span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid content-start gap-8 lg:col-span-3">
                    <div>
                      <p className="label muted mb-3">{labels.forWho}</p>
                      <p className="text-lg leading-relaxed">{item.forWho}</p>
                    </div>
                    <div>
                      <p className="label muted mb-3">{labels.outcome}</p>
                      <p className="text-lg leading-relaxed">
                        <mark className="hl">{item.outcome}</mark>
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-3 lg:col-start-10">
                    <ServiceArt kind={item.key as 'social' | 'ads' | 'design'} />
                    <p className="mt-4 flex items-baseline justify-between gap-4 lg:hidden">
                      <span className="t-display text-5xl leading-none">{item.kpi.value}</span>
                      <span className="label muted text-right">{item.kpi.label}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

/** Illustrazioni dei servizi: dato + creatività, disegnati col codice */
function ServiceArt({ kind }: { kind: 'social' | 'ads' | 'design' }) {
  if (kind === 'social')
    return (
      <svg viewBox="0 0 300 300" className="w-full" aria-hidden="true">
        <rect width="300" height="300" fill="var(--color-paper-2)" />
        {Array.from({ length: 9 }, (_, i) => {
          const x = 30 + (i % 3) * 82
          const y = 30 + Math.floor(i / 3) * 82
          const fill = ['var(--color-ink)', 'var(--color-acid)', 'var(--color-paper-3)'][(i + Math.floor(i / 3)) % 3]
          return <rect key={i} x={x} y={y} width="76" height="76" fill={fill} />
        })}
        <circle cx="153" cy="153" r="22" fill="var(--color-paper)" />
        <path d="M146 141v24l20-12z" fill="var(--color-ink)" />
      </svg>
    )
  if (kind === 'ads')
    return (
      <svg viewBox="0 0 300 300" className="w-full" aria-hidden="true">
        <rect width="300" height="300" fill="var(--color-ink)" />
        {[
          [30, 250, 'var(--color-paper)'],
          [60, 190, 'var(--color-paper)'],
          [95, 120, 'var(--color-paper)'],
          [125, 60, 'var(--color-acid)'],
        ].map(([y, w, fill], i) => (
          <g key={i}>
            <rect x={(300 - Number(w)) / 2} y={Number(y) + 20} width={Number(w)} height="46" fill={String(fill)} />
          </g>
        ))}
        <text x="150" y="282" textAnchor="middle" fontSize="15" fill="var(--color-paper)" style={{ fontFamily: 'var(--font-mono)' }}>
          IMPR → CLICK → LEAD → €
        </text>
      </svg>
    )
  return (
    <svg viewBox="0 0 300 300" className="w-full" aria-hidden="true">
      <rect width="300" height="300" fill="var(--color-acid)" />
      <g transform="rotate(-6 150 150)">
        <rect x="70" y="40" width="160" height="220" fill="var(--color-paper)" />
        <circle cx="150" cy="120" r="44" fill="var(--color-ink)" />
        <rect x="95" y="190" width="110" height="10" fill="var(--color-ink)" />
        <rect x="95" y="210" width="70" height="6" fill="var(--color-ink)" opacity=".4" />
        <g stroke="var(--color-ink)" strokeWidth="1.2">
          <path d="M70 28v-14M58 40H44M230 28v-14M242 40h14M70 272v14M58 260H44M230 272v14M242 260h14" />
        </g>
      </g>
    </svg>
  )
}
