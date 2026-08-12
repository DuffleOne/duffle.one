<script setup lang="ts">
/*
  Theme control in the dateline's small caps: cycles light → dark →
  system, labelled with the resolved theme while on "auto".
*/
import { computed } from "vue";
import { useTheme } from "../../composables/useTheme";

const { choice, resolved, cycle } = useTheme();

const label = computed(() =>
	choice.value === "system" ? `auto · ${resolved.value}` : choice.value,
);
</script>

<template>
	<button
		type="button"
		class="meta-caps cursor-pointer border-0 bg-transparent p-0 text-ink-faint hover:text-accent-hover"
		:title="`Theme: ${label}`"
		@click="cycle"
	>{{ label }}</button>
</template>
