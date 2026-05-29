'use client'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Property } from '@/lib/types'

export default function PropertyCarousel({ properties }: { properties: Property[] }) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'right' ? 336 : -336, behavior: 'smooth' })
  }

  return (
    <div className="relative group/carousel">
      {/* Prev button */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-[45%] -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 bg-white shadow-lg rounded-full items-center justify-center border border-border text-forest text-xl hover:bg-cream transition-colors opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
        aria-label="Scroll left"
      >
        ‹
      </button>

      {/* Scrollable track */}
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 carousel-track"
        style={{ scrollbarWidth: 'none' }}
      >
        {properties.map((p) => (
          <Link
            key={p.id}
            href={`/${p.slug}`}
            className="snap-start flex-none w-[280px] lg:w-[300px] no-underline group/card"
          >
            <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
                />
                {p.pets && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-forest text-[0.7rem] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    🐾 Pet Friendly
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <h3 className="font-serif text-[0.95rem] text-forest font-semibold leading-snug">{p.name}</h3>
                  <span className="text-xs text-amber-500 font-semibold shrink-0">★ {p.rating}</span>
                </div>
                <p className="text-muted text-xs mb-2">{p.locationDisplay}</p>
                <p className="text-forest/60 text-xs">{p.beds} bed · {p.baths} bath · up to {p.guests} guests</p>
              </div>
            </div>
          </Link>
        ))}
        {/* Trailing spacer so last card doesn't butt against edge */}
        <div className="flex-none w-2" aria-hidden="true" />
      </div>

      {/* Next button */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-[45%] -translate-y-1/2 translate-x-5 z-10 w-11 h-11 bg-white shadow-lg rounded-full items-center justify-center border border-border text-forest text-xl hover:bg-cream transition-colors opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  )
}
