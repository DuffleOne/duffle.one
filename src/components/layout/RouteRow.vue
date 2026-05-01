<script setup lang="ts">
/*
  Single sidebar route row. Active = bg3 + 2px accent left border + fg.
  Hover previews activation. Per-accent styling flows through a CSS
  custom property so Tailwind doesn't need to JIT every combo of
  `group-hover:text-tty-{accent}`.
*/
import type { RouteSpec } from "../../site/routes";
import { accentVar } from "../../types/accent";
import { computed } from "vue";

const props = defineProps<{ route: RouteSpec; active: boolean }>();

const accentCss = computed(() => accentVar(props.route.accent));
</script>

<template>
	<RouterLink
		:to="props.route.path"
		class="route-row row-hover flex items-center gap-[10px] px-[18px] py-2 border-l-2"
		:class="props.active ? 'is-active' : ''"
		:style="{ '--row-accent': accentCss } as any"
	>
		<span class="route-row__key w-[10px] inline-block">{{ props.route.key }}</span>
		<span class="route-row__marker w-2 inline-block">{{ props.active ? "▸" : "·" }}</span>
		<span class="route-row__label">{{ props.route.label }}</span>
	</RouterLink>
</template>

<style scoped>
.route-row {
	border-left-color: transparent;
	color: var(--color-tty-dim);
}
.route-row__key,
.route-row__marker {
	color: var(--color-tty-faint);
}
.route-row.is-active {
	background: var(--color-tty-bg3);
	border-left-color: var(--row-accent);
	color: var(--color-tty-fg);
}
.route-row.is-active .route-row__key,
.route-row.is-active .route-row__marker {
	color: var(--row-accent);
}
.route-row:hover {
	background: var(--color-tty-bg3);
	border-left-color: var(--row-accent);
	color: var(--color-tty-fg);
}
.route-row:hover .route-row__key,
.route-row:hover .route-row__marker {
	color: var(--row-accent);
}
</style>
