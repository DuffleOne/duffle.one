<script setup lang="ts">
/*
  The hue-rotated stripe pattern used as a placeholder for images. Each
  cell varies its angle + base hue by `seed` so the contact sheet feels
  like a roll of different shots. Also used for the home portrait box
  (with seed=0 + 135deg) and the EXIF preview (seed=1 + 60deg + cyan).

  Real photos can replace this without touching the layout — just drop
  an <img> in the same slot.
*/
import { computed } from "vue";

const props = withDefaults(
	defineProps<{
		seed?: number;
		angle?: number;
		hueShift?: number;
		baseHue?: number;
		baseLightness?: number;
		ratio?: string;
	}>(),
	{ seed: 0, angle: 0, hueShift: 40, baseHue: 30, baseLightness: 30, ratio: "4 / 5" }
);

const background = computed(() => {
	const i = props.seed;
	const ang = props.angle ?? i * 32;
	const hue = props.baseHue + i * props.hueShift;
	const l1 = props.baseLightness + i * 4;
	const l2 = (props.baseLightness - 10) + i * 3;
	return `repeating-linear-gradient(${ang}deg,
		oklch(${l1}% 0.10 ${hue}) 0 4px,
		oklch(${l2}% 0.12 ${hue}) 4px 8px)`;
});
</script>

<template>
	<div
		class="w-full"
		:style="{ aspectRatio: ratio, backgroundImage: background }"
		aria-hidden="true"
	/>
</template>
