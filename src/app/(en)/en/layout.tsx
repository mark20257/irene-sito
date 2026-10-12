import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../../globals.css'
import { fontVariables } from '../../fonts'
import { SiteShell } from '@/components/layout/SiteShell'
import { bootScript, rootMetadata } from '@/lib/seo'

export const metadata: Metadata = rootMetadata('en')
export { viewport } from '@/lib/seo'

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  )
}
