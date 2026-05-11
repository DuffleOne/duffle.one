<script setup lang="ts">
import { computed } from "vue";
import { SITE } from "../site/data";
import { useToday } from "../composables/useToday";
import { useTheme } from "../composables/useTheme";

const { today } = useToday();
const { choice: themeChoice, resolved, cycle } = useTheme();
const themeLabel = computed(() => {
	if (themeChoice.value === "system") return `auto · ${resolved.value}`;
	return themeChoice.value;
});

const guide = SITE.guide;
</script>

<template>
	<main class="page">
		<div class="grid">
			<header class="topbar">
				<RouterLink to="/" class="back">← duffle.one</RouterLink>
				<div class="meta">
					<span>User guide</span>
					<span class="tnum">{{ today }}</span>
					<button type="button" class="theme-btn" @click="cycle">{{ themeLabel }}</button>
				</div>
			</header>

			<div class="hairline-line"/>

			<section class="intro">
				<h1 class="title">User guide</h1>
				<p class="lede">{{ guide.intro }}</p>
				<div class="about">
					<p v-for="(p, i) in guide.about" :key="i">{{ p }}</p>
				</div>
			</section>

			<section v-for="s in guide.sections" :key="s.h" class="section">
				<h2 class="h2">{{ s.h }}</h2>
				<div class="body">
					<p v-for="(p, i) in s.body" :key="i">{{ p }}</p>
				</div>
			</section>

			<section class="block">
				<div class="label">Values</div>
				<dl class="values">
					<template v-for="v in guide.values" :key="v.h">
						<dt>{{ v.h }}</dt>
						<dd>{{ v.b }}</dd>
					</template>
				</dl>
			</section>

			<footer class="footer">
				<span>End of guide</span>
				<span><a href="mailto:laura@duffle.one" class="link">laura@duffle.one →</a></span>
			</footer>
		</div>
	</main>
</template>

<style scoped>
.page {
	min-height: 100vh;
	background: var(--bg);
	color: var(--ink);
	padding: clamp(24px, 5vw, 80px);
}
.grid {
	max-width: 720px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 32px;
}

.topbar {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 16px;
	flex-wrap: wrap;
}
.back {
	font-size: 13px;
	color: var(--ink);
	border-bottom: 1px solid var(--rule);
}
.back:hover { border-bottom-color: var(--ink); }
.meta { display: flex; gap: 16px; font-size: 11px; letter-spacing: 1.6px; text-transform: uppercase; color: var(--dim); flex-wrap: wrap; }
.theme-btn { background: transparent; border: 0; font: inherit; color: var(--dim); letter-spacing: 1.6px; text-transform: uppercase; cursor: pointer; padding: 0; }
.theme-btn:hover { color: var(--ink); }
.hairline-line { border-top: 1px solid var(--ink); }

.title {
	font-size: clamp(56px, 14vw, 120px);
	line-height: 0.9;
	letter-spacing: -0.04em;
	font-weight: 500;
	margin: 0;
}
.lede {
	font-size: 17px;
	line-height: 1.6;
	margin: 18px 0 0;
	max-width: 640px;
	color: var(--ink);
}
.about { margin-top: 16px; }
.about p {
	margin: 12px 0;
	font-size: 15px;
	line-height: 1.7;
	color: var(--ink);
}

.section {
	border-top: 1px solid var(--rule);
	padding-top: 24px;
}
.h2 {
	font-size: 22px;
	font-weight: 500;
	letter-spacing: -0.01em;
	margin: 0 0 12px;
}
.body p {
	margin: 10px 0;
	font-size: 15px;
	line-height: 1.7;
}

.label {
	font-size: 10px;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--dim);
	font-weight: 500;
	margin-bottom: 12px;
}

.values {
	margin: 0;
	display: grid;
	grid-template-columns: 1fr;
	gap: 14px;
}
.values dt {
	font-size: 15px;
	font-weight: 500;
}
.values dd {
	margin: 4px 0 0;
	font-size: 14px;
	line-height: 1.6;
	color: var(--dim);
	padding-bottom: 12px;
	border-bottom: 1px dotted var(--rule);
}
.values dd:last-of-type { border-bottom: 0; }

.footer {
	border-top: 1px solid var(--ink);
	padding-top: 14px;
	display: flex;
	justify-content: space-between;
	font-size: 11px;
	letter-spacing: 1.6px;
	text-transform: uppercase;
	color: var(--dim);
	flex-wrap: wrap;
	gap: 16px;
}
</style>
