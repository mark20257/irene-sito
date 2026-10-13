'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useMotion } from './MotionProvider'

/* ════════════════════════════════════════════════════════════════════
   Transizione tra pagine: un sipario viola sale, la pagina cambia,
   il sipario esce dall'alto. Con il nome della destinazione al centro.
   ════════════════════════════════════════════════════════════════════ */

type TransitionCtx = { navigate: (href: string, label?: string) => void }
const Ctx = createContext<TransitionCtx>({ navigate: () => {} })
export const usePageTransition = () => useContext(Ctx)

export function PageTransition({
  children,
  fallbackLabel,
  statusLabel,
}: {
  children: ReactNode
  fallbackLabel: string
  statusLabel: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { scrollTo, stop, start } = useMotion()
  const curtain = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const pending = useRef(false)

  const navigate = useCallback(
    (href: string, text?: string) => {
      const el = curtain.current
      if (!el || prefersReducedMotion()) {
        router.push(href)
        return
      }
      if (pending.current) return
      pending.current = true
      if (label.current) label.current.textContent = text ?? fallbackLabel
      stop()
      gsap
        .timeline()
        .set(el, { yPercent: 100, visibility: 'visible' })
        .fromTo(label.current, { yPercent: 120 }, { yPercent: 0, duration: 0.7, ease: 'expo.out' }, 0.2)
        .to(el, { yPercent: 0, duration: 0.7, ease: 'expo.inOut', onComplete: () => router.push(href) }, 0)
    },
    [router, stop, fallbackLabel],
  )

  useEffect(() => {
    if (!pending.current) return
    const el = curtain.current
    if (!window.location.hash) scrollTo(0, { immediate: true })
    start()
    gsap
      .timeline({ delay: 0.15, onComplete: () => void (pending.current = false) })
      .to(label.current, { yPercent: -120, duration: 0.5, ease: 'expo.in' }, 0)
      .to(el, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 0.1)
      .set(el, { visibility: 'hidden' })
  }, [pathname, scrollTo, start])

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtain}
        aria-hidden="true"
        className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-deep text-white"
        style={{ visibility: 'hidden' }}
      >
        <span className="absolute h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle_at_34%_30%,#c4b5fd_0%,#7c4dff_40%,#3b1aa8_75%,transparent_76%)] opacity-80 blur-[2px]" />
        <span className="relative block overflow-hidden px-[var(--gutter)] text-center">
          <span ref={label} className="block text-[clamp(2.8rem,10vw,9rem)] leading-[0.95] font-semibold tracking-[-0.055em]">
            {fallbackLabel}
          </span>
        </span>
        <span className="label absolute bottom-[var(--gutter)] left-[var(--gutter)] text-white/60">{statusLabel}</span>
        <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[linear-gradient(90deg,var(--color-violet),var(--color-lilac))]" />
      </div>
    </Ctx.Provider>
  )
}
