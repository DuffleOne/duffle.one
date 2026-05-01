<script setup lang="ts">
/*
  10-cell █/░ resource indicator. Filled cells take the accent; empty
  cells render in faint. Used by SysMonitor for cpu / mem / net.
*/
import type { Accent } from "../../types/accent";
import { accentText } from "../../types/accent";
import { computed } from "vue";

const props = withDefaults(
	defineProps<{ label: string; value: number; max?: number; accent: Accent }>(),
	{ max: 10 }
);

const filled = computed(() => Math.max(0, Math.min(props.max, Math.round(props.value))));
const empty = computed(() => props.max - filled.value);
</script>

<template>
	<div class="text-tty-dim flex justify-between gap-2">
		<span>{{ props.label }}</span>
		<span class="font-mono leading-none">
			<span :class="accentText(props.accent)">{{ "█".repeat(filled) }}</span>
			<span class="text-tty-faint">{{ "░".repeat(empty) }}</span>
		</span>
	</div>
</template>
