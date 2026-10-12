import type { CSSProperties } from 'react'
import { getDictionary, paths, type Locale } from '@/content'
import { Button } from '@/components/ui/Button'
import { Note } from '@/components/ui/Note'
import { SmartLink } from '@/components/ui/SmartLink'
import { ArrowDown, RegMark } from '@/components/ui/Icons'
import { HeroMotion } from './HeroMotion'

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

/** Parola con la linea di crescita che si disegna sotto */
function Claim({ text, grow }: { text: string; grow: string }) {
  const [before, after] = text.split(grow)
  if (after === undefined) return <>{text}</>
  return (
    <>
      {before}
      <span className="relative inline-block whitespace-nowrap">
        {grow}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-[0.22em] left-0 h-[0.42em] w-full overflow-visible"
        >
          <polyline
            className="draw-line"
            style={d(0.55)}
            pathLength={1}
            points="0,34 34,30 62,33 96,22 128,25 160,10 200,3"
            fill="none"
            stroke="var(--color-acid)"
            strokeWidth="9"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="200" cy="3" r="5" fill="var(--color-ink)" className="fade-in" style={d(1.6)} />
        </svg>
      </span>
      {after}
    </>
  )
}

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const h = dict.hero
  const notes = dict.strategy.notes
  const words = h.rotating

  return (
    <section
      id={dict.sections.hero.id}
      data-theme="paper"
      data-hero
      aria-labelledby="hero-title"
      className="theme-paper relative overflow-hidden pt-[var(--header-h)]"
    >
      <HeroMotion />
      <div className="wrap relative flex min-h-[calc(100svh-var(--header-h))] flex-col pb-6 lg:pb-8">
        {/* ── riga meta ─────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-6 pt-5 lg:pt-8">
          <p className="label rise-soft flex items-center gap-3" style={d(0.1)}>
            <RegMark size={16} />
            <span>(01) — {h.eyebrow}</span>
          </p>
          <p className="label rise-soft hidden max-w-[22ch] text-right sm:block" style={d(0.2)}>
            {h.location}
          </p>
        </div>

        {/* ── nome ──────────────────────────────────────────── */}
        <div className="relative mt-auto pt-10 lg:pt-6">
          <h1
            id="hero-title"
            className="t-display font-[800] uppercase"
            style={{ fontSize: 'min(47vw, 35svh)', lineHeight: 0.8, letterSpacing: '-0.012em', fontStretch: '75%' }}
          >
            <span data-hero-line="left" className="line-mask">
              <span className="settle">Irene</span>
            </span>
            <span data-hero-line="right" className="line-mask lg:text-right">
              <span className="settle" style={d(0.06)}>
                Chies
              </span>
            </span>
            <span className="sr-only"> — {h.roles.join(', ')}</span>
          </h1>

          {/* ruoli, in alto a destra (desktop) */}
          <ul
            aria-hidden="true"
            className="label absolute top-[calc(var(--header-h)*0.1)] right-0 hidden text-right leading-[1.6] lg:block"
          >
            {h.roles.map((r, i) => (
              <li key={r} className="rise-soft" style={d(0.25 + i * 0.07)}>
                <span className="muted">0{i + 1}</span> {r}
              </li>
            ))}
          </ul>

          {/* parole che ruotano */}
          <div className="mt-5 flex items-center gap-4 lg:absolute lg:bottom-[0.6vw] lg:left-0 lg:mt-0" data-hero-rotator>
            <div className="rise-soft flex items-end gap-3 lg:block" style={d(0.35)}>
              <p className="label mb-1 lg:mb-2">{h.rotatingLabel}</p>
              <p className="t-display bg-acid px-[0.18em] pt-[0.06em] pb-[0.02em] text-[clamp(2.4rem,6.4vw,7rem)] leading-[0.95] uppercase shadow-[0.06em_0.06em_0_var(--color-ink)]">
                <span className="sr-only">{words.join(', ')}</span>
                <span className="rotator" aria-hidden="true">
                  <span className="rotator__sizer">
                    {words.map((w) => (
                      <span key={w}>{w}</span>
                    ))}
                  </span>
                  <span className="rotator__track">
                    {[...words, words[0]].map((w, i) => (
                      <span key={`${w}-${i}`}>{w}</span>
                    ))}
                  </span>
                </span>
              </p>
            </div>
            <Note n="02" className="relative max-w-[24ch] self-end lg:max-w-[28ch]">
              {notes.heroRoles}
            </Note>
          </div>

          <Note n="01" className="absolute top-2 left-[42%] max-w-[26ch] lg:top-[4%] lg:left-[46%]">
            {notes.heroName}
          </Note>
        </div>

        {/* ── claim + CTA ───────────────────────────────────── */}
        <div className="grid-12 mt-8 items-end gap-y-6 border-t border-[var(--rule)] pt-6 lg:mt-10 lg:pt-8">
          <div className="order-1 col-span-4 lg:order-none lg:col-span-5">
            <p className="t-h3 text-[clamp(2.1rem,4.2vw,4.4rem)]">
              <span className="line-mask">
                <span className="rise" style={d(0.15)}>
                  <Claim text={h.claim} grow={h.growWord} />
                </span>
              </span>
              <span className="line-mask">
                <span className="rise ital" style={d(0.22)}>
                  {h.claimAccent}
                </span>
              </span>
            </p>
            <Note n="04" className="relative mt-3">
              {notes.font}
            </Note>
          </div>

          <p className="t-lead rise-soft order-3 col-span-4 max-w-[38ch] lg:order-none text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] text-ink-2 lg:col-span-4 lg:col-start-6" style={d(0.3)}>
            {h.sub}
          </p>

          <div className="rise-soft order-2 col-span-4 flex flex-col items-start gap-4 lg:order-none lg:col-span-3 lg:items-end" style={d(0.4)}>
            <Button href={paths.section('contact', locale)} size="lg" className="w-full justify-between sm:w-auto">
              {h.ctaPrimary}
            </Button>
            <SmartLink href={paths.section('work', locale)} className="label link-u inline-flex items-center gap-2">
              {h.ctaSecondary}
              <ArrowDown size={12} />
            </SmartLink>
            <Note n="03" className="relative">
              {notes.heroCta}
            </Note>
          </div>
        </div>

        <p className="label fade-in muted mt-6 flex items-center gap-2 lg:hidden" style={d(0.6)}>
          {h.location}
        </p>
      </div>
    </section>
  )
}
