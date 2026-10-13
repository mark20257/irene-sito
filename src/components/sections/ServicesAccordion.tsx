'use client'

import { useState } from 'react'
import type { Dictionary } from '@/content'
import { cn } from '@/lib/utils'
import { Check, Plus } from '@/components/ui/Icons'

type Item = Dictionary['services']['items'][number]
type Labels = Dictionary['services']['labels']

/** Icone dei servizi: semplici, disegnate in linea */
function ServiceIcon({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'social' && (
        <>
          <rect x="9" y="3.5" width="14" height="25" rx="3.5" />
          <path d="M13.5 24.5h5M13 10.5h6M13 14.5h6" />
        </>
      )}
      {kind === 'ads' && (
        <>
          <path d="M4 25.5h24" />
          <path d="M7 21l6-6 5 4 9-10" />
          <path d="M21 9h6v6" />
        </>
      )}
      {kind === 'design' && (
        <>
          <path d="M5 27l4-1 15-15-3-3L6 23z" />
          <path d="M18.5 10.5l3 3M23 4l5 5" />
        </>
      )}
    </svg>
  )
}

const VISIBLE = 4

/** Tre card: le prime voci sono subito visibili, il resto si apre (altezza animata in CSS). */
export function ServicesAccordion({ items, labels }: { items: Item[]; labels: Labels }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mt-[clamp(3rem,6vw,5rem)] grid items-start gap-5 lg:grid-cols-3" data-reveal-group>
      {items.map((item, i) => {
        const isOpen = open === i
        const featured = i === 1
        const panelId = `svc-panel-${i}`
        return (
          <article
            key={item.key}
            data-reveal-item
            className={cn(
              'card relative flex flex-col overflow-hidden p-7 transition-shadow duration-500 hover:shadow-lift sm:p-8',
              featured && 'theme-violet !bg-violet shadow-glow',
            )}
          >
            {featured && <div aria-hidden="true" className="glow -top-24 -right-24 h-64 w-64 opacity-60" style={{ background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)' }} />}
            <div className="relative flex items-start justify-between">
              <span className={cn('grid h-14 w-14 place-items-center rounded-2xl', featured ? 'bg-white/15 text-white' : 'bg-surface text-violet')}>
                <ServiceIcon kind={item.key} />
              </span>
              <span className={cn('text-sm font-medium', featured ? 'text-white/90' : 'text-muted')}>0{i + 1}</span>
            </div>

            <h3 className="t-h3 relative mt-8">{item.title}</h3>
            <p className={cn('relative mt-3 text-[1.05rem] leading-snug', featured ? 'text-white/90' : 'text-ink-2')}>{item.tagline}</p>

            <p className="relative mt-6 flex items-baseline gap-3">
              <span className={cn('t-num text-5xl', featured ? 'text-white' : 'text-violet')}>{item.kpi.value}</span>
              <span className={cn('text-sm leading-tight', featured ? 'text-white/90' : 'text-muted')}>{item.kpi.label}</span>
            </p>

            <p className={cn('relative mt-7 text-sm font-semibold', featured ? 'text-white/90' : 'text-ink')}>{labels.includes}</p>
            <ul className="relative mt-3 grid gap-2.5">
              {item.includes.slice(0, VISIBLE).map((inc) => (
                <li key={inc} className="flex gap-3 leading-snug">
                  <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full', featured ? 'bg-white text-violet' : 'bg-violet text-white')}>
                    <Check size={11} />
                  </span>
                  {inc}
                </li>
              ))}
            </ul>

            <div id={panelId} className="acc-panel relative" data-open={isOpen} inert={!isOpen}>
              <div>
                <ul className="grid gap-2.5 pt-2.5">
                  {item.includes.slice(VISIBLE).map((inc) => (
                    <li key={inc} className="flex gap-3 leading-snug">
                      <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full', featured ? 'bg-white text-violet' : 'bg-violet text-white')}>
                        <Check size={11} />
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className={cn('mt-6 grid gap-5 rounded-2xl p-5', featured ? 'bg-white/10' : 'bg-surface')}>
                  <div>
                    <p className="text-sm font-semibold">{labels.forWho}</p>
                    <p className={cn('mt-1.5 leading-relaxed', featured ? 'text-white/90' : 'text-ink-2')}>{item.forWho}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{labels.outcome}</p>
                    <p className={cn('mt-1.5 leading-relaxed', featured ? 'text-white/90' : 'text-ink-2')}>{item.outcome}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className={cn(
                'relative mt-7 inline-flex min-h-11 w-fit items-center gap-2.5 rounded-full py-2 pr-4 pl-2 text-[0.95rem] font-semibold transition-colors',
                featured ? 'bg-white/10 hover:bg-white/20' : 'bg-surface hover:bg-surface-2',
              )}
            >
              <span className={cn('grid h-7 w-7 place-items-center rounded-full transition-transform duration-500 ease-out-expo', featured ? 'bg-white text-violet' : 'bg-violet text-white', isOpen && 'rotate-45')}>
                <Plus size={13} />
              </span>
              {isOpen ? labels.collapse : labels.expand}
            </button>
          </article>
        )
      })}
    </div>
  )
}
