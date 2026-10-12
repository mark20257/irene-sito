'use client'

import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

/**
 * Uscita dell'hero allo scroll: IRENE scivola a sinistra, CHIES a destra,
 * le parole che ruotano si allontanano. Solo transform: 60fps.
 */
export function HeroMotion() {
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const hero = document.querySelector<HTMLElement>('[data-hero]')
    if (!hero) return
    const left = hero.querySelector('[data-hero-line="left"]')
    const right = hero.querySelector('[data-hero-line="right"]')
    const rotator = hero.querySelector('[data-hero-rotator]')

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
    tl.to(left, { xPercent: -14 }, 0)
      .to(right, { xPercent: 14 }, 0)
      .to(rotator, { yPercent: -60, rotate: -4, opacity: 0.2 }, 0)
  })

  return null
}
