import { cn } from '@/lib/utils'
import { Rich } from './Rich'

/**
 * Testata di sezione: etichetta, titolo grande e (opzionale) introduzione a fianco.
 */
export function SectionHead({
  label,
  title,
  intro,
  id,
  className,
  align = 'split',
}: {
  label: string
  title: string
  intro?: string
  id: string
  className?: string
  align?: 'split' | 'center'
}) {
  if (align === 'center')
    return (
      <header className={cn('mx-auto max-w-4xl text-center', className)}>
        <p className="eyebrow justify-center" data-reveal data-reveal-y="12">
          {label}
        </p>
        <h2 id={id} className="t-h2 mt-5" data-split>
          <Rich text={title} />
        </h2>
        {intro && (
          <p className="t-lead mx-auto mt-6 max-w-[46ch] text-[var(--muted)]" data-reveal>
            {intro}
          </p>
        )}
      </header>
    )
  return (
    <header className={cn('grid-12 items-end gap-y-6', className)}>
      <div className="col-span-4 lg:col-span-7">
        <p className="eyebrow" data-reveal data-reveal-y="12">
          {label}
        </p>
        <h2 id={id} className="t-h2 mt-5" data-split>
          <Rich text={title} />
        </h2>
      </div>
      {intro && (
        <p className="t-lead col-span-4 max-w-[40ch] text-[var(--muted)] lg:col-span-4 lg:col-start-9" data-reveal>
          {intro}
        </p>
      )}
    </header>
  )
}
