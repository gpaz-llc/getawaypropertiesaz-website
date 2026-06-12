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
  if (!headers) return []

  try {
    // Fetch the listing directly by property ID — more reliable than listing all
    const res = await fetch(`${BASE_URL}/listings/${propertyId}?includeImages=true`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const listing: OwnerRezListing = await res.json()
    if (!listing.photos?.length) return []

    return listing.photos
      .sort((a, b) => (a.sort_order ?? a.position ?? 0) - (b.sort_order ?? b.position ?? 0))
      .map((p) => p.large_url ?? p.original_url ?? p.cropped_url ?? '')
      .filter(Boolean)
  } catch {
    return []
  }
}
