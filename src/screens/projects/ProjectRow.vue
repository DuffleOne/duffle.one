<script setup lang="ts">
/*
  Single project table row. Click (or Enter while focused) expands the
  README detail card to this project; the README itself carries the
  link out to the live site.

  Border styling flows through a CSS variable so the expanded row can
  light up all four sides in the row's accent without each combo
  needing to exist in Tailwind's JIT output.
*/
import { computed, ref } from "vue";
import type { Project } from "../../site/data";
import type { Accent } from "../../types/accent";
import { accentText, accentVar } from "../../types/accent";
import Tag from "../../components/atoms/Tag.vue";

const props = defineProps<{
	project: Project;
	index: number;
	accent: Accent;
	columns: string;
	expanded: boolean;
}>();
defineEmits<{ (e: "select"): void }>();

const accentCss = computed(() => accentVar(props.accent));

const btn = ref<HTMLButtonElement | null>(null);
defineExpose({
	focus: () => btn.value?.focus(),
});
</script>

<template>
	<button
		ref="btn"
		type="button"
		class="project-row row-hover focus:outline-none focus-visible:outline-none"
		:class="{ 'is-expanded': expanded }"
		:style="{ '--row-accent': accentCss, '--row-cols-md': columns } as any"
		:aria-expanded="expanded"
		@click="$emit('select')"
	>
		<span class="row-num text-tty-faint">{{ String(index + 1).padStart(2, "0") }}</span>
		<span
			class="row-name font-display font-semibold tracking-[-0.3px] flex items-baseline gap-[6px]"
			:class="accentText(accent)"
			style="font-size: 18px"
		>
			<span>{{ project.name }}</span>
			<span class="text-tty-faint text-[11px]">{{ expanded ? "▾" : "▸" }}</span>
		</span>
		<span class="row-blurb text-tty-fg text-[12px]">{{ project.blurb }}</span>
		<span class="row-year text-tty-dim text-[12px]">
			<span class="md:hidden text-tty-faint mr-1">·</span>{{ project.year }}
		</span>
		<span class="row-tag inline-flex">
			<Tag :accent="accent">{{ project.tag }}</Tag>
		</span>
	</button>
</template>

<style scoped>
/*
  Mobile: stacked card with a meta row at the bottom (year + tag inline).
  Desktop (md+): the original 5-column grid driven by `gridTemplateColumns`
  the parent sets inline. We still drop the leading number cell on mobile
  to save space — it's in the name line instead.
*/
.project-row {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-areas:
		"name name"
		"blurb blurb"
		"year tag";
	column-gap: 14px;
	row-gap: 6px;
	align-items: start;
	width: 100%;
	text-align: left;
	cursor: pointer;
	padding: 14px 12px;
	background: transparent;
	border: 1px dashed transparent;
	border-bottom-color: var(--color-tty-border);
	border-left-width: 2px;
	transition: background-color 80ms ease-out, border-color 80ms ease-out;
	outline: none;
}
.project-row:focus,
.project-row:focus-visible {
	outline: none;
	box-shadow: none;
}
.project-row .row-num { display: none; }
.project-row .row-name { grid-area: name; }
.project-row .row-blurb { grid-area: blurb; }
.project-row .row-year {
	grid-area: year;
	justify-self: start;
	align-self: center;
}
.project-row .row-tag {
	grid-area: tag;
	justify-self: end;
	align-self: center;
}
.project-row:hover {
	background: var(--color-tty-bg2);
}
.project-row.is-expanded {
	background: var(--color-tty-bg2);
	border-color: var(--row-accent);
	border-left-width: 2px;
}

@media (min-width: 768px) {
	.project-row {
		grid-template-areas: none;
		grid-template-columns: var(--row-cols-md);
		row-gap: 0;
		column-gap: 14px;
		align-items: center;
		padding: 16px 14px;
	}
	.project-row .row-num { display: inline; grid-area: auto; }
	.project-row .row-name,
	.project-row .row-blurb,
	.project-row .row-year,
	.project-row .row-tag {
		grid-area: auto;
		justify-self: stretch;
	}
}
</style>
