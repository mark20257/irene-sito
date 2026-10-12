import { Fragment, type ReactNode } from 'react'

/**
 * Mini-markup dei testi:
 *   *parola*   → corsivo editoriale
 *   ==parola== → evidenziatore acido
 * Con `words`, ogni parola è avvolta in uno <span class="w"> (per le animazioni a scrub).
 */
type Props = {
  text: string
  words?: boolean
  /** classe extra per gli evidenziatori (es. data-attribute per animarli) */
  hlProps?: Record<string, string | boolean>
}

const TOKEN = /(\*[^*]+\*|==[^=]+==)/g

function splitWords(text: string, keyBase: string): ReactNode[] {
  return text.split(/(\s+)/).map((part, i) =>
    /^\s+$/.test(part) || part === '' ? (
      part
    ) : (
      <span key={`${keyBase}-${i}`} className="w inline-block">
        {part}
      </span>
    ),
  )
}

export function Rich({ text, words = false, hlProps }: Props) {
  const parts = text.split(TOKEN).filter((p) => p !== '')
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('==') && part.endsWith('==')) {
          const inner = part.slice(2, -2)
          return (
            <mark key={i} className="hl" {...hlProps}>
              {words ? splitWords(inner, `h${i}`) : inner}
            </mark>
          )
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          const inner = part.slice(1, -1)
          return (
            <em key={i} className="ital">
              {words ? splitWords(inner, `e${i}`) : inner}
            </em>
          )
        }
        return <Fragment key={i}>{words ? splitWords(part, `t${i}`) : part}</Fragment>
      })}
    </>
  )
}

/** Versione testuale pulita (per meta, aria-label, alt) */
export const plain = (text: string) => text.replace(/==|\*/g, '')
