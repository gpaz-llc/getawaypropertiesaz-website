const BASE_URL = 'https://api.ownerrez.com/v2'

function getAuthHeaders(): Record<string, string> | null {
  const email = process.env.OWNERREZ_EMAIL
  const token = process.env.OWNERREZ_API_TOKEN
  if (!email || !token) return null
  const encoded = Buffer.from(`${email}:${token}`).toString('base64')
  return {
    Authorization: `Basic ${encoded}`,
    'Content-Type': 'application/json',
  }
}

interface OwnerRezPhoto {
  large_url?: string
  original_url?: string
  cropped_url?: string
  sort_order?: number
  position?: number
}

interface OwnerRezListing {
  photos?: OwnerRezPhoto[]
}

// Returns all photo URLs for a property by its OwnerRez property ID.
// Falls back to empty array (page uses local images) if API creds are missing.
export async function getOwnerRezPhotos(propertyId: number): Promise<string[]> {
  const headers = getAuthHeaders()
  if (!headers) {
    console.warn(`[ownerrez] OWNERREZ_EMAIL/OWNERREZ_API_TOKEN not set — property ${propertyId} falling back to local images`)
    return []
  }

  try {
    // Fetch the listing directly by property ID — more reliable than listing all
    const res = await fetch(`${BASE_URL}/listings/${propertyId}?includeImages=true`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      // Surface failures loudly instead of silently dropping back to the 3 local
      // fallback images. Note: a 402 seen on the live site in July 2026 came from
      // Vercel's image optimizer, NOT from here — this endpoint returns 200 on all
      // 14 properties. Check /_next/image before suspecting an OwnerRez add-on.
      console.warn(`[ownerrez] listings/${propertyId} returned ${res.status} ${res.statusText} — falling back to local images`)
      return []
    }

    const listing: OwnerRezListing = await res.json()
    if (!listing.photos?.length) {
      console.warn(`[ownerrez] listings/${propertyId} returned no photos — falling back to local images`)
      return []
    }

    return listing.photos
      .sort((a, b) => (a.sort_order ?? a.position ?? 0) - (b.sort_order ?? b.position ?? 0))
      .map((p) => p.large_url ?? p.original_url ?? p.cropped_url ?? '')
      .filter(Boolean)
  } catch (err) {
    console.warn(`[ownerrez] listings/${propertyId} fetch failed — falling back to local images`, err)
    return []
  }
}
