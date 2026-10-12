import { site } from '../site'
import type { Dictionary } from './it'

/**
 * ─────────────────────────────────────────────────────────────────────
 *  COPY — ENGLISH
 *  Same structure as `it.ts` (TypeScript checks every key).
 *    *word*    → editorial italic
 *    ==word==  → acid highlighter
 * ─────────────────────────────────────────────────────────────────────
 */

const en: Dictionary = {
  locale: 'en',
  meta: {
    title: `Irene Chies — Social Media Manager & Meta / Google Ads Specialist in ${site.city}, Italy`,
    description: `Social media manager, certified Meta Ads & Google Ads advertiser and graphic designer based in ${site.city}, Italy. Strategy, campaigns and design — online and offline — for brands that want to actually grow.`,
    ogAlt: 'Irene Chies — Social, Ads, Design. I grow brands, online and offline.',
    keywords: [
      `social media manager ${site.city}`,
      'Meta Ads specialist Italy',
      'Google Ads freelancer Italy',
      'social media manager Italy',
      'graphic designer Italy',
      'freelance advertiser',
    ],
    jobTitle: 'Social Media Manager, Meta & Google Ads Advertiser, Graphic Designer',
  },

  a11y: {
    skip: 'Skip to content',
    home: 'Irene Chies — back to home',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    newTab: '(opens in a new tab)',
    backToTop: 'Back to top',
    language: 'Language',
    switchTo: 'Leggi in italiano',
    mainNav: 'Main navigation',
  },

  nav: {
    cta: 'Let’s talk',
    menu: 'Menu',
    close: 'Close',
    strategy: 'Show the strategy',
    strategyOn: 'Strategy visible',
    strategyKey: 'G',
    menuNote: 'Write to me. A person answers, not a bot.',
    curtain: 'Printing…',
  },

  sections: {
    hero: { id: 'start', label: 'Start' },
    manifesto: { id: 'manifesto', label: 'Manifesto' },
    services: { id: 'services', label: 'Services' },
    work: { id: 'work', label: 'Work' },
    feed: { id: 'feed', label: 'The feed' },
    numbers: { id: 'numbers', label: 'Numbers' },
    method: { id: 'method', label: 'Method' },
    clients: { id: 'clients', label: 'Clients' },
    about: { id: 'about', label: 'About' },
    contact: { id: 'contact', label: 'Contact' },
  },

  menuItems: ['services', 'work', 'method', 'about', 'contact'] as const,

  hero: {
    eyebrow: 'Portfolio — 2026',
    location: `Based in ${site.city}, Italy. Working wherever there’s wi-fi.`,
    roles: ['Social Media Manager', 'Meta & Google Advertiser', 'Graphic Designer'],
    rotating: ['Social', 'Ads', 'Design'],
    rotatingLabel: 'I do',
    claim: 'I grow brands.',
    growWord: 'grow',
    claimAccent: 'Online and offline.',
    sub: `Social media manager, certified Meta & Google advertiser and graphic designer based in ${site.city}, Italy. I don’t make posts: I build brands that grow and campaigns that convert.`,
    ctaPrimary: 'Let’s talk about your brand',
    ctaSecondary: 'See the work',
    scroll: 'Scroll. It’s worth it.',
  },

  manifesto: {
    text: 'Likes feel nice. Customers pay the ==bills.== I work for the second: I start from *data,* turn it into ideas you can *see,* and measure everything. If something doesn’t work, I change it. ==Even if it was beautiful.==',
    signature: 'Irene',
  },

  services: {
    title: 'Three crafts. *One* goal.',
    intro: 'Social, ads and design are usually handled by three people who never talk. I make them talk — inside the same head. The result is a consistent brand, from feed to shop window.',
    labels: { includes: 'What’s included', forWho: 'Who it’s for', outcome: 'Expected outcome', expand: 'Show details', collapse: 'Hide details' },
    items: [
      {
        key: 'social',
        title: 'Social Media Management',
        tagline: 'Your feed is your shop window. I treat it like one.',
        includes: [
          'Profile audit and competitor analysis',
          'Strategy and tone of voice',
          'Monthly editorial plan',
          'Graphics, carousels and reels',
          'Copywriting (captions included)',
          'Community management',
          'Monthly report with real KPIs, not just likes',
        ],
        forWho: 'Local businesses and brands that post “whenever” and want a method. E-commerce brands that want a profile that sells even when they’re not running ads.',
        outcome: 'A profile people recognise in three seconds of scrolling, a community that replies, and a calendar that doesn’t depend on Monday-morning inspiration.',
        kpi: { value: '+180%', label: 'avg. followers in 6 months' },
      },
      {
        key: 'ads',
        title: 'Meta & Google Advertising',
        tagline: 'Every euro has a job. And a report.',
        includes: [
          'Technical setup: Pixel, Conversions API, GA4, Tag Manager',
          'Funnel strategy, from discovery to purchase',
          'Meta Ads campaigns (Facebook and Instagram)',
          'Google Ads: Search, Performance Max, Shopping, YouTube',
          'Ad creatives and A/B tests',
          'Weekly optimisation',
          'Clear reports in plain English (not “marketing-speak”)',
        ],
        forWho: 'Anyone who has “boosted” a post and watched the budget vanish. E-commerce, local businesses and services that want measurable leads and sales.',
        outcome: 'Cost per lead under control, readable ROAS, decisions made on data rather than gut feeling. You always know where every euro goes.',
        kpi: { value: '4.6×', label: 'avg. e-commerce ROAS' },
      },
      {
        key: 'design',
        title: 'Online & offline design',
        tagline: 'From post to packaging, one voice.',
        includes: [
          'Brand identity and logo',
          'Social design and templates',
          'Flyers, leaflets and menus',
          'Packaging and labels',
          'Catalogues and brochures',
          'Signage, window graphics, displays',
          'Print-ready files, crop marks included',
        ],
        forWho: 'Brands that look like one thing online and another in store. Anyone going to print who doesn’t want surprises from the printer.',
        outcome: 'A consistent identity everywhere: feed, website, shop window, shelf. And files your printer will thank you for.',
        kpi: { value: '0', label: 'reprints due to file errors' },
      },
    ],
  },

  work: {
    title: 'Proof, *not* promises.',
    intro: 'Six brands, six different problems, one method. Open a project: you’ll find the challenge, the choices made and the numbers — including the ones that didn’t add up at first.',
    views: { label: 'Switch view', grid: 'Grid', index: 'Index' },
    open: 'Open the case',
    cursor: 'Open',
    columns: { client: 'Client', sector: 'Sector', services: 'Services', year: 'Year', result: 'Result' },
  },

  feed: {
    title: 'Looks spontaneous. *It’s all planned.*',
    intro: 'Scroll like your customers would. The margin notes are what I see.',
    phone: { following: 'Following', sponsored: 'Sponsored', likes: 'likes', stories: ['Work', 'Tips', 'Backstage', 'Clients', 'Q&A'] },
    noteLabels: { goal: 'Goal', result: 'Result' },
    end: 'End of feed. Start of results.',
    progress: 'Post',
  },

  numbers: {
    title: 'Numbers. Because words *are free.*',
    footnote: 'Averages across active clients 2022–2026. Results depend on sector, budget and starting point: anyone promising guaranteed numbers is selling you something.',
  },

  method: {
    title: 'Four steps. *No magic.*',
    intro: 'When you buy a service, you want to know what happens after you sign. Here it is.',
    hint: 'Scroll',
    deliverables: 'What you get',
    steps: [
      {
        title: 'Listen',
        lead: 'Before talking, I listen.',
        body: 'Brief, channel audit, competitor analysis and — when possible — a chat with your actual customers. I find out what works, what doesn’t, and why.',
        deliverables: ['Social & ads audit', 'Competitor analysis', 'Audience map'],
        time: 'Week 1',
      },
      {
        title: 'Strategy',
        lead: 'Goals with a number next to them.',
        body: 'Positioning, tone of voice, editorial plan, funnel structure and budget. All written down, all measurable, no fluff.',
        deliverables: ['Strategy document', 'KPIs and goals', 'Editorial & media plan'],
        time: 'Week 2',
      },
      {
        title: 'Create',
        lead: 'The part you see (and remember).',
        body: 'Content, graphics, campaigns and offline materials. One voice everywhere, from reel to flyer.',
        deliverables: ['Content and graphics', 'Online campaigns', 'Print-ready files'],
        time: 'Weeks 3–4',
      },
      {
        title: 'Optimise',
        lead: 'Numbers talk. I listen (again).',
        body: 'Monitoring, A/B tests, weekly tweaks and a monthly report you can read in five minutes.',
        deliverables: ['A/B tests', 'Monthly report', 'Next moves'],
        time: 'Always',
      },
    ],
    loop: 'Then we start again. *Faster,* with more data.',
  },

  clients: {
    title: 'They chose *to grow.*',
    marqueeLabel: 'Some of the brands I’ve worked with',
    testimonialsTitle: 'What they say (unpaid, I promise)',
  },

  about: {
    title: 'Hi, I’m *Irene.*',
    bio: [
      'I started out designing flyers for the café downstairs. Then came social media, the first campaigns, the first five-figure budgets — and the discovery that the most beautiful design in the world is useless if nobody sees it.',
      `Today I work with small businesses and growing brands, between ${site.city} and the rest of Italy. I handle the whole journey: from strategy to campaign, from post to flyer. I love clean reports, prints that come out straight and clients who say “let’s try”.`,
      'After hours: flea markets, horror films and handmade pasta. Not necessarily in that order.',
    ],
    photoAlt: `Portrait of Irene Chies in ${site.city}`,
    photoCaption: `Irene, ${site.city}, 2026. Real photo, real light.`,
    certTitle: 'Certifications',
    certVerify: 'Verify',
    toolsTitle: 'The toolbox',
    statsTitle: 'Irene in numbers (unofficial)',
    stats: [
      { value: '3', label: 'coffees a day', note: 'cannot be optimised' },
      { value: '7', label: 'drafts before the final one', note: 'on average' },
      { value: '0', label: 'reports delivered late', note: 'verified data' },
      { value: '∞', label: 'times I’ve said “let’s run a test”', note: 'and I’d do it again' },
    ],
  },

  contact: {
    title: 'Let’s talk about your *brand.*',
    lead: 'Tell me where you are. I’ll reply within 24 working hours with a first idea — free, no strings attached, no beating around the bush.',
    form: {
      name: 'What’s your name?',
      email: 'Your email',
      brand: 'Your brand (or Instagram handle)',
      budget: 'Monthly budget, roughly',
      budgetOptions: ['Under €500', '€500–1,500', '€1,500–5,000', 'Over €5,000', 'Not sure yet'],
      message: 'Tell me everything (or almost)',
      messagePlaceholder: 'What you sell, to whom, what isn’t working…',
      privacy: 'I have read the privacy policy and agree to my data being processed so I can get a reply.',
      privacyLink: 'privacy policy',
      submit: 'Send message',
      sending: 'Sending…',
      required: 'required',
      errors: {
        required: 'I need this to get back to you.',
        email: 'This email doesn’t look right. Double-check?',
        privacy: 'I need your consent, otherwise I can’t reply.',
        generic: 'Something went wrong. Message me on WhatsApp or by email: it’ll still reach me.',
      },
      success: {
        title: 'Got it!',
        body: 'I’ll reply within 24 working hours (usually sooner, if the coffee does its job).',
        again: 'Send another message',
      },
      fallback: {
        title: 'Almost there.',
        body: 'The form isn’t connected to my inbox yet. I’ve prepared your message: choose how to send it.',
        whatsapp: 'Send via WhatsApp',
        email: 'Send via email',
      },
      subject: 'New enquiry from the website',
    },
    direct: {
      title: 'Prefer to write?',
      whatsapp: 'Message me on WhatsApp',
      whatsappText: 'Hi Irene! I found you on your website: I’d like to talk about my brand.',
      email: 'Email',
      copy: 'Copy',
      copied: 'Copied!',
      calendly: 'Book a 20-minute call',
      response: 'I reply within 24 working hours.',
      social: 'Social',
    },
  },

  footer: {
    kicker: 'Still here?',
    title: 'Then *let’s talk.*',
    cta: 'Write to me',
    menu: 'Menu',
    social: 'Social',
    contacts: 'Contact',
    time: 'Local time',
    slug: 'irene-chies_portfolio_FINAL_v7(2).pdf',
    end: 'The end. Thanks for scrolling all the way down.',
    privacy: 'Privacy',
    cookies: 'No tracking cookies. Only biscuits.',
    vat: 'VAT',
  },

  caseStudy: {
    back: 'All work',
    facts: { client: 'Client', sector: 'Sector', services: 'Services', channels: 'Channels', duration: 'Duration', year: 'Year' },
    chapters: { challenge: 'The challenge', strategy: 'The strategy', creative: 'The creative', results: 'The results', gallery: 'Gallery' },
    moves: 'The moves',
    receipt: { title: 'Non-fiscal receipt', item: 'Item', qty: 'Qty', total: 'Total', thanks: 'Thank you, come again', note: 'Keep for future growth' },
    next: 'Next project',
    ctaKicker: 'Like these numbers?',
    ctaTitle: 'Let’s make *yours.*',
    ctaButton: 'Let’s talk about your brand',
    metaSuffix: 'social, ads & design case study',
  },

  services_short: { social: 'Social', ads: 'Ads', design: 'Design' },

  strategy: {
    toast: 'Strategy mode: every choice has a reason.',
    toastOff: 'Strategy mode off.',
    notes: {
      heroName: 'H1 = my name. The first brand I look after is my own.',
      heroRoles: 'Three words, one positioning. The brain remembers three: don’t waste them.',
      heroCta: 'CTA above the fold. You’ll find it 5 times on this page: it’s not pushy, it’s conversion rate.',
      font: 'Bricolage Grotesque has ink traps, a print detail. Online they’re not needed. But you can see them — like strategy.',
      manifesto: 'Sentences under 15 words. On mobile you read with your thumb, not your patience.',
      services: 'Accordion: fast scrollers read the titles and get it. The detail is there for those who look.',
      work: 'Number first, image second: people decide in 3 seconds whether to trust you.',
      feed: 'The notes clients never see. Here, they do.',
      numbers: 'Big numbers for memory. Footnotes for trust.',
      method: 'Four steps and a loop: no surprises after signing.',
      clients: 'Reviews with name, role and result. Nobody reads anonymous ones.',
      about: 'Real photo, not stock. People buy from people.',
      contact: 'Five fields, not one more. Every extra field costs leads.',
      footer: 'The name again, huge. If you made it this far, you should remember it.',
      grid: '12-column grid. Even the chaos here is typeset.',
    },
  },

  notFound: {
    title: 'Page not found.',
    body: 'This link has a 100% CTR and a 0% conversion rate. Shall we go back to where things happen?',
    cta: 'Back to home',
  },

  privacy: {
    title: 'Privacy',
    updated: 'Last updated: October 2026',
  },
}

export default en
