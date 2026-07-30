import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Photos are served straight from the OwnerRez/Airbnb CDNs at their own
    // pre-sized variants — see lib/imageLoader.ts for why.
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    // Widths that line up with the variants the loader can actually return,
    // so srcset never asks for a size the upstream CDN has to invent.
    deviceSizes: [320, 480, 720, 960, 1200, 1920],
    // remotePatterns is unused while loader is 'custom', but kept as the record
    // of which hosts are expected if optimization is ever switched back on.
    remotePatterns: [
      { protocol: 'https', hostname: 'a0.muscache.com' },            // Airbnb CDN (fallback images)
      { protocol: 'https', hostname: '*.ownerreservations.com' },    // OwnerRez photo CDN
      { protocol: 'https', hostname: 'imagedelivery.net' },          // Cloudflare Images (used by OwnerRez)
      { protocol: 'https', hostname: 'uc.orez.io' },                 // OwnerRez uploaded content CDN
      { protocol: 'https', hostname: 'assets.wander.com' },
      { protocol: 'https', hostname: 'assets-websites.wander.com' },
      { protocol: 'https', hostname: 'wander-upload-assets.wander.com' },
    ],
  },
}

export default nextConfig
