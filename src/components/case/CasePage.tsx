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
import { Receipt } from './Receipt'

/** Etichetta di capitolo: (01) ─── La sfida */
function Chapter({ n, label }: { n: number; label: string }) {
  return (
    <p className="label flex items-center gap-3" data-reveal data-reveal-y="12">
      <span>(0{n})</span>
      <span className="h-px w-12 bg-current opacity-40" aria-hidden="true" />
      <span>{label}</span>
    </p>
  )
}

function Figure({ media, locale, className, sizes }: { media: MediaT; locale: Locale; className?: string; sizes?: string }) {
  return (
    <figure className={className} data-reveal data-reveal-y="60">
      <div className="relative overflow-hidden bg-paper-2" style={{ aspectRatio: mediaRatio(media) }}>
        <Media media={media} locale={locale} sizes={sizes} />
      </div>
      {media.caption && <figcaption className="label muted mt-3 max-w-[48ch] normal-case">{t(media.caption, locale)}</figcaption>}
    </figure>
  )
}

export function CasePage({ c, locale }: { c: CaseStudy; locale: Locale }) {
  const dict = getDictionary(locale)
  const cs = dict.caseStudy
  const index = cases.findIndex((x) => x.slug === c.slug)
  const next = getNextCase(c.slug)
  const services = c.services.map((s) => dict.services_short[s]).join(' · ')

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(caseJsonLd(c, locale)) }} />

      {/* ───────────── HERO ───────────── */}
      <header data-theme="paper" className="theme-paper relative pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3rem))] pb-[clamp(3rem,7vw,6rem)]">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SmartLink href={paths.section('work', locale)} className="label group inline-flex min-h-11 items-center gap-2">
              <ArrowLeft size={12} className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
              {cs.back}
            </SmartLink>
            <p className="label muted">
              {String(index + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')} — {c.year}
            </p>
          </div>

          <h1 className="t-display mt-8 text-[clamp(3.6rem,14vw,17rem)] leading-[0.8] uppercase" style={{ fontStretch: '75%', fontWeight: 800 }}>
            <span className="line-mask">
              <span className="rise" style={{ ['--d' as string]: '0s' }}>
                {c.client}
              </span>
            </span>
          </h1>

          <div className="grid-12 mt-10 gap-y-10 lg:mt-14">
            <div className="col-span-4 lg:col-span-5">
              <p className="t-h3 rise-soft text-[clamp(1.7rem,1rem+2.4vw,3.4rem)]" style={{ ['--d' as string]: '0.15s' }}>
                {t(c.excerpt, locale)}
              </p>
              <p className="rise-soft mt-8 inline-flex items-baseline gap-3" style={{ ['--d' as string]: '0.25s' }}>
                <span className="t-display bg-acid px-2 text-[clamp(3rem,6vw,5.5rem)] leading-none">{c.highlight.value}</span>
                <span className="label">{t(c.highlight.label, locale)}</span>
              </p>

              <dl className="rise-soft mt-12 grid grid-cols-2 border-t border-[var(--rule)]" style={{ ['--d' as string]: '0.35s' }}>
                {[
                  [cs.facts.client, c.client],
                  [cs.facts.sector, t(c.sector, locale)],
                  [cs.facts.services, services],
                  [cs.facts.channels, c.channels.join(', ')],
                  [cs.facts.duration, t(c.duration, locale)],
                  [cs.facts.year, c.year],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-[var(--rule)] py-3 pr-4">
                    <dt className="label muted">{k}</dt>
                    <dd className="mt-1 leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="col-span-4 lg:col-span-6 lg:col-start-7">
              <div className="crop relative overflow-hidden bg-paper-2" style={{ aspectRatio: mediaRatio(c.cover) }}>
                <div className="fade-in absolute inset-0" style={{ ['--d' as string]: '0.1s' }}>
                  <Media media={c.cover} locale={locale} priority sizes="(min-width: 1024px) 48vw, 92vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ───────────── 01 LA SFIDA ───────────── */}
      <section data-theme="paper" className="theme-paper section border-t border-[var(--rule)]" aria-labelledby="c-challenge">
        <div className="wrap grid-12 gap-y-8">
          <div className="col-span-4 lg:col-span-3">
            <Chapter n={1} label={cs.chapters.challenge} />
          </div>
          <div className="col-span-4 lg:col-span-8 lg:col-start-5">
            <h2 id="c-challenge" className="t-h2 text-[clamp(2.6rem,6vw,6.5rem)] normal-case" data-split>
              {t(c.challenge.title, locale)}
            </h2>
            <p className="t-lead mt-10 max-w-[52ch] text-ink-2" data-reveal>
              {t(c.challenge.body, locale)}
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── 02 LA STRATEGIA ───────────── */}
      <section data-theme="ink" className="theme-ink section" aria-labelledby="c-strategy">
        <div className="wrap grid-12 gap-y-8">
          <div className="col-span-4 lg:col-span-3">
            <Chapter n={2} label={cs.chapters.strategy} />
          </div>
          <div className="col-span-4 lg:col-span-8 lg:col-start-5">
            <h2 id="c-strategy" className="t-h2 text-[clamp(2.6rem,6vw,6.5rem)] normal-case" data-split>
              {t(c.strategy.title, locale)}
            </h2>
            <p className="t-lead mt-10 max-w-[52ch] text-paper/80" data-reveal>
              {t(c.strategy.body, locale)}
            </p>
            <p className="label muted mt-16 mb-4">{cs.moves}</p>
            <ol className="border-t border-[var(--rule)]" data-reveal-group>
              {c.strategy.moves.map((m, i) => (
                <li key={i} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-b border-[var(--rule)] py-6 sm:grid-cols-[6rem_1fr]" data-reveal-item>
                  <span className="t-display text-[clamp(2rem,4vw,3.5rem)] leading-none text-acid">0{i + 1}</span>
                  <span className="text-[clamp(1.15rem,1rem+0.6vw,1.6rem)] leading-snug">{t(m, locale)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────── 03 LA CREATIVITÀ ───────────── */}
      <section data-theme="paper" className="theme-paper section" aria-labelledby="c-creative">
        <div className="wrap">
          <div className="grid-12 gap-y-8">
            <div className="col-span-4 lg:col-span-3">
              <Chapter n={3} label={cs.chapters.creative} />
            </div>
            <div className="col-span-4 lg:col-span-8 lg:col-start-5">
              <h2 id="c-creative" className="t-h2 text-[clamp(2.6rem,6vw,6.5rem)] normal-case" data-split>
                {t(c.creative.title, locale)}
              </h2>
              <p className="t-lead mt-10 max-w-[52ch] text-ink-2" data-reveal>
                {t(c.creative.body, locale)}
              </p>
            </div>
          </div>

          <div className="grid-12 mt-[clamp(3rem,8vw,8rem)] gap-y-14">
            {c.creative.media.map((m, i) => (
              <Figure
                key={i}
                media={m}
                locale={locale}
                sizes="(min-width: 1024px) 50vw, 92vw"
                className={cn(
                  'col-span-4',
                  i === 0 && 'lg:col-span-7',
                  i === 1 && 'lg:col-span-4 lg:col-start-9 lg:mt-32',
                  i === 2 && 'sm:col-span-3 sm:col-start-2 lg:col-span-4 lg:col-start-3 lg:-mt-16',
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 04 I RISULTATI ───────────── */}
      <section data-theme="acid" className="theme-acid section" aria-labelledby="c-results">
        <div className="wrap">
          <div className="grid-12 gap-y-8">
            <div className="col-span-4 lg:col-span-3">
              <Chapter n={4} label={cs.chapters.results} />
            </div>
            <div className="col-span-4 lg:col-span-8 lg:col-start-5">
              <h2 id="c-results" className="t-h2 text-[clamp(2.6rem,6vw,6.5rem)] normal-case" data-split>
                {t(c.results.title, locale)}
              </h2>
              <p className="t-lead mt-10 max-w-[52ch]" data-reveal>
                {t(c.results.body, locale)}
              </p>
            </div>
          </div>

          <dl className="mt-[clamp(3rem,7vw,7rem)] grid grid-cols-2 border-t border-[var(--rule)] lg:grid-cols-4">
            {c.results.metrics.map((m, i) => (
              <div key={i} className="flex flex-col-reverse border-b border-[var(--rule)] py-8 pr-4 lg:border-r lg:border-b-0 lg:pl-5 lg:first:pl-0 lg:last:border-r-0" data-reveal>
                <dt className="mt-3 leading-snug">
                  {t(m.label, locale)}
                  {m.note && <span className="label muted mt-1 block normal-case">{t(m.note, locale)}</span>}
                </dt>
                <dd className="t-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.85]">
                  <Counter metric={m} locale={locale} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="grid-12 mt-[clamp(3rem,7vw,7rem)] items-center gap-y-16">
            <div className="col-span-4 lg:col-span-7">
              {c.results.chart ? (
                <ResultsChart
                  label={t(c.results.chart.label, locale)}
                  series={c.results.chart.series}
                  labels={c.results.chart.labels}
                  unit={c.results.chart.unit}
                  locale={locale}
                />
              ) : (
                <p className="t-h3 max-w-[16ch]">
                  <Rich text={`==${t(c.results.total, locale)}.==`} />
                </p>
              )}
            </div>
            <div className="col-span-4 lg:col-span-4 lg:col-start-9">
              <Receipt
                client={c.client}
                year={c.year}
                labels={cs.receipt}
                total={t(c.results.total, locale)}
                lines={c.results.receipt.map((r) => ({ item: t(r.item, locale), qty: r.qty }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── GALLERY ───────────── */}
      <section data-theme="paper" className="theme-paper section" aria-labelledby="c-gallery">
        <div className="wrap">
          <h2 id="c-gallery" className="label">
            ({cs.chapters.gallery})
          </h2>
          <div className="grid-12 mt-10 gap-y-14">
            {c.gallery.map((m, i) => (
              <Figure
                key={i}
                media={m}
                locale={locale}
                sizes="(min-width: 1024px) 45vw, 92vw"
                className={cn('col-span-4', i === 0 && 'lg:col-span-6', i === 1 && 'lg:col-span-5 lg:col-start-8 lg:mt-24', i === 2 && 'lg:col-span-8 lg:col-start-3')}
              />
            ))}
          </div>

          {c.testimonial && (
            <figure className="mx-auto mt-[clamp(5rem,10vw,10rem)] max-w-5xl text-center" data-reveal>
              <span aria-hidden="true" className="ital block text-[8rem] leading-[0.6]">
                “
              </span>
              <blockquote className="t-h3 mt-6 text-[clamp(1.8rem,1rem+2.6vw,3.6rem)] normal-case">{t(c.testimonial.quote, locale)}</blockquote>
              <figcaption className="label mt-8">
                {c.testimonial.author} — <span className="muted">{t(c.testimonial.role, locale)}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* ───────────── PROSSIMO LAVORO ───────────── */}
      <section data-theme="ink" className="theme-ink" aria-label={cs.next}>
        <SmartLink href={paths.case(next.slug, locale)} transitionLabel={next.client} data-cursor={dict.work.cursor} className="group block">
          <div className="wrap grid-12 items-center gap-y-8 py-[clamp(4rem,9vw,9rem)]">
            <div className="col-span-4 lg:col-span-8">
              <p className="label muted">{cs.next} →</p>
              <p className="t-display mt-6 text-[clamp(3.2rem,11vw,13rem)] leading-[0.82] uppercase transition-colors duration-700 group-hover:text-acid" style={{ fontStretch: '75%' }}>
                {next.client}
              </p>
              <p className="mt-6 flex items-center gap-3 text-paper/70">
                {t(next.excerpt, locale)}
                <ArrowUpRight size={18} className="shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
              </p>
            </div>
            <div className="col-span-3 sm:col-span-2 lg:col-span-3 lg:col-start-10">
              <div className="relative overflow-hidden transition-transform duration-700 ease-out-expo group-hover:-rotate-3 group-hover:scale-105" style={{ aspectRatio: mediaRatio(next.cover) }}>
                <Media media={next.cover} locale={locale} sizes="25vw" />
              </div>
            </div>
          </div>
        </SmartLink>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section data-theme="paper" className="theme-paper section text-center">
        <div className="wrap">
          <p className="label muted">{cs.ctaKicker}</p>
          <p className="t-h2 mt-6" data-split>
            <Rich text={cs.ctaTitle} />
          </p>
          <div className="mt-12 flex justify-center">
            <Button href={paths.section('contact', locale)} size="lg">
              {cs.ctaButton}
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
