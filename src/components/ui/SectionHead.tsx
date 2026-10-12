import { cn } from '@/lib/utils'
import { Rich } from './Rich'

/**
 * Testata di sezione stile "foglio di stampa":
 * (03) ─────────── SERVIZI ── TAV. 03/10
 * TITOLO GIGANTE
 *                                   intro a destra
 */
export function SectionHead({
  index,
  label,
  title,
  intro,
  id,
  className,
  titleClassName,
}: {
  index: number
  label: string
  title: string
  intro?: string
  id: string
  className?: string
  titleClassName?: string
}) {
  const n = String(index).padStart(2, '0')
  return (
    <header className={cn('grid-12 gap-y-8', className)}>
      <div className="label col-span-4 flex items-center gap-3 lg:col-span-12" data-reveal data-reveal-y="12">
        <span>({n})</span>
        <span className="h-px flex-1 bg-[var(--rule)]" aria-hidden="true" />
        <span>{label}</span>
        <span className="muted hidden sm:inline">TAV. {n}/10</span>
      </div>
      <h2 id={id} className={cn('t-h2 col-span-4 lg:col-span-10', titleClassName)} data-split>
        <Rich text={title} />
      </h2>
      {intro && (
        <p className="t-lead col-span-4 max-w-[34ch] text-[var(--muted)] lg:col-span-4 lg:col-start-9" data-reveal>
          {intro}
        </p>
      )}
    </header>
  )
}
