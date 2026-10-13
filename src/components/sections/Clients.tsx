import { getDictionary, t, type Locale } from '@/content'
import { clients, testimonials } from '@/content/data/proof'
import { Marquee } from '@/components/motion/Marquee'
import { SectionHead } from '@/components/ui/SectionHead'
import { cn } from '@/lib/utils'

function Logo({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-[clamp(1.5rem,4vw,3.5rem)] px-[clamp(0.75rem,2vw,1.75rem)]">
      <span className="text-[clamp(1.9rem,4.2vw,4rem)] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap text-ink/85">{name}</span>
      <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[linear-gradient(135deg,#6b3cf6,#c4b5fd)]" />
    </span>
  )
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

export function Clients({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const c = dict.clients
  const half = Math.ceil(clients.length / 2)

  return (
    <section id={dict.sections.clients.id} data-theme="light" aria-labelledby="clients-title" className="theme-light section overflow-hidden">
      <div className="wrap">
        <SectionHead id="clients-title" label={dict.sections.clients.label} title={c.title} align="center" />
      </div>

      <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-5 py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-label={c.marqueeLabel} role="region">
        <ul className="sr-only">
          {clients.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
        <div aria-hidden="true">
          <Marquee speed={50}>
            {clients.slice(0, half).map((l) => (
              <Logo key={l.name} name={l.name} />
            ))}
          </Marquee>
        </div>
        <div aria-hidden="true">
          <Marquee speed={40} reverse>
            {clients.slice(half).map((l) => (
              <Logo key={l.name} name={l.name} />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="wrap mt-[clamp(4rem,8vw,7rem)]">
        <p className="mb-8 text-center text-[0.95rem] font-medium text-muted">{c.testimonialsTitle}</p>
        <ul className="grid items-start gap-5 lg:grid-cols-3" data-reveal-group>
          {testimonials.map((tm, i) => (
            <li key={tm.author} data-reveal-item className={cn(i === 1 && 'lg:mt-12')}>
              <figure className={cn('card relative flex h-full flex-col p-7 sm:p-9', i === 1 && 'theme-dark !bg-deep shadow-lift')}>
                <svg aria-hidden="true" viewBox="0 0 32 24" className={cn('h-7 w-9', i === 1 ? 'text-lilac' : 'text-violet')} fill="currentColor">
                  <path d="M0 24V14C0 6 4.5 1.2 12 0l1.5 3.4C9 5 7 8 7 12h6v12zm18 0V14C18 6 22.5 1.2 30 0l1.5 3.4C27 5 25 8 25 12h6v12z" />
                </svg>
                <blockquote className="mt-6 text-[clamp(1.15rem,1rem+0.55vw,1.45rem)] leading-[1.45] font-medium tracking-[-0.015em]">{t(tm.quote, locale)}</blockquote>
                <figcaption className={cn('mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6', i === 1 ? 'border-white/10' : 'border-line')}>
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#6b3cf6,#a78bfa)] text-sm font-semibold text-white">
                      {initials(tm.author)}
                    </span>
                    <span>
                      <span className="block font-semibold">{tm.author}</span>
                      <span className={cn('block text-sm', i === 1 ? 'text-white/65' : 'text-muted')}>
                        {t(tm.role, locale)}, {tm.brand}
                      </span>
                    </span>
                  </span>
                  <span className={cn('chip', i === 1 ? '!bg-violet !text-white' : '!bg-surface !text-violet')}>{t(tm.result, locale)}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
