'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion, isFinePointer } from '@/lib/gsap'

/* ════════════════════════════════════════════════════════════════════
   MotionProvider
   - Smooth scroll (Lenis) sincronizzato con GSAP ScrollTrigger
   - Comportamenti dichiarativi via data-attribute, così le sezioni restano
     Server Components: data-split, data-reveal, data-counter, data-parallax,
     data-hl, data-scrub-words, data-magnetic, data-velocity
   - Rispetta prefers-reduced-motion (niente Lenis, niente animazioni)
   ════════════════════════════════════════════════════════════════════ */

type ScrollTarget = string | number | HTMLElement

type MotionCtx = {
  getLenis: () => Lenis | null
  scrollTo: (target: ScrollTarget, opts?: { immediate?: boolean; offset?: number }) => void
  stop: () => void
  start: () => void
}

const Ctx = createContext<MotionCtx>({
  getLenis: () => null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
})

export const useMotion = () => useContext(Ctx)

/** Stato condiviso dello scroll (niente variabili CSS sul root: costerebbero un ricalcolo stili a ogni frame) */
export const scrollState = { velocity: 0, direction: 1 as 1 | -1 }

const headerOffset = () => -(document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 64) + 1

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  /* ── Lenis + ticker GSAP ───────────────────────────────────────── */
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })
    // finita l'intro, le pagine successive entrano subito (niente attesa di 1,2s)
    const introDone = window.setTimeout(() => document.documentElement.classList.add('intro-seen'), 2200)
    if (prefersReducedMotion()) return () => window.clearTimeout(introDone)

    const instance = new Lenis({ autoRaf: false, lerp: 0.11, smoothWheel: true, syncTouch: false })
    lenisRef.current = instance

    instance.on('scroll', ScrollTrigger.update)
    // velocità normalizzata (-1…1), letta da marquee e titoli "elastici"
    instance.on('scroll', (l: Lenis) => {
      scrollState.velocity = gsap.utils.clamp(-1, 1, l.velocity / 60)
      scrollState.direction = l.direction === -1 ? -1 : 1
    })

    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      window.clearTimeout(introDone)
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback<MotionCtx['scrollTo']>((target, opts = {}) => {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    if (el === null) return
    const offset = opts.offset ?? (typeof el === 'number' ? 0 : headerOffset())
    const l = lenisRef.current
    if (l) {
      l.scrollTo(el, { offset, immediate: opts.immediate, duration: opts.immediate ? undefined : 1.4, force: true })
    } else {
      const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
    }
  }, [])

  const getLenis = useCallback(() => lenisRef.current, [])
  const stop = useCallback(() => lenisRef.current?.stop(), [])
  const start = useCallback(() => lenisRef.current?.start(), [])

  /* ── Comportamenti dichiarativi (rieseguiti a ogni cambio pagina) ─ */
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const ctx = gsap.context(() => {
      const cleanups: Array<(() => void) | undefined> = []
      if (!reduce) {
        setupSplits()
        setupReveals()
        setupHighlights()
        setupScrubWords()
        setupParallax()
        setupCounters()
        setupRiseChars()
        setupGrow()
        cleanups.push(setupVelocity())
        if (isFinePointer()) cleanups.push(setupMagnetic())
      }
      return () => cleanups.forEach((c) => c?.())
    })

    // Dopo che tutte le sezioni hanno creato i loro trigger (pin compresi): ricalcola e,
    // se l'URL ha un'ancora, raggiungila con le posizioni corrette
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const hash = decodeURIComponent(window.location.hash)
        if (hash.length > 1) {
          const target = document.getElementById(hash.slice(1))
          if (target) scrollTo(target, { immediate: true })
        }
      })
    })

    // I font cambiano le metriche: ricalcola quando sono pronti
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [pathname, scrollTo])

  return <Ctx.Provider value={{ getLenis, scrollTo, stop, start }}>{children}</Ctx.Provider>
}

/* ──────────────────────────────────────────────────────────────────
   Comportamenti
   ────────────────────────────────────────────────────────────────── */

const q = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T & Element>(sel)) as T[]

/** Titoli e paragrafi che si rivelano riga per riga */
function setupSplits() {
  q('[data-split]').forEach((el) => {
    const delay = Number(el.dataset.delay ?? 0)
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      aria: 'none',
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 112,
          rotate: 2.5,
          transformOrigin: '0% 100%',
          duration: 1.25,
          stagger: 0.09,
          delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      },
    })
  })
}

/** Entrate morbide (singole o a gruppi con stagger) */
function setupReveals() {
  q('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: Number(el.dataset.revealY ?? 48),
      opacity: 0,
      duration: 1.2,
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  })
  q('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('[data-reveal-item]')
    if (!items.length) return
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 1.1,
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    })
  })
}

/** L'evidenziatore che passa sulle parole importanti */
function setupHighlights() {
  q('[data-hl]').forEach((el) => {
    gsap.fromTo(
      el,
      { '--hl': '0%' },
      {
        '--hl': '100%',
        duration: 1.1,
        ease: 'power3.inOut',
        delay: 0.35,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    )
  })
}

/** Testo che si "colora" parola per parola mentre scorri (manifesto) */
function setupScrubWords() {
  q('[data-scrub-words]').forEach((el) => {
    const words = el.querySelectorAll<HTMLElement>('.w')
    const marks = el.querySelectorAll<HTMLElement>('mark.hl')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 52%', scrub: 0.6 },
    })
    tl.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: 0.12, ease: 'none', duration: 0.6 }, 0)
    marks.forEach((m) => {
      // l'evidenziatore parte quando la sua prima parola si accende
      const first = m.querySelector('.w')
      const index = Array.prototype.indexOf.call(words, first)
      tl.fromTo(m, { '--hl': '0%' }, { '--hl': '100%', ease: 'none', duration: 0.6 }, Math.max(0, index) * 0.12)
    })
  })
}

/** Parallasse leggera sulle immagini e sui numeri di sezione */
function setupParallax() {
  q('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 12)
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  })
}

/** Contatori animati (il valore finale è già nel DOM per SEO e screen reader) */
function setupCounters() {
  q('[data-counter]').forEach((el) => {
    const target = Number(el.dataset.counter)
    const decimals = Number(el.dataset.decimals ?? 0)
    const locale = el.dataset.locale === 'en' ? 'en-GB' : 'it-IT'
    const fmt = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    const obj = { v: 0 }
    el.textContent = fmt.format(0)
    gsap.to(obj, {
      v: target,
      duration: 2.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = fmt.format(obj.v)
      },
    })
  })
}

/** Lettere che salgono dal bordo (nome gigante nel footer) */
function setupRiseChars() {
  q('[data-rise-chars]').forEach((el) => {
    gsap.from(el.querySelectorAll('.ch'), {
      yPercent: 105,
      duration: 1.3,
      stagger: 0.035,
      scrollTrigger: { trigger: el, start: 'top 98%', once: true },
    })
  })
}

/** Barre che crescono con lo scroll (sezione Numeri) */
function setupGrow() {
  const bars = q('[data-grow]')
  if (!bars.length) return
  const section = bars[0].closest('section') ?? bars[0]
  gsap.fromTo(
    bars,
    { scaleY: 0.08 },
    {
      scaleY: 1,
      ease: 'none',
      stagger: 0.04,
      scrollTrigger: { trigger: section, start: 'top 85%', end: 'bottom 70%', scrub: 0.8 },
    },
  )
}

/** Titoli che si inclinano con la velocità dello scroll */
function setupVelocity() {
  const els = q('[data-velocity]')
  if (!els.length) return
  const setters = els.map((el) => gsap.quickTo(el, 'skewX', { duration: 0.6, ease: 'power3.out' }))
  const update = () => {
    scrollState.velocity *= 0.92 // decade quando lo scroll si ferma
    setters.forEach((s) => s(scrollState.velocity * -7))
  }
  gsap.ticker.add(update)
  return () => gsap.ticker.remove(update)
}

/** Bottoni magnetici */
function setupMagnetic() {
  const cleanups: Array<() => void> = []
  q('[data-magnetic]').forEach((el) => {
    const inner = el.firstElementChild as HTMLElement | null
    if (!inner) return
    const strength = Number(el.dataset.magnetic || 0.35)
    const xTo = gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    cleanups.push(() => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.set(inner, { x: 0, y: 0 })
    })
  })
  return () => cleanups.forEach((c) => c())
}
