import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import InquiryForm from '@/components/InquiryForm'

export const metadata: Metadata = {
  title: 'Weddings & Events',
  description: 'Host your dream wedding, elopement, corporate retreat, or celebration in Arizona\'s White Mountains. Getaway Properties AZ offers stunning event-ready properties that sleep large groups.',
}

const EVENT_TYPES = [
  {
    icon: '💍',
    title: 'Weddings & Elopements',
    body: 'Intimate ceremonies to full celebrations. Our properties provide the backdrop, the space, and the privacy your special day deserves.',
  },
  {
    icon: '🥂',
    title: 'Rehearsal Dinners',
    body: 'Gather the wedding party the night before in the comfort of a stunning mountain home — no restaurants, no schedules, just family.',
  },
  {
    icon: '🏢',
    title: 'Corporate Retreats',
    body: 'Step away from the office and into the pines. Our large-group properties are perfect for team offsites, strategy sessions, and celebrations.',
  },
  {
    icon: '🎉',
    title: 'Birthday & Milestone Celebrations',
    body: 'Big birthdays, anniversaries, and reunions deserve a setting as memorable as the occasion. We make large group logistics simple.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Reunions',
    body: 'Sleep everyone under one roof. Our multi-bedroom estates keep families together — no hotel hallways, no splitting up the group.',
  },
  {
    icon: '🧘',
    title: 'Retreats & Wellness Groups',
    body: 'Yoga retreats, wellness weekends, creative workshops — our secluded mountain properties offer the peace and space to go deep.',
  },
]

const FEATURED_VENUES = [
  {
    name: 'The Willows Lakehouse',
    slug: 'the-willows-lakehouse',
    location: 'Pinetop-Lakeside, AZ',
    guests: 27,
    beds: 6,
    baths: 7,
    highlight: 'Our signature event venue — waterfront setting, lake views, hot tub, and space for up to 27 guests. Has hosted weddings, elopements, corporate retreats, and family reunions. Wild horses have been spotted at the lake in the evenings.',
    tags: ['Waterfront', 'Lake Views', 'Hot Tub', 'Sleeps 27', 'Wedding Venue', 'Event Friendly'],
    image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1212321083657110835/original/4aed1177-5267-4187-9af4-b2eb2d3b40bb.png?im_w=1200',
    badge: 'Signature Venue',
  },
]

const PROCESS = [
  { step: '01', title: 'Reach Out', body: 'Fill out the event inquiry form below with your date, group size, and vision. Our team will be in touch to discuss the details.' },
  { step: '02', title: 'Choose Your Venue', body: 'We\'ll match you with the right property based on your headcount, event type, and needs — and answer every question.' },
  { step: '03', title: 'Book Direct', body: 'Book directly with us for a dedicated point of contact and personalized support from inquiry through checkout.' },
  { step: '04', title: 'Show Up & Celebrate', body: 'We handle the details so you can focus on the moment. Our team is available throughout your stay.' },
]

export default function WeddingsEventsPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="pt-36 pb-24 bg-forest-dark relative overflow-hidden"
        aria-labelledby="events-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=40')" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-white/60 list-none p-0 m-0">
              <li><Link href="/" className="text-white/60 no-underline hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/40">›</li>
              <li className="text-white/90" aria-current="page">Weddings & Events</li>
            </ol>
          </nav>
          <p className="text-brand-light text-xs font-semibold tracking-[0.15em] uppercase mb-3">Celebrations & Gatherings</p>
          <h1 id="events-heading" className="text-white italic max-w-2xl mb-5">
            Your Dream Event,<br />Set in the Arizona Mountains
          </h1>
          <p className="text-white/75 text-lg max-w-xl leading-relaxed mb-8">
            From intimate elopements to large family reunions, our event-ready properties in the White Mountains provide the space, the scenery, and the support to make every celebration unforgettable.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#inquire"
              className="bg-cta text-white rounded-full px-8 py-3.5 font-semibold text-[0.9375rem] no-underline hover:bg-cta-dark transition-colors"
            >
              Inquire About Your Event
            </a>
            <a
              href="#venues"
              className="bg-white/15 border border-white/35 text-white rounded-full px-8 py-3.5 font-semibold no-underline hover:bg-white/25 transition-colors backdrop-blur-sm"
            >
              View Event Venues
            </a>
          </div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="py-24 bg-white" aria-labelledby="event-types-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">What We Host</p>
            <h2 id="event-types-heading">Every Occasion, Every Size</h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">
              Whether you&apos;re planning for 10 or 27, our properties are built for gathering.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENT_TYPES.map(({ icon, title, body }) => (
              <div key={title} className="bg-cream rounded-2xl p-8 border border-border">
                <div className="text-3xl mb-4" aria-hidden="true">{icon}</div>
                <h3 className="font-serif text-xl text-forest mb-3">{title}</h3>
                <p className="text-muted text-[0.9375rem] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VENUES */}
      <section id="venues" className="py-24 bg-cream" aria-labelledby="venues-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">Event Venues</p>
            <h2 id="venues-heading">Our Event-Ready Properties</h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">
              Currently featuring The Willows Lakehouse — with more event-capable properties coming soon.
            </p>
          </div>

          {FEATURED_VENUES.map((venue) => (
            <div key={venue.slug} className="bg-white rounded-3xl overflow-hidden border border-border shadow-[0_4px_32px_rgba(28,26,20,0.08)] mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-80 lg:h-full min-h-[360px] overflow-hidden">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-cta text-white text-xs font-bold rounded-full px-4 py-1.5">{venue.badge}</span>
                  </div>
                </div>
                {/* Details */}
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">{venue.location}</p>
                  <h3 className="font-serif text-3xl text-forest mb-2">{venue.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted mb-5">
                    <span>🛏 {venue.beds} bedrooms</span>
                    <span>🚿 {venue.baths} bathrooms</span>
                    <span>👥 Up to {venue.guests} guests</span>
                  </div>
                  <p className="text-muted leading-[1.8] text-[1.0625rem] mb-6">{venue.highlight}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {venue.tags.map((tag) => (
                      <span key={tag} className="bg-cream-alt border border-border text-forest text-xs font-medium rounded-full px-3 py-1">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/${venue.slug}`}
                      className="bg-brand text-white rounded-full px-6 py-3 font-semibold text-sm no-underline hover:bg-brand-dark transition-colors"
                    >
                      View Full Listing
                    </Link>
                    <a
                      href="#inquire"
                      className="border border-border text-forest rounded-full px-6 py-3 font-semibold text-sm no-underline hover:border-brand hover:text-brand transition-colors"
                    >
                      Inquire About This Venue
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="bg-forest-dark rounded-3xl p-10 text-center border border-white/10">
            <div className="text-4xl mb-4" aria-hidden="true">🏔️</div>
            <h3 className="font-serif text-2xl text-white mb-3">More Event Venues Coming Soon</h3>
            <p className="text-white/60 text-[1.0625rem] leading-relaxed max-w-lg mx-auto mb-6">
              We&apos;re growing our portfolio of event-ready properties across the White Mountains.
              If you have a specific date or vision in mind, reach out — we&apos;ll let you know what&apos;s available.
            </p>
            <a
              href="#inquire"
              className="inline-block bg-cta text-white rounded-full px-8 py-3.5 font-semibold text-[0.9375rem] no-underline hover:bg-cta-dark transition-colors"
            >
              Get on Our Events List
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">Simple Process</p>
            <h2 id="process-heading">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ step, title, body }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-5">
                  <span className="font-serif text-xl font-bold text-brand">{step}</span>
                </div>
                <h3 className="font-serif text-lg text-forest mb-2">{title}</h3>
                <p className="text-muted text-[0.9375rem] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS CALLOUT */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote>
            <div className="flex justify-center gap-1 mb-5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--color-cta)" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="font-serif text-2xl text-forest italic leading-relaxed mb-6">
              &ldquo;Words cannot describe how beautiful this home is. We booked our wedding there, site unseen, and it far exceeded our expectations. The grounds are magical, the views are stunning, and the team was helpful every step of the way. Wild horses came to drink at the lake in the evening — beautiful memories for all.&rdquo;
            </p>
            <footer>
              <cite className="not-italic text-muted font-semibold">Korri — Yuma, Arizona · Verified Wedding Guest</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* EVENT INQUIRY FORM */}
      <section id="inquire" className="py-24 bg-white" aria-labelledby="event-inquire-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-3 flex items-center gap-2">
                <span className="block w-8 h-px bg-brand" aria-hidden="true" />
                Event Inquiries
              </p>
              <h2 id="event-inquire-heading" className="mb-4">Let&apos;s Plan<br />Your Celebration</h2>
              <p className="text-muted text-[1.0625rem] leading-[1.8] mb-8 max-w-md">
                Ready to start planning? Fill out the form and our team will reach out to discuss availability, pricing, and how we can make your event exceptional.
              </p>
              <div className="space-y-5">
                {[
                  ['📅', 'Flexible dates', 'Let us know your preferred dates and we\'ll check availability across all event-ready properties.'],
                  ['👥', 'Any group size', 'From 10 to 27 guests under one roof — we\'ll match you with the right space.'],
                  ['💬', 'Personal support', 'Our team handles questions before, during, and after your event.'],
                  ['💳', 'Custom pricing', 'Event pricing is tailored to your date, group size, and property. An event hosting fee applies for weddings and private events. Reach out for a custom quote.'],
                ].map(([icon, title, desc]) => (
                  <div key={title as string} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 text-lg" aria-hidden="true">{icon}</div>
                    <div>
                      <strong className="text-forest text-sm block mb-0.5">{title}</strong>
                      <span className="text-muted text-[0.9375rem]">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — Form */}
            <div className="bg-cream-alt rounded-2xl p-10 border border-border">
              <h3 className="font-serif text-2xl mb-1">Event Inquiry</h3>
              <p className="text-muted text-sm mb-8">Tell us about your event and we&apos;ll find the perfect venue.</p>
              <InquiryForm propertyName="Weddings & Events Inquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
