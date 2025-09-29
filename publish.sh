(npm run build)

BUILD_DIR=${BUILD_DIR:-./build}

# Sync all site files
aws s3 sync "$BUILD_DIR" s3://duffle.one --acl public-read --follow-symlinks --delete

# Ensure HTML served as text/html and not cached aggressively
for page in index.html 404.html; do
  aws s3 cp "$BUILD_DIR/$page" s3://duffle.one/$page \
    --acl public-read \
    --content-type text/html \
    --cache-control "no-cache, no-store, must-revalidate" \
    --metadata-directive REPLACE
done

# Set 404.html as the error document for the S3 bucket
aws s3 website s3://duffle.one/ --index-document index.html --error-document 404.html
