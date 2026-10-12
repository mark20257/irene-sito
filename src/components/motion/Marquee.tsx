'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { scrollState } from './MotionProvider'
import { cn } from '@/lib/utils'

/**
 * Nastro infinito. La velocità reagisce allo scroll (e cambia verso se risali).
 * Si ferma quando non è visibile; con movimento ridotto diventa una riga statica che va a capo.
 */
export function Marquee({ children, reverse = false, speed = 60, className, label }: { children: ReactNode; reverse?: boolean; speed?: number; className?: string; label?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = track.current
      if (!el || prefersReducedMotion()) return

      let half = el.scrollWidth / 2
      let wrap = gsap.utils.wrap(-half, 0)
      const ro = new ResizeObserver(() => {
        half = el.scrollWidth / 2
        wrap = gsap.utils.wrap(-half, 0)
      })
      ro.observe(el)

      const setX = gsap.quickSetter(el, 'x', 'px')
      const dir = reverse ? 1 : -1
      let x = reverse ? -half : 0
      let factor = 1
      let visible = false

      const tick = (_time: number, delta: number) => {
        if (!visible) return
        const target = (1 + Math.abs(scrollState.velocity) * 5) * scrollState.direction
        factor += (target - factor) * 0.06
        x = wrap(x + dir * speed * (delta / 1000) * factor)
        setX(x)
      }
      gsap.ticker.add(tick)

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (visible = self.isActive),
      })

      return () => {
        gsap.ticker.remove(tick)
        st.kill()
        ro.disconnect()
      }
    },
    { scope: root },
  )

  return (
    <div ref={root} className={cn('marquee', className)} aria-label={label} role={label ? 'region' : undefined}>
      <div ref={track} className="marquee__track motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <div className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">{children}</div>
        <div className="flex shrink-0 items-center motion-reduce:hidden" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
