import { getDictionary, t, type Locale } from '@/content'
import { feedPosts } from '@/content/data/feed'
import { site } from '@/content/site'
import { Media, mediaRatio } from '@/components/ui/Media'
import { Note } from '@/components/ui/Note'
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
    media: <Media media={p.media} locale={locale} sizes="360px" />,
    note: { type: t(p.note.type, locale), goal: t(p.note.goal, locale), result: t(p.note.result, locale) },
  }))

  return (
    <section id={dict.sections.feed.id} data-theme="ink" aria-labelledby="feed-title" className="theme-ink relative pt-[var(--section-y)]">
      <div className="wrap">
        <SectionHead index={5} id="feed-title" label={dict.sections.feed.label} title={f.title} intro={f.intro} />
        <Note n="08">{dict.strategy.notes.feed}</Note>
      </div>
      <FeedClient items={items} labels={f} handle={site.instagram.handle.replace(/^@/, '')} />
    </section>
  )
}
