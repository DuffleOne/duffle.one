<script setup lang="ts">
/*
  /cv — "Where I've worked" (design 1a subpage). Title row with the
  contact block, a "Most proud of" lead, then one hairline row per
  role: company / years / stack on the left, role + prose on the
  right. The design shows single-paragraph roles; entries keep their
  full bullet content, set as stacked paragraphs in the same style.
*/
import { SITE } from "../site/data";
import PaperSheet from "../components/paper/PaperSheet.vue";
import PageMasthead from "../components/paper/PageMasthead.vue";
</script>

<template>
	<PaperSheet>
		<div class="px-5 py-6 sm:px-8 md:px-14 md:py-12">
			<PageMasthead active="cv"/>

			<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b-2 border-ink pb-4 pt-8">
				<h2 class="m-0 font-display font-light text-[clamp(40px,6vw,64px)] leading-none">Where I've worked</h2>
				<div class="text-right text-[12px] tracking-[0.14em] uppercase text-ink-faint leading-[1.9]">
					{{ SITE.name }}<br>
					Engineer · London<br>
					{{ SITE.cv.email }}
				</div>
			</div>

			<div class="grid md:grid-cols-[200px_1fr] gap-3 md:gap-[30px] py-7 border-b border-rule">
				<div class="meta-caps text-accent-ink">Most proud of</div>
				<p class="m-0 text-[16px] leading-[1.75] prose-just">{{ SITE.cv.proudOf }}</p>
			</div>

			<div
				v-for="e in SITE.cv.experience"
				:key="e.co"
				class="grid md:grid-cols-[200px_1fr] gap-3 md:gap-[30px] py-7 border-b border-rule"
			>
				<div class="flex flex-col gap-1">
					<a
						v-if="e.href"
						:href="e.href"
						class="font-display font-medium text-[26px] leading-tight text-ink hover:text-accent-hover"
					>{{ e.co }}</a>
					<span v-else class="font-display font-medium text-[26px] leading-tight">{{ e.co }}</span>
					<div class="text-[12px] tracking-[0.14em] uppercase text-ink-faint tnum">{{ e.years }} · {{ e.loc }}</div>
					<div v-if="e.tech?.length" class="mt-1.5 text-[13px] italic text-ink-mute">{{ e.tech.join(" · ") }}</div>
				</div>
				<div class="flex flex-col gap-[9px]">
					<div class="font-display font-medium text-[24px] leading-tight">{{ e.role }}</div>
					<p
						v-for="(b, i) in e.bullets"
						:key="i"
						class="m-0 text-[15px] leading-[1.7] text-ink-soft"
					>{{ b }}</p>
				</div>
			</div>

			<div class="grid md:grid-cols-[200px_1fr] gap-3 md:gap-[30px] py-7">
				<div class="meta-caps text-accent-ink">Skills</div>
				<div class="text-[14px] italic leading-[1.9] text-ink-mute">{{ SITE.cv.skills.join(" · ") }}</div>
			</div>
		</div>
	</PaperSheet>
</template>
