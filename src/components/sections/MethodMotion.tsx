'use client'

import { useRef, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
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
    () => {
      if (!pinned) return
      const st = stage.current
      const tr = track.current
      if (!st || !tr) return
      st.scrollLeft = 0

      const distance = () => Math.max(0, tr.scrollWidth - st.clientWidth)
      const panels = Array.from(tr.querySelectorAll<HTMLElement>('[data-step]'))

      const tween = gsap.to(tr, {
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

      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll('h3, p, ul'), {
          y: 50,
          opacity: 0,
          stagger: 0.06,
          duration: 1,
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 85%', toggleActions: 'play none none reverse' },
        })
      })

      ScrollTrigger.refresh()
    },
    { scope: stage, dependencies: [pinned] },
  )

  return (
    <div
      ref={stage}
      className={cn('relative mt-[clamp(3rem,6vw,6rem)]', pinned ? 'flex h-svh flex-col justify-center overflow-hidden' : 'snap-x snap-mandatory overflow-x-auto pb-6')}
      tabIndex={pinned ? undefined : 0}
      aria-label={steps.join(' → ')}
      role="region"
    >
      <div ref={track} className="flex w-max gap-[var(--col-gap)] px-[var(--gutter)] will-change-transform">
        {children}
      </div>

      {/* timeline */}
      <div className="wrap mt-6 hidden sm:block" aria-hidden="true">
        <div className="relative h-px bg-[var(--rule)]">
          <span ref={fill} className="absolute inset-0 origin-left bg-ink" style={{ transform: 'scaleX(0)' }} />
        </div>
        <ol className="label mt-3 grid grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className={cn('transition-opacity duration-500', pinned && i !== active ? 'opacity-40' : 'opacity-100')}>
              0{i + 1} {s}
            </li>
          ))}
        </ol>
      </div>
      {!pinned && <p className="label muted wrap mt-4 sm:hidden">{hint} →</p>}
    </div>
  )
}
