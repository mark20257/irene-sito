import type { Metadata } from 'next'
import { PrivacyView } from '@/components/sections/PrivacyView'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Informativa privacy del sito di Irene Chies.',
  alternates: { canonical: '/privacy', languages: { 'it-IT': '/privacy', en: '/en/privacy' } },
  robots: { index: false, follow: true },
}

export default function Page() {
  return <PrivacyView locale="it" />
}
