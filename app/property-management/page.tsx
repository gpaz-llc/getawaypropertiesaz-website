import type { Metadata } from 'next'
import Link from 'next/link'
import InquiryForm from '@/components/InquiryForm'

export const metadata: Metadata = {
  title: 'Property Management Services',
  description: 'Own a vacation rental in Arizona\'s White Mountains or San Tan Valley? Partner with Getaway Properties AZ for full-service property management — from listing to guest support.',
}

const SERVICES = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Listing Management',
    body: 'We create and optimize your listings on Airbnb, VRBO, and our direct booking site — professional photography guidance, compelling descriptions, and pricing that maximizes revenue.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Channel & Calendar Sync',
    body: 'We manage all your channels through OwnerRez — no double bookings, no headaches. Rates, availability, and rules stay synchronized across every platform automatically.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Guest Communication',
    body: 'From the first inquiry to the checkout review, our team handles all guest communication promptly and professionally — so you don\'t have to be on call.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Dynamic Pricing',
    body: 'We use market data and seasonal trends to set rates that keep your property competitively priced and consistently booked — without leaving money on the table.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Maintenance Coordination',
    body: 'We coordinate cleaning, inspections, and repairs with trusted local vendors — keeping your property in top condition between every stay.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Owner Reporting',
    body: 'Transparent monthly statements, revenue summaries, and booking reports through your dedicated OwnerRez owner portal. Always know how your property is performing.',
  },
]

const WHY_ITEMS = [
  ['Local expertise', 'We know the White Mountains and Arizona vacation rental market inside and out — what guests expect, what rates work, and what makes a stay exceptional.'],
  ['Technology-backed', 'We run on OwnerRez — a best-in-class property management platform that keeps everything organized, automated, and transparent.'],
  ['Owner-first approach', 'Your investment, your goals. We manage your property the way you\'d want it managed — with care, attention to detail, and full visibility.'],
  ['Proven track record', 'Our current portfolio carries a 4.9★ average rating across hundreds of guest stays. We know how to deliver consistently excellent experiences.'],
  ['Direct booking advantage', 'Our direct booking website reduces your dependence on Airbnb and VRBO — which means lower fees and stronger margins for you.'],
  ['Dedicated team', 'You\'ll have a real team behind your property — not a faceless platform. Questions get answered, issues get handled, owners stay informed.'],
]

export default function PropertyManagementPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="pt-36 pb-24 bg-forest-dark relative overflow-hidden"
        aria-labelledby="mgmt-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=40')" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-white/60 list-none p-0 m-0">
              <li><Link href="/" className="text-white/60 no-underline hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/40">›</li>
              <li className="text-white/90" aria-current="page">Property Management</li>
            </ol>
          </nav>
          <p className="text-brand-light text-xs font-semibold tracking-[0.15em] uppercase mb-3">For Property Owners</p>
          <h1 id="mgmt-heading" className="text-white italic max-w-2xl mb-5">
            Let Us Manage Your<br />Vacation Rental
          </h1>
          <p className="text-white/75 text-lg max-w-xl leading-relaxed mb-8">
            Own a property in the White Mountains or Arizona? Partner with the Getaway Properties AZ team for full-service vacation rental management — from listing and bookings to guest support and maintenance.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#owner-inquire"
              className="bg-cta text-white rounded-full px-8 py-3.5 font-semibold text-[0.9375rem] no-underline hover:bg-cta-dark transition-colors"
            >
              Inquire About Management
            </a>
            <a
              href="#services"
              className="bg-white/15 border border-white/35 text-white rounded-full px-8 py-3.5 font-semibold no-underline hover:bg-white/25 transition-colors backdrop-blur-sm"
            >
              What We Offer
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">Full-Service Management</p>
            <h2 id="services-heading">Everything We Handle For You</h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">
              From the first listing to the monthly statement — we take care of it so you can enjoy being an owner.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon, title, body }) => (
              <div key={title} className="bg-cream rounded-2xl p-8 border border-border">
                <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-5">
                  {icon}
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">{title}</h3>
                <p className="text-muted text-[0.9375rem] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="py-24 bg-cream" aria-labelledby="why-partner-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-3 flex items-center gap-2">
                <span className="block w-8 h-px bg-brand" aria-hidden="true" />
                Why Choose Us
              </p>
              <h2 id="why-partner-heading" className="mb-6">The Getaway Properties AZ Difference</h2>
              <div className="space-y-5">
                {WHY_ITEMS.map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="15" height="15" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <strong className="text-forest text-sm block mb-0.5">{title}</strong>
                      <span className="text-muted text-[0.9375rem] leading-relaxed">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats panel */}
            <div className="bg-forest-dark rounded-3xl p-10 text-white">
              <p className="text-brand-light text-xs font-semibold tracking-[0.12em] uppercase mb-6">Our Portfolio at a Glance</p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                {[
                  ['14', 'Properties managed'],
                  ['4.9★', 'Average guest rating'],
                  ['400+', 'Guest stays completed'],
                  ['4', 'Arizona destinations'],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-serif text-[2.5rem] font-bold text-white leading-none mb-1">{val}</div>
                    <p className="text-white/55 text-sm">{label}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-8">
                <p className="text-white/70 text-[0.9375rem] leading-relaxed mb-5">
                  &ldquo;We built our direct booking platform specifically to reduce owner costs and increase your bottom line — not to collect platform fees.&rdquo;
                </p>
                <p className="text-brand-light text-sm font-semibold">— The Getaway Properties AZ Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OWNER PORTAL CTA */}
      <section className="py-16 bg-brand text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-white mb-3">Already a Getaway Properties Owner?</h2>
          <p className="text-white/80 mb-8 text-lg">Access your owner portal to view bookings, statements, and property performance — anytime, anywhere.</p>
          <a
            href="https://portal.getawaypropertiesaz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand rounded-full px-8 py-3.5 font-semibold text-[0.9375rem] no-underline hover:bg-cream transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Owner Portal Login
          </a>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="owner-inquire" className="py-24 bg-white" aria-labelledby="owner-form-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-3 flex items-center gap-2">
                <span className="block w-8 h-px bg-brand" aria-hidden="true" />
                Get in Touch
              </p>
              <h2 id="owner-form-heading" className="mb-4">Interested in<br />a Management Partnership?</h2>
              <p className="text-muted text-[1.0625rem] leading-[1.8] mb-8 max-w-md">
                Tell us about your property — location, type, current status, and what you&apos;re looking for. Our team will reach out to discuss if we&apos;re a great fit.
              </p>
              <div className="space-y-4">
                {[
                  'We typically respond within one business day',
                  'No obligation — just a conversation',
                  'We work with properties in Pinetop, Show Low, Overgaard, and beyond',
                  'New properties and established rentals both welcome',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" fill="none" stroke="var(--color-brand)" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-muted text-[0.9375rem]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-cream-alt rounded-2xl p-10 border border-border">
              <h3 className="font-serif text-2xl mb-1">Owner Inquiry</h3>
              <p className="text-muted text-sm mb-8">Tell us about your property and what you&apos;re looking for.</p>
              <InquiryForm propertyName="Property Management Inquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
