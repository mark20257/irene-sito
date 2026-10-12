import { getDictionary, t, type Locale } from '@/content'
import { metrics } from '@/content/data/proof'
import type { Metric } from '@/content/types'
import { Note } from '@/components/ui/Note'
import { SectionHead } from '@/components/ui/SectionHead'
import { formatNumber, cn } from '@/lib/utils'

/** Numero animato: il valore finale è già nel markup (SEO, screen reader, no-JS). */
export function Counter({ metric, locale, className }: { metric: Metric; locale: Locale; className?: string }) {
  const value = formatNumber(metric.value, locale, metric.decimals ?? 0)
  return (
    <span className={className}>
      <span aria-hidden="true">
        {metric.prefix}
        <span data-counter={metric.value} data-decimals={metric.decimals ?? 0} data-locale={locale}>
          {value}
        </span>
        {metric.suffix}
      </span>
      <span className="sr-only">
        {metric.prefix}
        {value}
        {metric.suffix}
      </span>
    </span>
  )
}

const spans = [
  'col-span-4 lg:col-span-7',
  'col-span-4 lg:col-span-5',
  'col-span-4 sm:col-span-2 lg:col-span-4',
  'col-span-4 sm:col-span-2 lg:col-span-4',
  'col-span-4 lg:col-span-4',
]

export function Numbers({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const nb = dict.numbers
  return (
    <section id={dict.sections.numbers.id} data-theme="acid" aria-labelledby="numbers-title" className="theme-acid section relative overflow-hidden">
      {/* il dato che diventa grafica: barre che crescono con lo scroll */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[70%] items-end gap-[1.2vw] px-[var(--gutter)] opacity-[0.07]">
        {[18, 26, 22, 34, 31, 45, 41, 52, 49, 63, 58, 72, 69, 84, 100].map((v, i) => (
          <span key={i} className="flex-1 origin-bottom bg-ink" style={{ height: `${v}%` }} data-grow />
        ))}
      </div>

      <div className="wrap relative">
        <SectionHead index={6} id="numbers-title" label={dict.sections.numbers.label} title={nb.title} />
        <Note n="09">{dict.strategy.notes.numbers}</Note>

        <dl className="grid-12 mt-[clamp(3rem,7vw,7rem)] gap-y-14 border-t border-[var(--rule)] pt-10">
          {metrics.map((m, i) => (
            <div key={i} className={cn(spans[i % spans.length], 'flex flex-col-reverse')} data-reveal>
              <dt className="mt-4 max-w-[28ch]">
                <span className="t-h4 block">{t(m.label, locale)}</span>
                {m.note && (
                  <span className="label muted mt-2 block">
                    <sup>{i + 1}</sup> {t(m.note, locale)}
                  </span>
                )}
              </dt>
              <dd className="t-display leading-[0.8] tracking-[-0.02em]" style={{ fontSize: i < 2 ? 'clamp(5.5rem, 15vw, 17rem)' : 'clamp(4.5rem, 10vw, 11rem)' }}>
                <Counter metric={m} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>

        <p className="label mt-16 max-w-[80ch] normal-case" data-reveal>
          * {nb.footnote}
        </p>
      </div>
    </section>
  )
}
