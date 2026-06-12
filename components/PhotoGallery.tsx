'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Props {
  photos: string[]
  propertyName: string
}

export default function PhotoGallery({ photos, propertyName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : 0)), [photos.length])
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : 0)), [photos.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, prev, next])

  if (photos.length === 0) return null

  const visible = photos.slice(0, 5)
  const total = photos.length

  return (
    <>
      {/* Bento grid */}
      <div className="relative">
        {/* Mobile: single hero */}
        <div className="md:hidden relative h-[55vw] min-h-[260px] max-h-[420px] overflow-hidden cursor-pointer" onClick={() => open(0)}>
          <Image src={photos[0]} alt={`${propertyName} — photo 1`} fill sizes="100vw" className="object-cover" priority />
        </div>

        {/* Desktop: bento grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1.5" style={{ height: '480px' }}>
          {/* Large left photo */}
          <div className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group" onClick={() => open(0)}>
            <Image src={visible[0]} alt={`${propertyName} — photo 1`} fill sizes="50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" priority />
          </div>

          {/* 4 right thumbnails */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => open(i)}>
              {visible[i] ? (
                <Image
                  src={visible[i]}
                  alt={`${propertyName} — photo ${i + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-forest/10" />
              )}
            </div>
          ))}
        </div>

        {/* View all button */}
        {total > 1 && (
          <button
            onClick={() => open(0)}
            className="absolute bottom-4 right-4 bg-white text-forest text-sm font-medium px-4 py-2 rounded-lg border border-border shadow-sm hover:bg-cream transition-colors flex items-center gap-2"
            aria-label={`View all ${total} photos`}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            View all {total} photos
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close gallery"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm tabular-nums">
            {lightboxIndex + 1} / {total}
          </div>

          {/* Prev */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous photo"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl mx-auto px-16 py-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex]}
              alt={`${propertyName} — photo ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next photo"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
