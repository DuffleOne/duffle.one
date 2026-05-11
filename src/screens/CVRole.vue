<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { SITE } from "../site/data";
import { useToday } from "../composables/useToday";
import { useTheme } from "../composables/useTheme";

const route = useRoute();
const { today } = useToday();
const { choice: themeChoice, resolved, cycle } = useTheme();
const themeLabel = computed(() => {
	if (themeChoice.value === "system") return `auto · ${resolved.value}`;
	return themeChoice.value;
});

const slug = computed(() => String(route.params.slug ?? ""));
const role = computed(() => SITE.cv.experience.find((e) => e.slug === slug.value));

const idx = computed(() => SITE.cv.experience.findIndex((e) => e.slug === slug.value));
const prev = computed(() => (idx.value > 0 ? SITE.cv.experience[idx.value - 1] : null));
const next = computed(() => (idx.value >= 0 && idx.value < SITE.cv.experience.length - 1 ? SITE.cv.experience[idx.value + 1] : null));
</script>

<template>
	<main class="page">
		<div class="grid">
			<header class="topbar">
				<div class="back-group">
					<RouterLink to="/" class="back">← duffle.one</RouterLink>
					<RouterLink to="/cv" class="back">CV</RouterLink>
				</div>
				<div class="meta">
					<span class="tnum">{{ today }}</span>
					<button type="button" class="theme-btn" @click="cycle">{{ themeLabel }}</button>
				</div>
			</header>

			<div class="hairline-line"/>

			<template v-if="role">
				<section class="head">
					<div class="label">Role</div>
					<h1 class="title">{{ role.co }}</h1>
					<div class="sub">
						<span>{{ role.role }}</span>
						<span class="dot-sep">·</span>
						<span>{{ role.loc }}</span>
						<span class="dot-sep">·</span>
						<span class="tnum">{{ role.when }}</span>
					</div>
					<p v-if="role.href" class="contact">
						<a :href="role.href" target="_blank" rel="noopener" class="link">{{ role.href.replace(/^https?:\/\//, "") }}</a>
					</p>
				</section>

				<section v-if="role.tech?.length" class="block">
					<div class="label">Stack</div>
					<div class="tech">
						<span v-for="t in role.tech" :key="t" class="tag">{{ t }}</span>
					</div>
				</section>

				<section class="block">
					<div class="label">What I did</div>
					<ul class="bullets">
						<li v-for="(b, i) in role.bullets" :key="i">{{ b }}</li>
					</ul>
				</section>

				<nav class="rolenav">
					<div class="rolenav-side">
						<template v-if="prev">
							<div class="label small">Previous</div>
							<RouterLink :to="`/cv/${prev.slug}`" class="link">← {{ prev.co }}</RouterLink>
						</template>
					</div>
					<div class="rolenav-side right">
						<template v-if="next">
							<div class="label small">Next</div>
							<RouterLink :to="`/cv/${next.slug}`" class="link">{{ next.co }} →</RouterLink>
						</template>
					</div>
				</nav>
			</template>

			<section v-else class="missing">
				<h1 class="title">Not found</h1>
				<p>No CV entry under "{{ slug }}".</p>
				<RouterLink to="/cv" class="link">Back to CV →</RouterLink>
			</section>

			<footer class="footer">
				<span>End of role</span>
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
	max-width: 760px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 28px;
}
.topbar {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 16px;
	flex-wrap: wrap;
}
.back-group { display: flex; gap: 12px; }
.back {
	font-size: 13px;
	color: var(--ink);
	border-bottom: 1px solid var(--rule);
}
.back:hover { border-bottom-color: var(--ink); }
.meta { display: flex; gap: 16px; font-size: 11px; letter-spacing: 1.6px; text-transform: uppercase; color: var(--dim); }
.theme-btn { background: transparent; border: 0; font: inherit; color: var(--dim); letter-spacing: 1.6px; text-transform: uppercase; cursor: pointer; padding: 0; }
.theme-btn:hover { color: var(--ink); }
.hairline-line { border-top: 1px solid var(--ink); }

.label {
	font-size: 10px;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--dim);
	font-weight: 500;
	margin-bottom: 12px;
}
.label.small { margin-bottom: 4px; }

.title {
	font-size: clamp(48px, 10vw, 96px);
	line-height: 0.9;
	letter-spacing: -0.03em;
	font-weight: 500;
	margin: 0;
}
.sub {
	font-size: 15px;
	color: var(--dim);
	margin-top: 14px;
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}
.dot-sep { color: var(--faint); }
.contact { font-size: 14px; margin-top: 12px; color: var(--dim); }

.tech { display: flex; gap: 6px; flex-wrap: wrap; }
.tag {
	font-size: 11px;
	letter-spacing: 0.4px;
	color: var(--dim);
	border: 1px solid var(--rule);
	padding: 2px 8px;
}

.bullets {
	margin: 0;
	padding: 0;
	list-style: none;
}
.bullets li {
	font-size: 15px;
	line-height: 1.65;
	padding: 10px 0 10px 18px;
	border-bottom: 1px dotted var(--rule);
	position: relative;
}
.bullets li:last-child { border-bottom: 0; }
.bullets li::before {
	content: "•";
	position: absolute;
	left: 0;
	color: var(--dim);
}

.rolenav {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	border-top: 1px solid var(--rule);
	padding-top: 18px;
}
.rolenav-side.right { text-align: right; }

.missing { padding: 40px 0; }

.footer {
	border-top: 1px solid var(--ink);
	padding-top: 14px;
	display: flex;
	justify-content: space-between;
	font-size: 11px;
	letter-spacing: 1.6px;
	text-transform: uppercase;
	color: var(--dim);
	gap: 16px;
	flex-wrap: wrap;
}
</style>
