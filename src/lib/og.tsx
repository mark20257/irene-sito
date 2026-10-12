import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/* Immagini Open Graph generate in build: stessa carta, stesso inchiostro, stesso evidenziatore. */

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const P = { paper: '#F4F1EA', ink: '#111111', acid: '#D4FF3A', muted: '#66635D' }

async function fonts() {
  const dir = join(process.cwd(), 'src/assets/og')
  const [display, serif, mono] = await Promise.all([
    readFile(join(dir, 'BricolageGrotesque-CondensedExtraBold.ttf')),
    readFile(join(dir, 'InstrumentSerif-Italic.ttf')),
    readFile(join(dir, 'GeistMono-Regular.ttf')),
  ])
  return [
    { name: 'Display', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'Serif', data: serif, weight: 400 as const, style: 'italic' as const },
    { name: 'Mono', data: mono, weight: 400 as const, style: 'normal' as const },
  ]
}

function Marks() {
  const m = (style: Record<string, number | string>) => <div style={{ position: 'absolute', background: P.ink, opacity: 0.6, ...style }} />
  return (
    <>
      {m({ left: 24, top: 40, width: 18, height: 1.5 })}
      {m({ left: 40, top: 24, width: 1.5, height: 18 })}
      {m({ right: 24, top: 40, width: 18, height: 1.5 })}
      {m({ right: 40, top: 24, width: 1.5, height: 18 })}
      {m({ left: 24, bottom: 40, width: 18, height: 1.5 })}
      {m({ left: 40, bottom: 24, width: 1.5, height: 18 })}
      {m({ right: 24, bottom: 40, width: 18, height: 1.5 })}
      {m({ right: 40, bottom: 24, width: 1.5, height: 18 })}
    </>
  )
}

export async function homeOgImage({ claim, accent, roles, place }: { claim: string; accent: string; roles: string; place: string }) {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: P.paper, color: P.ink, padding: '64px 72px', position: 'relative' }}>
        <Marks />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Mono', fontSize: 20, textTransform: 'uppercase' }}>
          <span>(01) — Portfolio 2026</span>
          <span>{place}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 34, fontFamily: 'Display', fontSize: 210, lineHeight: 0.8, letterSpacing: -2 }}>
          <span>IRENE</span>
          <span>CHIES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Display', fontSize: 56, lineHeight: 1 }}>{claim}</span>
            <span style={{ fontFamily: 'Serif', fontStyle: 'italic', fontSize: 58, lineHeight: 1.05 }}>{accent}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 0 }}>
            <span style={{ fontFamily: 'Display', fontSize: 50, background: P.acid, padding: '6px 16px 0', boxShadow: `6px 6px 0 ${P.ink}` }}>SOCIAL · ADS · DESIGN</span>
            {roles.split(' / ').map((r) => (
              <span key={r} style={{ fontFamily: 'Mono', fontSize: 17, marginTop: 8, color: P.muted, textTransform: 'uppercase' }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  )
}

export async function caseOgImage({ client, excerpt, metric, metricLabel, kicker }: { client: string; excerpt: string; metric: string; metricLabel: string; kicker: string }) {
  const size = client.length > 14 ? 150 : 190
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: P.ink, color: P.paper, padding: '64px 72px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Mono', fontSize: 20, textTransform: 'uppercase', color: '#BDB9B0' }}>
          <span>{kicker}</span>
          <span>Irene Chies</span>
        </div>
        <span style={{ fontFamily: 'Display', fontSize: size, lineHeight: 0.85, marginTop: 50, textTransform: 'uppercase', letterSpacing: -1 }}>{client}</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto', gap: 40 }}>
          <span style={{ fontFamily: 'Serif', fontStyle: 'italic', fontSize: 46, lineHeight: 1.1, maxWidth: 640 }}>{excerpt}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontFamily: 'Display', fontSize: 120, lineHeight: 1, background: P.acid, color: P.ink, padding: '8px 18px 0' }}>{metric}</span>
            <span style={{ fontFamily: 'Mono', fontSize: 20, marginTop: 14, textTransform: 'uppercase' }}>{metricLabel}</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  )
}
