<script setup lang="ts">
/*
  Subpage masthead: the brand on the left, section nav and the theme
  control on the right, over a hairline — the subpage counterpart of
  the landing's dateline row. The active section reads in accent ink.
*/
import { routes, type RouteId } from "../../site/routes";
import ThemeToggle from "./ThemeToggle.vue";

const props = defineProps<{ active?: RouteId }>();

const nav = routes.filter((r) => r.id !== "home" && r.nav !== false);

function linkClass(id: RouteId): string {
	return id === props.active
		? "text-accent-ink"
		: "text-ink-faint hover:text-accent-hover";
}
</script>

<template>
	<header class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule pb-3.5 meta-caps text-ink-faint">
		<RouterLink to="/" class="text-ink-faint hover:text-accent-hover">duffle.one</RouterLink>
		<div class="flex flex-wrap items-baseline gap-x-5 gap-y-1">
			<nav class="flex flex-wrap gap-x-5 gap-y-1">
				<RouterLink
					v-for="r in nav"
					:key="r.id"
					:to="r.path"
					:class="linkClass(r.id)"
					:aria-current="r.id === active ? 'page' : undefined"
				>{{ r.label }}</RouterLink>
			</nav>
			<ThemeToggle/>
		</div>
	</header>
</template>
