import { getDictionary, paths, type Locale } from '@/content'
import { site, whatsappLink } from '@/content/site'
import { Button } from '@/components/ui/Button'
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
    <footer className="theme-dark relative overflow-hidden" data-theme="dark" data-hide-sticky>
      <div aria-hidden="true" className="glow -top-32 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 opacity-40" />

      <div className="wrap relative pt-[clamp(4.5rem,9vw,8rem)]">
        {/* CTA finale */}
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-4 lg:col-span-8">
            <p className="eyebrow">{f.kicker}</p>
            <p className="t-h2 mt-5" data-split>
              <Rich text={f.title} />
            </p>
          </div>
          <div className="col-span-4 lg:col-span-4 lg:justify-self-end">
            <Button href={paths.section('contact', locale)} variant="light" size="lg">
              {f.cta}
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 py-12 md:grid-cols-4">
          <nav aria-label={f.menu}>
            <p className="label mb-4 text-white/55">{f.menu}</p>
            <ul className="grid gap-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <SmartLink href={l.href} className="link-u link-u--in text-white/90 hover:text-white">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label mb-4 text-white/55">{f.social}</p>
            <ul className="grid gap-2.5">
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
            <p className="label mb-4 text-white/55">{f.contacts}</p>
            <ul className="grid gap-2.5">
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
            <p className="label mb-4 text-white/55">{f.time}</p>
            <p className="t-num text-4xl">
              <LocalTime timeZone={site.timeZone} />
            </p>
            <p className="label mt-2 text-white/55">
              {site.city}, {locale === 'it' ? 'Italia' : 'Italy'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[0.9rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · {f.vat} {site.vat}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <SmartLink href={paths.privacy(locale)} className="link-u link-u--in hover:text-white">
              {f.privacy}
            </SmartLink>
            <span>{f.cookies}</span>
            <BackToTop label={dict.a11y.backToTop} />
          </div>
        </div>
      </div>

      {/* Il nome, gigante, tagliato dal bordo della pagina */}
      <div aria-hidden="true" className="relative h-[0.62em] overflow-hidden text-[19.4vw] select-none" data-rise-chars>
        <p className="absolute top-0 left-1/2 -translate-x-1/2 text-center leading-[0.82] font-semibold tracking-[-0.065em] whitespace-nowrap">
          {Array.from('Irene Chies').map((ch, i) => (
            <span key={i} className="ch inline-block bg-[linear-gradient(180deg,#c4b5fd_0%,#6b3cf6_70%)] bg-clip-text text-transparent">
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}
