<script setup lang="ts">
/*
  Manpage section. Amber eyebrow + indented body slot. Used by Guide.
*/
defineProps<{ heading: string }>();
</script>

<template>
	<section>
		<div class="text-tty-amber text-[10.5px] tracking-[2px] mb-1">{{ heading }}</div>
		<div class="pl-[10px] md:pl-[18px]">
			<slot/>
		</div>
	</section>
</template>
