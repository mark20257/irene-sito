import { getDictionary } from '@/content'
import { site } from '@/content/site'
import { homeOgImage, ogContentType, ogSize } from '@/lib/og'

export const alt = getDictionary('en').meta.ogAlt
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  const d = getDictionary('en')
  return homeOgImage({ claim: d.hero.claim, accent: d.hero.claimAccent, roles: d.hero.roles.join(' / '), place: `${site.city}, IT` })
}
