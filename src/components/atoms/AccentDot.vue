<script setup lang="ts">
/*
  ● dot in an accent colour. Used as status indicator on home (●online),
  in the status bar (●synced), and as a leading marker on server rows.
*/
import type { Accent } from "../../types/accent";
import { accentText } from "../../types/accent";

const props = withDefaults(defineProps<{ accent?: Accent; glow?: boolean }>(), {
	accent: "green",
	glow: false,
});
</script>

<template>
	<span
		class="inline-block"
		:class="[accentText(props.accent), props.glow && `tty-glow-${props.accent[0]}`]"
		aria-hidden="true"
	>●</span>
</template>
