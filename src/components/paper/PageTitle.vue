<script setup lang="ts">
/*
  Centred subpage opening: big Alcyone display title over a hairline,
  with an optional italic standfirst under it.
*/
defineProps<{ title: string; subtitle?: string }>();
</script>

<template>
	<div class="pt-8 pb-7 text-center border-b border-rule">
		<h2 class="m-0 font-display font-light text-[clamp(44px,7vw,72px)] leading-none">{{ title }}</h2>
		<p v-if="subtitle" class="m-0 mt-4 font-display font-light italic text-[clamp(18px,2.4vw,25px)] text-ink-soft">{{ subtitle }}</p>
	</div>
</template>
