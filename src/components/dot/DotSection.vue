<script setup lang="ts">
/*
  A labelled block: the small muted label ("made", "work") and what it
  labels, 16px under it. Sections that follow one another sit 56px
  apart (48 on a phone).
*/
defineProps<{ label: string }>();
</script>

<template>
	<section class="section">
		<h2 class="label">{{ label }}</h2>
		<div class="body">
			<slot/>
		</div>
	</section>
</template>

<style scoped>
.section + .section {
	margin-top: var(--gap-section);
}

.label {
	font-size: 13px;
	letter-spacing: 0.2px;
	color: var(--muted);
	text-transform: lowercase;
}

.body {
	margin-top: 16px;
}
</style>
