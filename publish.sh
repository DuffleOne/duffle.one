(npm run build)

BUILD_DIR=${BUILD_DIR:-./build}

# Sync all site files (exclude full-size jellycat photos — they're uploaded separately)
aws s3 sync "$BUILD_DIR" s3://duffle.one \
  --acl public-read --follow-symlinks --delete \
  --exclude "img/jellycats/*.jpg"

# Upload full-size jellycat photos from local source (not in git)
JELLYCAT_DIR=src/public/img/jellycats
if [ -d "$JELLYCAT_DIR" ]; then
  aws s3 sync "$JELLYCAT_DIR" s3://duffle.one/img/jellycats/ \
    --acl public-read \
    --exclude "thumbs/*" \
    --cache-control "public, max-age=31536000, immutable"
fi

# Ensure HTML served as text/html and not cached aggressively
for page in index.html 404.html time.html cv.html jellycats.html; do
  aws s3 cp "$BUILD_DIR/$page" s3://duffle.one/$page \
    --acl public-read \
    --content-type text/html \
    --cache-control "no-cache, no-store, must-revalidate" \
    --metadata-directive REPLACE
done

# Set 404.html as the error document for the S3 bucket
aws s3 website s3://duffle.one/ --index-document index.html --error-document 404.html
