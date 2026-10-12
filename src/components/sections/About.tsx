import { getDictionary, t, type Locale } from '@/content'
import { certifications, tools } from '@/content/data/proof'
import { brands } from '@/content/data/brands'
import type { Media as MediaT } from '@/content/types'
import { Media } from '@/components/ui/Media'
import { Note } from '@/components/ui/Note'
import { Rich } from '@/components/ui/Rich'
import { site } from '@/content/site'

/**
 * ⚠️ FOTO: sostituisci il segnaposto con una foto vera, ad es.
 *   const photo: MediaT = { type: 'image', src: '/images/irene.jpg', width: 1600, height: 2000, alt: { it: '…', en: '…' } }
 */
const photo = (alt: string): MediaT => ({
  type: 'art',
  art: { kind: 'portrait', brand: brands.irene },
  alt: { it: alt, en: alt },
})

export function About({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const a = dict.about
  return (
    <section id={dict.sections.about.id} data-theme="paper" aria-labelledby="about-title" className="theme-paper section">
      <div className="wrap grid-12 gap-y-14">
        {/* ── foto ─────────────────────────────────────────── */}
        <div className="col-span-4 lg:col-span-5">
          <figure className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div className="crop relative aspect-[4/5] overflow-hidden bg-paper-2" data-reveal>
              <div className="absolute inset-0 scale-[1.1]" data-parallax="3">
                <Media media={photo(a.photoAlt)} locale={locale} sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
              <span className="chip chip--acid absolute bottom-4 left-4 shadow-[0_0_0_1px_var(--color-ink)]">{site.city}</span>
            </div>
            <figcaption className="label muted mt-6 flex justify-between gap-4">
              <span>{a.photoCaption}</span>
              <span>FIG. 09</span>
            </figcaption>
            <Note n="12">{dict.strategy.notes.about}</Note>
          </figure>
        </div>

        {/* ── testo ────────────────────────────────────────── */}
        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          <p className="label flex items-center gap-3" data-reveal data-reveal-y="12">
            <span>(09)</span>
            <span className="h-px flex-1 bg-[var(--rule)]" aria-hidden="true" />
            <span>{dict.sections.about.label}</span>
          </p>
          <h2 id="about-title" className="t-h2 mt-8" data-split>
            <Rich text={a.title} />
          </h2>

          <div className="mt-10 grid gap-6">
            {a.bio.map((p, i) => (
              <p key={i} className={i === 0 ? 't-lead' : 'text-lg leading-relaxed text-ink-2'} data-reveal>
                {p}
              </p>
            ))}
          </div>

          {/* Irene in numeri (non ufficiali) */}
          <div className="mt-16" data-reveal-group>
            <p className="label muted mb-5">{a.statsTitle}</p>
            <dl className="grid grid-cols-2 border-t border-l border-[var(--rule)]">
              {a.stats.map((s) => (
                <div key={s.label} className="border-r border-b border-[var(--rule)] p-5" data-reveal-item>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="t-display block text-6xl leading-none">{s.value}</span>
                    <span className="mt-3 block leading-snug">{s.label}</span>
                    <span className="label muted mt-1 block">{s.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Certificazioni */}
          <div className="mt-16">
            <h3 className="label muted mb-5">{a.certTitle}</h3>
            <ul className="border-t border-[var(--rule)]" data-reveal-group>
              {certifications.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-4 border-b border-[var(--rule)] py-4" data-reveal-item>
                  <span className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-[0.7rem] font-semibold text-paper">
                      {c.issuer === 'Meta' ? 'M' : 'G'}
                    </span>
                    <span>
                      <span className="block font-semibold leading-tight">{c.name}</span>
                      <span className="label muted">
                        {c.issuer} · {c.year}
                      </span>
                    </span>
                  </span>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="label link-u shrink-0">
                      {a.certVerify} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Strumenti */}
          <div className="mt-16">
            <h3 className="label muted mb-5">{a.toolsTitle}</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {tools.map((g) => (
                <div key={g.group.it}>
                  <p className="font-semibold">{t(g.group, locale)}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((tool) => (
                      <li key={tool} className="chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
