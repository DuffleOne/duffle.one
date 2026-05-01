<script setup lang="ts">
/*
  Single CV experience row: when/loc gutter on the left, role/co/bullets
  on the right with a dashed divider. Tech stack tags wrap below bullets.
*/
import type { Experience } from "../../site/data";
import type { Accent } from "../../types/accent";
import Tag from "../../components/atoms/Tag.vue";

defineProps<{ entry: Experience }>();

const TECH_ACCENTS: Accent[] = ["green", "cyan", "amber", "pink", "violet"];
</script>

<template>
	<div class="exp-grid items-start gap-[12px] md:gap-[18px]">
		<div class="text-tty-faint text-[11px] tracking-[1.5px] md:pt-1 flex md:block gap-3 md:gap-0">
			<div class="text-tty-cyan font-mono">{{ entry.when }}</div>
			<div class="text-tty-faint md:mt-px">{{ entry.loc }}</div>
		</div>
		<div class="border-l-0 md:border-l border-dashed border-tty-border md:pl-4">
			<div class="flex items-baseline gap-[10px] flex-wrap">
				<span class="font-display tracking-[-0.3px] text-tty-fg" style="font-size: 20px;">
					{{ entry.role }}
				</span>
				<span class="text-tty-faint">·</span>
				<a
					v-if="entry.href"
					:href="entry.href"
					target="_blank"
					rel="noopener"
					class="text-tty-green font-mono hover:underline"
				>{{ entry.co }}</a>
				<span v-else class="text-tty-green font-mono">{{ entry.co }}</span>
			</div>
			<ul class="m-0 mt-[6px] p-0 list-none text-tty-fg text-[12.5px]">
				<li v-for="(b, j) in entry.bullets" :key="j" class="flex gap-2 py-[2px]">
					<span class="text-tty-faint">›</span>
					<span>{{ b }}</span>
				</li>
			</ul>
			<div v-if="entry.tech && entry.tech.length" class="flex flex-wrap gap-[6px] mt-[8px]">
				<Tag
					v-for="(t, k) in entry.tech"
					:key="t"
					:accent="TECH_ACCENTS[k % TECH_ACCENTS.length]"
				>{{ t }}</Tag>
			</div>
		</div>
	</div>
</template>

<style scoped>
.exp-grid {
	display: flex;
	flex-direction: column;
}
@media (min-width: 768px) {
	.exp-grid {
		display: grid;
		grid-template-columns: 120px 1fr;
	}
}
</style>
