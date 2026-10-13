import { getDictionary, type Locale } from '@/content'
import { SectionHead } from '@/components/ui/SectionHead'
import { ServicesAccordion } from './ServicesAccordion'

export function Services({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const s = dict.services
  return (
    <section id={dict.sections.services.id} data-theme="light" aria-labelledby="services-title" className="theme-soft section">
      <div className="wrap">
        <SectionHead id="services-title" label={dict.sections.services.label} title={s.title} intro={s.intro} />
        <ServicesAccordion items={s.items} labels={s.labels} />
      </div>
    </section>
  )
}
