import { cn } from '@/lib/utils'

/**
 * Nota a margine della "modalità strategia".
 * Invisibile di default, compare quando l'interruttore è attivo (o premendo G).
 */
export function Note({ children, n, className }: { children: string; n: string; className?: string }) {
  return (
    <span className={cn('note', className ?? 'relative mt-4')} role="note">
      <span className="note__k">↳ S.{n}</span>
      {children}
    </span>
  )
}
