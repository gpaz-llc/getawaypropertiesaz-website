'use client'

/**
 * Custom next/image loader — bypasses Vercel's Image Optimization API.
 *
 * The property galleries pull 600+ photos from OwnerRez, which blew through the
 * account's optimization quota; `/_next/image` then returned 402 for every new
 * transform and the galleries rendered blank. OwnerRez and Airbnb both already
 * serve pre-sized variants from their own CDNs for free, so we point the browser
 * straight at the correct variant instead of paying to re-derive one.
 */

interface LoaderArgs {
  src: string
  width: number
}

// OwnerRez variants, smallest first. Anything wider falls back to Large
// (1200x800) — LargeOriginal is ~2 MB and /f/<hash> is the ~9 MB raw upload,
// neither of which is worth serving to a browser.
const OREZ_VARIANTS: ReadonlyArray<readonly [number, string]> = [
  [300, 'Small'],
  [600, 'Medium'],
]
const OREZ_MAX = 'Large'

// Airbnb's CDN only honours these exact `im_w` values — any other width 404s,
// so we snap up to the next supported one rather than passing `width` through.
const MUSCACHE_WIDTHS = [120, 240, 320, 480, 720, 960, 1200, 1440, 1920, 2560]

export default function imageLoader({ src, width }: LoaderArgs): string {
  if (src.includes('uc.orez.io')) {
    // URLs arrive as either /i/<hash>-<Variant> or /f/<hash>; normalise both.
    const hash = /uc\.orez\.io\/[if]\/([0-9a-f]+)/i.exec(src)?.[1]
    if (!hash) return src
    const variant = OREZ_VARIANTS.find(([w]) => width <= w)?.[1] ?? OREZ_MAX
    return `https://uc.orez.io/i/${hash}-${variant}`
  }

  if (src.includes('a0.muscache.com')) {
    const snapped = MUSCACHE_WIDTHS.find((w) => width <= w) ?? MUSCACHE_WIDTHS[MUSCACHE_WIDTHS.length - 1]
    return src.includes('im_w=')
      ? src.replace(/im_w=\d+/, `im_w=${snapped}`)
      : `${src}${src.includes('?') ? '&' : '?'}im_w=${snapped}`
  }

  // Local files in /public are already sized and WebP-compressed — serve as-is.
  return src
}
