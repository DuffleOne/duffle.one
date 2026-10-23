<script setup lang="ts">
/*
  A labelled block: the small muted label ("made", "work") and what it
  labels, 16px under it. Sections that follow one another sit 56px
  apart (48 on a phone).

  On the iPhone Duo the label is in ink with a hairline running on from
  it to the edge, or to `count` (how many things are in it) if there is
  one. The count only shows there.
*/
defineProps<{ label: string; count?: number }>();
</script>

<template>
	<section class="section">
		<div class="head">
			<h2 class="label">{{ label }}</h2>
			<span v-if="count !== undefined" class="count" aria-hidden="true">{{ count }}</span>
		</div>
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

.count {
	display: none;
}

.body {
	margin-top: 16px;
}

:root[data-duo] .head {
	display: flex;
	align-items: center;
	gap: 14px;
}
:root[data-duo] .head::after {
	content: "";
	flex: 1;
	order: 1;
	height: 1px;
	background: var(--idle);
}
:root[data-duo] .label {
	font-weight: 500;
	color: var(--ink);
}
:root[data-duo] .count {
	display: block;
	order: 2;
	font-size: 13px;
	color: var(--muted);
}
</style>
