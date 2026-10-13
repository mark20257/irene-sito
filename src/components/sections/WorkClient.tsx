'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap, isFinePointer, prefersReducedMotion, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'

type View = 'grid' | 'index'

/**
 * Griglia editoriale ↔ Indice.
 * Nell'indice, su desktop, l'anteprima del progetto segue il cursore
 * (con una leggera rotazione in base alla velocità del mouse).
 */
export function WorkClient({
  grid,
  index,
  previews,
  labels,
}: {
  grid: ReactNode
  index: ReactNode
  previews: ReactNode[]
  labels: { label: string; grid: string; index: string }
}) {
  const [view, setView] = useState<View>('grid')
  const [active, setActive] = useState<number | null>(null)
  const body = useRef<HTMLDivElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  /* transizione tra le viste */
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const el = body.current
    if (!el) return
    ScrollTrigger.refresh()
    if (prefersReducedMotion()) return
    const items = el.querySelectorAll(view === 'grid' ? 'li' : '[data-work-index] > li')
    gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: 'expo.out', clearProps: 'transform,opacity' })
  }, [view])

  /* anteprima che segue il cursore (solo indice + mouse) */
  useEffect(() => {
    const el = body.current
    const pv = preview.current
    if (view !== 'index' || !el || !pv || !isFinePointer()) return
    const list = el.querySelector<HTMLElement>('[data-work-index]')
    if (!list) return

    gsap.set(pv, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 })
    const xTo = gsap.quickTo(pv, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(pv, 'y', { duration: 0.6, ease: 'power3.out' })
    const rTo = gsap.quickTo(pv, 'rotate', { duration: 0.8, ease: 'power3.out' })
    let lastX = 0

    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6))
      lastX = e.clientX
    }
    const over = (e: PointerEvent) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>('[data-index]')
      if (li) setActive(Number(li.dataset.index))
    }
    const enter = (e: PointerEvent) => {
      gsap.set(pv, { x: e.clientX, y: e.clientY })
      lastX = e.clientX
      gsap.to(pv, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' })
    }
    const leave = () => {
      gsap.to(pv, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'expo.out' })
      setActive(null)
    }

    list.addEventListener('pointermove', move)
    list.addEventListener('pointerover', over)
    list.addEventListener('pointerenter', enter)
    list.addEventListener('pointerleave', leave)
    return () => {
      list.removeEventListener('pointermove', move)
      list.removeEventListener('pointerover', over)
      list.removeEventListener('pointerenter', enter)
      list.removeEventListener('pointerleave', leave)
    }
  }, [view])

  return (
    <div className={cn('mt-[clamp(2.5rem,5vw,4.5rem)]', view === 'grid' && 'pb-28 md:pb-36')}>
      <div className="mb-8 flex items-center justify-between gap-4 lg:mb-12">
        <p className="text-sm font-medium text-muted">{labels.label}</p>
        <div role="group" aria-label={labels.label} className="flex rounded-full bg-surface p-1">
          {(['grid', 'index'] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn(
                'min-h-10 rounded-full px-5 text-[0.95rem] font-semibold transition-colors duration-300',
                view === v ? 'bg-white text-violet shadow-soft' : 'text-ink-2 hover:text-ink',
              )}
            >
              {labels[v]}
            </button>
          ))}
        </div>
      </div>

      <div ref={body}>{view === 'grid' ? grid : index}</div>

      {/* anteprima flottante */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden aspect-[4/5] w-[min(22vw,340px)] overflow-hidden rounded-[1.5rem] opacity-0 shadow-lift lg:block"
      >
        {view === 'index' &&
          previews.map((p, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-[clip-path] duration-700 ease-out-expo"
              style={{ clipPath: active === i ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', zIndex: active === i ? 2 : 1 }}
            >
              {p}
            </div>
          ))}
      </div>
    </div>
  )
}
