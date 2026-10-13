import type { CSSProperties } from 'react'

/**
 * Intro breve (~1,5 s, CSS puro): una sfera viola si accende, il nome sale lettera per lettera,
 * poi il sipario esce verso l'alto. Parte al primo paint, non blocca i click,
 * non si ripete nella stessa sessione e sparisce con "movimento ridotto".
 */
export function Intro({ name, status }: { name: string; status: string }) {
  let index = 0
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__orb" />
      <div className="intro__name">
        {name.split(' ').map((word) => (
          <span key={word} className="intro__word">
            {Array.from(word).map((ch) => {
              const i = index++
              return (
                <span key={`${word}-${i}`} className="il" style={{ '--i': i } as CSSProperties}>
                  {ch}
                </span>
              )
            })}
          </span>
        ))}
      </div>
      <div className="intro__meta">
        <span className="label">{status}</span>
        <span className="label intro__count" />
      </div>
      <div className="intro__bar" />
    </div>
  )
}
