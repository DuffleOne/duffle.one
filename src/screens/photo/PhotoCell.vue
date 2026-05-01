<script setup lang="ts">
/*
  Single photo cell in the contact sheet. Renders the real webp from
  photo.src; falls back to a striped placeholder if the file fails to
  load. Caption shows title + the actual file size.
*/
import { computed, ref } from "vue";
import type { Photo } from "../../site/data";
import StripedPlaceholder from "../../components/placeholders/StripedPlaceholder.vue";

const props = defineProps<{ photo: Photo; index: number; selected: boolean }>();
defineEmits<{ (e: "select"): void }>();

const failed = ref(false);

const sizeLabel = computed(() => {
	const kb = props.photo.bytes / 1024;
	return kb >= 1024
		? `${(kb / 1024).toFixed(1)}mb`
		: `${Math.round(kb)}kb`;
});

const filenameLabel = computed(
	() => `${String(props.index + 1).padStart(2, "0")}.webp · ${sizeLabel.value}`
);
</script>

<template>
	<button
		type="button"
		class="row-hover relative bg-tty-bg2 text-left cursor-pointer focus:outline-none border"
		:class="selected ? 'border-tty-green' : 'border-tty-border hover:border-tty-border-hi'"
		:style="selected ? 'box-shadow: 0 0 0 1px var(--color-tty-green), 0 0 16px oklch(82% 0.20 145 / 0.25);' : undefined"
		:aria-pressed="selected"
		@click="$emit('select')"
	>
		<div class="aspect-[4/5] w-full overflow-hidden">
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
				:base-hue="30"
				:hue-shift="40"
			/>
		</div>
		<div class="px-2 py-[5px] border-t border-tty-border text-[10.5px]">
			<div class="text-tty-fg truncate">{{ photo.title }}</div>
			<div class="text-tty-faint text-[9.5px] mt-px tnum">{{ filenameLabel }}</div>
		</div>
		<div
			v-if="selected"
			class="absolute top-[6px] left-[6px] text-[9px] text-tty-green tracking-[1px] tty-glow-g pointer-events-none"
		>▸ SEL</div>
	</button>
</template>
