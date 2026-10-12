import type { CSSProperties } from 'react'
import { getDictionary, t, type Locale } from '@/content'
import { clients, testimonials } from '@/content/data/proof'
import type { ClientLogo } from '@/content/types'
import { Marquee } from '@/components/motion/Marquee'
import { Note } from '@/components/ui/Note'
import { SectionHead } from '@/components/ui/SectionHead'
import { cn } from '@/lib/utils'

/** "Loghi" tipografici: ogni brand con il suo carattere (sostituibili con SVG veri). */
const logoStyle: Record<ClientLogo['style'], CSSProperties> = {
  serif: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: '-0.02em' },
  display: { fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', fontStretch: '85%' },
  condensed: { fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontStretch: '75%', letterSpacing: '0.02em' },
  wide: { fontFamily: 'var(--font-display)', fontWeight: 300, textTransform: 'uppercase', fontStretch: '100%', letterSpacing: '0.18em' },
  mono: { fontFamily: 'var(--font-mono)', fontWeight: 400, textTransform: 'lowercase', letterSpacing: '-0.02em' },
}

function Logo({ logo }: { logo: ClientLogo }) {
  return (
    <span className="flex items-center gap-[clamp(1.5rem,4vw,4rem)] px-[clamp(0.75rem,2vw,2rem)]">
      <span className="text-[clamp(2.25rem,5.5vw,5.5rem)] leading-none whitespace-nowrap" style={logoStyle[logo.style]}>
        {logo.name}
      </span>
      <span aria-hidden="true" className="h-3 w-3 rotate-45 bg-acid shadow-[0_0_0_1px_var(--color-ink)]" />
    </span>
  )
}

export function Clients({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const c = dict.clients
  const half = Math.ceil(clients.length / 2)

  return (
    <section id={dict.sections.clients.id} data-theme="paper" aria-labelledby="clients-title" className="theme-paper section overflow-hidden">
      <div className="wrap">
        <SectionHead index={8} id="clients-title" label={dict.sections.clients.label} title={c.title} />
      </div>

      <div className="mt-[clamp(3rem,7vw,7rem)] grid gap-4 border-y border-[var(--rule)] py-8" aria-label={c.marqueeLabel} role="region">
        <ul className="sr-only">
          {clients.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
        <div aria-hidden="true">
          <Marquee speed={55}>
            {clients.slice(0, half).map((l) => (
              <Logo key={l.name} logo={l} />
            ))}
          </Marquee>
        </div>
        <div aria-hidden="true">
          <Marquee speed={45} reverse>
            {clients.slice(half).map((l) => (
              <Logo key={l.name} logo={l} />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="wrap mt-[clamp(4rem,9vw,9rem)]">
        <p className="label muted mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-current" aria-hidden="true" />
          {c.testimonialsTitle}
        </p>
        <ul className="grid-12 gap-y-14">
          {testimonials.map((tm, i) => (
            <li
              key={tm.author}
              className={cn(
                'col-span-4',
                i === 0 && 'lg:col-span-6',
                i === 1 && 'lg:col-span-5 lg:col-start-8 lg:mt-40',
                i === 2 && 'lg:col-span-6 lg:col-start-3 lg:-mt-10',
              )}
              data-reveal
            >
              <figure className="crop crop--inset relative bg-paper-2 p-7 sm:p-10" style={{ ['--cl' as string]: '14px', ['--cg' as string]: '-1px' }}>
                <span aria-hidden="true" className="ital absolute -top-10 left-4 text-[9rem] leading-none text-ink">
                  “
                </span>
                <blockquote className="t-h4 relative text-[clamp(1.45rem,1rem+1.4vw,2.35rem)] leading-[1.12] font-[600] tracking-[-0.02em]">
                  {t(tm.quote, locale)}
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--rule)] pt-5">
                  <span>
                    <span className="block font-semibold">{tm.author}</span>
                    <span className="label muted">
                      {t(tm.role, locale)}, {tm.brand}
                    </span>
                  </span>
                  <span className="chip chip--acid">{t(tm.result, locale)}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <Note n="11">{dict.strategy.notes.clients}</Note>
      </div>
    </section>
  )
}
