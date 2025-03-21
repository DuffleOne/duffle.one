(cd home && npm run build)
cp -f ./home/src/index.html ./build/index.html
cp -f ./home/src/*.svg ./build/

mkdir -p ./build/display
cp -f ./display/index.html ./build/display/index.html
cp -f ./display/*.svg ./build/display/
