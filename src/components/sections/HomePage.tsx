import type { Locale } from '@/content'
import { homeJsonLd, jsonLdScript } from '@/lib/seo'
import { Hero } from './Hero'
import { Manifesto } from './Manifesto'
import { Services } from './Services'
import { Work } from './Work'
import { Feed } from './Feed'
import { Numbers } from './Numbers'
import { Method } from './Method'
import { Clients } from './Clients'
import { About } from './About'
import { Contact } from './Contact'

/** La home, sezione per sezione (stessa struttura in italiano e in inglese). */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(homeJsonLd(locale)) }} />
      <Hero locale={locale} />
      <Manifesto locale={locale} />
      <Services locale={locale} />
      <Work locale={locale} />
      <Feed locale={locale} />
      <Numbers locale={locale} />
      <Method locale={locale} />
      <Clients locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </>
  )
}
