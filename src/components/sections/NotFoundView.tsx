import { getDictionary, paths, type Locale } from '@/content'
import { Button } from '@/components/ui/Button'

export function NotFoundView({ locale }: { locale: Locale }) {
  const nf = getDictionary(locale).notFound
  return (
    <section data-theme="light" className="theme-light relative flex min-h-svh flex-col justify-center overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden="true" className="glow top-10 right-0 h-[30rem] w-[30rem] opacity-60" />
      <div className="wrap relative">
        <p className="eyebrow">Error 404</p>
        <p className="t-name mt-6 text-[clamp(7rem,28vw,22rem)]" aria-hidden="true">
          4<span className="grad">0</span>4
        </p>
        <h1 className="t-h3 mt-6 max-w-[20ch]">{nf.title}</h1>
        <p className="t-lead mt-4 max-w-[46ch] text-ink-2">{nf.body}</p>
        <div className="mt-10">
          <Button href={paths.home(locale)}>{nf.cta}</Button>
        </div>
      </div>
    </section>
  )
}
