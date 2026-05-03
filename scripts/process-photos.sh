#!/usr/bin/env bash
# Resize + crop each input image to 4:5 (1000x1250 webp), extract EXIF,
# and emit a JSON record per file. Output goes to src/public/img/photos/.
set -eu

W=1000
H=1250
QUALITY=82
SRC_DIR="src/img"
OUT_DIR="src/public/img/photos"
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

mkdir -p "$OUT_DIR"

# Stable ordering as listed in the original folder. Indices below
# correspond to the data.ts entries (p01 = first, p02 = second, etc).
# Sources for some early frames are no longer in src/img/ — the script
# logs a "missing" line and skips them; the existing webps stay put.
FILES=(
	"3T1A0207.jpg"
	"_T1A5198.jpg"
	"_T1A5556.jpg"
	"_T1A5843.jpg"
	"_T1A5937.jpg"
	"_65A6871.png"
	"_W1A2676.png"
	"3H5A2453.jpg"
	"3T1A0166.jpg"
	"_65A0771.jpg"
	"_65A0958.jpg"
	"_65A0975.jpg"
	"_65A0989.jpg"
	"_65A1480.jpg"
	"_65A3441.png"
	"_65A3553.png"
	"_65A3692.png"
	"_65A4066.jpg"
	"_65A6877.png"
	"_65A9366.jpg"
	"_T1A5878.jpg"
	"_T1A6132.jpg"
)

# Convert decimal exposure (seconds) into the conventional shutter notation.
# 0.008 -> "1/125", 1.5 -> "1.5s", etc.
shutter_str() {
	awk -v s="$1" 'BEGIN{
		if (s == "" || s == "0") { print "—"; exit }
		if (s >= 1) { printf "%.1fs\n", s; exit }
		printf "1/%d\n", int(1.0 / s + 0.5);
	}'
}

# fnumber 2.8 -> "f/2.8"; rounds to one decimal
fnumber_str() {
	awk -v f="$1" 'BEGIN{
		if (f == "" || f == "0") { print "—"; exit }
		printf "f/%.1f\n", f;
	}'
}

# Get a single key from sips -g all
sips_get() {
	local key=$1 file=$2
	sips -g "$key" "$file" 2>/dev/null | awk -F': ' -v k="$key" '$1 ~ k {print $2}'
}

# Get a kMDItem key from mdls
mdls_get() {
	local key=$1 file=$2
	mdls -name "$key" "$file" 2>/dev/null | awk -F'= ' '{print $2}' | tr -d '"'
}

JSON_OUT="$TMP_DIR/photos.json"
echo "[" > "$JSON_OUT"

i=0
for f in "${FILES[@]}"; do
	i=$((i + 1))
	idx=$(printf "%02d" "$i")
	src="$SRC_DIR/$f"
	if [ ! -f "$src" ]; then echo "missing: $src" >&2; continue; fi

	# 1) extract metadata
	make=$(sips_get make "$src" || true)
	model=$(sips_get model "$src" || true)
	created=$(sips_get creation "$src" | head -1)
	lens=$(mdls_get kMDItemLensModel "$src")
	focal=$(mdls_get kMDItemFocalLength "$src")
	fnum=$(mdls_get kMDItemFNumber "$src")
	expo=$(mdls_get kMDItemExposureTimeSeconds "$src")
	iso=$(mdls_get kMDItemISOSpeed "$src")

	camera=$(printf "%s %s" "${make:-}" "${model:-}" | sed -E 's/^ +//; s/ +$//')
	[ -z "$camera" ] && camera="—"

	[ -z "${lens:-}" ] && lens="—"
	if [ -n "${focal:-}" ]; then focal_disp="${focal%.*}mm"; else focal_disp="—"; fi
	aperture_disp=$(fnumber_str "${fnum:-0}")
	shutter_disp=$(shutter_str "${expo:-0}")
	iso_disp="${iso:-—}"
	[ "$iso_disp" = "" ] && iso_disp="—"
	# created looks like "2026:02:07 20:46:36"; extract the YYYY-MM-DD part
	taken=$(echo "${created:-}" | awk '{print $1}' | tr ':' '-')
	[ -z "$taken" ] && taken="—"

	# 2) resize + crop to exact 4:5 (W x H), centered
	ow=$(sips -g pixelWidth "$src" | awk '/pixelWidth/{print $2}')
	oh=$(sips -g pixelHeight "$src" | awk '/pixelHeight/{print $2}')
	# original_ratio = ow/oh; target_ratio = W/H = 0.8
	# if original > target: scale to target height, then crop sides
	# else: scale to target width, then crop top/bottom
	bigger=$(awk -v a="$ow" -v b="$oh" -v tw="$W" -v th="$H" 'BEGIN{ print (a*th > b*tw) ? "wide" : "tall" }')

	staged="$TMP_DIR/${idx}.tiff"
	cropped="$TMP_DIR/${idx}-c.tiff"

	if [ "$bigger" = "wide" ]; then
		sips --resampleHeight "$H" "$src" --out "$staged" >/dev/null
	else
		sips --resampleWidth "$W" "$src" --out "$staged" >/dev/null
	fi
	sips --cropToHeightWidth "$H" "$W" "$staged" --out "$cropped" >/dev/null

	# 3) encode to webp
	out_webp="$OUT_DIR/${idx}.webp"
	cwebp -quiet -q "$QUALITY" "$cropped" -o "$out_webp"
	sz=$(stat -f '%z' "$out_webp")

	# 4) emit JSON record
	[ $i -gt 1 ] && echo "  ," >> "$JSON_OUT"
	cat >> "$JSON_OUT" <<EOF
  {
    "id": "p${idx}",
    "src": "/img/photos/${idx}.webp",
    "title": "Frame ${idx}",
    "camera": "$camera",
    "lens": "$lens",
    "focal": "$focal_disp",
    "aperture": "$aperture_disp",
    "shutter": "$shutter_disp",
    "iso": "$iso_disp",
    "taken": "$taken",
    "bytes": $sz
  }
EOF

	echo "  ${idx}: $f  ${ow}x${oh} -> ${W}x${H}  ${out_webp} ($((sz/1024))KB)"
done

echo "]" >> "$JSON_OUT"
cp "$JSON_OUT" /tmp/photos.json
echo
echo "JSON saved to /tmp/photos.json"
