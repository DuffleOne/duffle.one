<script setup lang="ts">
/*
  Window-chrome traffic-light dots. Pink replaces macOS's red on purpose
  — keeps the design's playful palette consistent.
*/
</script>

<template>
	<div class="flex gap-[6px]" aria-hidden="true">
		<span class="w-[10px] h-[10px] rounded-full bg-tty-pink opacity-85"/>
		<span class="w-[10px] h-[10px] rounded-full bg-tty-amber opacity-85"/>
		<span class="w-[10px] h-[10px] rounded-full bg-tty-green opacity-85"/>
	</div>
</template>
