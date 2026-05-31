#!/usr/bin/env bash
# Turn the raw camera shots in src/public/img/new/ into the gallery asset pair
# each cat needs:
#   - full res  <slug>_l.jpg / <slug>_p.jpg   (gitignored, synced to S3 by publish.sh)
#   - thumbnail thumbs/<slug>_l.webp / _p.webp (800px wide, committed)
#
# The shoot is 8 cats, each photographed landscape then portrait, in capture
# order. Consecutive shots pair into one cat. Fill SLUGS below with the real
# slugs (same order as the pairs), then run:
#
#   bash scripts/convert-new-jellycats.sh
#
# Then add a matching entry per cat to the `collection` array in
# src/jellycats.html (thumb: "<slug>_p.jpg", images: ["<slug>_p.jpg","<slug>_l.jpg"]).
#
# Needs cwebp (brew install webp). ImageMagick is not installed on this machine.
set -euo pipefail

SRC=src/public/img/new
DST=src/public/img/jellycats
THUMBS=$DST/thumbs
QUALITY=82
THUMB_W=800

# One slug per cat, in capture order. Empty slug => skip that pair.
SLUGS=(
	"carp"             # _T1A8077 (l) + _T1A8080 (p)  — Fancy Carp
	"bunny_puddlesea"  # _T1A8082 (l) + _T1A8085 (p)  — Puddlesea
	"bunny_thistlepop" # _T1A8087 (l) + _T1A8090 (p)  — Thistlepop
	"bunny_blushkin"   # _T1A8092 (l) + _T1A8095 (p)  — Blushkin
	"bunny_flufflets"  # _T1A8099 (l) + _T1A8102 (p)  — Wheat, Oat & Barley together
	"bunny_barley"     # _T1A8104 (l) + _T1A8107 (p)  — Barley (Fawn Flufflet)
	"bunny_oat"        # _T1A8109 (l) + _T1A8111 (p)  — Oat Flufflet
	"bunny_wheat"      # _T1A8114 (l) + _T1A8116 (p)  — Wheat Flufflet
)

mkdir -p "$THUMBS"

orient() { # echo l or p (landscape if width > height)
	local w h
	w=$(sips -g pixelWidth "$1" | awk '/pixelWidth/{print $2}')
	h=$(sips -g pixelHeight "$1" | awk '/pixelHeight/{print $2}')
	[ "$w" -gt "$h" ] && echo l || echo p
}

FILES=()
while IFS= read -r line; do FILES+=("$line"); done < <(ls "$SRC"/*.jpg | sort)

pair=0
for ((i = 0; i < ${#FILES[@]}; i += 2)); do
	slug=${SLUGS[$pair]:-}
	pair=$((pair + 1))
	if [ -z "$slug" ]; then
		echo "skip pair $pair (no slug set)"
		continue
	fi
	for f in "${FILES[$i]}" "${FILES[$((i + 1))]}"; do
		o=$(orient "$f")
		cp "$f" "$DST/${slug}_${o}.jpg"
		cwebp -quiet -q "$QUALITY" -resize "$THUMB_W" 0 "$f" -o "$THUMBS/${slug}_${o}.webp"
		echo "$slug  $(basename "$f") -> ${slug}_${o}.jpg + thumbs/${slug}_${o}.webp"
	done
done
