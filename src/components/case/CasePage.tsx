import { getDictionary, paths, t, type Locale } from '@/content'
import { cases, getNextCase } from '@/content/data/cases'
import type { CaseStudy, Media as MediaT } from '@/content/types'
import { Counter } from '@/components/sections/Numbers'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ArrowUpRight } from '@/components/ui/Icons'
import { Media, mediaRatio } from '@/components/ui/Media'
import { Rich } from '@/components/ui/Rich'
import { SmartLink } from '@/components/ui/SmartLink'
import { caseJsonLd, jsonLdScript } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { ResultsChart } from './ResultsChart'

/** Etichetta di capitolo: 01 · La sfida */
function Chapter({ n, label }: { n: number; label: string }) {
  return (
    <p className="eyebrow" data-reveal data-reveal-y="12">
      0{n} · {label}
    </p>
  )
}

function Figure({ media, locale, className, sizes }: { media: MediaT; locale: Locale; className?: string; sizes?: string }) {
  return (
    <figure className={className} data-reveal data-reveal-y="50">
      <div data-tilt className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft" style={{ aspectRatio: mediaRatio(media) }}>
        <Media media={media} locale={locale} sizes={sizes} />
      </div>
      {media.caption && <figcaption className="mt-3 max-w-[52ch] text-[0.95rem] text-muted">{t(media.caption, locale)}</figcaption>}
    </figure>
  )
}

export function CasePage({ c, locale }: { c: CaseStudy; locale: Locale }) {
  const dict = getDictionary(locale)
  const cs = dict.caseStudy
  const index = cases.findIndex((x) => x.slug === c.slug)
  const next = getNextCase(c.slug)
  const services = c.services.map((s) => dict.services_short[s])

  const facts: [string, string][] = [
    [cs.facts.sector, t(c.sector, locale)],
    [cs.facts.services, services.join(' · ')],
    [cs.facts.channels, c.channels.join(', ')],
    [cs.facts.duration, t(c.duration, locale)],
    [cs.facts.year, c.year],
  ]

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(caseJsonLd(c, locale)) }} />

      {/* ───────────── HERO ───────────── */}
      <header data-theme="light" className="theme-light relative overflow-hidden pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3rem))] pb-[clamp(3rem,6vw,5rem)]">
        <div aria-hidden="true" className="glow -top-40 right-0 h-[36rem] w-[36rem] opacity-50" />
        <div className="wrap relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SmartLink href={paths.section('work', locale)} className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-surface px-4 text-[0.95rem] font-medium transition-colors hover:bg-surface-2">
              <ArrowLeft size={14} className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
              {cs.back}
            </SmartLink>
            <p className="text-sm text-muted">
              {String(index + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
            </p>
          </div>

          <div className="grid-12 mt-10 items-center gap-y-10 lg:mt-14">
            <div className="col-span-4 lg:col-span-6">
              <p className="eyebrow rise-soft" style={{ ['--d' as string]: '0s' }}>
                {t(c.sector, locale)}
              </p>
              <h1 className="t-name mt-5 text-[clamp(3.2rem,9vw,7.5rem)]">
                <span className="line-mask">
                  <span className="rise" style={{ ['--d' as string]: '0.05s' }}>
                    {c.client}
                  </span>
                </span>
              </h1>
              <p className="t-lead rise-soft mt-6 max-w-[34ch] text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] text-ink-2" style={{ ['--d' as string]: '0.15s' }}>
                {t(c.excerpt, locale)}
              </p>
              <p className="rise-soft mt-8 inline-flex items-baseline gap-3 rounded-2xl bg-violet px-5 py-3 text-white shadow-glow" style={{ ['--d' as string]: '0.22s' }}>
                <span className="t-num text-[clamp(2.4rem,4vw,3.4rem)]">{c.highlight.value}</span>
                <span className="font-medium">{t(c.highlight.label, locale)}</span>
              </p>
              <dl className="rise-soft card mt-10 grid grid-cols-2 gap-x-6 gap-y-4 p-6" style={{ ['--d' as string]: '0.3s' }}>
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-sm text-muted">{k}</dt>
                    <dd className="mt-0.5 leading-snug font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="col-span-4 lg:col-span-5 lg:col-start-8">
              <div data-tilt className="fade-in relative overflow-hidden rounded-[2rem] bg-surface shadow-lift" style={{ aspectRatio: mediaRatio(c.cover), ['--d' as string]: '0.1s' }}>
                <Media media={c.cover} locale={locale} priority sizes="(min-width: 1024px) 40vw, 92vw" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ───────────── 01 LA SFIDA ───────────── */}
      <section data-theme="light" className="theme-soft section" aria-labelledby="c-challenge">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Chapter n={1} label={cs.chapters.challenge} />
            <h2 id="c-challenge" className="t-h2 mt-5" data-split>
              {t(c.challenge.title, locale)}
            </h2>
            <p className="t-lead mt-8 text-ink-2" data-reveal>
              {t(c.challenge.body, locale)}
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── 02 LA STRATEGIA ───────────── */}
      <section data-theme="dark" className="theme-dark section relative overflow-hidden" aria-labelledby="c-strategy">
        <div aria-hidden="true" className="glow -right-40 bottom-0 h-[30rem] w-[30rem] opacity-30" />
        <div className="wrap relative grid-12 gap-y-10">
          <div className="col-span-4 lg:col-span-5">
            <Chapter n={2} label={cs.chapters.strategy} />
            <h2 id="c-strategy" className="t-h2 mt-5" data-split>
              {t(c.strategy.title, locale)}
            </h2>
            <p className="t-lead mt-8 text-white/80" data-reveal>
              {t(c.strategy.body, locale)}
            </p>
          </div>
          <div className="col-span-4 lg:col-span-6 lg:col-start-7">
            <p className="text-sm font-semibold text-white/65">{cs.moves}</p>
            <ol className="mt-4 grid gap-3" data-reveal-group>
              {c.strategy.moves.map((m, i) => (
                <li key={i} className="card flex items-start gap-5 p-5 sm:p-6" data-reveal-item>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#6b3cf6,#a78bfa)] text-sm font-semibold text-white">0{i + 1}</span>
                  <span className="pt-1.5 text-[1.1rem] leading-snug">{t(m, locale)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────── 03 LA CREATIVITÀ ───────────── */}
      <section data-theme="light" className="theme-light section" aria-labelledby="c-creative">
        <div className="wrap">
          <div className="mx-auto max-w-4xl text-center">
            <Chapter n={3} label={cs.chapters.creative} />
            <h2 id="c-creative" className="t-h2 mt-5" data-split>
              {t(c.creative.title, locale)}
            </h2>
            <p className="t-lead mx-auto mt-8 max-w-[52ch] text-ink-2" data-reveal>
              {t(c.creative.body, locale)}
            </p>
          </div>
          <div className="mt-[clamp(3rem,6vw,5rem)] grid items-start gap-5 md:grid-cols-3">
            {c.creative.media.map((m, i) => (
              <Figure key={i} media={m} locale={locale} sizes="(min-width: 768px) 31vw, 92vw" className={cn(i === 1 && 'md:mt-16')} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 04 I RISULTATI ───────────── */}
      <section data-theme="violet" className="theme-violet section relative overflow-hidden" aria-labelledby="c-results">
        <div aria-hidden="true" className="glow -top-40 -left-40 h-[36rem] w-[36rem] opacity-50" style={{ background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)' }} />
        <div className="wrap relative">
          <div className="max-w-4xl">
            <Chapter n={4} label={cs.chapters.results} />
            <h2 id="c-results" className="t-h2 mt-5" data-split>
              {t(c.results.title, locale)}
            </h2>
            <p className="t-lead mt-8 max-w-[52ch] text-white/90" data-reveal>
              {t(c.results.body, locale)}
            </p>
          </div>

          <dl className="mt-[clamp(3rem,6vw,4.5rem)] grid grid-cols-2 gap-4 lg:grid-cols-4" data-reveal-group>
            {c.results.metrics.map((m, i) => (
              <div key={i} className="flex flex-col-reverse justify-between gap-6 rounded-[var(--radius-card)] bg-white/10 p-6 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)]" data-reveal-item>
                <dt className="leading-snug">
                  {t(m.label, locale)}
                  {m.note && <span className="mt-1 block text-sm text-white">{t(m.note, locale)}</span>}
                </dt>
                <dd className="t-num text-[clamp(2.6rem,5vw,4.5rem)]">
                  <Counter metric={m} locale={locale} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 grid items-stretch gap-5 lg:grid-cols-12">
            {c.results.chart && (
              <div className="theme-light rounded-[var(--radius-card)] bg-white p-6 text-ink sm:p-8 lg:col-span-8" data-reveal>
                <ResultsChart label={t(c.results.chart.label, locale)} series={c.results.chart.series} labels={c.results.chart.labels} unit={c.results.chart.unit} locale={locale} />
              </div>
            )}
            <div className={cn('rounded-[var(--radius-card)] bg-deep p-6 sm:p-8', c.results.chart ? 'lg:col-span-4' : 'lg:col-span-12')} data-reveal>
              <p className="text-sm font-semibold text-white/65">{cs.summary.title}</p>
              <ul className="mt-4 grid gap-1">
                {c.results.receipt.map((r) => (
                  <li key={r.item.it} className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5">
                    <span>{t(r.item, locale)}</span>
                    <span className="t-num text-lg text-lilac">{r.qty}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-white/65">{cs.summary.total}</p>
              <p className="mt-1 text-xl font-semibold tracking-[-0.02em]">{t(c.results.total, locale)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── GALLERY ───────────── */}
      <section data-theme="light" className="theme-light section" aria-labelledby="c-gallery">
        <div className="wrap">
          <h2 id="c-gallery" className="eyebrow">
            {cs.chapters.gallery}
          </h2>
          <div className="mt-8 grid items-start gap-5 md:grid-cols-2">
            {c.gallery.map((m, i) => (
              <Figure key={i} media={m} locale={locale} sizes="(min-width: 768px) 46vw, 92vw" className={cn(i === 2 && 'md:col-span-2 md:mx-auto md:w-2/3')} />
            ))}
          </div>

          {c.testimonial && (
            <figure className="card mx-auto mt-[clamp(4rem,8vw,7rem)] max-w-4xl p-8 text-center sm:p-14" data-reveal>
              <svg aria-hidden="true" viewBox="0 0 32 24" className="mx-auto h-8 w-11 text-violet" fill="currentColor">
                <path d="M0 24V14C0 6 4.5 1.2 12 0l1.5 3.4C9 5 7 8 7 12h6v12zm18 0V14C18 6 22.5 1.2 30 0l1.5 3.4C27 5 25 8 25 12h6v12z" />
              </svg>
              <blockquote className="mt-6 text-[clamp(1.4rem,1rem+1.6vw,2.4rem)] leading-[1.25] font-medium tracking-[-0.03em]">{t(c.testimonial.quote, locale)}</blockquote>
              <figcaption className="mt-8 text-[0.95rem]">
                <span className="font-semibold">{c.testimonial.author}</span> <span className="text-muted">— {t(c.testimonial.role, locale)}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* ───────────── PROSSIMO LAVORO ───────────── */}
      <section data-theme="light" className="theme-light pb-[var(--section-y)]" aria-label={cs.next}>
        <div className="wrap">
          <SmartLink href={paths.case(next.slug, locale)} transitionLabel={next.client} data-cursor={dict.work.cursor} className="theme-dark group relative grid items-center gap-8 overflow-hidden rounded-[2rem] bg-deep p-7 sm:p-12 md:grid-cols-[1fr_auto]">
            <div aria-hidden="true" className="glow -top-20 -left-20 h-72 w-72 opacity-50" />
            <div className="relative">
              <p className="text-sm font-semibold text-white/65">{cs.next} →</p>
              <p className="mt-4 text-[clamp(2.6rem,7vw,6rem)] leading-none font-semibold tracking-[-0.055em] transition-colors duration-500 group-hover:text-lilac">{next.client}</p>
              <p className="mt-4 flex items-center gap-3 text-white/75">
                {t(next.excerpt, locale)}
                <ArrowUpRight size={18} className="shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
              </p>
            </div>
            <div className="relative w-40 overflow-hidden rounded-2xl transition-transform duration-700 ease-out-expo group-hover:-rotate-3 group-hover:scale-105 sm:w-52" style={{ aspectRatio: mediaRatio(next.cover) }}>
              <Media media={next.cover} locale={locale} sizes="210px" />
            </div>
          </SmartLink>

          <div className="mt-[clamp(5rem,9vw,8rem)] text-center">
            <p className="eyebrow justify-center">{cs.ctaKicker}</p>
            <p className="t-h2 mt-5" data-split>
              <Rich text={cs.ctaTitle} />
            </p>
            <div className="mt-10 flex justify-center">
              <Button href={paths.section('contact', locale)} size="lg">
                {cs.ctaButton}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
