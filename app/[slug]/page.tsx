import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PROPERTIES, REVIEWS, getPropertyBySlug } from '@/data/properties'
import InquiryForm from '@/components/InquiryForm'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) return {}
  return {
    title: `${property.name} — ${property.locationDisplay}`,
    description: property.description,
    openGraph: {
      images: [{ url: property.images[0], width: 1200, height: 800, alt: property.name }],
    },
  }
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Hot Tub': <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4M12 2v4M16 2v4M4 9h16l-2 9H6L4 9z"/></svg>,
  'Fire Pit': <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  'Dog Friendly': <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/><path d="M8 14v.5A3.5 3.5 0 0 0 11.5 18h1a3.5 3.5 0 0 0 3.5-3.5V14a2 2 0 0 1 2-2h.5a2 2 0 0 0 2-2v-.5"/></svg>,
}

function DefaultAmenityIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  if (!property) notFound()

  const { name, tagline, locationDisplay, rating, reviewCount, beds, baths, guests, images, amenities, longDescription, pets } = property

  const propertyReviews = REVIEWS.filter((r) => r.propertyId === property.id)
  const relatedProperties = PROPERTIES.filter((p) => p.id !== property.id && p.location === property.location).slice(0, 3)

  return (
    <>
      {/* HERO — Full-bleed property photo */}
      <section className="relative pt-[4.5rem]" aria-label={`${name} hero image`}>
        <div className="relative h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden">
          <Image
            src={images[0]}
            alt={`${name} — main photo`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent" aria-hidden="true" />

          {/* Breadcrumb over image */}
          <div className="absolute top-6 left-6 right-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-white/80 list-none p-0 m-0">
                <li><Link href="/" className="text-white/80 no-underline hover:text-white">Home</Link></li>
                <li aria-hidden="true" className="text-white/50">›</li>
                <li><Link href="/properties" className="text-white/80 no-underline hover:text-white">Properties</Link></li>
                <li aria-hidden="true" className="text-white/50">›</li>
                <li className="text-white" aria-current="page">{name}</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Secondary image grid */}
        {images.length > 1 && (
          <div className="hidden md:grid grid-cols-2 gap-2 max-h-48 overflow-hidden" aria-label="Additional property photos">
            {images.slice(1, 3).map((src, i) => (
              <div key={i} className="relative h-48 overflow-hidden">
                <Image src={src} alt={`${name} — photo ${i + 2}`} fill sizes="50vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column — Property Details */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 pb-8 border-b border-border">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-muted text-sm font-medium mb-1">{locationDisplay}</p>
                  <h1 className="font-serif text-[2.5rem] leading-tight">{name}</h1>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-serif text-3xl font-bold text-cta">{rating}</div>
                  <div className="text-sm text-muted mt-0.5">★ {reviewCount} reviews</div>
                </div>
              </div>
              <p className="text-muted font-medium mb-4">{tagline}</p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: '🛏', label: `${beds} bedroom${beds !== 1 ? 's' : ''}` },
                  { icon: '🚿', label: `${baths} bathroom${baths !== 1 ? 's' : ''}` },
                  { icon: '👥', label: `Up to ${guests} guests` },
                  ...(pets ? [{ icon: '🐾', label: 'Pets welcome' }] : []),
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-forest text-[0.9375rem]">
                    <span aria-hidden="true">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10 pb-8 border-b border-border">
              <h2 className="font-serif text-2xl mb-4">About This Property</h2>
              <p className="text-muted leading-[1.8] text-[1.0625rem]">{longDescription}</p>
            </div>

            {/* Amenities */}
            <div className="mb-10 pb-8 border-b border-border">
              <h2 className="font-serif text-2xl mb-6">What This Place Offers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-forest">
                    <span className="text-brand w-5 shrink-0">
                      {AMENITY_ICONS[amenity] || <DefaultAmenityIcon />}
                    </span>
                    <span className="text-[0.9375rem]">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Reviews */}
            {propertyReviews.length > 0 && (
              <div className="mb-10 pb-8 border-b border-border">
                <h2 className="font-serif text-2xl mb-6">Guest Reviews</h2>
                <div className="space-y-6">
                  {propertyReviews.map((r) => (
                    <blockquote key={r.id} className="bg-cream-alt rounded-2xl p-6 border border-border">
                      <div className="flex gap-1 mb-3" aria-label={`${r.rating} out of 5 stars`}>
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-cta)" aria-hidden="true">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-forest text-[0.9375rem] leading-[1.75] italic mb-4">&ldquo;{r.text}&rdquo;</p>
                      <footer className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center font-serif text-white font-semibold" aria-hidden="true">{r.name[0]}</div>
                        <div>
                          <cite className="not-italic text-forest font-semibold text-sm">{r.name}</cite>
                          <p className="text-muted text-xs">{r.location} · Verified Guest</p>
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Location</h2>
              <div className="bg-cream-alt rounded-2xl border border-border p-6 flex items-start gap-4">
                <svg width="24" height="24" fill="none" stroke="var(--color-brand)" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="font-semibold text-forest mb-1">{locationDisplay}</p>
                  <p className="text-muted text-sm leading-relaxed">
                    Located in Arizona&apos;s scenic White Mountains — cool mountain air, towering pines, and outdoor adventures await just outside your door.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Inquiry Form */}
          <div className="lg:col-span-1">
            <div id="inquire" className="sticky top-24 bg-white rounded-2xl border border-border p-8 shadow-[0_4px_24px_rgba(28,26,20,0.08)]">
              <h2 className="font-serif text-2xl mb-1">Inquire to Book</h2>
              <p className="text-muted text-sm mb-6">We respond within 2–4 hours. No fees to inquire.</p>
              <InquiryForm propertyName={name} />
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PROPERTIES */}
      {relatedProperties.length > 0 && (
        <section className="bg-cream-alt py-20" aria-labelledby="related-h">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 id="related-h" className="font-serif text-2xl mb-8">More in {property.locationDisplay}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((p) => (
                <Link
                  key={p.id}
                  href={`/${p.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-border no-underline group block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-cta text-xs font-semibold mb-1">★ {p.rating} · {p.reviewCount} reviews</p>
                    <h3 className="font-serif text-lg text-forest font-semibold mb-1 group-hover:text-brand transition-colors">{p.name}</h3>
                    <p className="text-muted text-sm">{p.beds} bed · {p.baths} bath · {p.guests} guests</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
