<script setup lang="ts">
/*
  One frame on the contact sheet: the image area matted on the surface,
  with the rebate row printed above it — frame number in accent, an
  optional label, and meta on the right (EXIF, a select mark, a year).

  `flush` drops the cell's own padding so a photograph can run edge to
  edge; the rebate keeps its own inset in that case.
*/
withDefaults(
	defineProps<{
		no: string;
		label?: string;
		meta?: string;
		flush?: boolean;
		// Content padding for the non-flush case; the hero frame wants more.
		pad?: string;
	}>(),
	{ pad: "p-5 sm:p-6" },
);
</script>

<template>
	<div class="flex flex-col border border-rule bg-mat" :class="flush ? '' : pad">
		<div
			class="flex items-center justify-between gap-3 edge-caps text-ink-faint tnum"
			:class="flush ? 'px-5 pt-5 pb-4' : 'pb-6'"
		>
			<span class="flex items-center gap-2.5">
				<span class="whitespace-nowrap text-accent-ink">{{ no }}</span>
				<span v-if="label" class="h-px w-4 bg-accent/45" aria-hidden="true"></span>
				<span v-if="label">{{ label }}</span>
			</span>
			<span v-if="meta">{{ meta }}</span>
		</div>
		<slot/>
	</div>
</template>
