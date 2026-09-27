// Serves duffle.one at duffle.me without sending anyone to duffle.one.
//
// duffle.one is an S3 website bucket, and S3 picks the bucket from the Host
// header, so duffle.me can't simply point at it; overriding the Host header in
// an origin rule needs Enterprise. Instead each request is fetched from
// duffle.one here and handed back as it came, so the address bar stays on
// duffle.me and there's one copy of the site to publish.

const SITE = 'duffle.me'
const SOURCE = 'duffle.one'

export default {
  async fetch(request) {
    const url = new URL(request.url)

    // One address: https, no www.
    if (url.protocol === 'http:' || url.hostname !== SITE) {
      url.protocol = 'https:'
      url.hostname = SITE
      return Response.redirect(url.toString(), 301)
    }

    url.hostname = SOURCE
    const response = await fetch(new Request(url, request), { redirect: 'manual' })

    // S3's own redirects (adding a trailing slash) are relative and pass
    // through untouched. An absolute one back to duffle.one would take the
    // visitor with it, so point it back here.
    const location = response.headers.get('location')
    if (location?.startsWith(`https://${SOURCE}`) || location?.startsWith(`http://${SOURCE}`)) {
      const headers = new Headers(response.headers)
      headers.set('location', location.replace(/^https?:\/\/duffle\.one/, `https://${SITE}`))
      return new Response(response.body, { status: response.status, headers })
    }

    return response
  },
}
