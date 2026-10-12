import type { ReactNode } from 'react'
import { getDictionary, paths, type Locale } from '@/content'
import { site, whatsappLink } from '@/content/site'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { PageTransition } from '@/components/motion/PageTransition'
import { StrategyProvider } from '@/components/motion/StrategyMode'
import { Cursor } from '@/components/motion/Cursor'
import { Header } from './Header'
import { Footer } from './Footer'
import { Intro } from './Intro'
import { StickyCta } from './StickyCta'

const introStatus: Record<Locale, string> = { it: 'Composizione in corso', en: 'Typesetting' }

/** Tutto ciò che sta intorno alle pagine: header, menu, footer, intro, cursore, motion. */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale)
  const contactHref = paths.section('contact', locale)

  return (
    <MotionProvider>
      <StrategyProvider toastOn={dict.strategy.toast} toastOff={dict.strategy.toastOff}>
        <PageTransition fallbackLabel={site.name} statusLabel={dict.nav.curtain}>
          <a
            href="#main"
            className="label fixed top-3 left-3 z-[120] -translate-y-[200%] bg-acid px-4 py-3 text-ink transition-transform focus:translate-y-0"
          >
            {dict.a11y.skip}
          </a>

          <Intro name={site.name.toUpperCase()} status={introStatus[locale]} />

          <Header
            locale={locale}
            homeHref={paths.home(locale)}
            contactHref={contactHref}
            links={dict.menuItems.map((key) => ({ href: paths.section(key, locale), label: dict.sections[key].label }))}
            availability={site.availability[locale]}
            labels={{
              cta: dict.nav.cta,
              menu: dict.nav.menu,
              close: dict.nav.close,
              strategy: dict.nav.strategy,
              strategyOn: dict.nav.strategyOn,
              strategyKey: dict.nav.strategyKey,
              home: dict.a11y.home,
              menuOpen: dict.a11y.menuOpen,
              menuClose: dict.a11y.menuClose,
              mainNav: dict.a11y.mainNav,
              language: dict.a11y.language,
              menuNote: dict.nav.menuNote,
              switchTo: dict.a11y.switchTo,
            }}
            contacts={{
              email: site.email,
              whatsapp: whatsappLink(dict.contact.direct.whatsappText),
              instagram: site.instagram.url,
              linkedin: site.linkedin,
              city: site.city,
              timeZone: site.timeZone,
            }}
          />

          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>

          <Footer locale={locale} />

          <StickyCta
            href={contactHref}
            label={dict.hero.ctaPrimary}
            whatsapp={whatsappLink(dict.contact.direct.whatsappText)}
            whatsappLabel={dict.contact.direct.whatsapp}
          />
        </PageTransition>
      </StrategyProvider>
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </MotionProvider>
  )
}
