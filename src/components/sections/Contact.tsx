import { getDictionary, paths, type Locale } from '@/content'
import { site, whatsappLink } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { Note } from '@/components/ui/Note'
import { Rich } from '@/components/ui/Rich'
import { ContactForm } from './ContactForm'
import { CopyEmail } from './CopyEmail'

export function Contact({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const c = dict.contact
  const wa = whatsappLink(c.direct.whatsappText)

  return (
    <section id={dict.sections.contact.id} data-theme="ink" aria-labelledby="contact-title" className="theme-ink section relative" data-hide-sticky>
      <div className="wrap">
        <p className="label flex items-center gap-3" data-reveal data-reveal-y="12">
          <span>(10)</span>
          <span className="h-px flex-1 bg-[var(--rule)]" aria-hidden="true" />
          <span>{dict.sections.contact.label}</span>
          <span className="muted hidden sm:inline">TAV. 10/10</span>
        </p>

        {/* La CTA enorme */}
        <h2
          id="contact-title"
          className="t-display mt-10 text-[clamp(3.6rem,13.5vw,16rem)] leading-[0.82] tracking-[-0.012em] uppercase"
          style={{ fontStretch: '78%' }}
          data-split
          data-velocity
        >
          <Rich text={c.title} />
        </h2>

        <div className="grid-12 mt-12 gap-y-16 lg:mt-20">
          <p className="t-lead col-span-4 max-w-[34ch] lg:col-span-5" data-reveal>
            {c.lead}
          </p>

          <div className="col-span-4 lg:col-span-7 lg:col-start-1 lg:row-start-2">
            <ContactForm form={c.form} privacyHref={paths.privacy(locale)} whatsapp={wa} email={site.email} />
            <Note n="13">{dict.strategy.notes.contact}</Note>
          </div>

          <aside className="col-span-4 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1" aria-labelledby="direct-title">
            <div className="grid gap-10 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <div>
                <p id="direct-title" className="label muted mb-5">
                  {c.direct.title}
                </p>
                <Button href={wa} variant="acid" icon="chat" className="w-full justify-between">
                  {c.direct.whatsapp}
                </Button>
                <p className="label muted mt-3">{c.direct.response}</p>
              </div>
              <div>
                <p className="label muted mb-3">{c.direct.email}</p>
                <CopyEmail email={site.email} copy={c.direct.copy} copied={c.direct.copied} />
              </div>
              <div>
                <Button href={site.calendly} variant="ghost" icon="up" className="w-full justify-between">
                  {c.direct.calendly}
                </Button>
              </div>
              <div>
                <p className="label muted mb-3">{c.direct.social}</p>
                <ul className="grid gap-2 text-lg">
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
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
