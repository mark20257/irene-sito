import { getDictionary, paths, t, type Locale } from '@/content'
import { cases } from '@/content/data/cases'
import { Media } from '@/components/ui/Media'
import { SectionHead } from '@/components/ui/SectionHead'
import { SmartLink } from '@/components/ui/SmartLink'
import { ArrowUpRight } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'
import { WorkClient } from './WorkClient'

export function Work({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const w = dict.work

  /* Griglia a due colonne sfalsate: le card a destra scendono un po' (ritmo editoriale) */
  const grid = (
    <ul className="mx-auto grid max-w-[76rem] gap-x-[clamp(1.25rem,3vw,3rem)] gap-y-12 md:grid-cols-2 md:gap-y-16">
      {cases.map((c, i) => (
        <li key={c.slug} className={cn(i % 2 === 1 && 'md:translate-y-28')}>
          <SmartLink
            href={paths.case(c.slug, locale)}
            transitionLabel={c.client}
            data-cursor={w.cursor}
            className="group block"
          >
            <div data-tilt className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft transition-shadow duration-500 group-hover:shadow-lift" data-reveal data-reveal-y="60">
              <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]">
                <Media media={c.cover} locale={locale} sizes="(min-width: 768px) 46vw, 92vw" />
              </div>
              <span className="absolute top-4 left-4 inline-flex items-baseline gap-2 rounded-full bg-white/95 px-3.5 py-2 text-ink shadow-soft">
                <span className="t-num text-lg text-violet">{c.highlight.value}</span>
                <span className="text-[0.8rem] font-medium">{t(c.highlight.label, locale)}</span>
              </span>
              <span className="absolute right-4 bottom-4 grid h-12 w-12 translate-y-2 place-items-center rounded-full bg-violet text-white opacity-0 shadow-glow transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4 px-1">
              <div>
                <h3 className="t-h4 transition-colors duration-300 group-hover:text-violet">{c.client}</h3>
                <p className="mt-1 text-[0.95rem] text-muted">{t(c.sector, locale)}</p>
              </div>
              <ul className="flex shrink-0 flex-wrap justify-end gap-1.5" aria-label={w.columns.services}>
                {c.services.map((s) => (
                  <li key={s} className="chip">
                    {dict.services_short[s]}
                  </li>
                ))}
              </ul>
            </div>
          </SmartLink>
        </li>
      ))}
    </ul>
  )

  const index = (
    <div className="card overflow-hidden px-4 sm:px-8">
      <div className="hidden grid-cols-12 gap-4 border-b border-line py-4 text-sm font-medium text-muted lg:grid">
        <span className="col-span-1">N°</span>
        <span className="col-span-4">{w.columns.client}</span>
        <span className="col-span-3">{w.columns.sector}</span>
        <span className="col-span-2">{w.columns.services}</span>
        <span className="col-span-2 text-right">{w.columns.result}</span>
      </div>
      <ul data-work-index>
        {cases.map((c, i) => (
          <li key={c.slug} data-index={i} className="border-b border-line last:border-b-0">
            <SmartLink
              href={paths.case(c.slug, locale)}
              transitionLabel={c.client}
              data-cursor={w.cursor}
              className="group grid grid-cols-[4rem_1fr_auto] items-center gap-4 py-4 lg:grid-cols-12 lg:py-6"
            >
              <span className="relative aspect-square w-16 overflow-hidden rounded-xl lg:hidden">
                <Media media={c.cover} locale={locale} sizes="64px" />
              </span>
              <span className="hidden text-sm text-muted lg:col-span-1 lg:block">{String(i + 1).padStart(2, '0')}</span>
              <span className="lg:col-span-4">
                <span className="block text-[clamp(1.3rem,1rem+1.6vw,2.4rem)] leading-tight font-semibold tracking-[-0.04em] transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-violet">
                  {c.client}
                </span>
                <span className="mt-0.5 block text-sm text-muted lg:hidden">{t(c.sector, locale)}</span>
              </span>
              <span className="hidden text-[0.95rem] text-ink-2 lg:col-span-3 lg:block">{t(c.sector, locale)}</span>
              <span className="hidden gap-1.5 lg:col-span-2 lg:flex">
                {c.services.map((s) => (
                  <span key={s} className="chip">
                    {dict.services_short[s]}
                  </span>
                ))}
              </span>
              <span className="t-num text-right text-[clamp(1.2rem,1rem+1vw,2rem)] text-violet lg:col-span-2">{c.highlight.value}</span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )

  const previews = cases.map((c) => <Media key={c.slug} media={c.cover} locale={locale} sizes="340px" />)

  return (
    <section id={dict.sections.work.id} data-theme="light" aria-labelledby="work-title" className="theme-light section">
      <div className="wrap">
        <SectionHead id="work-title" label={dict.sections.work.label} title={w.title} intro={w.intro} />
        <WorkClient grid={grid} index={index} previews={previews} labels={w.views} />
      </div>
    </section>
  )
}
