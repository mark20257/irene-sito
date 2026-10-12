import { getDictionary, type Locale } from '@/content'
import { Note } from '@/components/ui/Note'
import { SectionHead } from '@/components/ui/SectionHead'
import { ServicesAccordion } from './ServicesAccordion'

export function Services({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const s = dict.services
  return (
    <section id={dict.sections.services.id} data-theme="paper" aria-labelledby="services-title" className="theme-paper section">
      <div className="wrap">
        <SectionHead index={3} id="services-title" label={dict.sections.services.label} title={s.title} intro={s.intro} />
        <Note n="06">{dict.strategy.notes.services}</Note>
        <ServicesAccordion items={s.items} labels={s.labels} />
      </div>
    </section>
  )
}
