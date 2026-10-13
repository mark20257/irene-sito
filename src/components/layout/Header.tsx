'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import type { Locale } from '@/content'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useMotion } from '@/components/motion/MotionProvider'
import { SmartLink } from '@/components/ui/SmartLink'
import { Button } from '@/components/ui/Button'
import { LangSwitch } from './LangSwitch'
import { LocalTime } from './LocalTime'

export type HeaderProps = {
  locale: Locale
  homeHref: string
  contactHref: string
  links: { href: string; label: string; id: string }[]
  labels: {
    cta: string
    menu: string
    close: string
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

type Theme = 'light' | 'dark' | 'violet'

/** Il marchio: una piccola sfera viola + il nome */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="h-6 w-6 rounded-full bg-[radial-gradient(circle_at_34%_30%,#f0dcff_0%,#a34dff_40%,#5a17c9_100%)] shadow-[0_6px_18px_-4px_rgb(150_70_250/0.6)] transition-transform duration-700 ease-out-expo group-hover:scale-110 group-hover:rotate-12"
      />
      <span className="text-[1.15rem] font-semibold tracking-[-0.03em] whitespace-nowrap">Irene Chies</span>
    </span>
  )
}

export function Header(props: HeaderProps) {
  const { locale, homeHref, contactHref, links, labels, contacts } = props
  const pathname = usePathname()
  const { stop, start } = useMotion()
  const [open, setOpen] = useState(false)
  // il contenuto del menu si monta alla prima apertura: meno DOM (e meno lavoro) al caricamento
  const [menuMounted, setMenuMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  /* Colori dell'header = tema della sezione sotto */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]'))
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTheme((entry.target.getAttribute('data-theme') as Theme) ?? 'light')
        })
      },
      { rootMargin: '-30px 0px -96% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [pathname])

  /* Voce di menu attiva = sezione al centro dello schermo */
  useEffect(() => {
    const targets = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [pathname, links])

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
        if (y > window.innerHeight * 0.7 && y > last + 6) setHidden(true)
        else if (y < last - 6 || y < 80) setHidden(false)
        last = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const setMenu = useCallback(
    (next: boolean) => {
      const el = menuRef.current
      if (!el) return
      // monta subito il contenuto, così l'animazione trova le voci
      if (next) flushSync(() => setMenuMounted(true))
      setOpen(next)
      const reduce = prefersReducedMotion()
      tl.current?.kill()
      if (next) {
        stop()
        document.documentElement.style.overflow = 'hidden'
        el.style.visibility = 'visible'
        tl.current = gsap
          .timeline({ onComplete: () => closeRef.current?.focus() })
          .fromTo(el, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: reduce ? 0 : 0.9, ease: 'expo.inOut' })
          .fromTo(el.querySelectorAll('[data-menu-item]'), { yPercent: 110 }, { yPercent: 0, duration: reduce ? 0 : 0.9, stagger: 0.05, ease: 'expo.out' }, reduce ? 0 : 0.35)
          .fromTo(el.querySelectorAll('[data-menu-fade]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: reduce ? 0 : 0.6, stagger: 0.05 }, reduce ? 0 : 0.55)
      } else {
        tl.current = gsap.timeline({
          onComplete: () => {
            el.style.visibility = 'hidden'
            document.documentElement.style.overflow = ''
            start()
          },
        })
        tl.current.to(el, { clipPath: 'circle(0% at 100% 0%)', duration: reduce ? 0 : 0.7, ease: 'expo.inOut' })
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

  const onDark = theme !== 'light'
  const bg = !scrolled ? 'bg-transparent' : theme === 'dark' ? 'bg-deep/95 shadow-[0_1px_0_rgb(255_255_255/0.08)]' : theme === 'violet' ? 'bg-violet' : 'bg-bg/95 shadow-[0_1px_0_var(--color-line)]'

  return (
    <>
      <header
        data-site-header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-500 ease-out-expo',
          onDark ? 'text-white' : 'text-ink',
          bg,
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        )}
        style={{ ['--focus' as string]: onDark ? 'var(--color-lilac-soft)' : 'var(--color-violet)' }}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <SmartLink href={homeHref} aria-label={labels.home} className="group" transitionLabel="Irene Chies">
            <Logo />
          </SmartLink>

          <nav aria-label={labels.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <SmartLink
                    href={l.href}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-300',
                      active === l.id ? (onDark ? 'bg-white/10' : 'bg-surface text-violet') : onDark ? 'hover:bg-white/10' : 'hover:bg-surface',
                    )}
                    aria-current={active === l.id ? 'true' : undefined}
                  >
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch locale={locale} label={labels.language} switchTo={labels.switchTo} className="hidden md:flex" />
            <span className="hidden sm:inline-block">
              <Button href={contactHref} size="sm" variant={onDark ? 'light' : 'primary'} icon="up">
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
              className={cn(
                'grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden',
                onDark ? 'bg-white/10 hover:bg-white/20' : 'bg-surface hover:bg-surface-2',
              )}
            >
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-[2px] w-full rounded bg-current" />
                <span className="h-[2px] w-3/4 rounded bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────── MENU (mobile/tablet) ─────────────── */}
      <div
        id="site-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={labels.mainNav}
        className="theme-dark fixed inset-0 z-[80] flex flex-col overflow-y-auto"
        style={{ visibility: 'hidden', clipPath: 'circle(0% at 100% 0%)' }}
      >
        {menuMounted && (
          <>
            <div aria-hidden="true" className="glow -top-40 -right-40 h-[32rem] w-[32rem] opacity-70" />
            <div className="wrap relative flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <Logo />
              <button ref={closeRef} type="button" onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10" aria-label={labels.menuClose}>
                <span aria-hidden="true" className="relative h-5 w-5">
                  <span className="absolute top-1/2 left-0 h-[2px] w-full rotate-45 rounded bg-current" />
                  <span className="absolute top-1/2 left-0 h-[2px] w-full -rotate-45 rounded bg-current" />
                </span>
              </button>
            </div>

            <nav aria-label={labels.mainNav} className="wrap relative flex flex-1 flex-col justify-center py-8">
              <ul className="grid gap-1">
                {links.map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <span data-menu-item className="block">
                      <SmartLink href={link.href} onClick={() => setMenu(false)} className="group flex items-baseline gap-4 py-2">
                        <span className="label text-white/60">0{i + 1}</span>
                        <span className="text-[clamp(2.6rem,10vw,5rem)] leading-none font-semibold tracking-[-0.05em] transition-colors duration-300 group-hover:text-lilac">
                          {link.label}
                        </span>
                      </SmartLink>
                    </span>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="wrap relative grid shrink-0 gap-6 pb-[calc(var(--gutter)+env(safe-area-inset-bottom))]">
              <div data-menu-fade>
                <Button href={contactHref} variant="primary" className="w-full justify-between sm:w-auto">
                  {labels.cta}
                </Button>
              </div>
              <div data-menu-fade className="grid gap-1">
                <p className="label text-white/60">{labels.menuNote}</p>
                <a href={`mailto:${contacts.email}`} className="link-u w-fit text-lg">
                  {contacts.email}
                </a>
              </div>
              <div data-menu-fade className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem]">
                  <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="link-u">
                    WhatsApp ↗
                  </a>
                  <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="link-u">
                    Instagram ↗
                  </a>
                  <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">
                    LinkedIn ↗
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <LangSwitch locale={locale} label={labels.language} switchTo={labels.switchTo} />
                  <p className="label text-white/60">
                    {contacts.city} · <LocalTime timeZone={contacts.timeZone} />
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
