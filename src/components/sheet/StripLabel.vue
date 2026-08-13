<script setup lang="ts">
/*
  Strip header: the strip's letter, a hairline, then the section title
  and an optional note. The title is the real heading for assistive
  tech; the letter is edge printing and reads as decoration.
*/
defineProps<{ code: string; title: string; note?: string }>();
</script>

<template>
	<div class="flex items-center gap-3.5">
		<span class="whitespace-nowrap edge-caps text-accent-ink" aria-hidden="true">{{ code }}</span>
		<span class="h-px flex-1 bg-rule"></span>
		<h2 class="m-0 edge-caps font-body font-normal text-ink-mute">
			{{ title }}<span v-if="note" class="text-ink-faint"> · {{ note }}</span>
		</h2>
	</div>
</template>
