import type { ReactNode } from 'react'
import '../globals.css'
import { fontVariables } from '../fonts'

/** Layout minimo, solo in sviluppo: serve a rigenerare le immagini segnaposto. */
export default function DevLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={fontVariables}>
      <body style={{ margin: 0, background: '#fff' }}>{children}</body>
    </html>
  )
}
