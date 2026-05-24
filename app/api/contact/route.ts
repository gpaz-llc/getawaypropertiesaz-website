import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = 'info@getawaypropertiesaz.com'
const FROM_EMAIL = 'Getaway Properties <noreply@getawaypropertiesaz.com>'

export async function POST(request: NextRequest) {
  // Validate API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json(
      { error: 'Email service not configured. Please contact us directly.' },
      { status: 500 }
    )
  }

  // Instantiate inside handler so missing key doesn't crash at build time
  const resend = new Resend(process.env.RESEND_API_KEY)

  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, phone, property, checkin, checkout, guests, interest, message } = body

  // Basic validation
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 422 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 })
  }

  // Honeypot check (_gotcha field)
  if (body._gotcha) {
    return NextResponse.json({ ok: true }) // Silently reject bots
  }

  const subject = property && property !== 'General Inquiry'
    ? `Booking Inquiry — ${property} | Getaway Properties AZ`
    : `Contact Form — Getaway Properties AZ`

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family:Georgia,serif;background:#F8F5F0;margin:0;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #DDD6CA">

        <div style="background:#7F933D;padding:24px 32px">
          <h1 style="color:#fff;margin:0;font-size:22px;font-weight:600">
            ${property && property !== 'General Inquiry' ? '🏔️ New Booking Inquiry' : '📬 New Contact Message'}
          </h1>
          <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px">Getaway Properties AZ</p>
        </div>

        <div style="padding:28px 32px">
          ${property && property !== 'General Inquiry' ? `
            <div style="background:#F0EBE1;border-radius:12px;padding:16px 20px;margin-bottom:20px;border-left:4px solid #7F933D">
              <strong style="color:#1C1A14;font-size:14px;text-transform:uppercase;letter-spacing:0.05em">Property of Interest</strong>
              <p style="color:#5B6B2F;font-size:18px;font-weight:600;margin:4px 0 0">${property}</p>
            </div>
          ` : ''}

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr><td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#6B6355;font-size:13px;width:40%">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#1C1A14;font-size:15px;font-weight:500">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#6B6355;font-size:13px">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#1C1A14;font-size:15px"><a href="mailto:${email}" style="color:#7F933D">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#6B6355;font-size:13px">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#1C1A14;font-size:15px">${phone}</td></tr>` : ''}
            ${checkin ? `<tr><td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#6B6355;font-size:13px">Check-in</td>
                <td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#1C1A14;font-size:15px">${checkin}</td></tr>` : ''}
            ${checkout ? `<tr><td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#6B6355;font-size:13px">Check-out</td>
                <td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#1C1A14;font-size:15px">${checkout}</td></tr>` : ''}
            ${guests ? `<tr><td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#6B6355;font-size:13px">Guests</td>
                <td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#1C1A14;font-size:15px">${guests}</td></tr>` : ''}
            ${interest ? `<tr><td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#6B6355;font-size:13px">Interest</td>
                <td style="padding:10px 0;border-bottom:1px solid #DDD6CA;color:#1C1A14;font-size:15px">${interest}</td></tr>` : ''}
          </table>

          ${message ? `
            <div>
              <p style="color:#6B6355;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em">Message</p>
              <p style="color:#1C1A14;font-size:15px;line-height:1.7;background:#F8F5F0;padding:16px;border-radius:10px;margin:0">${message.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}
        </div>

        <div style="background:#F8F5F0;padding:16px 32px;text-align:center">
          <a href="mailto:${email}?subject=Re: ${subject.replace(/"/g, '')}"
             style="display:inline-block;background:#C4862A;color:#fff;border-radius:9999px;padding:12px 28px;font-size:14px;font-weight:600;text-decoration:none">
            Reply to ${name}
          </a>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send. Please email us directly.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
