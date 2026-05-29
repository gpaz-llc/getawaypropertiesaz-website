import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Getaway Properties AZ <info@getawaypropertiesaz.com>',
      to: 'info@getawaypropertiesaz.com',
      subject: '📬 New Newsletter Subscriber',
      html: `
        <p>Someone signed up for your travel ideas newsletter:</p>
        <p><strong>${email}</strong></p>
        <p style="color:#888;font-size:12px;">Add them to your mailing list and keep up the great content!</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
