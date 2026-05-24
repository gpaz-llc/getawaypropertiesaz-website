'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const navLinks = [
    { href: '/properties', label: 'Properties' },
    { href: '/weddings-events', label: 'Weddings & Events' },
    { href: '/#destinations', label: 'Destinations' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <nav className="nav-glass" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[4.5rem]">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Getaway Properties AZ — Home"
            className="flex items-center no-underline"
          >
            <span className="font-serif text-2xl font-bold tracking-tight leading-none">
              <span className="text-brand">Getaway</span>
              <span className="text-forest"> Properties</span>
              <span className="text-brand"> AZ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-[0.9375rem] font-medium transition-colors duration-200 no-underline ${
                  isActive(href) ? 'text-brand font-semibold' : 'text-forest hover:text-brand'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 bg-cta text-white rounded-full px-6 py-2.5 text-[0.875rem] font-semibold hover:bg-cta-dark transition-colors duration-200 no-underline"
            >
              Book Direct &amp; Save
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 border-none bg-transparent cursor-pointer rounded-lg hover:bg-cream-alt transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-forest rounded-sm transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-forest rounded-sm transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-0.5 bg-forest rounded-sm transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[7px] w-6' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-96 border-t border-border' : 'max-h-0'
          }`}
          id="mobile-menu"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-forest font-medium text-lg py-2 border-b border-border no-underline hover:text-brand transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/about#contact"
              className="inline-flex items-center justify-center bg-cta text-white rounded-full px-6 py-3 font-semibold text-base mt-2 no-underline hover:bg-cta-dark transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Book Direct &amp; Save
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
