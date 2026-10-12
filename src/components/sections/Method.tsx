import { getDictionary, type Locale } from '@/content'
import { Note } from '@/components/ui/Note'
import { Rich } from '@/components/ui/Rich'
import { SectionHead } from '@/components/ui/SectionHead'
import { cn } from '@/lib/utils'
import { MethodMotion } from './MethodMotion'

const themes = ['theme-paper bg-paper-2', 'theme-ink', 'theme-acid', 'theme-paper bg-paper-2']

/** Disegni dei quattro step: ascolto (onde), strategia (piano), creazione (forme), ottimizzazione (A/B) */
function StepArt({ i }: { i: number }) {
  const stroke = 'currentColor'
  return (
    <svg viewBox="0 0 160 160" className="h-28 w-28 sm:h-36 sm:w-36" aria-hidden="true" fill="none" stroke={stroke} strokeWidth="1.5">
      {i === 0 && (
        <g>
          {[14, 30, 46, 62].map((r) => (
            <circle key={r} cx="80" cy="80" r={r} opacity={1 - r / 90} />
          ))}
          <circle cx="80" cy="80" r="6" fill={stroke} />
        </g>
      )}
      {i === 1 && (
        <g>
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={`M${20 + k * 30} 20v120M20 ${20 + k * 30}h120`} opacity=".25" />
          ))}
          <path d="M20 140L50 110 80 118 110 70 140 30" strokeWidth="3" />
          {[
            [50, 110],
            [80, 118],
            [110, 70],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="5" fill="var(--color-paper)" />
          ))}
          <circle cx="140" cy="30" r="8" fill={stroke} />
        </g>
      )}
      {i === 2 && (
        <g strokeWidth="2">
          <circle cx="58" cy="58" r="34" />
          <rect x="70" y="70" width="64" height="64" />
          <path d="M30 140l28-48 28 48z" fill={stroke} />
        </g>
      )}
      {i === 3 && (
        <g>
          <path d="M14 140h134M14 140V14" opacity=".4" />
          <path d="M14 120C50 116 70 100 100 92S130 70 148 60" strokeDasharray="4 5" />
          <path d="M14 126C44 112 66 80 96 66S132 30 148 22" strokeWidth="3" />
          <text x="150" y="58" fontSize="12" fill={stroke} stroke="none" textAnchor="end" style={{ fontFamily: 'var(--font-mono)' }}>
            A
          </text>
          <text x="150" y="16" fontSize="12" fill={stroke} stroke="none" textAnchor="end" style={{ fontFamily: 'var(--font-mono)' }}>
            B ✓
          </text>
        </g>
      )}
    </svg>
  )
}

export function Method({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const m = dict.method
  return (
    <section id={dict.sections.method.id} data-theme="paper" aria-labelledby="method-title" className="theme-paper relative pt-[var(--section-y)]">
      <div className="wrap">
        <SectionHead index={7} id="method-title" label={dict.sections.method.label} title={m.title} intro={m.intro} />
        <Note n="10">{dict.strategy.notes.method}</Note>
      </div>

      <MethodMotion steps={m.steps.map((s) => s.title)} hint={m.hint}>
        {m.steps.map((s, i) => (
          <article
            key={s.title}
            data-step
            className={cn(
              themes[i],
              'crop crop--inset relative flex h-[min(74svh,680px)] w-[84vw] shrink-0 snap-center flex-col justify-between overflow-hidden p-6 sm:w-[60vw] sm:p-9 lg:w-[44vw] lg:p-12',
            )}
            style={{ ['--cl' as string]: '18px', ['--cg' as string]: '-1px' }}
          >
            {/* numero gigante a contorno */}
            <span
              aria-hidden="true"
              className="t-display pointer-events-none absolute -right-[0.06em] -bottom-[0.2em] text-[clamp(14rem,38vh,26rem)] leading-none text-transparent opacity-40 [-webkit-text-stroke:1.5px_currentColor]"
            >
              0{i + 1}
            </span>

            <div className="relative flex items-start justify-between gap-6">
              <p className="label">
                Step 0{i + 1} — {s.time}
              </p>
              <StepArt i={i} />
            </div>

            <div className="relative">
              <h3 className="t-h2 text-[clamp(3.2rem,7vw,7.5rem)]">{s.title}</h3>
              <p className="ital mt-3 text-[clamp(1.5rem,1.1rem+1.2vw,2.4rem)] leading-tight">{s.lead}</p>
              <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed opacity-85">{s.body}</p>
              <p className="label mt-6 mb-2 opacity-70">{m.deliverables}</p>
              <ul className="flex flex-wrap gap-1.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="chip">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <article
          data-step
          className="theme-ink relative flex h-[min(74svh,680px)] w-[84vw] shrink-0 snap-center flex-col items-start justify-center gap-8 p-6 sm:w-[60vw] sm:p-9 lg:w-[38vw] lg:p-12"
        >
          <svg viewBox="0 0 120 120" className="h-24 w-24 text-acid motion-safe:animate-[spin_12s_linear_infinite]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M100 60a40 40 0 1 1-12-28.3" />
            <path d="M90 16v18H72" />
          </svg>
          <p className="t-h3 max-w-[14ch]">
            <Rich text={m.loop} />
          </p>
        </article>
      </MethodMotion>
    </section>
  )
}
