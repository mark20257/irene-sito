'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/**
 * true se l'utente preferisce meno movimento.
 * Sul server vale false (il caso più comune): così, per quasi tutti, l'idratazione non
 * ridisegna nulla. Il layout statico o "pinnato" lo decide comunque il CSS (variante `pinned:`),
 * quindi chi preferisce meno movimento (o non ha JS) vede da subito la versione statica;
 * da qui dipendono solo attributi e animazioni.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
