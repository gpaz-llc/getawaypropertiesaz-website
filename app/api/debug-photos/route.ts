import { NextResponse } from 'next/server'

export async function GET() {
  const email = process.env.OWNERREZ_EMAIL
  const token = process.env.OWNERREZ_API_TOKEN

  if (!email || !token) {
    return NextResponse.json({ error: 'Missing OWNERREZ_EMAIL or OWNERREZ_API_TOKEN' })
  }

  const encoded = Buffer.from(`${email}:${token}`).toString('base64')
  const headers = {
    Authorization: `Basic ${encoded}`,
    'Content-Type': 'application/json',
  }

  const base = 'https://api.ownerrez.com/v2'
  const firstId = 487053

  // Try several candidate endpoints for photos
  const endpoints = [
    `/properties/${firstId}/photos`,
    `/listings`,
    `/listings/${firstId}`,
    `/listings/${firstId}/photos`,
    `/properties/${firstId}/listing`,
  ]

  const results: Record<string, unknown> = {}
  for (const ep of endpoints) {
    const res = await fetch(`${base}${ep}`, { headers, cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      results[ep] = data
    } else {
      results[ep] = `${res.status} ${res.statusText}`
    }
  }

  return NextResponse.json(results)
}
