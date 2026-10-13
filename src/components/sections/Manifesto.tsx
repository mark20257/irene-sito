import { getDictionary, type Locale } from '@/content'
import { Rich } from '@/components/ui/Rich'

/** Manifesto: il testo si "accende" parola per parola mentre scorri. */
export function Manifesto({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const m = dict.manifesto
  return (
    <section id={dict.sections.manifesto.id} data-theme="light" aria-labelledby="manifesto-title" className="theme-light section">
      <div className="wrap">
        <div className="mx-auto max-w-5xl">
          <p id="manifesto-title" className="eyebrow" data-reveal data-reveal-y="12">
            {dict.sections.manifesto.label}
          </p>
          <p className="t-big mt-8" data-scrub-words>
            <Rich text={m.text} words />
          </p>
          <p className="mt-10 flex items-center gap-3" data-reveal>
            <span aria-hidden="true" className="h-9 w-9 rounded-full bg-[radial-gradient(circle_at_34%_30%,#e4dbff_0%,#8b5cf6_40%,#4c1fd1_100%)]" />
            <span className="text-lg font-semibold">{m.signature}</span>
            <span className="text-muted">— Social, Ads & Design</span>
          </p>
        </div>
      </div>
    </section>
  )
}
