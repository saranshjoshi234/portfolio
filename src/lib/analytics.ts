// Analytics are OFF unless VITE_ANALYTICS_ID is set (e.g. a GA4 measurement ID "G-XXXX").
// Nothing is loaded or tracked otherwise.

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function initAnalytics() {
  const id = import.meta.env.VITE_ANALYTICS_ID as string | undefined
  if (!id || typeof window === 'undefined') return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag expects the `arguments` object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })
}
