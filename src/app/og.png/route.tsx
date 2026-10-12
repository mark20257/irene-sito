import { getDictionary } from '@/content'
import { site } from '@/content/site'
import { homeOgImage } from '@/lib/og'

/** Immagine di condivisione con URL stabile (/og.png), usata nei dati strutturati. */
export const dynamic = 'force-static'

export async function GET() {
  const d = getDictionary('it')
  return homeOgImage({ claim: d.hero.claim, accent: d.hero.claimAccent, roles: d.hero.roles.join(' / '), place: `${site.city}, IT` })
}
