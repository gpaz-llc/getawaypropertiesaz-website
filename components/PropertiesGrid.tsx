'use client'

import { useState, useMemo } from 'react'
import PropertyCard from '@/components/PropertyCard'
import type { Property } from '@/lib/types'

interface PropertiesGridProps {
  properties: Property[]
  initialLocation?: string
}

const LOCATIONS = ['All Destinations', 'Pinetop', 'Show Low', 'Overgaard', 'San Tan Valley'] as const
const GUEST_OPTIONS = [
  { label: 'Any size', value: 'all' },
  { label: '1–6 guests', value: 'small' },
  { label: '7–12 guests', value: 'medium' },
  { label: '13+ guests', value: 'large' },
]

export default function PropertiesGrid({ properties, initialLocation }: PropertiesGridProps) {
  const [location, setLocation] = useState(initialLocation || 'All Destinations')
  const [guestSize, setGuestSize] = useState('all')
  const [petsOnly, setPetsOnly] = useState(false)

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const locMatch = location === 'All Destinations' || p.location === location
      const guestMatch =
        guestSize === 'all' ||
        (guestSize === 'small' && p.guests <= 6) ||
        (guestSize === 'medium' && p.guests >= 7 && p.guests <= 12) ||
        (guestSize === 'large' && p.guests >= 13)
      const petMatch = !petsOnly || p.pets === true
      return locMatch && guestMatch && petMatch
    })
  }, [properties, location, guestSize, petsOnly])

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-white border-b border-border sticky top-[4.5rem] z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-4">

          {/* Location Tabs */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by location">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                aria-pressed={location === loc}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                  location === loc
                    ? 'bg-brand border-brand text-white'
                    : 'bg-transparent border-border text-muted hover:border-brand hover:text-brand'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Right Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label htmlFor="guest-filter" className="text-sm text-muted whitespace-nowrap">
                Group size:
              </label>
              <select
                id="guest-filter"
                value={guestSize}
                onChange={(e) => setGuestSize(e.target.value)}
                className="bg-cream-alt border border-border rounded-full px-4 py-1.5 text-sm text-forest appearance-none cursor-pointer focus:outline-none focus:border-brand"
              >
                {GUEST_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={petsOnly}
                onChange={(e) => setPetsOnly(e.target.checked)}
                className="w-4 h-4 accent-brand rounded cursor-pointer"
              />
              <span className="text-sm text-muted">Pet-friendly only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 mb-4">
        <p className="text-muted text-[0.9375rem]" aria-live="polite">
          Showing <strong className="text-forest">{filtered.length}</strong> of {properties.length} properties
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        {filtered.length > 0 ? (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
            role="list"
            aria-label="Property listings"
          >
            {filtered.map((p, i) => (
              <div key={p.id} role="listitem">
                <PropertyCard property={p} priority={i < 3} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <svg width="48" height="48" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-4" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <h3 className="font-serif text-2xl text-forest mb-2">No properties found</h3>
            <p className="text-muted mb-6">Try adjusting your filters above.</p>
            <button
              onClick={() => { setLocation('All Destinations'); setGuestSize('all'); setPetsOnly(false) }}
              className="bg-brand text-white rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-brand-dark transition-colors cursor-pointer border-none"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
