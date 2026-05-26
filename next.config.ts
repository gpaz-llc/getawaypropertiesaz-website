import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'a0.muscache.com' },     // Airbnb CDN (real property photos)
      // { protocol: 'https', hostname: 'images.unsplash.com' }, // replaced with AI-generated local images
      { protocol: 'https', hostname: 'assets.wander.com' },
      { protocol: 'https', hostname: 'assets-websites.wander.com' },
      { protocol: 'https', hostname: 'wander-upload-assets.wander.com' },
    ],
  },
}

export default nextConfig
