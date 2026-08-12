<script setup lang="ts">
/*
  A photograph matted on the surface — the design system's "plate"
  treatment: mat border, archival grade on the print, and an 11px
  caption row (caption left, meta right). The optional `extra` slot
  adds a line under the caption.
*/
defineProps<{
	src: string;
	alt: string;
	caption: string;
	meta?: string;
	// Fixed print height (e.g. "290px"); omit to keep the natural ratio.
	h?: string;
	// Above-the-fold plates load eagerly (the landing hero).
	eager?: boolean;
}>();
</script>

<template>
	<figure class="m-0 flex flex-col gap-2.5">
		<div class="bg-mat border border-rule p-3">
			<img
				:src="src"
				:alt="alt"
				class="plate-img block w-full object-cover"
				:style="h ? { height: h } : undefined"
				:loading="eager ? 'eager' : 'lazy'"
				decoding="async"
			/>
		</div>
		<figcaption class="flex justify-between gap-3 text-[11px] tracking-[0.18em] uppercase text-ink-faint tnum">
			<span>{{ caption }}</span>
			<span v-if="meta">{{ meta }}</span>
		</figcaption>
		<slot name="extra"/>
	</figure>
</template>
