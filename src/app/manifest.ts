import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Irene Chies — Social, Ads, Design',
    short_name: 'Irene Chies',
    description: 'Social Media Manager, Advertiser Meta & Google e Graphic Designer.',
    start_url: '/',
    display: 'browser',
    background_color: '#fbfaff',
    theme_color: '#6b3cf6',
    lang: 'it-IT',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
