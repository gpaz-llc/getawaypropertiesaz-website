export interface Property {
  id: number
  slug: string
  name: string
  tagline: string
  location: 'Pinetop' | 'Show Low' | 'Overgaard' | 'San Tan Valley'
  locationDisplay: string
  rating: number
  reviewCount: number
  beds: number
  baths: number
  guests: number
  images: string[]   // first image is the card/hero image
  amenities: string[]
  description: string
  longDescription: string
  featured: boolean
  highlight?: boolean
  pets?: boolean
}

export interface Review {
  id: number
  name: string
  location: string
  rating: number
  text: string
  propertyId?: number
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  property?: string
  checkin?: string
  checkout?: string
  guests?: string
  interest?: string
  message: string
}
