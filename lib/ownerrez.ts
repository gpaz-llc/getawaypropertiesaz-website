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
  property_id: number
  photos?: OwnerRezPhoto[]
}

// Returns all photo URLs for a property.
// Requires the OwnerRez property ID — falls back to empty array if API creds missing.
export async function getOwnerRezPhotos(propertyId: number): Promise<string[]> {
  const headers = getAuthHeaders()
  if (!headers) return []

  try {
    const res = await fetch(`${BASE_URL}/listings?includeImages=true`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const data = await res.json()
    const listings: OwnerRezListing[] = data.items ?? data ?? []

    const listing = listings.find((l) => l.property_id === propertyId)
    if (!listing?.photos?.length) return []

    return listing.photos
      .sort((a, b) => (a.sort_order ?? a.position ?? 0) - (b.sort_order ?? b.position ?? 0))
      .map((p) => p.large_url ?? p.original_url ?? p.cropped_url ?? '')
      .filter(Boolean)
  } catch {
    return []
  }
}
