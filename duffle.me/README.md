# duffle.me

A Cloudflare Worker that serves this site at duffle.me as well. Each request is
fetched from duffle.one and returned unchanged, so visitors stay on duffle.me
and there is still one site to build and publish.

Why a Worker: duffle.one is an S3 website bucket, which chooses the bucket by
Host header, and rewriting the Host header in a Cloudflare origin rule is
Enterprise-only. A second bucket would mean publishing everything twice,
including the jellycat photos that only ever go up by hand.

Deploy with `npx wrangler deploy` from this directory, after `npx wrangler
login`. Mail for duffle.me is Google Workspace and lives in the zone's DNS; the
Worker's custom domains leave those records alone.
