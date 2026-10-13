import { getDictionary, type Locale } from '@/content'
import { Rich } from '@/components/ui/Rich'
import { SectionHead } from '@/components/ui/SectionHead'
import { cn } from '@/lib/utils'
import { MethodMotion } from './MethodMotion'

/** Icone degli step: ascolto, strategia, creazione, ottimizzazione */
function StepIcon({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {i === 0 && (
        <>
          <path d="M9 16a7 7 0 0 1 14 0" />
          <path d="M5 16a11 11 0 0 1 22 0" />
          <circle cx="16" cy="18" r="3" />
        </>
      )}
      {i === 1 && (
        <>
          <circle cx="8" cy="24" r="3" />
          <circle cx="24" cy="8" r="3" />
          <path d="M10.5 21.5L21.5 10.5M8 8h6M8 8v6" />
        </>
      )}
      {i === 2 && (
        <>
          <circle cx="11" cy="11" r="6" />
          <rect x="15" y="15" width="12" height="12" rx="2" />
        </>
      )}
      {i === 3 && (
        <>
          <path d="M4 26h24" />
          <path d="M6 21l6-6 5 3 9-10" />
          <circle cx="26" cy="8" r="2.5" />
        </>
      )}
    </svg>
  )
}

export function Method({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const m = dict.method
  return (
    <section id={dict.sections.method.id} data-theme="light" aria-labelledby="method-title" className="theme-light relative pt-[var(--section-y)]">
      <div className="wrap">
        <SectionHead id="method-title" label={dict.sections.method.label} title={m.title} intro={m.intro} />
      </div>

      <MethodMotion steps={m.steps.map((s) => s.title)} hint={m.hint}>
        {m.steps.map((s, i) => {
          const featured = i === 2
          return (
            <article
              key={s.title}
              data-step
              className={cn(
                'card relative flex h-[min(70svh,620px)] w-[84vw] shrink-0 snap-center flex-col justify-between overflow-hidden p-7 sm:w-[58vw] sm:p-10 lg:w-[40vw]',
                featured && 'theme-violet !bg-violet shadow-glow',
              )}
            >
              {/* numero grande in trasparenza */}
              <span
                aria-hidden="true"
                className={cn(
                  't-num pointer-events-none absolute -right-2 -bottom-8 text-[clamp(10rem,30vh,18rem)]',
                  featured ? 'text-white/10' : 'bg-[linear-gradient(180deg,#e9e3ff,#f7f5ff)] bg-clip-text text-transparent',
                )}
              >
                0{i + 1}
              </span>

              <div className="relative flex items-start justify-between gap-6">
                <span className={cn('grid h-14 w-14 place-items-center rounded-2xl', featured ? 'bg-white/15' : 'bg-surface text-violet')}>
                  <StepIcon i={i} />
                </span>
                <span className={cn('chip', featured && '!bg-white/10 !text-white')}>{s.time}</span>
              </div>

              <div className="relative">
                <p className={cn('text-sm font-semibold', featured ? 'text-white/90' : 'text-violet')}>Step 0{i + 1}</p>
                <h3 className="mt-2 text-[clamp(2.4rem,4.5vw,4.25rem)] leading-none font-semibold tracking-[-0.05em]">{s.title}</h3>
                <p className={cn('mt-3 text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] leading-snug font-medium', featured ? 'text-white/90' : 'text-ink-2')}>{s.lead}</p>
                <p className={cn('mt-4 max-w-[46ch] leading-relaxed', featured ? 'text-white/90' : 'text-muted')}>{s.body}</p>
                <p className={cn('mt-6 mb-2.5 text-sm font-semibold', featured ? 'text-white/90' : 'text-ink')}>{m.deliverables}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className={cn('chip', featured && '!bg-white/10 !text-white')}>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}

        <article data-step className="theme-dark relative flex h-[min(70svh,620px)] w-[84vw] shrink-0 snap-center flex-col items-start justify-center gap-8 overflow-hidden rounded-[var(--radius-card)] p-7 sm:w-[58vw] sm:p-10 lg:w-[34vw]">
          <div aria-hidden="true" className="glow -top-20 -right-20 h-72 w-72 opacity-60" />
          <svg viewBox="0 0 120 120" className="relative h-20 w-20 text-lilac motion-safe:animate-[spin_14s_linear_infinite]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
            <path d="M100 60a40 40 0 1 1-12-28.3" />
            <path d="M90 14v20H70" />
          </svg>
          <p className="t-h3 relative max-w-[14ch]">
            <Rich text={m.loop} />
          </p>
        </article>
      </MethodMotion>
    </section>
  )
}
