import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Icona per la schermata Home: la sfera viola su fondo viola profondo. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F0726' }}>
        <div style={{ width: 112, height: 112, borderRadius: 112, backgroundImage: 'radial-gradient(circle at 34% 30%, #E4DBFF 0%, #8B5CF6 40%, #3B13B8 100%)' }} />
      </div>
    ),
    size,
  )
}
