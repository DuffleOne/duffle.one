<script setup lang="ts">
/*
  One row of a list, as a link: the name in ink on the left and its
  meta in muted on the right, or under it on a phone unless it's short
  enough to stay `inline`. `href` links out (in a new tab), `to` stays
  on the site. Anything in the slot sits under the row, outside the
  link.
*/
import { RouterLink } from "vue-router";

defineProps<{ name: string; meta?: string; href?: string; to?: string; inline?: boolean }>();
</script>

<template>
	<div class="row">
		<RouterLink v-if="to" :to="to" class="row-link" :class="{ inline }">
			<span class="row-name">{{ name }}</span>
			<span v-if="meta" class="row-meta">{{ meta }}</span>
		</RouterLink>
		<a v-else :href="href" target="_blank" rel="noopener" class="row-link" :class="{ inline }">
			<span class="row-name">{{ name }}</span>
			<span v-if="meta" class="row-meta">{{ meta }}</span>
		</a>
		<slot/>
	</div>
</template>

<style scoped>
.row-link {
	display: flex;
	flex-direction: column;
	gap: 2px;
}
.row-link:hover .row-name {
	text-decoration-line: underline;
	text-decoration-thickness: 1px;
	text-underline-offset: 2px;
}

.row-meta {
	font-size: 14px;
	color: var(--muted);
}

.row-link.inline {
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	gap: 24px;
}

@media (min-width: 720px) {
	.row-link {
		flex-direction: row;
		justify-content: space-between;
		gap: 24px;
	}
	.row-meta {
		font-size: 16px;
		text-align: right;
	}
}
</style>
