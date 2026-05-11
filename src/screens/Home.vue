<script setup lang="ts">
/*
  Home — design C. Asymmetric 12-col Swiss grid on wide viewports,
  collapses to a single column under 900px.

  Live data:
   - weather from Open-Meteo (London)
   - date from the browser clock
   - game servers from the AMP worker (sorted online-first by players)
   - rotating quote walks a shuffled cycle of the full pool
*/
import { computed } from "vue";
import { SITE } from "../site/data";
import { useWeather } from "../composables/useWeather";
import { useServers } from "../composables/useServers";
import { useQuoteRotation } from "../composables/useQuoteRotation";
import { useToday } from "../composables/useToday";
import { useTheme } from "../composables/useTheme";

const { label: weather } = useWeather();
const { today } = useToday();
const { servers, stats } = useServers();
const { quote, attribution } = useQuoteRotation();
const { choice: themeChoice, resolved, cycle } = useTheme();

const projects = SITE.projects;
// Three highlight roles for the home page; the CV page has the full list.
const cvHighlights = computed(() => SITE.cv.experience.slice(0, 4));

const githubHref = SITE.socials.find((s) => s.id === "github")?.href ?? "#";
const igHref = SITE.socials.find((s) => s.id === "ig")?.href ?? "#";
const liHref = SITE.socials.find((s) => s.id === "linkedin")?.href ?? "#";

const themeLabel = computed(() => {
	if (themeChoice.value === "system") return `auto · ${resolved.value}`;
	return themeChoice.value;
});
</script>

<template>
	<main class="page">
		<div class="grid">
			<!-- TOP-LEFT — name + links (replaces the "Now" block) -->
			<section class="cell links">
				<div class="label dot-prefix">Laura Miller — personal</div>
				<p class="lede">
					Founding engineer, photographer, 3D-print enthusiast.
					Currently building Clove. Based in London.
				</p>
				<ul class="link-list">
					<li>
						<a href="mailto:laura@duffle.one" class="row">
							<span class="row-key">email</span>
							<span class="row-val">laura@duffle.one</span>
						</a>
					</li>
					<li>
						<a :href="igHref" target="_blank" rel="me noopener" class="row">
							<span class="row-key">instagram</span>
							<span class="row-val">@duffle.one</span>
						</a>
					</li>
					<li>
						<a :href="githubHref" target="_blank" rel="me noopener" class="row">
							<span class="row-key">github</span>
							<span class="row-val">@DuffleOne</span>
						</a>
					</li>
					<li>
						<a :href="liHref" target="_blank" rel="me noopener" class="row">
							<span class="row-key">linkedin</span>
							<span class="row-val">/in/duffle</span>
						</a>
					</li>
					<li>
						<RouterLink to="/cv" class="row">
							<span class="row-key">cv</span>
							<span class="row-val">read →</span>
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/guide" class="row">
							<span class="row-key">user guide</span>
							<span class="row-val">read →</span>
						</RouterLink>
					</li>
				</ul>
			</section>

			<!-- TOP-RIGHT — meta strip -->
			<header class="cell meta">
				<span>Index</span>
				<span class="tnum">{{ today }}</span>
				<span>London, {{ weather }}</span>
				<button type="button" class="theme-btn" :title="`Theme: ${themeLabel}`" @click="cycle">
					{{ themeLabel }}
				</button>
			</header>

			<div class="hairline-row"><span class="hairline-line"/></div>

			<!-- 01 — Projects -->
			<section class="cell block block-projects">
				<div class="label">01 — Projects</div>
				<ol class="ord">
					<li v-for="(p, i) in projects" :key="p.id" class="proj-row row-dotted">
						<span class="idx tnum">{{ String(i + 1).padStart(2, "0") }}</span>
						<a :href="p.href" target="_blank" rel="noopener" class="proj-body">
							<span class="proj-name">{{ p.name }}</span>
							<span class="proj-blurb"> · {{ p.blurb }}</span>
						</a>
						<span class="year tnum">{{ p.year }}</span>
					</li>
				</ol>
			</section>

			<!-- 02 — CV -->
			<section class="cell block block-cv">
				<div class="label">02 — CV</div>
				<ol class="ord">
					<li v-for="e in cvHighlights" :key="e.slug" class="cv-row row-dotted">
						<RouterLink :to="`/cv/${e.slug}`" class="cv-body">
							<span class="cv-co">{{ e.co }}</span>
							<span class="cv-role"> — {{ e.role }}</span>
						</RouterLink>
						<span class="when tnum">{{ e.when }}</span>
					</li>
				</ol>
				<RouterLink to="/cv" class="see-all">Full CV →</RouterLink>
			</section>

			<!-- 03 — Game servers -->
			<section class="cell block block-servers">
				<div class="label">03 — Game servers · {{ stats.live }} live</div>
				<ol class="ord">
					<li
						v-for="s in servers.slice(0, 6)"
						:key="s.id"
						class="srv-row row-dotted"
						:class="{ dim: s.status === 'offline' }"
					>
						<span class="dot" :class="`dot-${s.status}`"/>
						<span class="srv-body">
							<span class="srv-title">{{ s.title }}</span>
							<span class="srv-game"> · {{ s.game }}</span>
						</span>
						<span class="players tnum">{{ s.players }}</span>
					</li>
				</ol>
			</section>

			<!-- DOMAIN — bottom-anchored, the wordmark -->
			<div class="cell domain">
				<h1 class="wordmark">duffle<span class="dot-sep">.</span>one</h1>
			</div>

			<!-- HAIRLINE 2 + rotating quote footer -->
			<div class="footer">
				<span class="footer-side">End of index</span>
				<span class="footer-quote">
					<span class="quote-line fade-in" :key="quote">"{{ quote }}" — {{ attribution }}</span>
				</span>
				<span class="footer-side"><a href="mailto:laura@duffle.one" class="link">Pitch: laura@duffle.one →</a></span>
			</div>
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
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: auto auto auto auto auto;
	column-gap: 24px;
	row-gap: 28px;
	max-width: 1280px;
	margin: 0 auto;
	min-height: calc(100vh - clamp(48px, 10vw, 160px));
}

.cell { color: var(--ink); }

.label {
	font-size: 10px;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--dim);
	font-weight: 500;
	margin-bottom: 14px;
}
.dot-prefix::before {
	content: "● ";
	color: var(--ink);
	font-size: 9px;
	margin-right: 2px;
}

.links {
	grid-column: 1 / span 4;
	grid-row: 1;
}
.lede {
	font-size: 14px;
	line-height: 1.55;
	max-width: 320px;
	margin: 0 0 18px 0;
	color: var(--ink);
}
.link-list { list-style: none; margin: 0; padding: 0; }
.row {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	padding: 7px 0;
	border-bottom: 1px dotted var(--rule);
	font-size: 13px;
	color: var(--ink);
	transition: color 120ms ease;
}
.row:hover { color: var(--ink); }
.row:hover .row-val { color: var(--ink); }
.row-key { color: var(--dim); }
.row-val { color: var(--ink); }
.row:last-child { border-bottom: 0; }

.meta {
	grid-column: 8 / span 5;
	grid-row: 1;
	display: flex;
	justify-content: space-between;
	gap: 16px;
	align-items: start;
	font-size: 11px;
	letter-spacing: 1.6px;
	text-transform: uppercase;
	color: var(--dim);
	padding-top: 4px;
	flex-wrap: wrap;
}

.theme-btn {
	background: transparent;
	border: 0;
	font: inherit;
	color: var(--dim);
	letter-spacing: 1.6px;
	text-transform: uppercase;
	cursor: pointer;
	padding: 0;
	transition: color 120ms ease;
}
.theme-btn:hover { color: var(--ink); }

.hairline-row {
	grid-column: 1 / -1;
	grid-row: 2;
}
.hairline-line {
	display: block;
	border-top: 1px solid var(--ink);
	margin-top: 4px;
}

.block { font-size: 14px; }
.block-projects { grid-column: 1 / span 4; grid-row: 3; }
.block-cv       { grid-column: 5 / span 4; grid-row: 3; }
.block-servers  { grid-column: 9 / span 4; grid-row: 3; }

.ord { margin: 0; padding: 0; list-style: none; }
.proj-row, .cv-row, .srv-row {
	display: grid;
	padding: 7px 0;
	border-bottom: 1px dotted var(--rule);
	font-size: 14px;
	line-height: 1.5;
	gap: 8px;
}
.proj-row { grid-template-columns: 28px 1fr 44px; }
.proj-row:last-child, .cv-row:last-child, .srv-row:last-child { border-bottom: 0; }
.idx { color: var(--faint); }
.proj-body { color: var(--ink); display: block; }
.proj-body:hover { color: var(--ink); }
.proj-name { font-weight: 500; }
.proj-blurb { color: var(--dim); }
.year { color: var(--dim); text-align: right; }

.cv-row { grid-template-columns: 1fr auto; }
.cv-body { color: var(--ink); display: block; }
.cv-co { font-weight: 500; }
.cv-role { color: var(--dim); }
.when { color: var(--dim); white-space: nowrap; }

.see-all {
	display: inline-block;
	margin-top: 12px;
	font-size: 12px;
	color: var(--ink);
	border-bottom: 1px solid var(--rule);
	transition: border-color 120ms ease;
}
.see-all:hover { border-bottom-color: var(--ink); }

.srv-row {
	grid-template-columns: 12px 1fr auto;
	align-items: center;
	font-size: 13px;
}
.srv-row.dim { color: var(--faint); }
.srv-row.dim .srv-game { color: var(--faint); }
.dot {
	width: 6px; height: 6px; border-radius: 50%;
	background: var(--ink);
}
.dot-offline { background: var(--faint); }
.dot-idle { background: var(--dim); }
.dot-online { background: var(--ink); }
.srv-title { font-weight: 500; }
.srv-game { color: var(--dim); }
.players { color: var(--dim); }

.domain {
	grid-column: 1 / span 8;
	grid-row: 4;
	align-self: end;
	margin-top: 24px;
}
.wordmark {
	font-size: clamp(72px, 22vw, 240px);
	line-height: 0.86;
	letter-spacing: -0.05em;
	font-weight: 500;
	margin: 0 0 0 -0.04em;
	color: var(--ink);
}
.dot-sep { color: var(--dim); }

.footer {
	grid-column: 1 / -1;
	grid-row: 5;
	border-top: 1px solid var(--ink);
	padding-top: 14px;
	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 16px;
	font-size: 11px;
	letter-spacing: 1.6px;
	text-transform: uppercase;
	color: var(--dim);
	align-items: baseline;
}
.footer-side { white-space: nowrap; }
.footer-quote {
	text-align: center;
	letter-spacing: 0;
	text-transform: none;
	font-size: 12px;
	color: var(--ink);
	min-width: 0;
}
.quote-line {
	display: inline-block;
	max-width: 100%;
}

/* Mobile: stack everything in a single column. */
@media (max-width: 899px) {
	.page { padding: 24px 20px 32px; }
	.grid {
		display: flex;
		flex-direction: column;
		gap: 28px;
		min-height: 0;
	}
	.meta {
		justify-content: flex-start;
		gap: 12px 18px;
	}
	.hairline-row { display: none; }
	.links, .meta, .block, .domain, .footer {
		grid-column: auto;
		grid-row: auto;
	}
	.domain { margin-top: 8px; }
	.wordmark {
		font-size: clamp(60px, 18vw, 140px);
	}
	.footer {
		grid-template-columns: 1fr;
		text-align: left;
		gap: 8px;
		padding-top: 16px;
	}
	.footer-quote { text-align: left; }
	.footer-side { letter-spacing: 1.4px; }
}
</style>
