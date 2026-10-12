import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SmartLink } from './SmartLink'
import { ArrowDown, ArrowRight, ArrowUpRight, Chat } from './Icons'

type Common = {
  children: string
  variant?: 'ink' | 'acid' | 'paper' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: 'arrow' | 'up' | 'down' | 'chat' | 'none'
  magnetic?: boolean
  className?: string
  'aria-label'?: string
}

type AsLink = Common & { href: string; transitionLabel?: string; type?: never; disabled?: never }
type AsButton = Common & { href?: undefined; type?: 'button' | 'submit'; disabled?: boolean; transitionLabel?: never }

const icons: Record<NonNullable<Common['icon']>, ReactNode> = {
  arrow: <ArrowRight size={14} />,
  up: <ArrowUpRight size={14} />,
  down: <ArrowDown size={14} />,
  chat: <Chat size={14} />,
  none: null,
}

/** Bottone/pillola con testo che rotola e riempimento acido. Opzionalmente magnetico. */
export function Button(props: AsLink | AsButton) {
  const { children, variant = 'ink', size = 'md', icon = 'arrow', magnetic = true, className } = props
  const cls = cn('btn', variant !== 'ink' && `btn--${variant}`, size !== 'md' && `btn--${size}`, className)

  const inner = (
    <>
      <span className="btn__roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon !== 'none' && <span className="btn__icon">{icons[icon]}</span>}
    </>
  )

  const el =
    props.href !== undefined ? (
      <SmartLink href={props.href} className={cls} transitionLabel={props.transitionLabel} aria-label={props['aria-label']}>
        {inner}
      </SmartLink>
    ) : (
      <button type={props.type ?? 'button'} className={cls} disabled={props.disabled} aria-label={props['aria-label']}>
        {inner}
      </button>
    )

  return magnetic ? (
    <span data-magnetic="0.3" className="inline-block">
      {el}
    </span>
  ) : (
    el
  )
}
