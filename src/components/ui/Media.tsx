import Image from 'next/image'
import type { Locale, Media as MediaT } from '@/content/types'
import { Art, artRatio } from '@/components/art/Art'
import { cn } from '@/lib/utils'

type Props = {
  media: MediaT
  locale: Locale
  className?: string
  /** `sizes` per next/image (foto vere) */
  sizes?: string
  priority?: boolean
}

/** Rapporto d'aspetto naturale del media (per riservare lo spazio ed evitare CLS) */
export const mediaRatio = (m: MediaT): string => {
  if (m.type === 'art') {
    const [w, h] = artRatio[m.art.kind]
    return `${w} / ${h}`
  }
  if (m.type === 'image') return `${m.width} / ${m.height}`
  return '16 / 9'
}

/**
 * Un solo componente per tutti i visual:
 * - `art`   → visual generativo SVG (segnaposto)
 * - `image` → foto vera, ottimizzata (AVIF/WebP, lazy, srcset)
 * - `video` → loop muto, parte solo se l'utente non ha chiesto movimento ridotto
 */
export function Media({ media, locale, className, sizes = '(min-width: 1024px) 50vw, 100vw', priority }: Props) {
  const alt = media.alt[locale]
  if (media.type === 'art') return <Art spec={media.art} locale={locale} label={alt} className={cn('h-full w-full', className)} />
  if (media.type === 'image')
    return (
      <Image
        src={media.src}
        alt={alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        priority={priority}
        quality={80}
        className={cn('h-full w-full object-cover', className)}
      />
    )
  return (
    <video
      className={cn('h-full w-full object-cover', className)}
      src={media.src}
      poster={media.poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-label={alt}
    />
  )
}
