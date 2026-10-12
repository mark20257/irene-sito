'use client'

import { useMotion } from '@/components/motion/MotionProvider'
import { ArrowUpRight } from '@/components/ui/Icons'

export function BackToTop({ label }: { label: string }) {
  const { scrollTo } = useMotion()
  return (
    <button
      type="button"
      onClick={() => {
        scrollTo(0)
        document.getElementById('main')?.focus({ preventScroll: true })
      }}
      className="label group inline-flex min-h-11 items-center gap-2"
    >
      {label}
      <ArrowUpRight size={12} className="-rotate-45 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
    </button>
  )
}
