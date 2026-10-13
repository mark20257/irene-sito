'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion, isFinePointer, markMotionPending, markMotionSettled, whenIdle } from '@/lib/gsap'

/* ════════════════════════════════════════════════════════════════════
   MotionProvider
   - Smooth scroll (Lenis) sincronizzato con GSAP ScrollTrigger
   - Comportamenti dichiarativi via data-attribute, così le sezioni restano
     Server Components: data-split, data-reveal, data-counter, data-parallax,
     data-scrub-words, data-magnetic, data-velocity, data-tilt
   - Rispetta prefers-reduced-motion (niente Lenis, niente animazioni)
   - Leggero al caricamento: le entrate "una volta sola" usano un unico
     IntersectionObserver (niente ScrollTrigger da misurare) e la preparazione
     è divisa in piccoli lavori che lasciano respirare il thread principale
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

type Job = () => void | (() => void)
type Enter = (el: Element, play: () => void) => void
type Observers = { enter: Enter; near: Enter }

/** Cede il thread principale tra un lavoro e l'altro (niente task lunghi al caricamento) */
const yieldToMain = () =>
  new Promise<void>((resolve) => {
    const s = (window as unknown as { scheduler?: { yield?: () => Promise<void> } }).scheduler
    if (s?.yield) s.yield().then(resolve)
    else window.setTimeout(resolve, 0)
  })

/**
 * IntersectionObserver condiviso per eventi "una volta sola": `run` parte la prima volta
 * che l'elemento entra nella zona indicata. Il margine enorme in alto fa scattare subito
 * anche ciò che sta già sopra il viewport (salti con le ancore, scroll ripristinato).
 */
function createOnce(ctx: gsap.Context, bottomMargin: string) {
  const handlers = new Map<Element, () => void>()
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const run = handlers.get(entry.target)
        handlers.delete(entry.target)
        io.unobserve(entry.target)
        if (run) ctx.add(run)
      }
    },
    { rootMargin: `99999px 0px ${bottomMargin} 0px` },
  )
  const observe: Enter = (el, run) => {
    handlers.set(el, run)
    io.observe(el)
  }
  return { observe, disconnect: () => io.disconnect() }
}

/**
 * - enter: l'elemento supera il 90% del viewport → parte l'entrata
 * - near: l'elemento è a meno di ~mezzo viewport → si prepara (es. divisione in righe),
 *   così il lavoro pesante non pesa sul caricamento ma è pronto prima che si veda
 */
function createObservers(ctx: gsap.Context) {
  const enter = createOnce(ctx, '-10%')
  const near = createOnce(ctx, '60%')
  return {
    observers: { enter: enter.observe, near: near.observe } satisfies Observers,
    disconnect: () => {
      enter.disconnect()
      near.disconnect()
    },
  }
}

const headerOffset = () => -(document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 64) + 1

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  /* ── Lenis + ticker GSAP ───────────────────────────────────────── */
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })
    if (prefersReducedMotion()) return

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
  const firstPath = useRef(pathname)
  useEffect(() => {
    // dopo il primo cambio pagina l'intro è alle spalle: le pagine successive entrano subito
    // (la classe non si aggiunge prima: cambiare una variabile sul root ricalcola gli stili di tutto)
    if (pathname !== firstPath.current) document.documentElement.classList.add('intro-seen')

    markMotionPending()
    const reduce = prefersReducedMotion()
    const ctx = gsap.context(() => {})
    const { observers, disconnect } = createObservers(ctx)
    const { enter } = observers
    const cleanups: Array<() => void> = []
    let cancelled = false
    let raf = 0

    const jobs: Job[] = reduce
      ? []
      : [
          ...setupSplits(observers),
          ...setupReveals(enter),
          ...setupCounters(enter),
          ...setupRiseChars(enter),
          ...setupScrubWords(),
          ...setupParallax(),
          setupGrow,
          setupVelocity,
          ...(isFinePointer() ? [setupMagnetic, setupTilt] : []),
        ]

    const run = async () => {
      let slice = performance.now()
      for (const job of jobs) {
        if (cancelled) return
        ctx.add(() => {
          const cleanup = job()
          if (cleanup) cleanups.push(cleanup)
        })
        if (performance.now() - slice > 10) {
          await yieldToMain()
          slice = performance.now()
        }
      }
      if (cancelled) return
      // Dopo che tutte le sezioni hanno creato i loro trigger (pin compresi): ricalcola e,
      // se l'URL ha un'ancora, raggiungila con le posizioni corrette
      raf = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        markMotionSettled()
        const hash = decodeURIComponent(window.location.hash)
        if (hash.length > 1) {
          const target = document.getElementById(hash.slice(1))
          if (target) scrollTo(target, { immediate: true })
        }
        // I font cambiano le metriche: ricalcola quando sono pronti (se non lo sono già)
        if (document.fonts && document.fonts.status !== 'loaded') {
          document.fonts.ready.then(() => !cancelled && ScrollTrigger.refresh())
        }
      })
    }
    // in coda alle sezioni (che preparano pin e scrub a thread libero), dopo il primo paint
    let cancelIdle: (() => void) | undefined
    const kick = window.setTimeout(() => {
      cancelIdle = whenIdle(run)
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(kick)
      cancelIdle?.()
      markMotionPending()
      cancelAnimationFrame(raf)
      disconnect()
      cleanups.forEach((c) => c())
      ctx.revert()
    }
  }, [pathname, scrollTo])

  return <Ctx.Provider value={{ getLenis, scrollTo, stop, start }}>{children}</Ctx.Provider>
}

/* ──────────────────────────────────────────────────────────────────
   Comportamenti
   ────────────────────────────────────────────────────────────────── */

const q = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T & Element>(sel)) as T[]

/**
 * Titoli e paragrafi che si rivelano riga per riga.
 * Dividere in righe costa un ricalcolo del layout: si fa solo quando il testo si avvicina.
 */
function setupSplits({ enter, near }: Observers): Job[] {
  return q('[data-split]').map((el) => () => {
    near(el, () => split(el, enter))
  })
}

function split(el: HTMLElement, enter: Enter) {
  const delay = Number(el.dataset.delay ?? 0)
  let played = false
  let tween: gsap.core.Tween | null = null
  SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'split-line',
    autoSplit: true,
    aria: 'none',
    onSplit(self) {
      // ri-divisione (resize, font) dopo l'entrata: le righe restano ferme e visibili
      if (played) return
      tween = gsap.from(self.lines, {
        yPercent: 112,
        rotate: 2.5,
        transformOrigin: '0% 100%',
        duration: 1.25,
        stagger: 0.09,
        delay,
        paused: true,
      })
      return tween
    },
  })
  enter(el, () => {
    played = true
    tween?.play()
  })
}

/** Entrate morbide (singole o a gruppi con stagger) */
function setupReveals(enter: Enter): Job[] {
  const single = q('[data-reveal]').map((el) => () => {
    const tween = gsap.from(el, {
      y: Number(el.dataset.revealY ?? 48),
      opacity: 0,
      duration: 1.2,
      delay: Number(el.dataset.delay ?? 0),
      paused: true,
    })
    enter(el, () => {
      tween.play()
    })
  })
  const groups = q('[data-reveal-group]').map((group) => () => {
    const items = group.querySelectorAll('[data-reveal-item]')
    if (!items.length) return
    const tween = gsap.from(items, { y: 40, opacity: 0, duration: 1.1, stagger: 0.08, paused: true })
    enter(group, () => {
      tween.play()
    })
  })
  return [...single, ...groups]
}

/** Testo che si "accende" parola per parola mentre scorri (manifesto) */
function setupScrubWords(): Job[] {
  return q('[data-scrub-words]').map((el) => () => {
    const plain = Array.from(el.querySelectorAll<HTMLElement>('.w')).filter((w) => !w.closest('mark'))
    const marked = Array.from(el.querySelectorAll<HTMLElement>('mark .w'))
    const all = Array.from(el.querySelectorAll<HTMLElement>('.w'))
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
    })
    // colore di partenza con contrasto ≥ 3:1 (testo grande): leggibile anche "spento"
    all.forEach((w, i) => {
      const at = i * 0.1
      if (marked.includes(w)) tl.fromTo(w, { opacity: 0.35 }, { opacity: 1, ease: 'none', duration: 0.5 }, at)
      else if (plain.includes(w)) {
        const natural = getComputedStyle(w).color // rispetta parole in viola (*così*)
        tl.fromTo(w, { color: '#8f82b8' }, { color: natural, ease: 'none', duration: 0.5 }, at)
      }
    })
  })
}

/** Parallasse leggera sulle immagini e sui numeri di sezione */
function setupParallax(): Job[] {
  return q('[data-parallax]').map((el) => () => {
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
function setupCounters(enter: Enter): Job[] {
  return q('[data-counter]').map((el) => () => {
    const target = Number(el.dataset.counter)
    const decimals = Number(el.dataset.decimals ?? 0)
    const locale = el.dataset.locale === 'en' ? 'en-GB' : 'it-IT'
    const fmt = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    const final = el.textContent
    const obj = { v: 0 }
    el.textContent = fmt.format(0)
    enter(el, () => {
      gsap.to(obj, {
        v: target,
        duration: 2.2,
        ease: 'expo.out',
        onUpdate: () => {
          el.textContent = fmt.format(obj.v)
        },
      })
    })
    return () => {
      el.textContent = final
    }
  })
}

/** Lettere che salgono dal bordo (nome gigante nel footer) */
function setupRiseChars(enter: Enter): Job[] {
  return q('[data-rise-chars]').map((el) => () => {
    const tween = gsap.from(el.querySelectorAll('.ch'), { yPercent: 105, duration: 1.3, stagger: 0.035, paused: true })
    enter(el, () => {
      tween.play()
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

/** Card che si inclinano in 3D seguendo il mouse */
function setupTilt() {
  const cleanups: Array<() => void> = []
  q('[data-tilt]').forEach((el) => {
    gsap.set(el, { transformPerspective: 1000 })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * 9)
      rx(-((e.clientY - r.top) / r.height - 0.5) * 9)
    }
    const leave = () => {
      rx(0)
      ry(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    cleanups.push(() => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    })
  })
  return () => cleanups.forEach((c) => c())
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
