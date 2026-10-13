'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, useGSAP, whenIdle } from '@/lib/gsap'
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
    (_, contextSafe) => {
      if (prefersReducedMotion() || !contextSafe) return
      return whenIdle(contextSafe(() => {
        const el = track.current
        const box = root.current
        const original = el?.firstElementChild
        if (!el || !box || !original) return

        // la seconda copia (per il giro senza fine) nasce qui: non pesa sull'HTML né sull'idratazione
        const copy = original.cloneNode(true) as HTMLElement
        copy.setAttribute('aria-hidden', 'true')
        copy.setAttribute('inert', '')
        el.appendChild(copy)

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

        // si muove solo quando è sullo schermo
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
        })
        io.observe(box)

        return () => {
          gsap.ticker.remove(tick)
          io.disconnect()
          ro.disconnect()
          copy.remove()
        }
      }))
    },
    { scope: root },
  )

  return (
    <div ref={root} className={cn('marquee', className)} aria-label={label} role={label ? 'region' : undefined}>
      <div ref={track} className="marquee__track motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <div className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">{children}</div>
      </div>
    </div>
  )
}
