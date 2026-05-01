<script setup lang="ts">
/*
  Single bordered stat: faint eyebrow + display-font value, with an
  optional faint sub-label underneath when the value alone needs
  context (e.g. a "live / total" ratio).
*/
import type { Accent } from "../../types/accent";
import { accentText } from "../../types/accent";

withDefaults(
	defineProps<{ label: string; value: string; sub?: string; accent?: Accent; size?: number }>(),
	{ accent: "green", size: 24 }
);
</script>

<template>
	<div class="border border-tty-border bg-tty-bg2 px-3 py-[10px]">
		<div class="text-tty-faint tracking-[1.5px] text-[10px]">{{ label }}</div>
		<div
			class="font-display tracking-[-0.3px] tnum"
			:class="accentText(accent)"
			:style="{ fontSize: size + 'px' }"
		>{{ value }}</div>
		<div
			v-if="sub"
			class="text-tty-faint text-[9.5px] tracking-[1.5px] uppercase mt-px"
		>{{ sub }}</div>
	</div>
</template>
