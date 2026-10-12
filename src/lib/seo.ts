import type { Metadata, Viewport } from 'next'
import { getDictionary, ogLocale, paths, t, type Locale } from '@/content'
import { site } from '@/content/site'
import { certifications } from '@/content/data/proof'
import type { CaseStudy } from '@/content/types'
import { plain } from '@/components/ui/Rich'

export const absoluteUrl = (path: string) => `${site.url}${path === '/' ? '' : path}`

/** Script sincrono nel <head>: niente intro se già vista in questa sessione. */
export const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var s=window.sessionStorage;if(s.getItem('ic-intro')){d.classList.add('intro-seen')}else{s.setItem('ic-intro','1')}}catch(e){}})();`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f4f1ea',
  colorScheme: 'light',
}

export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale)
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s — ${site.name}` },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    category: 'marketing',
    alternates: {
      canonical: paths.home(locale),
      languages: { 'it-IT': '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === 'it' ? 'en' : 'it']],
      url: paths.home(locale),
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: { card: 'summary_large_image', title: dict.meta.title, description: dict.meta.description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    formatDetection: { telephone: false, email: false, address: false },
  }
}

export function caseMetadata(c: CaseStudy, locale: Locale): Metadata {
  const dict = getDictionary(locale)
  const title = `${c.client} — ${dict.caseStudy.metaSuffix}`
  const description = `${t(c.excerpt, locale)} ${t(c.sector, locale)}, ${c.year}.`
  return {
    title,
    description,
    alternates: {
      canonical: paths.case(c.slug, locale),
      languages: { 'it-IT': paths.case(c.slug, 'it'), en: paths.case(c.slug, 'en'), 'x-default': paths.case(c.slug, 'it') },
    },
    openGraph: {
      type: 'article',
      siteName: site.name,
      locale: ogLocale[locale],
      url: paths.case(c.slug, locale),
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/* ────────────────────────── JSON-LD ────────────────────────── */

export const jsonLdScript = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

export function homeJsonLd(locale: Locale) {
  const dict = getDictionary(locale)
  const url = absoluteUrl(paths.home(locale))
  const personId = `${site.url}/#irene`
  const serviceId = `${site.url}/#servizi`
  const address = {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.countryCode,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        url,
        email: `mailto:${site.email}`,
        jobTitle: dict.meta.jobTitle,
        description: dict.meta.description,
        image: absoluteUrl('/og.png'),
        address,
        knowsAbout: [
          'Social Media Management',
          'Meta Ads',
          'Google Ads',
          'Performance marketing',
          'Graphic design',
          'Brand identity',
          'Packaging design',
        ],
        knowsLanguage: ['it', 'en'],
        hasCredential: certifications.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.name,
          credentialCategory: 'certification',
          recognizedBy: { '@type': 'Organization', name: c.issuer },
          ...(c.url ? { url: c.url } : {}),
        })),
        sameAs: [site.instagram.url, site.linkedin],
        worksFor: { '@id': serviceId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': serviceId,
        name: `${site.name} — Social, Ads & Design`,
        url,
        description: dict.meta.description,
        image: absoluteUrl('/og.png'),
        email: site.email,
        telephone: site.phone,
        address,
        areaServed: [
          { '@type': 'City', name: site.city },
          { '@type': 'Country', name: 'Italia' },
        ],
        founder: { '@id': personId },
        priceRange: '€€',
        knowsLanguage: ['it', 'en'],
        sameAs: [site.instagram.url, site.linkedin],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: dict.sections.services.label,
          itemListElement: dict.services.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: `${s.tagline} ${s.outcome}` },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: locale === 'it' ? 'it-IT' : 'en',
        publisher: { '@id': personId },
      },
    ],
  }
}

export function caseJsonLd(c: CaseStudy, locale: Locale) {
  const dict = getDictionary(locale)
  const url = absoluteUrl(paths.case(c.slug, locale))
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#case`,
        name: `${c.client} — ${plain(t(c.strategy.title, locale))}`,
        headline: plain(t(c.challenge.title, locale)),
        description: t(c.excerpt, locale),
        url,
        inLanguage: locale === 'it' ? 'it-IT' : 'en',
        dateCreated: c.year,
        author: { '@type': 'Person', '@id': `${site.url}/#irene`, name: site.name },
        about: c.services.map((s) => dict.services_short[s]),
        image: absoluteUrl('/og.png'),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: absoluteUrl(paths.home(locale)) },
          { '@type': 'ListItem', position: 2, name: dict.sections.work.label, item: absoluteUrl(paths.section('work', locale)) },
          { '@type': 'ListItem', position: 3, name: c.client, item: url },
        ],
      },
    ],
  }
}
