<script setup lang="ts">
/*
  Bottom route bar shown only on mobile (sidebar is hidden below `md`).
  Six tappable cells, one per route, with the active one tinted in its
  accent. Sits between the content pane and the status bar.

  Per-row accent flows through a CSS variable so the JIT doesn't have
  to enumerate every accent x state combo.
*/
import { routes, type RouteId } from "../../site/routes";
import { accentVar } from "../../types/accent";

defineProps<{ activeId: RouteId | "sudo" }>();
</script>

<template>
	<nav
		aria-label="primary"
		class="mobile-tabs flex md:hidden border-t border-tty-border bg-tty-bg2 shrink-0 overflow-x-auto"
	>
		<RouterLink
			v-for="r in routes"
			:key="r.id"
			:to="r.path"
			class="tab"
			:class="{ 'is-active': r.id === activeId }"
			:style="{ '--tab-accent': accentVar(r.accent) } as any"
		>
			<span class="tab-key">{{ r.key }}</span>
			<span class="tab-label">{{ r.label }}</span>
		</RouterLink>
	</nav>
</template>

<style scoped>
.tab {
	flex: 1 1 0;
	min-width: 0;
	min-height: 44px;
	padding: 6px 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2px;
	border-top: 2px solid transparent;
	color: var(--color-tty-dim);
	font-family: var(--font-mono);
	font-size: 11px;
	line-height: 1.1;
	text-decoration: none;
	transition: background-color 80ms ease-out, color 80ms ease-out, border-color 80ms ease-out;
}
.tab .tab-key {
	color: var(--color-tty-faint);
	font-size: 9px;
	letter-spacing: 1px;
}
.tab .tab-label {
	font-size: 11px;
	letter-spacing: 0.5px;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 100%;
	white-space: nowrap;
}
.tab.is-active {
	color: var(--tab-accent);
	border-top-color: var(--tab-accent);
	background: var(--color-tty-bg3);
}
.tab.is-active .tab-key {
	color: var(--tab-accent);
}
.tab:active {
	background: var(--color-tty-bg3);
}
</style>
