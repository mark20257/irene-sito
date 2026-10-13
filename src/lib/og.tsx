import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/* Immagini Open Graph generate in build: viola profondo, viola elettrico, lilla. */

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const P = { bg: '#0F0726', white: '#FFFFFF', violet: '#6B3CF6', lilac: '#C4B5FD', soft: '#B9AEDB' }

async function fonts() {
  const dir = join(process.cwd(), 'src/assets/og')
  const [regular, semibold] = await Promise.all([readFile(join(dir, 'Geist-400.ttf')), readFile(join(dir, 'Geist-600.ttf'))])
  return [
    { name: 'Geist', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Geist', data: semibold, weight: 600 as const, style: 'normal' as const },
  ]
}

/** Sfera viola (richiama l'oggetto 3D del sito) */
function Orb({ size, top, left, right, bottom }: { size: number; top?: number; left?: number; right?: number; bottom?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        ...(top !== undefined && { top }),
        ...(left !== undefined && { left }),
        ...(right !== undefined && { right }),
        ...(bottom !== undefined && { bottom }),
        borderRadius: size,
        backgroundImage: 'radial-gradient(circle at 34% 30%, #F0DCFF 0%, #A34DFF 38%, #5A17C9 72%, #24064F 100%)',
      }}
    />
  )
}

export async function homeOgImage({ claim, accent, roles, place }: { claim: string; accent: string; roles: string; place: string }) {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: P.bg, color: P.white, padding: '64px 72px', position: 'relative', fontFamily: 'Geist' }}>
        <Orb size={520} top={-40} right={-120} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: P.soft }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: P.lilac }} />
          <span>{`Portfolio 2026 · ${place}`}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40, fontSize: 150, fontWeight: 600, lineHeight: 0.9, letterSpacing: -8 }}>
          <span>Irene</span>
          <span>Chies</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
          <div style={{ display: 'flex', fontSize: 46, fontWeight: 600, letterSpacing: -1.5 }}>
            <span>{claim}</span>
            <span style={{ fontWeight: 400, color: P.lilac, marginLeft: 14 }}>{accent}</span>
          </div>
          <span style={{ fontSize: 24, marginTop: 14, color: P.soft }}>{roles}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  )
}

export async function caseOgImage({ client, excerpt, metric, metricLabel, kicker }: { client: string; excerpt: string; metric: string; metricLabel: string; kicker: string }) {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: P.bg, color: P.white, padding: '64px 72px', position: 'relative', fontFamily: 'Geist' }}>
        <Orb size={380} bottom={-120} right={-60} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: P.soft }}>
          <span>{kicker}</span>
          <span>Irene Chies</span>
        </div>
        <span style={{ fontSize: client.length > 14 ? 112 : 136, fontWeight: 600, lineHeight: 0.95, marginTop: 50, letterSpacing: -5 }}>{client}</span>
        <span style={{ fontSize: 36, lineHeight: 1.25, marginTop: 24, maxWidth: 760, color: '#E4DBFF' }}>{excerpt}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 'auto', background: P.violet, borderRadius: 24, padding: '14px 26px', alignSelf: 'flex-start' }}>
          <span style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2 }}>{metric}</span>
          <span style={{ fontSize: 26 }}>{metricLabel}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  )
}
