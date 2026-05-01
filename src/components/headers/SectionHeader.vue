<script setup lang="ts">
/*
  Top-of-screen heading: §NN eyebrow + display-font title + flex
  hairline + ● LIVE indicator on the right.
*/
import type { Accent } from "../../types/accent";
import { accentText } from "../../types/accent";

const props = withDefaults(
	defineProps<{ accent?: Accent; n?: string; live?: boolean }>(),
	{ accent: "amber", live: true }
);
</script>

<template>
	<div class="flex items-baseline gap-2 md:gap-3 min-w-0">
		<span v-if="props.n" class="text-tty-faint text-[11px] tracking-[2px] shrink-0">§{{ props.n }}</span>
		<h2 class="font-display text-[22px] md:text-[28px] leading-none tracking-[-0.5px] m-0 min-w-0 truncate">
			<slot/>
		</h2>
		<span class="flex-1 h-px bg-tty-border mx-1"/>
		<span
			v-if="props.live"
			class="text-[10.5px] tracking-[2px] shrink-0"
			:class="accentText(props.accent)"
		>● LIVE</span>
	</div>
</template>
