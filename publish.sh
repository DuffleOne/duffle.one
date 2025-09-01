(./compile.sh)

# Sync all site files
aws s3 sync ./build s3://duffle.one --acl public-read --follow-symlinks --delete

# Ensure CSS has correct metadata (content-type + cache) in case autodetect fails or cache is stale
aws s3 cp ./build/output.css s3://duffle.one/output.css \
  --acl public-read \
  --content-type text/css \
  --cache-control "public, max-age=300" \
  --metadata-directive REPLACE

# Ensure HTML served as text/html and not cached aggressively
for page in index.html 404.html; do
  aws s3 cp ./build/$page s3://duffle.one/$page \
    --acl public-read \
    --content-type text/html \
    --cache-control "no-cache, no-store, must-revalidate" \
    --metadata-directive REPLACE
done
