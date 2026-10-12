'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

/* ════════════════════════════════════════════════════════════════════
   "Vedi la strategia" — il concept reso interattivo.
   Un interruttore (o il tasto G) mostra la griglia di impaginazione e le
   note a margine: il motivo dietro ogni scelta di design e di copy.
   ════════════════════════════════════════════════════════════════════ */

type Ctx = { on: boolean; toggle: () => void }
const StrategyCtx = createContext<Ctx>({ on: false, toggle: () => {} })
export const useStrategy = () => useContext(StrategyCtx)

export function StrategyProvider({
  children,
  toastOn,
  toastOff,
}: {
  children: ReactNode
  toastOn: string
  toastOff: string
}) {
  const [on, setOn] = useState(false)
  const [message, setMessage] = useState('')
  const timer = useRef<number | undefined>(undefined)

  const toggle = useCallback(() => setOn((v) => !v), [])

  useEffect(() => {
    const html = document.documentElement
    if (on) html.setAttribute('data-strategy', 'on')
    else html.removeAttribute('data-strategy')
  }, [on])

  // annuncio (visivo + screen reader) a ogni cambio di stato, non al primo render
  const prev = useRef(on)
  useEffect(() => {
    if (prev.current === on) return
    prev.current = on
    setMessage(on ? toastOn : toastOff)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(''), 2800)
  }, [on, toastOn, toastOff])

  // scorciatoia da tastiera: G
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'g' || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, select, [contenteditable=true]')) return
      toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  return (
    <StrategyCtx.Provider value={{ on, toggle }}>
      {children}
      <div className="strategy-grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-[85] -translate-x-1/2"
      >
        {message && (
          <p className="label animate-[note-in_0.5s_var(--ease-out-back)_both] bg-acid px-3 py-2 whitespace-nowrap text-ink shadow-[0_0_0_1px_var(--color-ink)]">
            {message}
          </p>
        )}
      </div>
    </StrategyCtx.Provider>
  )
}

/** Interruttore usato nell'header e nel menu */
export function StrategyToggle({ label, labelOn, shortcut, className = 'inline-flex' }: { label: string; labelOn: string; shortcut: string; className?: string }) {
  const { on, toggle } = useStrategy()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className={`group min-h-11 items-center gap-2.5 rounded-full py-2 pr-1 pl-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`relative h-[18px] w-8 rounded-full shadow-[inset_0_0_0_1.5px_currentColor] transition-colors ${on ? 'bg-acid text-ink' : ''}`}
      >
        <span
          className={`absolute top-[3px] left-[3px] h-3 w-3 rounded-full bg-current transition-transform duration-500 ease-out-expo ${on ? 'translate-x-[14px]' : ''}`}
        />
      </span>
      <span className="label">{on ? labelOn : label}</span>
      <kbd className="label hidden rounded-[3px] px-1.5 py-0.5 opacity-60 shadow-[inset_0_0_0_1px_currentColor] lg:inline-block">{shortcut}</kbd>
    </button>
  )
}
