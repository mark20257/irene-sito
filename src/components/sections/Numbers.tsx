import { getDictionary, t, type Locale } from '@/content'
import { metrics } from '@/content/data/proof'
import type { Metric } from '@/content/types'
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

/* Bento: due card grandi, tre più piccole */
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4']

export function Numbers({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const nb = dict.numbers
  return (
    <section id={dict.sections.numbers.id} data-theme="violet" aria-labelledby="numbers-title" className="theme-violet section relative overflow-hidden">
      <div aria-hidden="true" className="glow -top-40 -left-40 h-[36rem] w-[36rem] opacity-50" style={{ background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="glow -right-40 -bottom-60 h-[40rem] w-[40rem] opacity-40" style={{ background: 'radial-gradient(circle, #2a0f8a 0%, transparent 70%)' }} />

      <div className="wrap relative">
        <SectionHead id="numbers-title" label={dict.sections.numbers.label} title={nb.title} />

        <dl className="mt-[clamp(3rem,6vw,5rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-12" data-reveal-group>
          {metrics.map((m, i) => (
            <div
              key={i}
              data-reveal-item
              className={cn(
                'flex flex-col-reverse justify-between gap-8 rounded-[var(--radius-card)] bg-white/10 p-7 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] sm:p-8',
                i < 2 ? 'min-h-64' : 'min-h-52',
                i === 0 && 'sm:col-span-2 lg:col-span-7',
                spans[i],
              )}
            >
              <dt>
                <span className="t-h4 block">{t(m.label, locale)}</span>
                {m.note && <span className="mt-1.5 block text-[0.9rem] text-white">{t(m.note, locale)}</span>}
              </dt>
              <dd className="t-num" style={{ fontSize: i < 2 ? 'clamp(4rem, 9vw, 8.5rem)' : 'clamp(3.2rem, 6vw, 5.5rem)' }}>
                <Counter metric={m} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-[70ch] text-[0.95rem] text-white/90" data-reveal>
          * {nb.footnote}
        </p>
      </div>
    </section>
  )
}
