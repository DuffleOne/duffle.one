<script setup lang="ts">
/*
  CV route — `less laura.cv`. Section header + summary callout +
  experience list + education / skills two-up + footer rule.
*/
import { SITE, type Education } from "../site/data";
import { findRouteById } from "../site/routes";
import type { Accent } from "../types/accent";
import TtyChrome from "../components/layout/TtyChrome.vue";
import ContentPane from "../components/layout/ContentPane.vue";
import SectionHeader from "../components/headers/SectionHeader.vue";
import Prompt from "../components/atoms/Prompt.vue";
import Callout from "../components/cards/Callout.vue";
import Tag from "../components/atoms/Tag.vue";
import ExperienceEntry from "./cv/ExperienceEntry.vue";

const route = findRouteById("cv")!;
const SKILL_ACCENTS: Accent[] = ["green", "cyan", "amber", "pink", "violet"];

// `education: []` widens to `never[]` via `satisfies`, so coerce here so the
// template can read its fields when entries do exist later.
const education = SITE.cv.education as Education[];
const hasEducation = education.length > 0;

// Rough line count for the manpage-style footer. Sum of bullets + tech rows
// + a couple of header lines per role, rounded to feel honest without being
// fiddly to maintain.
const lineCount = (() => {
	let n = 12; // header, summary callout, proud-of callout, skills, etc.
	for (const e of SITE.cv.experience) {
		n += 2 + e.bullets.length + (e.tech?.length ? 1 : 0);
	}
	n += hasEducation ? education.length * 3 : 0;
	return n;
})();
</script>

<template>
	<TtyChrome
		:title="route.titleBarText"
		status-path="cv"
		active-id="cv"
		:accent="route.accent"
	>
		<ContentPane :padding-x="34" :padding-y="30" :gap="20">
			<SectionHeader n="06" accent="violet">
				./cv<span class="text-tty-violet">.txt</span>
				<span class="text-tty-dim font-mono text-[12px] ml-3 tracking-[0]">
					{{ SITE.cv.title }}
				</span>
			</SectionHeader>

			<div class="text-tty-dim text-[11.5px]">
				<Prompt cmd="less ~/cv.txt" route="cv"/>
			</div>

			<Callout accent="violet" padding="14px 18px">
				<div class="text-tty-fg" style="font-size: 13px; line-height: 1.6;">
					{{ SITE.cv.summary }}
				</div>
			</Callout>

			<Callout accent="amber" padding="12px 18px">
				<div class="text-tty-amber text-[10.5px] tracking-[2px] mb-1">── PROUD OF</div>
				<div class="text-tty-fg" style="font-size: 13px; line-height: 1.6;">
					{{ SITE.cv.proudOf }}
				</div>
			</Callout>

			<div class="text-tty-amber text-[10.5px] tracking-[2px] mt-1">── EXPERIENCE</div>
			<div class="flex flex-col gap-4">
				<ExperienceEntry
					v-for="(e, i) in SITE.cv.experience"
					:key="i"
					:entry="e"
				/>
			</div>

			<div :class="hasEducation ? 'grid grid-cols-1 md:grid-cols-2 gap-6 mt-2' : 'mt-2'">
				<div v-if="hasEducation">
					<div class="text-tty-amber text-[10.5px] tracking-[2px] mb-2">── EDUCATION</div>
					<div v-for="(ed, i) in education" :key="i">
						<div class="font-display tracking-[-0.2px]" style="font-size: 17px;">
							{{ ed.degree }}
							<span class="text-tty-faint">·</span>
							<span class="text-tty-green">{{ ed.school }}</span>
						</div>
						<div class="text-tty-dim text-[11.5px] mt-px">{{ ed.when }}</div>
						<div class="text-tty-fg text-[12px] mt-1">{{ ed.note }}</div>
					</div>
				</div>
				<div>
					<div class="text-tty-amber text-[10.5px] tracking-[2px] mb-2">── SKILLS</div>
					<div class="flex flex-wrap gap-[6px]">
						<Tag
							v-for="(s, i) in SITE.cv.skills"
							:key="s"
							:accent="SKILL_ACCENTS[i % SKILL_ACCENTS.length]"
						>{{ s }}</Tag>
					</div>
				</div>
			</div>

			<div
				class="mt-auto pt-3 border-t border-tty-border flex flex-col sm:flex-row justify-between gap-1 text-[11px] text-tty-faint"
			>
				<span>{{ SITE.cv.email }}</span>
				<span>:LINES {{ lineCount }} of {{ lineCount }} (END)</span>
			</div>
		</ContentPane>
	</TtyChrome>
</template>
