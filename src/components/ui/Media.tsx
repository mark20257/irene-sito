import Image from 'next/image'
import type { Locale, Media as MediaT } from '@/content/types'
import { cn } from '@/lib/utils'

type Props = {
  media: MediaT
  locale: Locale
  className?: string
  /** `sizes` per next/image */
  sizes?: string
  priority?: boolean
}

/** Rapporto d'aspetto del media (riserva lo spazio: niente salti di layout) */
export const mediaRatio = (m: MediaT): string => (m.type === 'image' ? `${m.width} / ${m.height}` : '16 / 9')

/**
 * Immagini ottimizzate da next/image (AVIF/WebP, srcset, lazy loading)
 * oppure video in loop muto.
 */
export function Media({ media, locale, className, sizes = '(min-width: 1024px) 50vw, 100vw', priority }: Props) {
  const alt = media.alt[locale]
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
    <video className={cn('h-full w-full object-cover', className)} src={media.src} poster={media.poster} muted loop playsInline autoPlay preload="none" aria-label={alt} />
  )
}
