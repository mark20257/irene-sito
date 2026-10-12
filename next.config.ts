import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Le foto vere (progetti, ritratto) vengono servite in AVIF/WebP automaticamente.
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
