<script setup lang="ts">
/*
  Four corner crop-marks overlaid on a rectangle. Reusable framing
  device — the home portrait uses it; could equally wrap the EXIF
  preview or any "viewfinder" element later.

  Slot fills the inner area.
*/
import type { Accent } from "../../types/accent";
import { accentVar } from "../../types/accent";

withDefaults(
	defineProps<{ accent?: Accent; size?: number; weight?: number }>(),
	{ accent: "green", size: 10, weight: 1.5 }
);
</script>

<template>
	<div class="relative">
		<slot/>
		<span
			v-for="(corner, i) in [
				{ side: 'top-left', t: 4, l: 4 },
				{ side: 'top-right', t: 4, r: 4 },
				{ side: 'bottom-left', b: 4, l: 4 },
				{ side: 'bottom-right', b: 4, r: 4 },
			]"
			:key="i"
			class="absolute pointer-events-none"
			:style="{
				top: corner.t != null ? corner.t + 'px' : 'auto',
				bottom: corner.b != null ? corner.b + 'px' : 'auto',
				left: corner.l != null ? corner.l + 'px' : 'auto',
				right: corner.r != null ? corner.r + 'px' : 'auto',
				width: size + 'px',
				height: size + 'px',
				borderTop: corner.t != null ? `${weight}px solid ${accentVar(accent)}` : 'none',
				borderBottom: corner.b != null ? `${weight}px solid ${accentVar(accent)}` : 'none',
				borderLeft: corner.l != null ? `${weight}px solid ${accentVar(accent)}` : 'none',
				borderRight: corner.r != null ? `${weight}px solid ${accentVar(accent)}` : 'none',
			}"
		/>
	</div>
</template>
