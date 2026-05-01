<script setup lang="ts">
/*
  Bottom block of the sidebar. Three resource bars. Values are static
  on purpose; this is a personality element, not a real telemetry feed.
*/
import ResourceBar from "./ResourceBar.vue";
</script>

<template>
	<div class="mt-auto px-[18px] pt-4 pb-1 border-t border-tty-border text-[10.5px]">
		<div class="text-tty-faint tracking-[1.5px] mb-2">SYS</div>
		<ResourceBar label="cpu" :value="6" accent="green"/>
		<ResourceBar label="mem" :value="4" accent="amber"/>
		<ResourceBar label="net" :value="8" accent="cyan"/>
	</div>
</template>
