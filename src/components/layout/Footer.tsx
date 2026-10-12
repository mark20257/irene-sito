import { getDictionary, paths, type Locale } from '@/content'
import { site, whatsappLink } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { Note } from '@/components/ui/Note'
import { Rich } from '@/components/ui/Rich'
import { SmartLink } from '@/components/ui/SmartLink'
import { BackToTop } from './BackToTop'
import { LocalTime } from './LocalTime'

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const f = dict.footer
  const year = new Date().getFullYear()
  const links = dict.menuItems.map((key) => ({ href: paths.section(key, locale), label: dict.sections[key].label }))

  return (
    <footer className="theme-ink relative overflow-hidden" data-theme="ink" data-hide-sticky>
      <div className="wrap pt-[clamp(5rem,10vw,9rem)]">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-4 lg:col-span-8">
            <p className="label muted">{f.kicker}</p>
            <p className="t-h2 mt-4" data-split>
              <Rich text={f.title} />
            </p>
          </div>
          <div className="col-span-4 lg:col-span-4 lg:justify-self-end">
            <Button href={paths.section('contact', locale)} variant="acid" size="lg">
              {f.cta}
            </Button>
          </div>
        </div>

        <div className="rule mt-16" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4">
          <nav aria-label={f.menu}>
            <p className="label muted mb-4">{f.menu}</p>
            <ul className="grid gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <SmartLink href={l.href} className="link-u link-u--in">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label muted mb-4">{f.social}</p>
            <ul className="grid gap-2">
              <li>
                <a className="link-u link-u--in" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a className="link-u link-u--in" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a className="link-u link-u--in" href={whatsappLink(dict.contact.direct.whatsappText)} target="_blank" rel="noopener noreferrer">
                  WhatsApp ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="label muted mb-4">{f.contacts}</p>
            <ul className="grid gap-2">
              <li>
                <a className="link-u link-u--in break-all" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <a className="link-u link-u--in" href={`tel:${site.phone.replace(/\s/g, '')}`}>
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="label muted mb-4">{f.time}</p>
            <p className="t-display text-4xl leading-none tracking-tight">
              <LocalTime timeZone={site.timeZone} />
            </p>
            <p className="label muted mt-2">{site.city}, IT</p>
          </div>
        </div>

        <div className="rule" />

        <div className="label muted flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="break-all">{f.slug}</span>
          <span>{f.end}</span>
        </div>

        <div className="label flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="muted">
            © {year} {site.name} · {f.vat} {site.vat}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <SmartLink href={paths.privacy(locale)} className="link-u link-u--in">
              {f.privacy}
            </SmartLink>
            <span className="muted normal-case">{f.cookies}</span>
            <BackToTop label={dict.a11y.backToTop} />
          </div>
        </div>
        <Note n="15" className="relative mb-6">
          {dict.strategy.notes.footer}
        </Note>
      </div>

      {/* Il nome, gigante, tagliato dal bordo della pagina */}
      <div aria-hidden="true" className="relative h-[0.62em] overflow-hidden text-[23.5vw] select-none" data-rise-chars>
        <p className="t-display absolute top-0 left-1/2 -translate-x-1/2 text-center leading-[0.8] whitespace-nowrap text-acid uppercase">
          {Array.from('Irene Chies').map((ch, i) => (
            <span key={i} className="ch inline-block">
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}
