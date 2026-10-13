'use client'

import { gsap, prefersReducedMotion, useGSAP, whenIdle } from '@/lib/gsap'

/**
 * Uscita dell'hero allo scroll: il nome sale più lento del resto,
 * l'oggetto 3D si avvicina e le card dei risultati si separano a velocità diverse.
 * Solo transform: 60fps.
 */
export function HeroMotion() {
  useGSAP((_, contextSafe) => {
    if (prefersReducedMotion() || !contextSafe) return
    return whenIdle(contextSafe(() => {
      const hero = document.querySelector<HTMLElement>('[data-hero]')
      if (!hero) return
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
      tl.to(hero.querySelectorAll('[data-hero-line]'), { yPercent: -18, stagger: 0.05 }, 0)
        .to(hero.querySelector('[data-hero-blob]'), { yPercent: 12, scale: 1.08 }, 0)
      hero.querySelectorAll('[data-hero-chip]').forEach((chip, i) => {
        tl.to(chip, { y: -60 - i * 50, x: i === 1 ? 30 : -20 }, 0)
      })
    }))
  })

  return null
}
