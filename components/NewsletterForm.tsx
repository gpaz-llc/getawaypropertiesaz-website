'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 bg-brand/15 rounded-full flex items-center justify-center">
          <svg width="22" height="22" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="text-forest font-semibold">You&apos;re on the list!</p>
        <p className="text-muted text-sm">Expect your first edition next month.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input
        id="nl-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        disabled={status === 'loading'}
        className="flex-1 px-5 py-3 rounded-full border border-border bg-white text-forest text-sm outline-none focus:border-brand transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-brand text-white rounded-full px-7 py-3 font-semibold text-sm hover:bg-brand-dark transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-1 text-center sm:col-span-2">Something went wrong — please try again.</p>
      )}
    </form>
  )
}
