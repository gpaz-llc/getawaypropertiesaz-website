import type { Metadata } from 'next'
import { Cormorant_Garamond, Instrument_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Getaway Properties AZ | Luxury Cabin Rentals in Arizona's White Mountains",
    template: '%s | Getaway Properties AZ',
  },
  description:
    "Book luxury vacation rentals in Arizona's White Mountains. Explore cabins in Pinetop, Show Low & Overgaard with hot tubs, views, and premium amenities. Book direct & save.",
  keywords: [
    'Arizona vacation rentals', 'Pinetop cabin rentals', 'Show Low vacation homes',
    'Overgaard cabins', 'Arizona mountain cabins', 'White Mountains AZ rentals',
  ],
  openGraph: {
    type: 'website',
    url: 'https://getawaypropertiesaz.com',
    siteName: 'Getaway Properties AZ',
    images: [{
      url: 'https://images.unsplash.com/photo-1652887626061-c32621ebbac3?w=1200&q=80',
      width: 1200, height: 630, alt: 'Luxury Arizona Mountain Cabin',
    }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${instrument.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-forest antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
