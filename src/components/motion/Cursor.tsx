'use client'

import { useEffect, useRef } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '@/lib/gsap'

/**
 * Cursore custom (solo mouse/trackpad, mai con movimento ridotto).
 * Stati:
 *  - default: punto in "difference"
 *  - link:    il punto si allarga
 *  - label:   cerchio acido con testo (data-cursor="Apri")
 *  - hidden:  sui campi di testo
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || !isFinePointer() || prefersReducedMotion()) return

    const html = document.documentElement
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })
    let shown = false

    const setState = (state: string, text = '') => {
      if (el.dataset.state !== state) el.dataset.state = state
      if (label.current && label.current.textContent !== text) label.current.textContent = text
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        html.classList.add('has-cursor')
        shown = true
      }
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null
      if (!t?.closest) return
      const labelled = t.closest<HTMLElement>('[data-cursor]')
      if (labelled) return setState('label', labelled.dataset.cursor ?? '')
      if (t.closest('input:not([type=checkbox]):not([type=radio]), textarea, select')) return setState('hidden')
      if (t.closest('a, button, [role=button], label, summary')) return setState('link')
      setState('default')
    }

    const onLeaveWindow = () => gsap.to(el, { opacity: 0, duration: 0.2 })
    const onEnterWindow = () => gsap.to(el, { opacity: 1, duration: 0.2 })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeaveWindow)
    document.documentElement.addEventListener('pointerenter', onEnterWindow)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
      document.documentElement.removeEventListener('pointerenter', onEnterWindow)
      html.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div ref={root} className="cursor" data-state="default" aria-hidden="true">
      <span className="cursor__dot" />
      <span ref={label} className="cursor__label" />
    </div>
  )
}
