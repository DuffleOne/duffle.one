<script setup lang="ts">
/*
  Grid of StatBoxes. Defaults to 4-up; the columns prop adjusts it.
*/
import StatBox from "./StatBox.vue";
import type { Accent } from "../../types/accent";

type Stat = { label: string; value: string; sub?: string; accent: Accent };

withDefaults(
	defineProps<{ stats: Stat[]; columns?: number; valueSize?: number }>(),
	{ columns: 4, valueSize: 24 }
);
</script>

<template>
	<div
		class="stat-grid gap-3"
		:style="{ '--stat-cols-md': `repeat(${columns}, minmax(0, 1fr))` }"
	>
		<StatBox
			v-for="s in stats"
			:key="s.label"
			:label="s.label"
			:value="s.value"
			:sub="s.sub"
			:accent="s.accent"
			:size="valueSize"
		/>
	</div>
</template>

<style scoped>
.stat-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 768px) {
	.stat-grid {
		grid-template-columns: var(--stat-cols-md);
	}
}
</style>
