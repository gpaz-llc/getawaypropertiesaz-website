import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'a0.muscache.com' },            // Airbnb CDN (fallback images)
      { protocol: 'https', hostname: '*.ownerreservations.com' },    // OwnerRez photo CDN
      { protocol: 'https', hostname: 'imagedelivery.net' },          // Cloudflare Images (used by OwnerRez)
      { protocol: 'https', hostname: 'assets.wander.com' },
      { protocol: 'https', hostname: 'assets-websites.wander.com' },
      { protocol: 'https', hostname: 'wander-upload-assets.wander.com' },
    ],
  },
}

export default nextConfig
