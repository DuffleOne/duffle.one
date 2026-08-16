<script setup lang="ts">
/*
  The landing, set as a darkroom contact sheet: a film leader across
  the top, then strips of numbered frames down the sheet — the
  enlargement (01), the edge codes, the margin note (02), about with
  the selected photograph (03–05), projects (06–07A) and the roll of
  jobs shot in sequence (08–13), then the tail.

  Frame numbers run in sheet order, so they're literals rather than
  anything computed: if a strip moves, the numbers move with it by
  hand, the same way a real sheet gets renumbered when it's recut.
*/
import { computed } from "vue";
import { SITE } from "../site/data";
import { useWeather } from "../composables/useWeather";
import { useToday } from "../composables/useToday";
import { useQuoteRotation } from "../composables/useQuoteRotation";
import { useReducedMotion } from "../composables/useReducedMotion";
import PaperSheet from "../components/paper/PaperSheet.vue";
import ThemeToggle from "../components/paper/ThemeToggle.vue";
import Perforations from "../components/sheet/Perforations.vue";
import StripLabel from "../components/sheet/StripLabel.vue";
import FrameCell from "../components/sheet/FrameCell.vue";
import EdgeCode from "../components/sheet/EdgeCode.vue";

const { label: weatherLabel } = useWeather();
const { today } = useToday();
const { quote, tick } = useQuoteRotation(8_000);
const { reduced } = useReducedMotion();

type EdgeRow = { label: string; text: string; href?: string; to?: string; external?: boolean };

/*
  Edge codes in the order visitors actually want them: most people
  arrive looking for the photography, so Instagram and Glass print
  first and the rest of the roll follows. Socials are looked up by id;
  an id with no row in data.ts drops off the edge rather than blanking
  the sheet.
*/
const edgeCodes = computed<EdgeRow[]>(() => {
	const social = (id: string): EdgeRow[] => {
		const s = SITE.socials.find((x) => x.id === id);
		return s ? [{ label: s.label.toLowerCase(), text: s.handle, href: s.href, external: true }] : [];
	};
	return [
		...social("ig"),
		...social("glass"),
		{ label: "email", text: SITE.email, href: `mailto:${SITE.email}` },
		...social("github"),
		...social("linkedin"),
		...social("steam"),
		{ label: "user guide", text: "read →", to: "/guide" },
		{ label: "cv", text: "browse →", to: "/cv" },
	];
});

// Shot in sequence: the roll reads forward in time, oldest frame first.
const employers = SITE.cv.experience.filter((e) => !e.volunteer).slice().reverse();

const PROJECT_FRAMES = ["06", "06A", "07", "07A"];
const WORK_FRAMES = ["08", "09", "10", "11", "12", "13"];

const MONTHS = "jan feb mar apr may jun jul aug sep oct nov dec".split(" ");

// Tenure in months, parsed from the canonical `when` ("May 2016 - Apr
// 2022"). Open-ended roles ("now") have no start date to work from and
// come back null, which the density bar renders at its minimum.
function tenure(when: string): number | null {
	const m = when.toLowerCase().match(/^([a-z]{3})\w*\s+(\d{4})\s*[-–]\s*([a-z]{3})\w*\s+(\d{4})$/);
	if (!m) return null;
	const from = MONTHS.indexOf(m[1]);
	const to = MONTHS.indexOf(m[3]);
	if (from < 0 || to < 0) return null;
	return Number(m[4]) * 12 + to - (Number(m[2]) * 12 + from);
}

const longest = Math.max(...employers.map((e) => tenure(e.when) ?? 0), 1);

/*
  Density bar, on a square-root scale. Linear would flatten everything
  short against six years of Cuvva — four of the six roles would draw
  the same minimum bar — so this trades exact proportion for a strip
  you can actually read left to right.
*/
function density(when: string): string {
	const months = tenure(when);
	if (!months) return "15%";
	return `${Math.max(15, Math.round(Math.sqrt(months / longest) * 100))}%`;
}

// Adams' zone scale, 0 (black) through X (white), as the sheet divider.
const zones = Array.from({ length: 11 }, (_, i) => {
	const v = Math.round(i * 25.5);
	return `rgb(${v} ${v} ${v})`;
});

type ReadoutRow = { key: string; text: string; href?: string; external?: boolean; accent?: boolean };

const readout = computed<ReadoutRow[]>(() => [
	{ key: "loc", text: "London" },
	{ key: "exp", text: "15 years" },
	{ key: "now", text: SITE.about.current.company, href: SITE.about.current.href, external: true, accent: true },
	{ key: "rolls", text: "50 jellycats", href: "/jellycats.html", external: true },
]);
</script>

<template>
	<PaperSheet glow>
		<div class="pb-12">
			<!-- Film leader ============================================== -->
			<div class="pt-4">
				<Perforations class="px-4 sm:px-6"/>
				<div class="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule px-5 pb-3.5 edge-caps text-ink-faint tnum sm:px-8 md:px-14">
					<span><span class="text-accent-ink">{{ SITE.name }}</span> · 5063 TX</span>
					<span>London · {{ weatherLabel }}</span>
					<span class="flex items-baseline gap-5">
						<span>{{ today }}</span>
						<ThemeToggle/>
					</span>
				</div>
			</div>

			<!-- Strip A · the enlargement ================================= -->
			<div class="px-5 pt-7 sm:px-8 md:px-14">
				<FrameCell
					no="Frame 01"
					label="Self portrait, sort of"
					meta="1/125 ƒ/1.4 ISO 400"
					pad="p-5 sm:p-7 md:p-9"
				>
					<div class="flex flex-col gap-4 py-6 md:py-10">
						<h1 class="m-0 font-display font-light text-[clamp(48px,12vw,150px)] leading-[0.92] tracking-[-0.03em]">duffle<span class="text-accent">.</span>one</h1>
						<div class="flex items-center gap-4">
							<span class="hidden h-px w-16 bg-accent/45 sm:block" aria-hidden="true"></span>
							<p class="m-0 font-display font-light italic text-[clamp(17px,2.3vw,28px)] text-ink-mute">{{ SITE.tagline }}</p>
						</div>
					</div>

					<div class="flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-6">
						<dl class="m-0 grid grid-cols-2 gap-x-10 gap-y-5 sm:flex sm:gap-12">
							<div v-for="r in readout" :key="r.key" class="flex flex-col gap-2">
								<dt class="edge-caps text-ink-faint">{{ r.key }}</dt>
								<dd class="m-0 font-display text-[19px] leading-none sm:text-[21px]">
									<a
										v-if="r.href"
										:href="r.href"
										:target="r.external ? '_blank' : undefined"
										:rel="r.external ? 'noopener' : undefined"
										:class="r.accent ? '' : 'text-ink hover:text-accent-hover'"
									>{{ r.text }}</a>
									<span v-else>{{ r.text }}</span>
								</dd>
							</div>
						</dl>

						<!-- Exposure scale, pushed a stop. -->
						<div class="hidden w-[200px] shrink-0 lg:block" aria-hidden="true">
							<div class="flex justify-between edge-caps text-[9px] text-ink-faint">
								<span v-for="s in ['-2', '-1', '0', '+1', '+2']" :key="s">{{ s }}</span>
							</div>
							<div class="mt-2 flex justify-between border-t border-rule">
								<span v-for="i in 5" :key="i" class="w-px bg-rule" :class="i === 3 ? 'h-2.5' : 'h-1.5'"></span>
							</div>
							<div class="relative h-3">
								<span class="absolute left-3/4 -translate-x-1/2 text-[8px] leading-none text-accent">▲</span>
							</div>
						</div>
					</div>
				</FrameCell>
			</div>

			<!-- Strip B · elsewhere ======================================= -->
			<section class="px-5 pt-10 sm:px-8 md:px-14">
				<StripLabel code="Strip B" title="Elsewhere" note="printed on the edge"/>
				<div class="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-4 sm:gap-x-8">
					<EdgeCode v-for="row in edgeCodes.slice(0, 4)" :key="row.label" v-bind="row"/>
				</div>
				<Perforations class="py-1 opacity-80"/>
				<div class="grid grid-cols-2 gap-x-6 sm:grid-cols-4 sm:gap-x-8">
					<EdgeCode v-for="row in edgeCodes.slice(4)" :key="row.label" v-bind="row"/>
				</div>
			</section>

			<!-- Strip C · the margin note ================================= -->
			<section class="px-5 pt-10 sm:px-8 md:px-14">
				<StripLabel code="Strip C" title="Margin note" note="in chinagraph"/>
				<FrameCell
					class="mt-3"
					no="02"
					label="One of forty-odd"
					meta="winds on every few seconds"
					pad="p-5 sm:p-8 md:px-11 md:py-9"
				>
					<Transition :name="reduced ? '' : 'quote-fade'" mode="out-in">
						<blockquote :key="tick" class="m-0 font-display font-light italic text-[clamp(24px,3.6vw,41px)] leading-[1.3]">“{{ quote }}”</blockquote>
					</Transition>
					<div class="mt-6 h-[3px] w-[min(430px,70%)] -rotate-[0.4deg] bg-accent/85" aria-hidden="true"></div>
				</FrameCell>
			</section>

			<!-- Strip D · about, the keeper, the edit ===================== -->
			<section class="px-5 pt-10 sm:px-8 md:px-14">
				<StripLabel code="Strip D" title="About" note="three frames"/>
				<div class="mt-3 grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
					<FrameCell no="03" label="About" pad="p-5 sm:p-6 md:p-7">
						<p class="m-0 text-[clamp(17px,2vw,22px)] leading-[1.6]">{{ SITE.about.lead }}</p>
						<p class="m-0 mt-5 text-[15px] leading-[1.8] text-ink-mute">{{ SITE.about.current.pre }}<a :href="SITE.about.current.href" target="_blank" rel="noopener">{{ SITE.about.current.company }}</a>{{ SITE.about.current.post }}</p>
					</FrameCell>

					<FrameCell no="04" label="✓ Select" flush>
						<div class="relative">
							<img
								:src="SITE.hero.src"
								:alt="SITE.hero.alt"
								class="plate-img block h-[260px] w-full object-cover md:h-[300px]"
								loading="eager"
								fetchpriority="high"
								decoding="async"
							/>
							<!-- The keeper, ringed in grease pencil. Sized off the
							     frame's height rather than its width so the ring stays a
							     ring when the cell goes full-bleed on a phone. -->
							<span class="pointer-events-none absolute left-1/2 top-[8%] h-[84%] w-[min(86%,300px)] -translate-x-1/2 -rotate-[6deg] rounded-[50%] border-2 border-accent/90" aria-hidden="true"></span>
						</div>
						<div class="flex items-baseline justify-between gap-3 px-5 py-4 edge-caps text-ink-faint tnum">
							<span>{{ SITE.hero.caption }}</span>
							<span>{{ SITE.hero.date }}</span>
						</div>
					</FrameCell>

					<FrameCell no="05" label="The edit" pad="p-5 sm:p-6">
						<ul class="m-0 list-none p-0">
							<li
								v-for="(mark, i) in SITE.edit"
								:key="mark.text"
								class="flex items-center gap-3.5 py-3"
								:class="i < SITE.edit.length - 1 ? 'border-b border-rule' : ''"
							>
								<span aria-hidden="true" class="text-[13px]" :class="mark.keep ? 'text-accent' : 'text-ink-faint'">{{ mark.keep ? "✓" : "✗" }}</span>
								<!-- The strike is the joke, so <s> plus hidden text carry
								     it to screen readers, not just the grease pencil. -->
								<s v-if="!mark.keep" class="font-display text-[17px] text-ink-faint line-through">{{ mark.text }}<span class="sr-only"> (struck out)</span></s>
								<span v-else class="font-display text-[17px] text-ink">{{ mark.text }}</span>
							</li>
						</ul>
					</FrameCell>
				</div>
			</section>

			<!-- Zone scale, as the sheet divider ========================== -->
			<div class="flex items-center gap-6 px-5 pt-11 sm:px-8 md:px-14" aria-hidden="true">
				<div class="w-[220px] shrink-0 sm:w-[300px]">
					<div class="flex gap-0.5 border border-rule p-px">
						<span v-for="(z, i) in zones" :key="i" class="h-2.5 flex-1" :style="{ background: z }"></span>
					</div>
					<div class="mt-2 flex justify-between edge-caps text-[9px] text-ink-faint">
						<span>Zone 0</span>
						<span>Zone X</span>
					</div>
				</div>
				<span class="h-px flex-1 bg-rule"></span>
				<span class="hidden edge-caps text-ink-faint md:inline">Processed · scanned · London MMXXVI</span>
			</div>

			<!-- Strip E · projects ======================================== -->
			<section class="px-5 pt-8 sm:px-8 md:px-14">
				<StripLabel code="Strip E" title="Projects" note="four frames, all printed"/>
				<!-- The name is the link; its ::after stretches over the whole
				     frame so the printed Visit → mark lands the click too. -->
				<div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					<FrameCell
						v-for="(p, i) in SITE.projects"
						:key="p.id"
						:no="PROJECT_FRAMES[i]"
						:label="i === 0 ? '✓' : undefined"
						:meta="p.year"
						class="relative min-h-[236px]"
					>
						<a :href="p.href" target="_blank" rel="noopener" class="font-display text-[26px] leading-tight text-ink hover:text-accent-hover after:absolute after:inset-0">{{ p.name }}</a>
						<div v-if="i === 0" class="mt-3 h-[3px] w-[104px] bg-accent/90" aria-hidden="true"></div>
						<p class="m-0 mt-4 text-[14px] leading-[1.7] text-ink-mute">{{ p.blurb }}</p>
						<span class="mt-auto pt-6 edge-caps text-accent-ink" aria-hidden="true">Visit →</span>
					</FrameCell>
				</div>
			</section>

			<!-- Strip F · the roll of jobs ================================ -->
			<section class="px-5 pt-10 sm:px-8 md:px-14">
				<StripLabel code="Strip F" title="Where I've worked" note="shot in sequence, 2016 →"/>
				<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
					<FrameCell
						v-for="(e, i) in employers"
						:key="e.slug"
						:no="WORK_FRAMES[i]"
						:meta="e.years === 'now' ? '● Now' : undefined"
						class="relative min-h-[194px]"
					>
						<RouterLink
							:to="`/cv/${e.slug}`"
							class="font-display text-[20px] leading-[1.25] after:absolute after:inset-0"
							:class="e.years === 'now' ? '' : 'text-ink hover:text-accent-hover'"
						>{{ e.co }}</RouterLink>
						<p class="m-0 mt-2 text-[12px] leading-[1.6] text-ink-mute">{{ e.role }}</p>
						<div class="mt-auto pt-6">
							<div
								class="h-1"
								:class="e.years === 'now' ? 'bg-accent' : 'bg-accent/45'"
								:style="{ width: density(e.when) }"
								aria-hidden="true"
							></div>
							<div class="mt-3 edge-caps tnum" :class="e.years === 'now' ? 'text-accent-ink' : 'text-ink-faint'">{{ e.years }}</div>
						</div>
					</FrameCell>
				</div>
			</section>

			<!-- Tail ====================================================== -->
			<div class="pt-12">
				<Perforations class="px-4 sm:px-6"/>
				<footer class="mt-2 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-rule px-5 pt-4 edge-caps text-ink-faint tnum sm:px-8 md:px-14">
					<span>End of roll · 36 of 36</span>
					<span class="hidden sm:inline">{{ SITE.domain }} · developed in London</span>
					<a :href="`mailto:${SITE.email}`">Say hello →</a>
				</footer>
			</div>
		</div>
	</PaperSheet>
</template>

<style scoped>
.quote-fade-enter-active,
.quote-fade-leave-active {
	transition: opacity 0.45s ease;
}
.quote-fade-enter-from,
.quote-fade-leave-to {
	opacity: 0;
}
</style>
