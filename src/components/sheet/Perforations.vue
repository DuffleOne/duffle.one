<script setup lang="ts">
/*
  The film edge: a run of sprocket holes across the sheet. The count is
  deliberately generous and the strip clips, so it fills any width
  without measuring anything. Decorative, so it's hidden from AT.
*/
withDefaults(defineProps<{ count?: number }>(), { count: 64 });
</script>

<template>
	<div class="flex items-center gap-3 overflow-hidden" aria-hidden="true">
		<span v-for="i in count" :key="i" class="h-2.5 w-3.5 shrink-0 rounded-[2px] bg-perf"></span>
	</div>
</template>
