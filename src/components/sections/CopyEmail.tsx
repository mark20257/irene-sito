'use client'

import { useState } from 'react'
import { Check, Copy } from '@/components/ui/Icons'

/** Email cliccabile + copia negli appunti (con feedback per screen reader). */
export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className="link-u text-lg font-semibold break-all">
        {email}
      </a>
      <button
        type="button"
        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 text-sm font-medium transition-colors hover:bg-white/20"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email)
            setDone(true)
            window.setTimeout(() => setDone(false), 2200)
          } catch {
            window.location.href = `mailto:${email}`
          }
        }}
      >
        {done ? <Check size={12} /> : <Copy size={12} />}
        <span aria-live="polite">{done ? copied : copy}</span>
      </button>
    </div>
  )
}
