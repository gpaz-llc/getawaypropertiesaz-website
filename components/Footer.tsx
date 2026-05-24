import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest-dark text-white pt-16 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="no-underline inline-block mb-5">
              <span className="font-serif text-[1.5rem] font-bold tracking-tight whitespace-nowrap">
                Getaway<span className="text-brand-light"> Properties AZ</span>
              </span>
            </Link>
            <p className="text-white/55 text-[0.9375rem] leading-relaxed max-w-xs mb-6">
              Luxury vacation rentals in Arizona. Pinetop, Show Low, Overgaard &amp; San Tan Valley. Book direct and save.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {['Facebook', 'Instagram'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  aria-label={`Follow us on ${platform}`}
                  className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-white/60 hover:bg-brand hover:text-white transition-all duration-200 no-underline"
                >
                  {platform === 'Facebook' ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="text-white text-[0.875rem] font-semibold tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {[
                { href: '/properties', label: 'All Properties' },
                { href: '/weddings-events', label: 'Weddings & Events' },
                { href: '/property-management', label: 'Property Management' },
                { href: '/properties?location=Pinetop', label: 'Pinetop Cabins' },
                { href: '/properties?location=Show Low', label: 'Show Low Rentals' },
                { href: '/about', label: 'About Us' },
                { href: '/about#contact', label: 'Contact' },
                { href: 'https://portal.getawaypropertiesaz.com', label: 'Owner Login ↗' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/60 text-[0.9375rem] no-underline hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-white text-[0.875rem] font-semibold tracking-widest uppercase mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              <li>
                <a
                  href="mailto:info@getawaypropertiesaz.com"
                  className="flex items-center gap-3 text-white/60 text-[0.9375rem] no-underline hover:text-white transition-colors duration-200"
                >
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  info@getawaypropertiesaz.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/55 text-[0.9375rem]">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Pinetop · Show Low · Overgaard · San Tan Valley<br />Arizona
              </li>
              <li className="flex items-center gap-3 text-white/55 text-[0.9375rem]">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Response within 2–4 hours
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {year} Getaway Properties AZ. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use'].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-white/40 text-[0.8125rem] no-underline hover:text-white/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
