<script setup lang="ts">
/*
  Expanded README detail for a project. Title + description + tags on
  the left; STATS sidebar on the right (when stats exist); footer
  carries the real "↗ visit" link to project.href. The CTA button
  takes you out to the live site — clicking the row no longer
  navigates, so this is the only way out.
*/
import { computed } from "vue";
import type { Project } from "../../site/data";
import type { Accent } from "../../types/accent";
import DetailCard from "../../components/cards/DetailCard.vue";
import Tag from "../../components/atoms/Tag.vue";
import DottedRow from "../../components/data/DottedRow.vue";
import { accentText } from "../../types/accent";

const props = defineProps<{ project: Project }>();

const TECH_ACCENTS: Accent[] = ["green", "cyan", "amber", "pink", "violet"];
const isExternal = computed(() => /^https?:\/\//.test(props.project.href));
const hasStats = computed(() => !!props.project.stats?.length);
</script>

<template>
	<DetailCard
		glyph="▸"
		:title="`${project.name}/README.md`"
		:trailing="`preview · ${project.year}`"
	>
		<div
			class="readme-body px-4 py-[14px] gap-[18px]"
			:class="hasStats ? 'has-stats' : ''"
		>
			<div>
				<div class="font-display tracking-[-0.3px] mb-1" style="font-size: 26px;">
					<span class="text-tty-green"># </span>{{ project.name }}
				</div>
				<p class="text-tty-fg text-[12.5px] leading-[1.6] m-0">
					{{ project.description ?? project.blurb }}
				</p>
				<div class="mt-[10px] flex gap-[6px] flex-wrap">
					<Tag :accent="'green'">{{ project.tag }}</Tag>
					<Tag
						v-for="(t, i) in project.tech ?? []"
						:key="t"
						:accent="TECH_ACCENTS[(i + 1) % TECH_ACCENTS.length]"
					>{{ t }}</Tag>
				</div>

				<div class="mt-4 flex flex-wrap items-center gap-3 min-w-0">
					<a
						:href="project.href"
						:target="isExternal ? '_blank' : undefined"
						:rel="isExternal ? 'noopener noreferrer' : undefined"
						class="inline-flex items-center gap-2 px-3 py-[6px] border border-tty-green text-tty-green font-mono text-[12px] hover:bg-tty-green hover:text-[#001b00] transition-colors min-h-[36px]"
					>
						<span>$ open {{ project.name }}</span>
						<span>↗</span>
					</a>
					<span class="text-tty-faint text-[11px] font-mono truncate min-w-0 max-w-full hidden sm:inline">{{ project.href }}</span>
				</div>
			</div>

			<div
				v-if="hasStats"
				class="border border-tty-border p-2 text-[10.5px] text-tty-dim leading-[1.6]"
			>
				<div class="text-tty-faint tracking-[1.5px] mb-1">STATS</div>
				<DottedRow
					v-for="(s, i) in project.stats"
					:key="s.label"
					:label="s.label"
					:last="i === (project.stats!.length - 1)"
				>
					<span :class="s.accent ? accentText(s.accent) : ''">{{ s.value }}</span>
				</DottedRow>
			</div>
		</div>
	</DetailCard>
</template>

<style scoped>
.readme-body {
	display: flex;
	flex-direction: column;
}
@media (min-width: 768px) {
	.readme-body {
		display: grid;
		grid-template-columns: 1fr;
	}
	.readme-body.has-stats {
		grid-template-columns: 1fr 200px;
	}
}
</style>
