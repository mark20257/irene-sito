import type { CSSProperties } from 'react'
import { getDictionary, paths, t, type Locale } from '@/content'
import { cases } from '@/content/data/cases'
import { metrics } from '@/content/data/proof'
import { site } from '@/content/site'
import { Blob3D } from '@/components/motion/Blob3D'
import { Button } from '@/components/ui/Button'
import { formatNumber, cn } from '@/lib/utils'
import { HeroMotion } from './HeroMotion'

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

/** "Faccio crescere brand." con la parola chiave in gradiente */
function Claim({ text, grow }: { text: string; grow: string }) {
  const [before, after] = text.split(grow)
  if (after === undefined) return <>{text}</>
  return (
    <>
      {before}
      <span className="grad">{grow}</span>
      {after}
    </>
  )
}

const chipPos = [
  'top-[4%] -left-[2%] sm:left-[-6%]',
  'top-[42%] -right-[1%] sm:right-[-8%] lg:right-[-10%]',
  'bottom-[2%] left-[10%] hidden sm:block',
]

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const h = dict.hero
  const words = h.rotating
  const chips = [cases[0], cases[2], cases[3]]
  const trust = metrics.slice(0, 3)

  return (
    <section id={dict.sections.hero.id} data-theme="light" data-hero aria-labelledby="hero-title" className="theme-light relative overflow-hidden pt-[var(--header-h)]">
      <HeroMotion />
      <div aria-hidden="true" className="glow -top-48 right-[-10%] h-[44rem] w-[44rem] opacity-60" />
      <div aria-hidden="true" className="glow bottom-[-20rem] -left-40 h-[30rem] w-[30rem] opacity-30" />

      <div className="wrap relative">
        <div className="grid-12 min-h-[calc(100svh-var(--header-h))] content-center gap-y-6 py-6 lg:gap-y-10 lg:py-10">
          {/* ── oggetto 3D ─────────────────────────────── */}
          <div className="relative col-span-4 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-center">
            <div className="relative mx-auto aspect-square w-[64vw] max-w-[36rem] sm:w-[52vw] lg:w-full" data-hero-blob>
              <Blob3D className="absolute -inset-[6%]" />
              {chips.map((c, i) => (
                <div
                  key={c.slug}
                  data-hero-chip
                  className={cn('fade-in absolute', chipPos[i])}
                  style={{ ...d(0.5 + i * 0.12) }}
                >
                  <div className="card float px-3.5 py-2.5 sm:px-4 sm:py-3" style={{ ['--fd' as string]: `${i * -1.6}s` }}>
                    <p className="t-num text-[1.35rem] text-violet sm:text-[1.7rem]">{c.highlight.value}</p>
                    <p className="text-[0.75rem] leading-tight font-medium text-ink sm:text-[0.8rem]">{t(c.highlight.label, locale)}</p>
                    <p className="text-[0.7rem] text-muted">{c.client}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── testo ─────────────────────────────────── */}
          <div className="relative z-10 col-span-4 lg:col-span-7 lg:row-start-1">
            <p className="rise-soft inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-2 text-[0.85rem] font-medium shadow-soft" style={d(0)}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet" />
              </span>
              {site.availability[locale]}
            </p>

            <h1 id="hero-title" className="t-name mt-6 text-[clamp(4.2rem,19vw,9.5rem)] lg:text-[min(9.5rem,10.5vw)]">
              <span data-hero-line className="line-mask">
                <span className="rise" style={d(0.05)}>
                  Irene
                </span>
              </span>
              <span data-hero-line className="line-mask">
                <span className="rise" style={d(0.12)}>
                  Chies
                </span>
              </span>
              <span className="sr-only"> — {h.roles.join(', ')}</span>
            </h1>

            <p className="rise-soft mt-6 text-[clamp(1.6rem,1.1rem+2vw,2.9rem)] leading-[1.1] font-semibold tracking-[-0.04em]" style={d(0.2)}>
              <Claim text={h.claim} grow={h.growWord} />
              <span className="block font-light text-ink-2">{h.claimAccent}</span>
            </p>

            <div className="rise-soft mt-5 flex flex-wrap items-center gap-3" style={d(0.28)}>
              <span className="text-[0.95rem] text-muted">{h.rotatingLabel}</span>
              <span className="inline-flex items-center rounded-full bg-violet px-4 py-1.5 text-[1.05rem] font-semibold text-white shadow-glow">
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
              </span>
              <span className="hidden text-[0.95rem] text-muted sm:inline">· {h.roles.join(' · ')}</span>
            </div>

            <p className="t-lead rise-soft mt-6 max-w-[44ch] text-ink-2" style={d(0.34)}>
              {h.sub}
            </p>

            <div className="rise-soft mt-8 flex flex-wrap items-center gap-3" style={d(0.42)}>
              <Button href={paths.section('contact', locale)} size="lg">
                {h.ctaPrimary}
              </Button>
              <Button href={paths.section('work', locale)} variant="ghost" size="lg" icon="down" magnetic={false}>
                {h.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>

        {/* ── numeri di fiducia ─────────────────────────── */}
        <dl className="fade-in grid grid-cols-3 gap-4 border-t border-line py-6 lg:py-8" style={d(0.55)}>
          {trust.map((m, i) => (
            <div key={i} className="flex flex-col-reverse gap-1">
              <dt className="text-[0.8rem] leading-snug text-muted sm:text-[0.9rem]">{t(m.label, locale)}</dt>
              <dd className="t-num text-[clamp(1.6rem,1rem+2vw,2.6rem)]">
                {m.prefix}
                {formatNumber(m.value, locale, m.decimals ?? 0)}
                {m.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
