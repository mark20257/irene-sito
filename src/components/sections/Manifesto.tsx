import { getDictionary, type Locale } from '@/content'
import { Note } from '@/components/ui/Note'
import { Rich } from '@/components/ui/Rich'

/** Manifesto: il testo si "accende" parola per parola mentre scorri. */
export function Manifesto({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const m = dict.manifesto
  return (
    <section id={dict.sections.manifesto.id} data-theme="paper" aria-labelledby="manifesto-title" className="theme-paper section">
      <div className="wrap grid-12 gap-y-10">
        <div className="label col-span-4 flex items-center gap-3 lg:col-span-2 lg:flex-col lg:items-start" data-reveal data-reveal-y="12">
          <span>(02)</span>
          <span id="manifesto-title">{dict.sections.manifesto.label}</span>
        </div>

        <div className="col-span-4 lg:col-span-10">
          <p className="t-big max-w-[24ch]" data-scrub-words>
            <Rich text={m.text} words />
          </p>
          <p className="mt-10 flex items-center gap-4" data-reveal>
            <span className="h-px w-16 bg-current" aria-hidden="true" />
            <span className="ital text-4xl">{m.signature}</span>
          </p>
          <Note n="05">{dict.strategy.notes.manifesto}</Note>
        </div>
      </div>
    </section>
  )
}
