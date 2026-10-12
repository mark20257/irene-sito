import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Icona per la schermata Home: il segno di registro, in acido su inchiostro. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111111', position: 'relative' }}>
        <div style={{ position: 'absolute', width: 4, height: 140, background: '#D4FF3A' }} />
        <div style={{ position: 'absolute', width: 140, height: 4, background: '#D4FF3A' }} />
        <div style={{ width: 84, height: 84, borderRadius: 84, border: '6px solid #D4FF3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 30, height: 30, borderRadius: 30, background: '#D4FF3A' }} />
        </div>
      </div>
    ),
    size,
  )
}
