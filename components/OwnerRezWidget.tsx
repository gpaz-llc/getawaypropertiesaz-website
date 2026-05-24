'use client'

import Script from 'next/script'

export default function OwnerRezWidget() {
  return (
    <>
      <div
        className="ownerrez-widget"
        data-widget-type="Booking/Inquiry"
        data-widgetId="d4f5cba1b15f43088efa55c163160b7d"
      />
      <Script
        src="https://app.ownerrez.com/widget.js"
        strategy="afterInteractive"
      />
    </>
  )
}
