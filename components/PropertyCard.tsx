import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property
  priority?: boolean
}

export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const { slug, name, tagline, locationDisplay, rating, reviewCount, beds, baths, guests, images, amenities } = property

  const ratingLabel = rating >= 5.0 ? 'Perfect' : rating >= 4.8 ? 'Exceptional' : rating >= 4.5 ? 'Excellent' : 'Great'

  return (
    <article className="property-card bg-white rounded-2xl overflow-hidden border border-border group" aria-label={`${name} in ${locationDisplay}`}>
      {/* Image */}
      <Link href={`/${slug}`} tabIndex={-1} aria-hidden="true" className="block relative overflow-hidden aspect-[4/3]">
        <Image
          src={images[0]}
          alt={`${name} — ${tagline}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover card-zoom"
          priority={priority}
        />
        {/* Location Badge */}
        <span className="absolute top-3 left-3 bg-cream/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-brand border border-brand/20 z-10">
          {locationDisplay}
        </span>
        {/* Pet badge */}
        {property.pets && (
          <span className="absolute top-3 right-3 bg-cream/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-forest border border-border z-10">
            🐾 Dog OK
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 pb-6">
        {/* Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.8rem] font-semibold text-cta">
            ★ {rating} <span className="text-muted font-normal">({reviewCount} reviews)</span>
          </span>
          <span className="text-xs text-muted">{beds} bd · {baths} ba · {guests} guests</span>
        </div>

        {/* Name */}
        <Link href={`/${slug}`} className="no-underline">
          <h3 className="font-serif text-xl font-semibold text-forest mb-1 hover:text-brand transition-colors leading-tight">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted mb-4 leading-snug">{tagline}</p>

        {/* Amenity Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {amenities.slice(0, 3).map((a) => (
            <span key={a} className="inline-flex items-center bg-cream-alt text-muted rounded-full px-3 py-1 text-xs font-medium border border-border">
              {a}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Link
            href={`/${slug}`}
            className="flex-1 inline-flex items-center justify-center bg-cta text-white rounded-full py-2.5 text-sm font-semibold no-underline hover:bg-cta-dark transition-colors duration-200"
          >
            View Details
          </Link>
          <Link
            href={`/property/${slug}#inquire`}
            className="inline-flex items-center justify-center border border-border text-forest rounded-full px-4 py-2.5 text-sm font-medium no-underline hover:border-brand hover:text-brand transition-colors duration-200"
          >
            Inquire
          </Link>
        </div>
      </div>
    </article>
  )
}
