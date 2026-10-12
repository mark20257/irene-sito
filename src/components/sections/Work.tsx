import { getDictionary, paths, t, type Locale } from '@/content'
import { cases } from '@/content/data/cases'
import { Media, mediaRatio } from '@/components/ui/Media'
import { Note } from '@/components/ui/Note'
import { SectionHead } from '@/components/ui/SectionHead'
import { SmartLink } from '@/components/ui/SmartLink'
import { ArrowUpRight } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'
import { WorkClient } from './WorkClient'

/* Impaginazione asimmetrica della griglia (12 colonne su desktop, 4 su mobile) */
const layout = [
  'col-span-4 lg:col-span-6',
  'col-span-3 col-start-2 lg:col-span-5 lg:col-start-8 lg:mt-[22vh]',
  'col-span-3 lg:col-span-4 lg:col-start-2 lg:-mt-[6vh]',
  'col-span-4 lg:col-span-6 lg:col-start-7 lg:mt-[10vh]',
  'col-span-3 col-start-2 lg:col-span-5 lg:col-start-1',
  'col-span-3 lg:col-span-4 lg:col-start-8 lg:mt-[16vh]',
]

export function Work({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const w = dict.work

  const grid = (
    <ul className="grid-12 gap-y-16 lg:gap-y-24">
      {cases.map((c, i) => (
        <li key={c.slug} className={cn(layout[i % layout.length])}>
          <SmartLink href={paths.case(c.slug, locale)} transitionLabel={c.client} data-cursor={w.cursor} className="group block" aria-label={`${c.client} — ${w.open}`}>
            <div className="relative overflow-hidden bg-paper-2" style={{ aspectRatio: mediaRatio(c.cover) }} data-reveal data-reveal-y="80">
              <div className="absolute inset-0 scale-[1.12]" data-parallax="4">
                <div className="h-full w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]">
                  <Media media={c.cover} locale={locale} sizes="(min-width: 1024px) 45vw, 90vw" />
                </div>
              </div>
              <span className="chip chip--acid absolute top-3 left-3 shadow-[0_0_0_1px_var(--color-ink)]">
                {c.highlight.value} · {t(c.highlight.label, locale)}
              </span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="label muted">
                  {String(i + 1).padStart(2, '0')} — {t(c.sector, locale)}
                </p>
                <h3 className="t-h4 mt-2 flex items-center gap-2 uppercase">
                  {c.client}
                  <ArrowUpRight size={18} className="-translate-x-2 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-2 max-w-[42ch] text-[var(--muted)]">{t(c.excerpt, locale)}</p>
              </div>
              <ul className="hidden shrink-0 flex-wrap justify-end gap-1 sm:flex" aria-label={w.columns.services}>
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
    <div>
      <div className="label muted hidden grid-cols-12 gap-4 border-b border-[var(--rule)] pb-3 lg:grid">
        <span className="col-span-1">N°</span>
        <span className="col-span-5">{w.columns.client}</span>
        <span className="col-span-3">{w.columns.sector}</span>
        <span className="col-span-2">{w.columns.services}</span>
        <span className="col-span-1 text-right">{w.columns.result}</span>
      </div>
      <ul data-work-index>
        {cases.map((c, i) => (
          <li key={c.slug} data-index={i} className="border-b border-[var(--rule)]">
            <SmartLink
              href={paths.case(c.slug, locale)}
              transitionLabel={c.client}
              data-cursor={w.cursor}
              className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-4 lg:grid-cols-12 lg:py-6"
            >
              <span className="relative aspect-[4/5] w-[4.5rem] overflow-hidden lg:hidden">
                <Media media={c.cover} locale={locale} sizes="80px" />
              </span>
              <span className="label muted hidden lg:col-span-1 lg:block">{String(i + 1).padStart(2, '0')}</span>
              <span className="lg:col-span-5">
                <span className="t-h3 block text-[clamp(1.6rem,1rem+3vw,4.25rem)] uppercase transition-transform duration-700 ease-out-expo group-hover:translate-x-4">
                  {c.client}
                </span>
                <span className="label muted mt-1 block lg:hidden">{t(c.sector, locale)}</span>
              </span>
              <span className="label hidden lg:col-span-3 lg:block">{t(c.sector, locale)}</span>
              <span className="label hidden lg:col-span-2 lg:block">{c.services.map((s) => dict.services_short[s]).join(' · ')}</span>
              <span className="t-display text-right text-[clamp(1.4rem,1rem+1.4vw,2.6rem)] leading-none lg:col-span-1">
                <span className="transition-colors duration-500 group-hover:bg-acid">{c.highlight.value}</span>
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )

  const previews = cases.map((c) => <Media key={c.slug} media={c.cover} locale={locale} sizes="360px" />)

  return (
    <section id={dict.sections.work.id} data-theme="paper" aria-labelledby="work-title" className="theme-paper section">
      <div className="wrap">
        <SectionHead index={4} id="work-title" label={dict.sections.work.label} title={w.title} intro={w.intro} />
        <Note n="07">{dict.strategy.notes.work}</Note>
        <WorkClient grid={grid} index={index} previews={previews} labels={w.views} />
      </div>
    </section>
  )
}
