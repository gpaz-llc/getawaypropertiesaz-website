import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import PropertyCard from '@/components/PropertyCard'
import { PROPERTIES, REVIEWS, getFeaturedProperties } from '@/data/properties'

export const metadata: Metadata = {
  title: "Getaway Properties AZ | Luxury Cabin Rentals in Arizona's White Mountains",
}

const DESTINATIONS = [
  {
    name: 'Pinetop',
    tagline: '7,000 ft · Pine forests · Golf, hiking & skiing',
    count: 8,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&h=750&q=80',
    href: '/properties?location=Pinetop',
  },
  {
    name: 'Show Low',
    tagline: '6,400 ft · Torreon Golf · Modern retreats',
    count: 3,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=750&q=80',
    href: '/properties?location=Show+Low',
  },
  {
    name: 'Overgaard',
    tagline: '6,600 ft · Rim Country · 2+ acre forest estates',
    count: 2,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&h=750&q=80',
    href: '/properties?location=Overgaard',
  },
]

const WHY_FEATURES = [
  { title: 'Curated Properties', body: 'Each property is personally selected and maintained to ensure the highest quality standards for your stay.' },
  { title: '24/7 Local Support', body: 'Our team is available around the clock to assist you with any questions or needs during your stay.' },
  { title: 'Book Direct & Save', body: 'Skip platform fees. Book directly with us for the best rates, instant confirmation, and flexible policies.' },
  { title: 'Premium Amenities', body: 'Hot tubs, fire pits, gourmet kitchens, game rooms, mountain views — every property stocked for excellence.' },
]

export default function HomePage() {
  const featured = getFeaturedProperties()
  const preview = PROPERTIES.slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section
        className="relative flex items-end pb-16 hero-bg"
        style={{
          minHeight: '100svh',
          backgroundImage: "url('https://images.unsplash.com/photo-1652887626061-c32621ebbac3?auto=format&fit=crop&w=1920&h=1080&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Hero section"
      >
        <div className="hero-overlay" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <p className="text-white/80 text-sm font-semibold tracking-[0.15em] uppercase mb-5">Arizona&apos;s White Mountains</p>
          <h1 className="text-white max-w-2xl mb-4 italic" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Your Perfect Arizona<br />Mountain Escape
          </h1>
          <p className="text-white/85 text-lg max-w-xl mb-10 leading-relaxed">
            Luxury vacation rentals in Pinetop, Show Low, Overgaard &amp; San Tan Valley. Book direct and skip the fees.
          </p>

          {/* Search bar */}
          <div className="max-w-3xl">
            <form
              action="/properties"
              method="get"
              className="flex flex-col md:flex-row bg-cream/97 backdrop-blur-md rounded-2xl md:rounded-full border border-border shadow-[0_8px_32px_rgba(28,26,20,0.22)] overflow-hidden"
              role="search"
              aria-label="Property search"
            >
              <div className="flex-1 min-w-0">
                <label htmlFor="h-loc" className="sr-only">Destination</label>
                <select id="h-loc" name="location" className="w-full bg-transparent border-none outline-none px-5 py-4 text-[0.9375rem] text-forest font-sans appearance-none cursor-pointer">
                  <option value="">📍 All Destinations</option>
                  <option value="Pinetop">Pinetop, AZ</option>
                  <option value="Show Low">Show Low, AZ</option>
                  <option value="Overgaard">Heber-Overgaard, AZ</option>
                  <option value="San Tan Valley">San Tan Valley, AZ</option>
                </select>
              </div>
              <div className="hidden md:block w-px bg-border my-3" aria-hidden="true" />
              <div className="flex-1 min-w-0 border-t md:border-t-0 border-border">
                <label htmlFor="h-guests" className="sr-only">Group size</label>
                <select id="h-guests" name="guests" className="w-full bg-transparent border-none outline-none px-5 py-4 text-[0.9375rem] text-forest font-sans appearance-none cursor-pointer">
                  <option value="">👤 Group size</option>
                  <option value="small">1–6 guests</option>
                  <option value="medium">7–12 guests</option>
                  <option value="large">13+ guests</option>
                </select>
              </div>
              <div className="p-2 border-t md:border-t-0 border-border">
                <button type="submit" className="w-full md:w-auto bg-cta text-white rounded-full px-7 py-3 font-semibold text-sm hover:bg-cta-dark transition-colors flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  Search
                </button>
              </div>
            </form>
            <div className="flex flex-wrap gap-5 mt-5">
              {[['🔒','Secure Direct Booking'],['⭐','4.9★ Average Rating'],['🕐','24/7 Local Support'],['💳','No Hidden Fees']].map(([icon, label]) => (
                <span key={label} className="text-white/75 text-sm flex items-center gap-1.5"><span aria-hidden="true">{icon}</span>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES PREVIEW */}
      <section id="properties" className="py-24 bg-white" aria-labelledby="props-h">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2 flex items-center gap-2">
                <span className="block w-8 h-px bg-brand" aria-hidden="true" />
                All Properties
              </p>
              <h2 id="props-h">Available Properties</h2>
              <p className="text-muted mt-3 max-w-lg">Hand-selected luxury cabins maintained to the highest standards.</p>
            </div>
            <Link href="/properties" className="shrink-0 inline-flex items-center gap-2 border border-border text-forest rounded-full px-6 py-2.5 text-sm font-medium no-underline hover:border-brand hover:text-brand transition-colors">
              View All 10 →
            </Link>
          </div>
          <div className="grid gap-6" style={{gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))'}}>
            {preview.map((p, i) => (
              <PropertyCard key={p.id} property={p} priority={i < 3} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/properties" className="inline-flex items-center gap-2 bg-brand text-white rounded-full px-8 py-3 font-semibold no-underline hover:bg-brand-dark transition-colors">
              See All 10 Properties →
            </Link>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="py-24 bg-cream" aria-labelledby="dest-h">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">Explore Arizona</p>
            <h2 id="dest-h">Arizona&apos;s White Mountains</h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">Four breathtaking destinations — each with its own character and charm.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DESTINATIONS.map((d) => (
              <Link key={d.name} href={d.href} className="dest-card group relative block h-96 rounded-2xl overflow-hidden no-underline" aria-label={`Browse ${d.name} properties`}>
                <Image src={d.image} alt={`${d.name}, Arizona`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="dest-overlay" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                  <h3 className="font-serif text-3xl text-white font-semibold mb-1">{d.name}</h3>
                  <p className="text-white/78 text-sm mb-4">{d.tagline}</p>
                  <span className="inline-flex items-center bg-white/15 border border-white/30 text-white px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {d.count > 0 ? `${d.count} cabins →` : 'Coming soon →'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY GETAWAY */}
      <section className="py-24 bg-forest-dark relative overflow-hidden" aria-labelledby="why-h">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage:"url('https://images.unsplash.com/photo-1531523240924-bd3a458a5259?auto=format&fit=crop&w=1832&q=60')"}} aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-brand-light text-xs font-semibold tracking-[0.15em] uppercase mb-2">Trusted Local Experts</p>
            <h2 id="why-h" className="text-white">Why Choose Getaway?</h2>
            <p className="text-white/60 mt-3 max-w-lg mx-auto">Exceptional service, hand-selected properties, and a host who genuinely cares.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {WHY_FEATURES.map(({ title, body }) => (
              <div key={title} className="bg-white/6 border border-white/10 rounded-2xl p-8">
                <div className="w-12 h-12 bg-brand/20 rounded-2xl flex items-center justify-center text-brand-light mb-5">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-white text-xl mb-3">{title}</h3>
                <p className="text-white/60 text-[0.9375rem] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center flex flex-wrap gap-4 justify-center">
            <Link href="/about" className="bg-white/15 border border-white/35 text-white rounded-full px-7 py-3 font-semibold no-underline hover:bg-white/25 transition-colors backdrop-blur-sm">Our Story</Link>
            <Link href="/properties" className="bg-cta text-white rounded-full px-7 py-3 font-semibold no-underline hover:bg-cta-dark transition-colors">Browse All Properties</Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24 bg-cream" aria-labelledby="feat-h">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">Guest Favorites</p>
            <h2 id="feat-h">Where Our Guests Love to Stay</h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">Handpicked selections of our most sought-after vacation rentals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured[0] && (
              <Link href={`/${featured[0].slug}`} className="relative block rounded-2xl overflow-hidden no-underline group md:row-span-2" style={{height:'500px'}} aria-label={featured[0].name}>
                <Image src={featured[0].images[0]} alt={featured[0].name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/82 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block bg-cta text-white rounded-full px-4 py-1 text-xs font-bold mb-3">Guest Favorite ★ {featured[0].rating}</span>
                  <h3 className="font-serif text-3xl text-white font-semibold mb-2">{featured[0].name}</h3>
                  <p className="text-white/75 mb-4 text-sm">{featured[0].locationDisplay} · {featured[0].beds} bed · {featured[0].baths} bath · up to {featured[0].guests} guests</p>
                  <span className="inline-flex items-center bg-white/15 border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm">View Property →</span>
                </div>
              </Link>
            )}
            {featured.slice(1, 3).map((p) => (
              <Link key={p.id} href={`/${p.slug}`} className="relative block rounded-2xl overflow-hidden no-underline group" style={{height:'240px'}} aria-label={p.name}>
                <Image src={p.images[0]} alt={p.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-cta text-white rounded-full px-3 py-0.5 text-[0.7rem] font-bold mb-2">★ {p.rating}</span>
                  <h3 className="font-serif text-xl text-white font-semibold mb-1">{p.name}</h3>
                  <p className="text-white/75 text-xs">{p.beds} bed · {p.baths} bath · {p.guests} guests</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-forest-dark" aria-labelledby="rev-h">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-brand-light text-xs font-semibold tracking-[0.15em] uppercase mb-2">Real Guests</p>
            <h2 id="rev-h" className="text-white">What Our Guests Are Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.slice(0, 3).map((r) => (
              <blockquote key={r.id} className="bg-white/6 border border-white/10 rounded-2xl p-8">
                <div className="flex gap-1 mb-5" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({length:r.rating}).map((_,i) => (
                    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="var(--color-cta)" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-white/82 text-[0.9375rem] leading-[1.8] italic mb-6">&ldquo;{r.text}&rdquo;</p>
                <footer className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand flex items-center justify-center font-serif text-white text-lg font-semibold shrink-0" aria-hidden="true">{r.name[0]}</div>
                  <div>
                    <cite className="not-italic text-white font-semibold text-[0.9375rem]">{r.name}</cite>
                    <p className="text-white/50 text-xs mt-0.5">{r.location} · Verified Guest</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20 bg-brand relative overflow-hidden" aria-labelledby="cta-h">
        <div className="absolute top-[-4rem] right-[-4rem] w-72 h-72 bg-white/6 rounded-full" aria-hidden="true" />
        <div className="absolute bottom-[-6rem] left-[-6rem] w-80 h-80 bg-white/4 rounded-full" aria-hidden="true" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-white/80 text-sm font-semibold tracking-[0.12em] uppercase mb-3">Book Direct to Save</p>
          <h2 id="cta-h" className="text-white max-w-2xl mx-auto mb-4">Browse Our Collection of Premium Properties</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg leading-relaxed">No platform fees, no middlemen — just the Getaway Properties AZ team making sure your stay is unforgettable.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/properties" className="bg-white text-brand rounded-full px-8 py-3.5 font-semibold text-[0.9375rem] no-underline hover:bg-cream transition-colors">Explore All Properties</Link>
            <Link href="/about#contact" className="bg-white/15 border border-white/35 text-white rounded-full px-8 py-3.5 font-semibold no-underline hover:bg-white/25 transition-colors backdrop-blur-sm">Contact Our Team</Link>
          </div>
        </div>
      </section>
    </>
  )
}
