import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../globals.css'
import { fontVariables } from '../fonts'
import { SiteShell } from '@/components/layout/SiteShell'
import { bootScript, rootMetadata } from '@/lib/seo'

export const metadata: Metadata = rootMetadata('it')
export { viewport } from '@/lib/seo'

export default function ItalianLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteShell locale="it">{children}</SiteShell>
      </body>
    </html>
  )
}
