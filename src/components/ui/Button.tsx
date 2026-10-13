import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SmartLink } from './SmartLink'
import { ArrowDown, ArrowRight, ArrowUpRight, Chat } from './Icons'

type Common = {
  children: string
  variant?: 'primary' | 'dark' | 'light' | 'ghost'
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

/** Bottone a pillola: testo che "rotola" all'hover, icona in un cerchio, opzionalmente magnetico. */
export function Button(props: AsLink | AsButton) {
  const { children, variant = 'primary', size = 'md', icon = 'arrow', magnetic = true, className } = props
  const cls = cn('btn', `btn--${variant}`, size !== 'md' && `btn--${size}`, icon === 'none' && 'pr-6', className)

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
    <span data-magnetic="0.25" className="inline-block">
      {el}
    </span>
  ) : (
    el
  )
}
