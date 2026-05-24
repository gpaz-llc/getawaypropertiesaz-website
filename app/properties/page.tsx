import type { Metadata } from 'next'
import { PROPERTIES } from '@/data/properties'
import PropertiesGrid from '@/components/PropertiesGrid'

export const metadata: Metadata = {
  title: 'All Properties',
  description: 'Browse all 10 luxury vacation rental cabins in Arizona\'s White Mountains. Filter by location and group size. Book direct and save on fees.',
}

interface PageProps {
  searchParams: Promise<{ location?: string; guests?: string }>
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const initialLocation = params.location
    ? decodeURIComponent(params.location)
    : undefined

  const locationLabel = initialLocation && initialLocation !== 'All Destinations'
    ? `${initialLocation}, AZ`
    : "Arizona's White Mountains"

  return (
    <>
      {/* Page Hero */}
      <section
        className="pt-36 pb-12 bg-forest-dark relative overflow-hidden"
        aria-labelledby="props-page-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=40')" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-white/60 list-none p-0 m-0">
              <li><a href="/" className="text-white/60 no-underline hover:text-white transition-colors">Home</a></li>
              <li aria-hidden="true" className="text-white/40">›</li>
              <li className="text-white/90" aria-current="page">Properties</li>
            </ol>
          </nav>

          <h1 id="props-page-heading" className="text-white italic mb-4">All Properties</h1>
          <p className="text-white/72 text-lg max-w-xl mb-8">
            10 hand-selected luxury cabins in {locationLabel}. Book direct and skip the platform fees.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-10">
            {[
              { value: '10', label: 'Properties' },
              { value: '4.9★', label: 'Avg. Rating' },
              { value: '4', label: 'Destinations' },
              { value: '2–27', label: 'Guests' },
            ].map(({ value, label }) => (
              <div key={label}>
                <span className="font-serif text-[2.25rem] font-bold text-white leading-none block">{value}</span>
                <span className="text-white/55 text-sm block mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filterable Grid — Client Component */}
      <PropertiesGrid properties={PROPERTIES} initialLocation={initialLocation} />

      {/* CTA */}
      <section className="py-16 bg-brand text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-white mb-3">Can&apos;t Find the Perfect Match?</h2>
          <p className="text-white/80 mb-8 text-lg">Tell us your dates, group size, and what you&apos;re looking for — our team will find the ideal property for your getaway.</p>
          <a href="/about#contact" className="inline-flex items-center justify-center bg-white text-brand rounded-full px-8 py-3.5 font-semibold text-[0.9375rem] no-underline hover:bg-cream transition-colors">
            Contact Our Team
          </a>
        </div>
      </section>
    </>
  )
}
