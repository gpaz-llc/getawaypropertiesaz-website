import type { Metadata } from 'next'
import Image from 'next/image'
import InquiryForm from '@/components/InquiryForm'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet Lori Baker and the Getaway Properties AZ team — your trusted local hosts for luxury vacation rentals in Arizona\'s White Mountains.',
}

const STATS = [
  { value: '14', label: 'Luxury Properties' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '400+', label: 'Happy Guests' },
  { value: '4', label: 'Destinations' },
]

const FAQ = [
  {
    q: 'How do I book directly with you?',
    a: "Fill out the inquiry form below or click 'Inquire to Book' on any property page. Our team responds within 2–4 hours with availability, rates, and a booking link. No accounts or memberships needed.",
  },
  {
    q: 'Is it cheaper to book direct vs. Airbnb?',
    a: 'Yes — typically 10–15% cheaper. Airbnb and VRBO charge 12–20% guest service fees on top of the nightly rate. When you book direct, those fees stay in your pocket.',
  },
  {
    q: 'What is your cancellation policy?',
    a: "Full refund if cancelled 14+ days before check-in, 50% refund within 14 days. We're always willing to work with guests when life happens — just reach out directly.",
  },
  {
    q: 'Are pets allowed?',
    a: "Several properties are dog-friendly — look for the 🐾 badge on property cards. A small pet deposit may apply. Mention your pets when inquiring so we can match you with the right cabin.",
  },
  {
    q: "What's the best time to visit the White Mountains?",
    a: "Every season is magical. Summer (Jun–Aug): cool mountain air, wildflower hikes — perfect Phoenix escape. Fall (Sept–Oct): stunning foliage. Winter: snow and cozy fireplaces. Spring (Mar–May): quiet and beautiful. We love it year-round.",
  },
  {
    q: 'Do you accommodate large groups and events?',
    a: "Absolutely. The Willows Lakehouse sleeps up to 27 guests and has hosted weddings, corporate retreats, birthday celebrations, and family reunions. Reach out to discuss your event needs.",
  },
]

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'info@getawaypropertiesaz.com',
    href: 'mailto:info@getawaypropertiesaz.com',
    icon: <svg width="20" height="20" fill="none" stroke="var(--color-brand)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    label: 'Location',
    value: 'Pinetop · Show Low · Overgaard · San Tan Valley, AZ',
    icon: <svg width="20" height="20" fill="none" stroke="var(--color-brand)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    label: 'Response Time',
    value: 'Within 2–4 hours',
    icon: <svg width="20" height="20" fill="none" stroke="var(--color-brand)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section
        className="pt-36 pb-20 bg-forest-dark relative overflow-hidden"
        aria-labelledby="about-heading"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531523240924-bd3a458a5259?auto=format&fit=crop&w=1920&q=40')" }} aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-white/60 list-none p-0 m-0">
              <li><a href="/" className="text-white/60 no-underline hover:text-white transition-colors">Home</a></li>
              <li aria-hidden="true" className="text-white/40">›</li>
              <li className="text-white/90" aria-current="page">About</li>
            </ol>
          </nav>
          <h1 id="about-heading" className="text-white italic max-w-lg mb-4">Meet Your Arizona Hosts</h1>
          <p className="text-white/72 text-lg max-w-xl leading-relaxed">
            Local experts who love the White Mountains as much as you will. We&apos;re not a platform — we&apos;re neighbors who want to share the magic of Arizona&apos;s high country.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 bg-white" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&h=1000&q=80"
                  alt="Lori Baker — host and owner of Getaway Properties AZ"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating rating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-[0_16px_48px_rgba(28,26,20,0.15)] border border-border">
                <div className="font-serif text-[2.5rem] font-bold text-brand leading-none">4.9</div>
                <div className="flex gap-0.5 my-2" aria-label="4.9 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--color-cta)" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted text-xs font-medium">Average Guest Rating</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-3 flex items-center gap-2">
                <span className="block w-8 h-px bg-brand" aria-hidden="true" />
                Our Story
              </p>
              <h2 id="story-heading" className="mb-6">The Getaway Difference</h2>
              <div className="space-y-4 text-muted leading-[1.8] text-[1.0625rem]">
                <p>
                  Hi, I&apos;m <strong className="text-forest">Lori Baker</strong>, and I&apos;ve been hosting guests in Arizona&apos;s White Mountains for years. What started as a passion for sharing this incredible corner of the state has grown into a curated portfolio of properties I&apos;m genuinely proud of.
                </p>
                <p>
                  The White Mountains — Pinetop, Show Low, Overgaard — are some of Arizona&apos;s best-kept secrets. At 6,000–7,500 feet of elevation, the air is crisp, the pines are towering, and the pace is exactly what you need when you need to escape.
                </p>
                <p>
                  Every property I host is one I&apos;d stay in myself. That means great beds, real kitchen equipment, reliable WiFi, clean linens, and — perhaps most importantly — a host who answers her phone when you need her.
                </p>
                <p>
                  <strong className="text-forest">Book direct and save.</strong> When you book through me, there are no platform markups, no mystery fees. Just fair pricing, a warm welcome, and a host who&apos;s invested in making your trip perfect.
                </p>
              </div>

              {/* Trust Points */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                {[
                  ['Team Managed', 'We handle every booking personally'],
                  ['No Surprise Fees', 'What you see is what you pay'],
                  ['Local Knowledge', 'Best trails, restaurants & hidden spots'],
                  ['24/7 Support', 'Always available during your stay'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="15" height="15" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <strong className="text-forest text-sm block mb-0.5">{title}</strong>
                      <span className="text-muted text-xs">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-cream" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">By the Numbers</p>
          <h2 id="stats-heading" className="mb-12">Guests Love Staying With Us</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="font-serif text-[3.5rem] font-bold text-brand leading-none mb-2">{value}</div>
                <p className="text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white" aria-labelledby="contact-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — Info */}
            <div>
              <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-3 flex items-center gap-2">
                <span className="block w-8 h-px bg-brand" aria-hidden="true" />
                Get in Touch
              </p>
              <h2 id="contact-heading" className="mb-4">Ready to Plan<br />Your Getaway?</h2>
              <p className="text-muted text-[1.0625rem] leading-[1.8] mb-10 max-w-md">
                Have questions about a property, want to check availability, or need help choosing the right cabin for your group? Our team responds to every inquiry within 2–4 hours.
              </p>

              <div className="space-y-6 mb-10">
                {CONTACT_INFO.map(({ label, value, href, icon }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                    <div>
                      <span className="block font-semibold text-forest text-sm mb-0.5">{label}</span>
                      {href ? (
                        <a href={href} className="text-muted text-[0.9375rem] no-underline hover:text-brand transition-colors">{value}</a>
                      ) : (
                        <span className="text-muted text-[0.9375rem]">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video">
                <Image
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&h=400&q=80"
                  alt="Pine forest in Arizona's White Mountains"
                  width={700}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <div className="bg-cream-alt rounded-2xl p-10 border border-border">
                <h3 className="font-serif text-2xl mb-1">Send a Message</h3>
                <p className="text-muted text-sm mb-8">We&apos;ll get back to you within a few hours.</p>
                <InquiryForm propertyName="General Inquiry" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase mb-2">FAQ</p>
            <h2 id="faq-heading">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="bg-white border border-border rounded-2xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-forest text-[1.0625rem]">
                  {q}
                  <svg
                    width="18" height="18" fill="none" stroke="var(--color-brand)" strokeWidth="2" viewBox="0 0 24 24"
                    className="shrink-0 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <p className="px-6 pb-6 text-muted leading-[1.75]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
