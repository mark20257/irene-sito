import { getDictionary, paths, type Locale } from '@/content'
import { Button } from '@/components/ui/Button'

export function NotFoundView({ locale }: { locale: Locale }) {
  const nf = getDictionary(locale).notFound
  return (
    <section data-theme="paper" className="theme-paper flex min-h-svh flex-col justify-center pt-[var(--header-h)]">
      <div className="wrap">
        <p className="label muted">Error 404 — TAV. ∅</p>
        <p className="t-display mt-6 text-[clamp(8rem,34vw,30rem)] leading-[0.78] uppercase" aria-hidden="true" style={{ fontStretch: '75%' }}>
          4<span className="text-transparent [-webkit-text-stroke:2px_var(--color-ink)]">0</span>4
        </p>
        <h1 className="t-h3 mt-8 max-w-[18ch]">{nf.title}</h1>
        <p className="t-lead mt-4 max-w-[44ch] text-ink-2">{nf.body}</p>
        <div className="mt-10">
          <Button href={paths.home(locale)}>{nf.cta}</Button>
        </div>
      </div>
    </section>
  )
}
