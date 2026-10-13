'use client'

import { usePathname } from 'next/navigation'
import { translatePath, type Locale } from '@/content'
import { cn } from '@/lib/utils'

/** IT / EN — porta alla stessa pagina nell'altra lingua (nuovo layout radice: caricamento completo). */
export function LangSwitch({ locale, label, switchTo, className }: { locale: Locale; label: string; switchTo: string; className?: string }) {
  const pathname = usePathname()
  const other: Locale = locale === 'it' ? 'en' : 'it'
  return (
    <div role="group" aria-label={label} className={cn('label flex items-center gap-1', className)}>
      <span aria-current="true" className="px-1 py-2">
        {locale.toUpperCase()}
      </span>
      <span aria-hidden="true" className="opacity-40">
        /
      </span>
      <a href={translatePath(pathname, other)} hrefLang={other} lang={other} className="px-1 py-2 opacity-55 transition-opacity hover:opacity-100">
        {other.toUpperCase()}
        {/* nome accessibile = testo visibile + spiegazione ("EN — Read in English") */}
        <span className="sr-only"> — {switchTo}</span>
      </a>
    </div>
  )
}
