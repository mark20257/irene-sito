import type { CSSProperties } from 'react'

/**
 * Intro (< 2s) — il nome si compone come in tipografia:
 * ogni lettera passa da mono (il dato) a corsivo (la voce) a contorno (il bozzetto)
 * e infine si riempie d'inchiostro. Solo CSS: parte al primo paint, non aspetta il JS,
 * non blocca nulla (pointer-events: none) e non si ripete nella stessa sessione.
 */
export function Intro({ name, status }: { name: string; status: string }) {
  let index = 0
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__marks crop crop--inset" />
      <div className="intro__inner">
        <div className="intro__name">
          {name.split(' ').map((word) => (
            <span key={word} className="intro__word">
              {Array.from(word).map((ch) => {
                const i = index++
                return (
                  <span key={`${word}-${i}`} className="il" style={{ '--i': i } as CSSProperties}>
                    <span className="il__v il__v--mono">{ch}</span>
                    <span className="il__v il__v--serif">{ch.toLowerCase()}</span>
                    <span className="il__v il__v--outline">{ch}</span>
                    <span className="il__f">{ch}</span>
                  </span>
                )
              })}
            </span>
          ))}
        </div>
      </div>
      <div className="intro__meta">
        <span className="label">{status}</span>
        <span className="label intro__count" />
      </div>
      <div className="intro__bar" />
    </div>
  )
}
