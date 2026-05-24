'use client'

import { useState } from 'react'

interface InquiryFormProps {
  propertyName?: string
  className?: string
}

export default function InquiryForm({ propertyName, className = '' }: InquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg(json.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please email info@getawaypropertiesaz.com directly.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
        <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-5">
          <svg width="28" height="28" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-semibold mb-2">Inquiry Sent!</h3>
        <p className="text-muted max-w-xs leading-relaxed">
          Thanks for reaching out. Lori will be in touch within 2–4 hours to confirm availability and rates.
        </p>
      </div>
    )
  }

  const inputClass = 'w-full bg-white border border-border rounded-xl px-4 py-3 font-sans text-[0.9375rem] text-forest placeholder:text-muted/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all duration-200'
  const labelClass = 'block text-sm font-medium text-muted mb-1.5'

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-4 ${className}`}>
      <input type="hidden" name="property" value={propertyName || 'General Inquiry'} />
      {/* Honeypot */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="inq-name">Full Name *</label>
          <input
            type="text" id="inq-name" name="name" required
            placeholder="Jane Smith" autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-phone">Phone</label>
          <input
            type="tel" id="inq-phone" name="phone"
            placeholder="(480) 555-0123" autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="inq-email">Email Address *</label>
        <input
          type="email" id="inq-email" name="email" required
          placeholder="you@example.com" autoComplete="email"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="inq-checkin">Check-in Date</label>
          <input type="date" id="inq-checkin" name="checkin" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="inq-checkout">Check-out Date</label>
          <input type="date" id="inq-checkout" name="checkout" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="inq-guests">Number of Guests</label>
        <select id="inq-guests" name="guests" className={`${inputClass} appearance-none`}>
          <option value="">Select group size</option>
          <option value="1-2">1–2 guests</option>
          <option value="3-4">3–4 guests</option>
          <option value="5-6">5–6 guests</option>
          <option value="7-10">7–10 guests</option>
          <option value="11-15">11–15 guests</option>
          <option value="16+">16+ guests</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="inq-message">Message (optional)</label>
        <textarea
          id="inq-message" name="message" rows={4}
          placeholder="Questions, special requests, occasion details…"
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-cta text-white rounded-full py-3.5 font-semibold text-[0.9375rem] hover:bg-cta-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Sending…
          </>
        ) : 'Send Inquiry'}
      </button>

      <p className="text-center text-muted text-xs">
        Your information is private and never shared. We respond within 2–4 hours.
      </p>
    </form>
  )
}
