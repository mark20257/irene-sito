'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SmartLink } from '@/components/ui/SmartLink'
import { ArrowUpRight, Chat } from '@/components/ui/Icons'

/**
 * Barra CTA fissa solo su mobile (il pubblico arriva da Instagram, col pollice).
 * Compare dopo l'hero, sparisce dove c'è già un'azione (feed, contatti, footer).
 */
export function StickyCta({ href, label, whatsapp, whatsappLabel }: { href: string; label: string; whatsapp: string; whatsappLabel: string }) {
  const pathname = usePathname()
  const [pastHero, setPastHero] = useState(false)
  const [nearEnd, setNearEnd] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const targets = document.querySelectorAll('[data-hide-sticky]')
    const visible = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
      setNearEnd(visible.size > 0)
    })
    targets.forEach((t) => io.observe(t))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [pathname])

  const show = pastHero && !nearEnd

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-[45] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-transform duration-700 ease-out-expo md:hidden',
        show ? 'translate-y-0' : 'pointer-events-none translate-y-[130%]',
      )}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex gap-2 rounded-full bg-deep p-1.5 text-white shadow-[0_16px_40px_-12px_rgb(21_10_46/0.6)]">
        <SmartLink href={href} className="flex min-h-12 flex-1 items-center justify-between rounded-full bg-violet pr-2 pl-5 font-semibold">
          {label}
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
            <ArrowUpRight size={14} />
          </span>
        </SmartLink>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={whatsappLabel} className="grid min-h-12 w-12 place-items-center rounded-full bg-white/10">
          <Chat size={18} />
        </a>
      </div>
    </div>
  )
}
