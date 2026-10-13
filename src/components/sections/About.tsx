import { getDictionary, t, type Locale } from '@/content'
import { certifications, tools } from '@/content/data/proof'
import { portrait } from '@/content/data/portrait'
import { Media } from '@/components/ui/Media'
import { Rich } from '@/components/ui/Rich'
import { site } from '@/content/site'

export function About({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const a = dict.about
  const photo = { ...portrait, alt: { it: a.photoAlt, en: a.photoAlt } }

  return (
    <section id={dict.sections.about.id} data-theme="light" aria-labelledby="about-title" className="theme-soft section">
      <div className="wrap grid-12 gap-y-14">
        {/* ── foto ─────────────────────────────────────────── */}
        <div className="col-span-4 lg:col-span-5">
          <figure className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div data-tilt className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-2 shadow-lift" data-reveal>
              <div className="absolute inset-0 scale-[1.08]" data-parallax="3">
                <Media media={photo} locale={locale} sizes="(min-width: 1024px) 40vw, 92vw" />
              </div>
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow-soft">
                <span className="h-2 w-2 rounded-full bg-violet" />
                {site.city}
              </span>
            </div>
            <figcaption className="mt-4 text-sm text-muted">{a.photoCaption}</figcaption>
          </figure>
        </div>

        {/* ── testo ────────────────────────────────────────── */}
        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          <p className="eyebrow" data-reveal data-reveal-y="12">
            {dict.sections.about.label}
          </p>
          <h2 id="about-title" className="t-h2 mt-5" data-split>
            <Rich text={a.title} />
          </h2>

          <div className="mt-8 grid gap-5">
            {a.bio.map((p, i) => (
              <p key={i} className={i === 0 ? 't-lead text-ink' : 'text-[1.075rem] leading-relaxed text-ink-2'} data-reveal>
                {p}
              </p>
            ))}
          </div>

          {/* Irene in numeri (non ufficiali) */}
          <div className="mt-14">
            <h3 className="text-sm font-semibold text-muted">{a.statsTitle}</h3>
            <dl className="mt-4 grid grid-cols-2 gap-3" data-reveal-group>
              {a.stats.map((s) => (
                <div key={s.label} className="card p-5" data-reveal-item>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="t-num block text-5xl text-violet">{s.value}</span>
                    <span className="mt-3 block leading-snug font-medium">{s.label}</span>
                    <span className="mt-1 block text-sm text-muted">{s.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Certificazioni */}
          <div className="mt-14">
            <h3 className="text-sm font-semibold text-muted">{a.certTitle}</h3>
            <ul className="mt-4 grid gap-2.5" data-reveal-group>
              {certifications.map((c) => (
                <li key={c.name} className="card flex items-center justify-between gap-4 px-5 py-4" data-reveal-item>
                  <span className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#6b3cf6,#a78bfa)] text-sm font-bold text-white">
                      {c.issuer === 'Meta' ? 'M' : 'G'}
                    </span>
                    <span>
                      <span className="block leading-tight font-semibold">{c.name}</span>
                      <span className="text-sm text-muted">
                        {c.issuer} · {c.year}
                      </span>
                    </span>
                  </span>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-u shrink-0 text-sm font-semibold text-violet">
                      {a.certVerify} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Strumenti */}
          <div className="mt-14">
            <h3 className="text-sm font-semibold text-muted">{a.toolsTitle}</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
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
