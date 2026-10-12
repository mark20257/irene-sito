'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Locale } from '@/content'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useMotion } from '@/components/motion/MotionProvider'
import { StrategyToggle } from '@/components/motion/StrategyMode'
import { SmartLink } from '@/components/ui/SmartLink'
import { RegMark } from '@/components/ui/Icons'
import { Button } from '@/components/ui/Button'
import { LangSwitch } from './LangSwitch'
import { LocalTime } from './LocalTime'

export type HeaderProps = {
  locale: Locale
  homeHref: string
  contactHref: string
  links: { href: string; label: string }[]
  availability: string
  labels: {
    cta: string
    menu: string
    close: string
    strategy: string
    strategyOn: string
    strategyKey: string
    home: string
    menuOpen: string
    menuClose: string
    mainNav: string
    language: string
    menuNote: string
    switchTo: string
  }
  contacts: { email: string; whatsapp: string; instagram: string; linkedin: string; city: string; timeZone: string }
}

type Theme = 'paper' | 'ink' | 'acid'

export function Header(props: HeaderProps) {
  const { locale, homeHref, contactHref, links, availability, labels, contacts } = props
  const pathname = usePathname()
  const { stop, start } = useMotion()
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('paper')
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  /* Tema dell'header = tema della sezione che c'è sotto */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]'))
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTheme((entry.target.getAttribute('data-theme') as Theme) ?? 'paper')
        })
      },
      { rootMargin: '-28px 0px -96% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [pathname])

  /* Si nasconde scendendo, ricompare risalendo */
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 12)
        if (y > window.innerHeight * 0.6 && y > last + 6) setHidden(true)
        else if (y < last - 6 || y < 80) setHidden(false)
        last = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Menu a tutto schermo */
  const setMenu = useCallback(
    (next: boolean) => {
      const el = menuRef.current
      if (!el) return
      setOpen(next)
      const reduce = prefersReducedMotion()
      tl.current?.kill()
      if (next) {
        stop()
        document.documentElement.style.overflow = 'hidden'
        el.style.visibility = 'visible'
        tl.current = gsap
          .timeline({ onComplete: () => closeRef.current?.focus() })
          .fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduce ? 0 : 0.85, ease: 'expo.inOut' })
          .fromTo(
            el.querySelectorAll('[data-menu-item]'),
            { yPercent: 110 },
            { yPercent: 0, duration: reduce ? 0 : 1, stagger: 0.06, ease: 'expo.out' },
            reduce ? 0 : 0.35,
          )
          .fromTo(el.querySelectorAll('[data-menu-fade]'), { opacity: 0 }, { opacity: 1, duration: reduce ? 0 : 0.6, stagger: 0.05 }, reduce ? 0 : 0.6)
      } else {
        tl.current = gsap.timeline({
          onComplete: () => {
            el.style.visibility = 'hidden'
            document.documentElement.style.overflow = ''
            start()
          },
        })
        tl.current.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: reduce ? 0 : 0.7, ease: 'expo.inOut' })
        toggleRef.current?.focus({ preventScroll: true })
      }
    },
    [start, stop],
  )

  // chiudi il menu a ogni cambio pagina
  useEffect(() => {
    if (open) setMenu(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Esc + trappola del focus
  useEffect(() => {
    if (!open) return
    const el = menuRef.current
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setMenu(false)
      if (e.key !== 'Tab' || !el) return
      const focusables = Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setMenu])

  const themeCls = theme === 'ink' ? 'text-paper' : 'text-ink'
  const bgCls = scrolled ? (theme === 'ink' ? 'bg-ink' : theme === 'acid' ? 'bg-acid' : 'bg-paper') : 'bg-transparent'

  return (
    <>
      <header
        data-site-header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ease-out-expo',
          themeCls,
          bgCls,
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        )}
        style={{ ['--focus' as string]: theme === 'ink' ? 'var(--color-acid)' : 'var(--color-ink)' }}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <SmartLink href={homeHref} aria-label={labels.home} className="group flex items-center gap-2.5" transitionLabel="Irene Chies">
            <RegMark size={20} className="transition-transform duration-700 ease-out-expo group-hover:rotate-90" />
            <span className="t-display text-[1.35rem] leading-none tracking-[-0.02em] whitespace-nowrap uppercase">Irene Chies</span>
          </SmartLink>

          <p className="label hidden items-center gap-2 xl:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid shadow-[0_0_0_1px_var(--color-ink)]" />
            </span>
            {availability}
          </p>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <StrategyToggle label={labels.strategy} labelOn={labels.strategyOn} shortcut={labels.strategyKey} className="hidden lg:inline-flex" />
            <LangSwitch locale={locale} label={labels.language} switchTo={labels.switchTo} className="hidden md:flex" />
            <span className="hidden sm:inline-block">
              <Button href={contactHref} size="sm" variant={theme === 'ink' ? 'acid' : 'ink'} icon="up">
                {labels.cta}
              </Button>
            </span>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenu(!open)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? labels.menuClose : labels.menuOpen}
              className="group flex min-h-11 items-center gap-2.5 pl-2"
            >
              <span className="label">{labels.menu}</span>
              <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                <span className="h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-75" />
                <span className="h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────── MENU ─────────────── */}
      <div
        id="site-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={labels.mainNav}
        className="theme-ink fixed inset-0 z-[80] flex flex-col overflow-y-auto"
        style={{ visibility: 'hidden', clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
          <span className="t-display text-[1.35rem] leading-none tracking-[-0.03em] uppercase">Irene Chies</span>
          <button ref={closeRef} type="button" onClick={() => setMenu(false)} className="flex min-h-11 items-center gap-3" aria-label={labels.menuClose}>
            <span className="label">{labels.close}</span>
            <span aria-hidden="true" className="relative h-6 w-6">
              <span className="absolute top-1/2 left-0 h-[1.5px] w-full rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-[1.5px] w-full -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav aria-label={labels.mainNav} className="wrap flex flex-1 flex-col justify-center py-8">
          <ul className="grid gap-1">
            {links.map((link, i) => (
              <li key={link.href} className="overflow-hidden border-b border-[var(--rule)] first:border-t">
                <span data-menu-item className="block">
                  <SmartLink
                    href={link.href}
                    onClick={() => setMenu(false)}
                    className="group flex items-baseline justify-between gap-4 py-2 sm:py-3"
                  >
                    <span className="flex items-baseline gap-4 sm:gap-8">
                      <span className="label text-paper/50">0{i + 1}</span>
                      <span className="t-display text-[clamp(2.9rem,10.5vw,8.5rem)] leading-[0.88] uppercase transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-3 group-hover:text-acid">
                        {link.label}
                      </span>
                    </span>
                    <span className="label hidden text-acid opacity-0 transition-opacity group-hover:opacity-100 sm:block">→</span>
                  </SmartLink>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="wrap grid shrink-0 gap-6 pb-[calc(var(--gutter)+env(safe-area-inset-bottom))] sm:grid-cols-3 sm:items-end">
          <div data-menu-fade className="grid gap-1">
            <p className="label text-paper/55">{labels.menuNote}</p>
            <a href={`mailto:${contacts.email}`} className="link-u w-fit text-lg">
              {contacts.email}
            </a>
          </div>
          <div data-menu-fade className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="label link-u">
              WhatsApp ↗
            </a>
            <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="label link-u">
              Instagram ↗
            </a>
            <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="label link-u">
              LinkedIn ↗
            </a>
          </div>
          <div data-menu-fade className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
            <StrategyToggle label={labels.strategy} labelOn={labels.strategyOn} shortcut={labels.strategyKey} className="inline-flex lg:hidden" />
            <LangSwitch locale={locale} label={labels.language} switchTo={labels.switchTo} className="md:hidden" />
            <p className="label text-paper/55">
              {contacts.city} — <LocalTime timeZone={contacts.timeZone} />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
