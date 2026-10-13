import { getDictionary, paths, type Locale } from '@/content'
import { site, whatsappLink } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { Rich } from '@/components/ui/Rich'
import { ContactForm } from './ContactForm'
import { CopyEmail } from './CopyEmail'

export function Contact({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const c = dict.contact
  const wa = whatsappLink(c.direct.whatsappText)

  return (
    <section id={dict.sections.contact.id} data-theme="dark" aria-labelledby="contact-title" className="theme-dark section relative overflow-hidden" data-hide-sticky>
      <div aria-hidden="true" className="absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_34%_30%,#e2c6ff_0%,#9b45ff_35%,#4a12a8_65%,transparent_70%)] opacity-70 blur-[2px]" />
      <div aria-hidden="true" className="glow bottom-0 -left-40 h-[30rem] w-[30rem] opacity-30" />

      <div className="wrap relative">
        <p className="eyebrow" data-reveal data-reveal-y="12">
          {dict.sections.contact.label}
        </p>
        <h2 id="contact-title" className="t-name mt-6 max-w-[12ch] text-[clamp(3.2rem,9vw,8.5rem)]" data-split>
          <Rich text={c.title} />
        </h2>
        <p className="t-lead mt-8 max-w-[44ch] text-white/80" data-reveal>
          {c.lead}
        </p>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-12">
          <div className="theme-light rounded-[var(--radius-card)] bg-white p-6 text-ink shadow-lift sm:p-10 lg:col-span-8">
            <ContactForm form={c.form} privacyHref={paths.privacy(locale)} whatsapp={wa} email={site.email} />
          </div>

          <aside className="grid gap-5 lg:col-span-4" aria-labelledby="direct-title">
            <div className="card p-6 sm:p-8">
              <p id="direct-title" className="text-sm font-semibold text-white/65">
                {c.direct.title}
              </p>
              <div className="mt-4">
                <Button href={wa} variant="primary" icon="chat" className="w-full justify-between">
                  {c.direct.whatsapp}
                </Button>
              </div>
              <p className="mt-3 text-sm text-white/65">{c.direct.response}</p>
            </div>
            <div className="card p-6 sm:p-8">
              <p className="mb-3 text-sm font-semibold text-white/65">{c.direct.email}</p>
              <CopyEmail email={site.email} copy={c.direct.copy} copied={c.direct.copied} />
            </div>
            <div className="card p-6 sm:p-8">
              <Button href={site.calendly} variant="light" icon="up" className="w-full justify-between">
                {c.direct.calendly}
              </Button>
              <p className="mt-5 mb-2 text-sm font-semibold text-white/65">{c.direct.social}</p>
              <ul className="grid gap-1.5 text-[1.05rem]">
                <li>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-u link-u--in">
                    Instagram — {site.instagram.handle} ↗
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-u link-u--in">
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
