(cd home && npm run build)

# Ensure build directory exists
mkdir -p ./build

# Copy site assets (CSS already output to ./build by Tailwind)
# Inject cache-busting timestamp into CSS link
BUILD_TS=$(date +%s)
sed "s/__BUILD_TS__/${BUILD_TS}/g" ./home/src/index.html > ./build/index.html
cp -f ./home/src/favicon.svg ./build/favicon.svg
# Copy images and icons
mkdir -p ./build/img
cp -R ./home/src/img/* ./build/img/

# Copy 404 page
cp -f ./home/src/404.html ./build/404.html

# Optimize images if sips is available (macOS)
if command -v sips >/dev/null 2>&1; then
  # Constrain banner width to 2560px, JPEG quality ~70
  if [ -f ./build/img/banner.jpg ]; then
    sips -Z 2560 ./build/img/banner.jpg >/dev/null 2>&1
    sips -s formatOptions 70 ./build/img/banner.jpg >/dev/null 2>&1
  fi
  # Constrain portrait width to 600px, JPEG quality ~80
  if [ -f ./build/img/laura.jpg ]; then
    sips -Z 600 ./build/img/laura.jpg >/dev/null 2>&1
    sips -s formatOptions 80 ./build/img/laura.jpg >/dev/null 2>&1
  fi
fi

# Copy display assets
mkdir -p ./build/display
cp -f ./display/index.html ./build/display/index.html
cp -f ./display/*.svg ./build/display/
