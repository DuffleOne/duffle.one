<script setup lang="ts">
/*
  Uppercase pill. `outline` is the default (transparent bg, accent border
  + text); `filled` inverts (accent bg, near-black text, bold).

  Used in: project status, server status, easter-egg labels, CV skills.
*/
import type { Accent } from "../../types/accent";
import { accentBorder, accentText, accentBg } from "../../types/accent";

const props = withDefaults(
	defineProps<{ accent?: Accent; filled?: boolean }>(),
	{ accent: "green", filled: false }
);

// "color: #001b00" mirrors the prototype's filled foreground — a near-black
// that reads on any accent without crushing the contrast.
</script>

<template>
	<span
		class="inline-flex items-center font-mono uppercase whitespace-nowrap text-[10px] px-2 py-[2px] border tracking-[1.5px] leading-[1.4]"
		:class="[
			accentBorder(props.accent),
			props.filled
				? [accentBg(props.accent), 'font-bold']
				: [accentText(props.accent)],
		]"
		:style="props.filled ? 'color:#001b00' : undefined"
	>
		<slot/>
	</span>
</template>
