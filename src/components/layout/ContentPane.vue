<script setup lang="ts">
/*
  Scrollable content area inside the chrome. Hidden scrollbars (handled
  globally in input.css). The default slot is whatever the screen renders.

  Padding/gap props are the desktop values; on viewports below `md` they
  scale down so the chrome doesn't crowd the content. The mobile values
  are derived rather than configurable per-screen — the design language
  wants the same tight margins everywhere on phones.
*/
import { computed } from "vue";

const props = withDefaults(
	defineProps<{ paddingX?: number; paddingY?: number; gap?: number }>(),
	{ paddingX: 34, paddingY: 30, gap: 18 }
);

const cssVars = computed(() => ({
	"--cp-px": props.paddingX + "px",
	"--cp-py": props.paddingY + "px",
	"--cp-gap": props.gap + "px",
	// Mobile values: never wider than 16px horizontal, 18px vertical, 14px gap.
	"--cp-px-sm": Math.min(16, props.paddingX) + "px",
	"--cp-py-sm": Math.min(18, props.paddingY) + "px",
	"--cp-gap-sm": Math.min(14, props.gap) + "px",
}));
</script>

<template>
	<main
		class="tty-content content-pane flex-1 min-h-0 min-w-0 overflow-y-auto flex flex-col"
		:style="cssVars"
	>
		<slot/>
	</main>
</template>

<style scoped>
.content-pane {
	padding: var(--cp-py-sm) var(--cp-px-sm);
	gap: var(--cp-gap-sm);
}
@media (min-width: 768px) {
	.content-pane {
		padding: var(--cp-py) var(--cp-px);
		gap: var(--cp-gap);
	}
}
</style>
