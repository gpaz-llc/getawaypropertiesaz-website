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

interface OwnerRezProperty {
  id: number
  name: string
}

// Returns all photo URLs for a property matched by name.
// Falls back to empty array (page uses local images) if API creds are missing.
export async function getOwnerRezPhotos(propertyName: string): Promise<string[]> {
  const headers = getAuthHeaders()
  if (!headers) return []

  try {
    // Fetch all properties to find matching ID by name
    const propsRes = await fetch(`${BASE_URL}/properties`, {
      headers,
      next: { revalidate: 86400 },
    })
    if (!propsRes.ok) return []

    const propsData = await propsRes.json()
    const properties: OwnerRezProperty[] = propsData.items ?? propsData ?? []

    const nameLower = propertyName.toLowerCase()
    const match = properties.find(
      (p) =>
        p.name.toLowerCase().includes(nameLower) ||
        nameLower.includes(p.name.toLowerCase())
    )
    if (!match) return []

    // Fetch all listings with images (photos live on the listings endpoint)
    const listingsRes = await fetch(`${BASE_URL}/listings?includeImages=true`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!listingsRes.ok) return []

    const listingsData = await listingsRes.json()
    const listings: OwnerRezListing[] = listingsData.items ?? listingsData ?? []

    const listing = listings.find((l) => l.property_id === match.id)
    if (!listing || !listing.photos?.length) return []

    return listing.photos
      .sort((a, b) => (a.sort_order ?? a.position ?? 0) - (b.sort_order ?? b.position ?? 0))
      .map((p) => p.large_url ?? p.original_url ?? p.cropped_url ?? '')
      .filter(Boolean)
  } catch {
    return []
  }
}
