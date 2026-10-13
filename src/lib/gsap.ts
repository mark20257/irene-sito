'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
  gsap.defaults({ ease: 'expo.out', duration: 1 })
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/*
 * Un solo ScrollTrigger.refresh() quando serve. Mentre MotionProvider prepara la pagina
 * le richieste si ignorano (il provider ricalcola comunque alla fine); dopo, si accorpano
 * in un unico refresh al frame successivo.
 */
const refresh = { pending: true, raf: 0 }

export function markMotionPending() {
  refresh.pending = true
  cancelAnimationFrame(refresh.raf)
  refresh.raf = 0
}

export function markMotionSettled() {
  refresh.pending = false
}

export function refreshSoon() {
  if (typeof window === 'undefined' || refresh.pending || refresh.raf) return
  refresh.raf = requestAnimationFrame(() => {
    refresh.raf = 0
    ScrollTrigger.refresh()
  })
}

export { whenIdle } from './utils'
export { gsap, ScrollTrigger, SplitText, useGSAP }
