<script setup lang="ts">
/*
  Typographic glyph in an accent — ▸ ◐ ✦ § ☼ ♣ ✉ etc. The design uses
  characters in place of an icon library.
*/
import type { Accent } from "../../types/accent";
import { accentText } from "../../types/accent";

const props = withDefaults(
	defineProps<{ accent?: Accent; width?: number; size?: number; family?: "mono" | "display" }>(),
	{ accent: "green", family: "mono" }
);
</script>

<template>
	<span
		class="inline-block text-center"
		:class="[
			accentText(props.accent),
			props.family === 'display' ? 'font-display' : 'font-mono',
		]"
		:style="{
			width: props.width != null ? props.width + 'px' : undefined,
			fontSize: props.size != null ? props.size + 'px' : undefined,
		}"
		aria-hidden="true"
	>
		<slot/>
	</span>
</template>
