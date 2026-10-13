'use client'

import { useRef, useState, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, refreshSoon, useGSAP, whenIdle } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { cn } from '@/lib/utils'

/**
 * Timeline orizzontale: la sezione si blocca e gli step scorrono in orizzontale.
 * Senza JS o con movimento ridotto resta un carosello nativo (swipe / scroll-snap).
 */
export function MethodMotion({ children, steps, hint }: { children: ReactNode; steps: string[]; hint: string }) {
  const stage = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  // la modalità "pin" si attiva solo nel browser e solo se il movimento è consentito
  const pinned = !useReducedMotion()

  useGSAP(
    (_, contextSafe) => {
      if (!pinned || !contextSafe) return
      return whenIdle(contextSafe(() => {
        if (prefersReducedMotion()) return
        const st = stage.current
        const tr = track.current
        if (!st || !tr) return
        st.scrollLeft = 0

        const distance = () => Math.max(0, tr.scrollWidth - st.clientWidth)

        gsap.to(tr, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: st,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.9,
            refreshPriority: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (fill.current) fill.current.style.transform = `scaleX(${self.progress})`
              const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999))
              if (idx !== activeRef.current) {
                activeRef.current = idx
                setActive(idx)
              }
            },
          },
        })

        refreshSoon()
      }))
    },
    // revertOnUpdate: se la preferenza cambia, l'attesa (o il pin) precedente si annulla
    { scope: stage, dependencies: [pinned], revertOnUpdate: true },
  )

  return (
    <div
      ref={stage}
      className="relative mt-[clamp(2.5rem,5vw,4.5rem)] snap-x snap-mandatory overflow-x-auto pt-2 pb-10 pinned:flex pinned:h-svh pinned:snap-none pinned:flex-col pinned:justify-center pinned:overflow-hidden pinned:py-0"
      tabIndex={pinned ? undefined : 0}
      aria-label={steps.join(' → ')}
      role="region"
    >
      <div ref={track} className="flex w-max gap-5 px-[var(--gutter)] py-6 will-change-transform">
        {children}
      </div>

      {/* timeline */}
      <div className="wrap mt-6 hidden sm:block" aria-hidden="true">
        <div className="relative h-1 overflow-hidden rounded-full bg-surface-2">
          <span ref={fill} className="absolute inset-0 origin-left rounded-full bg-[linear-gradient(90deg,#6b3cf6,#a78bfa)]" style={{ transform: 'scaleX(0)' }} />
        </div>
        <ol className="mt-3 grid grid-cols-4 text-[0.9rem] font-medium">
          {steps.map((s, i) => (
            <li key={s} className={cn('transition-colors duration-500', pinned && i === active ? 'text-violet' : 'text-muted')}>
              0{i + 1} · {s}
            </li>
          ))}
        </ol>
      </div>
      <p className="wrap mt-4 text-sm text-muted sm:hidden pinned:hidden">{hint} →</p>
    </div>
  )
}
