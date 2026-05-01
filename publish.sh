#!/usr/bin/env bash
set -euo pipefail

(npm run build)

BUILD_DIR=${BUILD_DIR:-./build}

# Sync everything except the entry HTML (which we re-upload below with
# explicit no-cache headers so deploys actually invalidate). Skip the
# full-size jellycat jpgs — they're synced separately from local source
# below since they aren't in git.
aws s3 sync "$BUILD_DIR" s3://duffle.one \
	--acl public-read \
	--follow-symlinks \
	--delete \
	--exclude "index.html" \
	--exclude "jellycats.html" \
	--exclude "img/jellycats/*.jpg"

# Entry HTML: text/html, no caching, every request hits S3 fresh.
# The asset bundle filenames are content-hashed by Vite so the rest of
# the bundle can cache long.
for page in index.html jellycats.html; do
	aws s3 cp "$BUILD_DIR/$page" "s3://duffle.one/$page" \
		--acl public-read \
		--content-type text/html \
		--cache-control "no-cache, no-store, must-revalidate" \
		--metadata-directive REPLACE
done

# Full-size jellycat photos from local (not committed to git).
JELLYCAT_DIR=src/public/img/jellycats
if [ -d "$JELLYCAT_DIR" ]; then
	aws s3 sync "$JELLYCAT_DIR" s3://duffle.one/img/jellycats/ \
		--acl public-read \
		--exclude "thumbs/*" \
		--cache-control "public, max-age=31536000, immutable"
fi

# SPA fallback: any unknown path serves index.html so the hash router
# can take over. Real files (jellycats.html, /img/*) still serve directly.
aws s3 website s3://duffle.one/ \
	--index-document index.html \
	--error-document index.html
