import { notFound } from 'next/navigation'

/** Qualsiasi URL sconosciuto mostra il 404 con il layout del sito (header, footer, font). */
export default function CatchAll() {
  notFound()
}
