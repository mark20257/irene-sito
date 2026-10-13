import { getDictionary, type Locale } from '@/content'
import { site } from '@/content/site'

/**
 * ⚠️ Informativa d'esempio per un sito vetrina con form contatti, senza cookie di profilazione.
 *    Va verificata e completata da un professionista prima della pubblicazione
 *    (e aggiornata se aggiungi Meta Pixel, Google Analytics o altri strumenti di tracciamento).
 */
const content = {
  it: [
    ['Titolare del trattamento', `${site.name}, P.IVA ${site.vat}, ${site.city} (${site.countryCode}). Contatto: ${site.email}.`],
    ['Quali dati raccolgo', 'Solo quelli che mi scrivi nel modulo contatti: nome, email, brand, budget indicativo e messaggio. Il sito non usa cookie di profilazione né strumenti di tracciamento pubblicitario.'],
    ['Perché li uso', 'Per risponderti e, se lo vorrai, preparare una proposta. Base giuridica: misure precontrattuali richieste da te (art. 6.1.b GDPR) e il tuo consenso (art. 6.1.a).'],
    ['Per quanto tempo', 'Per il tempo necessario a gestire la tua richiesta e comunque non oltre 24 mesi dall’ultimo contatto, salvo obblighi di legge.'],
    ['Con chi li condivido', 'Con i fornitori tecnici strettamente necessari: hosting del sito e servizio di invio email, nominati responsabili del trattamento. Nessuna vendita, nessuna newsletter non richiesta.'],
    ['I tuoi diritti', `Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità o opporti al trattamento scrivendo a ${site.email}. Puoi anche presentare reclamo al Garante per la protezione dei dati personali.`],
    ['Cookie', 'Solo cookie tecnici indispensabili al funzionamento del sito. Nessun cookie di profilazione, quindi nessun banner.'],
  ],
  en: [
    ['Data controller', `${site.name}, VAT ${site.vat}, ${site.city} (${site.countryCode}). Contact: ${site.email}.`],
    ['What I collect', 'Only what you write in the contact form: name, email, brand, indicative budget and message. The site uses no profiling cookies or ad-tracking tools.'],
    ['Why I use it', 'To reply to you and, if you want, prepare a proposal. Legal basis: pre-contractual steps you requested (Art. 6.1.b GDPR) and your consent (Art. 6.1.a).'],
    ['How long', 'For as long as needed to handle your request and no longer than 24 months from our last contact, unless the law requires otherwise.'],
    ['Who I share it with', 'Only the technical providers strictly necessary: website hosting and email delivery, appointed as data processors. No selling, no unsolicited newsletters.'],
    ['Your rights', `You can request access, rectification, erasure, restriction, portability or object to processing by writing to ${site.email}. You can also lodge a complaint with the Italian Data Protection Authority (Garante).`],
    ['Cookies', 'Only technical cookies essential for the site to work. No profiling cookies, hence no banner.'],
  ],
} satisfies Record<Locale, [string, string][]>

export function PrivacyView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  return (
    <section data-theme="light" className="theme-light pt-[calc(var(--header-h)+clamp(2rem,6vw,5rem))] pb-[var(--section-y)]">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-4 lg:col-span-4">
          <h1 className="t-h2">{dict.privacy.title}</h1>
          <p className="mt-6 text-sm text-muted">{dict.privacy.updated}</p>
        </div>
        <div className="col-span-4 lg:col-span-7 lg:col-start-6">
          <dl className="card px-6 sm:px-10">
            {content[locale].map(([title, body]) => (
              <div key={title} className="grid gap-2 border-b border-line py-6 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <dt className="pt-0.5 font-semibold">{title}</dt>
                <dd className="text-[1.05rem] leading-relaxed text-ink-2">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
