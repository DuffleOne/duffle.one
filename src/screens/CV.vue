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

const experience = SITE.cv.experience;
const skills = SITE.cv.skills;
</script>

<template>
	<main class="page">
		<div class="grid">
			<header class="topbar">
				<RouterLink to="/" class="back">← duffle.one</RouterLink>
				<div class="meta">
					<span>CV</span>
					<span class="tnum">{{ today }}</span>
					<span>London</span>
					<button type="button" class="theme-btn" @click="cycle">{{ themeLabel }}</button>
				</div>
			</header>

			<div class="hairline-line"/>

			<section class="intro">
				<h1 class="title">CV</h1>
				<p class="summary">{{ SITE.cv.summary }}</p>
				<p class="contact">
					<a href="mailto:laura@duffle.one" class="link">laura@duffle.one</a>
				</p>
			</section>

			<section class="block">
				<div class="label">Experience</div>
				<ol class="roles">
					<li v-for="e in experience" :key="e.slug">
						<RouterLink :to="`/cv/${e.slug}`" class="role-link">
							<div class="role-head">
								<span class="role-co">{{ e.co }}</span>
								<span class="role-when tnum">{{ e.when }}</span>
							</div>
							<div class="role-sub">
								<span class="role-role">{{ e.role }}</span>
								<span class="role-loc">· {{ e.loc }}</span>
							</div>
							<p class="role-blurb">{{ e.bullets[0] }}</p>
							<div class="role-tech">
								<span v-for="t in (e.tech ?? [])" :key="t" class="tag">{{ t }}</span>
							</div>
							<div class="role-more">Read more →</div>
						</RouterLink>
					</li>
				</ol>
			</section>

			<section class="block">
				<div class="label">Skills</div>
				<div class="skills">
					<span v-for="s in skills" :key="s" class="tag">{{ s }}</span>
				</div>
			</section>

			<footer class="footer">
				<span>End of CV</span>
				<span><a href="mailto:laura@duffle.one" class="link">Pitch: laura@duffle.one →</a></span>
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
	max-width: 880px;
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
.back {
	font-size: 13px;
	color: var(--ink);
	border-bottom: 1px solid var(--rule);
	transition: border-color 120ms ease;
}
.back:hover { border-bottom-color: var(--ink); }

.meta {
	display: flex;
	gap: 16px;
	font-size: 11px;
	letter-spacing: 1.6px;
	text-transform: uppercase;
	color: var(--dim);
	flex-wrap: wrap;
}
.theme-btn {
	background: transparent; border: 0; font: inherit;
	color: var(--dim); letter-spacing: 1.6px; text-transform: uppercase;
	cursor: pointer; padding: 0;
}
.theme-btn:hover { color: var(--ink); }

.hairline-line { border-top: 1px solid var(--ink); }

.title {
	font-size: clamp(56px, 14vw, 120px);
	line-height: 0.9;
	letter-spacing: -0.04em;
	font-weight: 500;
	margin: 0;
}
.summary {
	font-size: 16px;
	line-height: 1.6;
	max-width: 640px;
	margin: 16px 0 8px;
}
.contact { font-size: 14px; color: var(--dim); margin: 0; }

.label {
	font-size: 10px;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--dim);
	font-weight: 500;
	margin-bottom: 16px;
}

.roles { list-style: none; margin: 0; padding: 0; }
.roles li { border-bottom: 1px solid var(--rule); }
.roles li:last-child { border-bottom: 0; }
.role-link {
	display: block;
	padding: 18px 0;
	color: var(--ink);
	transition: opacity 120ms ease;
}
.role-link:hover { opacity: 0.78; }

.role-head {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 12px;
}
.role-co { font-size: 20px; font-weight: 500; letter-spacing: -0.01em; }
.role-when { font-size: 13px; color: var(--dim); white-space: nowrap; }
.role-sub { font-size: 14px; color: var(--dim); margin-top: 2px; }
.role-loc { margin-left: 6px; }
.role-blurb {
	margin: 10px 0 12px;
	font-size: 14px;
	line-height: 1.55;
	max-width: 640px;
}
.role-tech {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	margin-bottom: 10px;
}
.tag {
	font-size: 11px;
	letter-spacing: 0.4px;
	color: var(--dim);
	border: 1px solid var(--rule);
	padding: 2px 8px;
}
.role-more {
	font-size: 12px;
	letter-spacing: 0.6px;
	color: var(--dim);
}

.skills {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}

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
