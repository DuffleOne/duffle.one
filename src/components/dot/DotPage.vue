<script setup lang="ts">
/*
  The page every screen sits in. The nav runs along the top, with the
  wordmark small on the left everywhere but the landing (which has it
  big), then the page itself, then a footer line picked at random.

  One column: a phone layout under 720px, a centred 600px column up to
  1439px. From 1440px the intro slot takes a 600px column on the left
  and stays put while the rest runs down the right.
*/
import { computed } from "vue";
import { useRoute } from "vue-router";
import { routes } from "../../site/routes";
import { SITE } from "../../site/data";
import { useTheme } from "../../composables/useTheme";

const route = useRoute();
const landing = computed(() => route.name === "home");

const nav = routes.filter((r) => r.id !== "home" && r.nav !== false);
// A role page (/cv/cuvva) still counts as the cv.
const current = (path: string) => route.path === path || route.path.startsWith(`${path}/`);

const { resolved, toggle } = useTheme();
const otherTheme = computed(() => (resolved.value === "dark" ? "light" : "dark"));

const footer = SITE.footer[Math.floor(Math.random() * SITE.footer.length)];
</script>

<template>
	<div class="page">
		<header class="top">
			<RouterLink v-if="!landing" to="/" class="brand">Duffle<span class="brand-dot" aria-hidden="true"></span></RouterLink>
			<nav class="top-nav" aria-label="Pages">
				<RouterLink
					v-for="r in nav"
					:key="r.id"
					:to="r.path"
					class="top-link"
					:class="{ current: current(r.path) }"
				>{{ r.label }}</RouterLink>
			</nav>
			<button type="button" class="top-link" :aria-label="`Switch to ${otherTheme} mode`" @click="toggle">{{ otherTheme }}</button>
		</header>

		<main class="main">
			<div class="intro">
				<slot name="intro"/>
			</div>
			<div v-if="$slots.default" class="content">
				<slot/>
			</div>
		</main>

		<footer class="foot">
			<p>{{ footer }}</p>
			<span class="foot-dot" aria-hidden="true"></span>
		</footer>
	</div>
</template>

<style scoped>
.page {
	padding: 20px 24px 40px;
}

.top {
	display: flex;
	align-items: baseline;
	gap: 24px;
}
.top-nav {
	display: flex;
	gap: 24px;
	margin-left: auto;
}

.brand {
	font-weight: 500;
}
.brand-dot {
	display: inline-block;
	width: 5px;
	height: 5px;
	margin-left: 2px;
	border-radius: 50%;
	background: var(--yellow);
}

.top-link {
	font-size: 14px;
	color: var(--muted);
	cursor: pointer;
	transition: color 150ms ease;
}
.top-link:hover,
.top-link.current {
	color: var(--ink);
}

.main {
	margin-top: var(--gap-page);
}
.content {
	margin-top: var(--gap-block);
}

.foot {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24px;
	margin-top: var(--gap-page);
	font-size: 13px;
	color: var(--muted);
}
.foot-dot {
	flex: none;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: var(--yellow);
}

@media (min-width: 720px) {
	.page {
		padding: 40px calc((100% - 600px) / 2) 56px;
	}
}

/* 1360px of content at most: 120px each side at 1600, never under 80.
   The right column drops a touch so its first line meets the title's
   cap height; the landing asks for more with --content-offset. */
@media (min-width: 1440px) {
	.page {
		padding-inline: max(80px, calc((100% - 1360px) / 2));
	}
	.main {
		display: grid;
		grid-template-columns: 600px minmax(0, 1fr);
		align-items: start;
		column-gap: 120px;
	}
	.intro {
		position: sticky;
		top: 40px;
	}
	.content {
		margin-top: 0;
		padding-top: var(--content-offset, 8px);
	}
}

@media (prefers-reduced-motion: reduce) {
	.top-link {
		transition: none;
	}
}
</style>
