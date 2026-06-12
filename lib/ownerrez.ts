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
  id: number
  url: string
  caption?: string
  position?: number
  sort_order?: number
}

interface OwnerRezProperty {
  id: number
  name: string
  photos?: OwnerRezPhoto[]
  listing?: { photos?: OwnerRezPhoto[] }
}

// Returns all photo URLs for a property matched by name.
// Returns empty array if API creds are missing or the property isn't found —
// the page falls back to the local images array in that case.
export async function getOwnerRezPhotos(propertyName: string): Promise<string[]> {
  const headers = getAuthHeaders()
  if (!headers) return []

  try {
    const listRes = await fetch(`${BASE_URL}/properties`, {
      headers,
      next: { revalidate: 86400 }, // re-check property list once a day
    })
    if (!listRes.ok) return []

    const listData = await listRes.json()
    const properties: OwnerRezProperty[] = listData.items ?? listData ?? []

    const nameLower = propertyName.toLowerCase()
    const match = properties.find(
      (p) =>
        p.name.toLowerCase().includes(nameLower) ||
        nameLower.includes(p.name.toLowerCase())
    )
    if (!match) return []

    const detailRes = await fetch(`${BASE_URL}/properties/${match.id}`, {
      headers,
      next: { revalidate: 3600 }, // refresh photos hourly
    })
    if (!detailRes.ok) return []

    const detail: OwnerRezProperty = await detailRes.json()
    const photos: OwnerRezPhoto[] = detail.photos ?? detail.listing?.photos ?? []

    return photos
      .sort((a, b) => (a.position ?? a.sort_order ?? 0) - (b.position ?? b.sort_order ?? 0))
      .map((p) => p.url)
      .filter(Boolean)
  } catch {
    return []
  }
}
