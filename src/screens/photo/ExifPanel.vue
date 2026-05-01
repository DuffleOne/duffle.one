<script setup lang="ts">
/*
  EXIF side panel: header strip + 4:5 preview + display-font title +
  dotted-row k/v table + open-fullscreen link.

  Reads metadata directly off the Photo record. The original fields
  came from `mdls` + `sips` extraction at build time (scripts/process-photos.sh).
*/
import { ref } from "vue";
import type { Photo } from "../../site/data";
import StripedPlaceholder from "../../components/placeholders/StripedPlaceholder.vue";
import DottedRow from "../../components/data/DottedRow.vue";

defineProps<{ photo: Photo; index: number }>();

const failed = ref(false);
</script>

<template>
	<aside class="border border-tty-border-hi bg-tty-bg2 flex flex-col">
		<div class="px-3 py-2 border-b border-tty-border text-[10px] text-tty-faint tracking-[2px]">
			EXIF · {{ String(index + 1).padStart(2, "0") }}.WEBP
		</div>
		<div class="border-b border-tty-border aspect-[4/5] w-full overflow-hidden">
			<img
				v-if="!failed"
				:src="photo.src"
				:alt="photo.title"
				loading="lazy"
				decoding="async"
				class="w-full h-full object-cover block"
				@error="failed = true"
			/>
			<StripedPlaceholder
				v-else
				:seed="index"
				:angle="60"
				:base-hue="220"
				:hue-shift="0"
				:base-lightness="38"
			/>
		</div>
		<div class="px-3 py-[10px] text-[10.5px] text-tty-dim leading-[1.6]">
			<div class="text-tty-fg font-display tracking-[-0.3px] mb-1" style="font-size: 16px;">
				{{ photo.title }}
			</div>
			<DottedRow label="camera">{{ photo.camera }}</DottedRow>
			<DottedRow label="lens">{{ photo.lens }}</DottedRow>
			<DottedRow label="focal">{{ photo.focal }}</DottedRow>
			<DottedRow label="aperture">{{ photo.aperture }}</DottedRow>
			<DottedRow label="shutter">{{ photo.shutter }}</DottedRow>
			<DottedRow label="iso">{{ photo.iso }}</DottedRow>
			<DottedRow label="taken" :last="!photo.place">{{ photo.taken }}</DottedRow>
			<DottedRow v-if="photo.place" label="place" :last="true">{{ photo.place }}</DottedRow>
			<a
				:href="photo.src"
				target="_blank"
				rel="noopener"
				class="mt-2 inline-block text-tty-cyan text-[10px] hover:underline"
			>↗ open in fullscreen · f</a>
		</div>
	</aside>
</template>
