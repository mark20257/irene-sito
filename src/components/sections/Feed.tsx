import { getDictionary, t, type Locale } from '@/content'
import { feedPosts } from '@/content/data/feed'
import { site } from '@/content/site'
import { Media, mediaRatio } from '@/components/ui/Media'
import { SectionHead } from '@/components/ui/SectionHead'
import { FeedClient, type FeedItem } from './FeedClient'

export function Feed({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const f = dict.feed

  const items: FeedItem[] = feedPosts.map((p) => ({
    kind: p.kind,
    author: p.author.replace(/^@/, ''),
    caption: t(p.caption, locale),
    likes: new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB').format(p.likes),
    ratio: mediaRatio(p.media),
    media: <Media media={p.media} locale={locale} sizes="340px" />,
    note: { type: t(p.note.type, locale), goal: t(p.note.goal, locale).replace(/^(Obiettivo|Goal):\s*/i, ''), result: t(p.note.result, locale) },
  }))

  return (
    <section id={dict.sections.feed.id} data-theme="dark" aria-labelledby="feed-title" className="theme-dark relative overflow-hidden pt-[var(--section-y)]">
      <div aria-hidden="true" className="glow top-[30%] left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 opacity-35" />
      <div className="wrap relative">
        <SectionHead id="feed-title" label={dict.sections.feed.label} title={f.title} intro={f.intro} />
      </div>
      <FeedClient items={items} labels={f} handle={site.instagram.handle.replace(/^@/, '')} />
    </section>
  )
}
