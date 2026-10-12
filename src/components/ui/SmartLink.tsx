'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { useMotion } from '@/components/motion/MotionProvider'
import { usePageTransition } from '@/components/motion/PageTransition'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  children: ReactNode
  /** Testo stampato sul "foglio" durante la transizione di pagina */
  transitionLabel?: string
}

const normalize = (p: string) => (p.replace(/\/$/, '') || '/').toLowerCase()

/**
 * Link intelligente:
 * - ancora nella stessa pagina → scroll morbido (Lenis) + focus sulla sezione
 * - altra pagina interna → transizione a sipario
 * - esterno → nuova scheda, rel sicuro
 */
export function SmartLink({ href, children, transitionLabel, onClick, ...rest }: Props) {
  const pathname = usePathname()
  const { scrollTo } = useMotion()
  const { navigate } = usePageTransition()

  const external = /^(https?:|mailto:|tel:)/.test(href)
  if (external) {
    const web = href.startsWith('http')
    return (
      <a href={href} target={web ? '_blank' : undefined} rel={web ? 'noopener noreferrer' : undefined} onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }

  const [path, hash] = href.split('#')

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const samePage = normalize(path || pathname) === normalize(pathname)

    if (samePage) {
      e.preventDefault()
      if (hash) {
        const target = document.getElementById(hash)
        if (!target) return
        scrollTo(target)
        window.history.pushState(null, '', `#${hash}`)
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      } else {
        scrollTo(0)
      }
      return
    }

    e.preventDefault()
    navigate(href, transitionLabel)
  }

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  )
}
