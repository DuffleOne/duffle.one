<script setup lang="ts">
/*
  The landing broadsheet (design 2a/2b): dateline meta row, the
  duffle.one masthead, tagline standfirst, About | plate | Elsewhere,
  Projects | Where I've worked over a hairline-split grid, the
  rotating quote, and the say-hello footer.
*/
import { computed } from "vue";
import { SITE } from "../site/data";
import { useWeather } from "../composables/useWeather";
import { useToday } from "../composables/useToday";
import PaperSheet from "../components/paper/PaperSheet.vue";
import PlateFigure from "../components/paper/PlateFigure.vue";
import QuoteBlock from "../components/paper/QuoteBlock.vue";
import ThemeToggle from "../components/paper/ThemeToggle.vue";

const { label: weatherLabel } = useWeather();
const { today } = useToday();

type ElsewhereRow = { label: string; text: string; href?: string; to?: string; external?: boolean };

const elsewhere = computed<ElsewhereRow[]>(() => [
	{ label: "email", text: SITE.email, href: `mailto:${SITE.email}` },
	...SITE.socials.map((s) => ({ label: s.label.toLowerCase(), text: s.handle, href: s.href, external: true })),
	{ label: "user guide", text: "read →", to: "/guide" },
]);

const employers = SITE.cv.experience.filter((e) => !e.volunteer);
</script>

<template>
	<PaperSheet>
		<div class="px-5 pt-6 pb-6 sm:px-8 md:px-14 md:pt-14 md:pb-10">
			<header class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 meta-caps text-ink-faint tnum border-b border-rule pb-3.5">
				<span>{{ SITE.name }}</span>
				<span>London · {{ weatherLabel }}</span>
				<span>{{ today }}</span>
				<ThemeToggle/>
			</header>

			<h1 class="m-0 mt-[34px] mb-[26px] text-center font-display font-light text-[clamp(56px,12.5vw,146px)] leading-[0.9] tracking-[-0.03em]">duffle<span class="text-accent">.</span>one</h1>

			<div class="flex items-center justify-center gap-[22px] pb-[22px] border-b-2 border-ink font-display font-light italic text-[clamp(17px,2.3vw,27px)] text-ink-soft">
				<span class="hidden sm:block h-px w-[60px] bg-rule-dot"></span>
				<span class="text-center">{{ SITE.tagline }}</span>
				<span class="hidden sm:block h-px w-[60px] bg-rule-dot"></span>
			</div>

			<div class="grid gap-[38px] md:grid-cols-[1.05fr_1.5fr_1fr] pt-8 pb-[34px] border-b border-rule">
				<div class="flex flex-col gap-3.5">
					<div class="meta-caps text-accent-ink">About</div>
					<p class="m-0 text-[15.5px] leading-[1.75] prose-just">{{ SITE.about.lead }}</p>
					<p class="m-0 text-[15.5px] leading-[1.75] prose-just text-ink-soft">{{ SITE.about.current.pre }}<a :href="SITE.about.current.href">{{ SITE.about.current.company }}</a>{{ SITE.about.current.post }}</p>
				</div>

				<PlateFigure
					:src="SITE.hero.src"
					:alt="SITE.hero.alt"
					:caption="SITE.hero.caption"
					:meta="SITE.hero.date"
					h="290px"
					eager
				/>

				<div class="flex flex-col gap-2.5">
					<div class="meta-caps text-accent-ink">Elsewhere</div>
					<div
						v-for="(row, i) in elsewhere"
						:key="row.label"
						class="flex justify-between gap-3 py-[7px] text-[14px]"
						:class="i < elsewhere.length - 1 ? 'border-b border-dotted border-rule-dot' : ''"
					>
						<span class="text-ink-mute">{{ row.label }}</span>
						<RouterLink v-if="row.to" :to="row.to">{{ row.text }}</RouterLink>
						<a
							v-else
							:href="row.href"
							:target="row.external ? '_blank' : undefined"
							:rel="row.external ? 'me noopener' : undefined"
						>{{ row.text }}</a>
					</div>
				</div>
			</div>

			<div class="grid gap-[38px] md:grid-cols-[1fr_1px_1fr] pt-[30px] pb-[34px]">
				<section class="flex flex-col gap-4">
					<div class="flex items-baseline justify-between border-b border-rule pb-2">
						<span class="font-display font-medium text-[26px]">Projects</span>
					</div>
					<div class="grid grid-cols-[26px_1fr_auto] items-baseline gap-x-3.5 gap-y-2.5 text-[15px] leading-[1.6]">
						<template v-for="(p, i) in SITE.projects" :key="p.id">
							<span class="text-accent tnum">{{ String(i + 1).padStart(2, "0") }}</span>
							<span><a :href="p.href" target="_blank" rel="noopener" class="font-medium">{{ p.name }}</a> <span class="text-ink-mute">· {{ p.blurb }}</span></span>
							<span class="text-ink-faint tnum text-[13px]">{{ p.year }}</span>
						</template>
					</div>
				</section>

				<div class="hidden md:block w-px bg-rule"></div>

				<section class="flex flex-col gap-4">
					<div class="flex items-baseline justify-between border-b border-rule pb-2">
						<span class="font-display font-medium text-[26px]">Where I've worked</span>
						<RouterLink to="/cv" class="meta-caps border-b border-accent">More →</RouterLink>
					</div>
					<div class="grid grid-cols-[1fr_auto] items-baseline gap-x-3.5 gap-y-2.5 text-[15px] leading-[1.6]">
						<template v-for="e in employers" :key="e.slug">
							<RouterLink :to="`/cv/${e.slug}`" class="group text-ink">
								<span class="font-medium group-hover:text-accent-hover">{{ e.co }}</span>
								<span class="text-ink-mute"> — {{ e.role }}</span>
							</RouterLink>
							<span
								class="tnum text-[13px]"
								:class="e.years === 'now' ? 'text-accent-ink' : 'text-ink-faint'"
							>{{ e.years }}</span>
						</template>
					</div>
				</section>
			</div>

			<QuoteBlock/>

			<footer class="flex flex-wrap justify-between gap-2 pt-[18px] meta-caps text-ink-faint">
				<span>{{ SITE.domain }}</span>
				<a :href="`mailto:${SITE.email}`">Say hello →</a>
			</footer>
		</div>
	</PaperSheet>
</template>
