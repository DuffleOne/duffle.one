<script setup lang="ts">
/*
  Projects route: section header + find prompt + table + expanded
  README card. Exactly one row is open at a time. Click or arrow-key
  navigation immediately activates the target row — no separate Enter
  to confirm.
*/
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { SITE } from "../site/data";
import { findRouteById } from "../site/routes";
import type { Accent } from "../types/accent";
import TtyChrome from "../components/layout/TtyChrome.vue";
import ContentPane from "../components/layout/ContentPane.vue";
import SectionHeader from "../components/headers/SectionHeader.vue";
import Prompt from "../components/atoms/Prompt.vue";
import DataTable from "../components/data/DataTable.vue";
import ProjectRow from "./projects/ProjectRow.vue";
import ReadmeCard from "./projects/ReadmeCard.vue";
import { usePalette } from "../composables/usePalette";

const route = findRouteById("projects")!;
const COLUMNS = "30px 130px 1fr 70px 90px";
const ROW_ACCENTS: Accent[] = ["green", "pink", "amber", "cyan"];

const selectedIndex = ref(0);
const selected = computed(() => SITE.projects[selectedIndex.value] ?? null);

function activate(index: number) {
	if (index < 0 || index >= SITE.projects.length) return;
	selectedIndex.value = index;
	rowEls.value[index]?.focus();
}

type RowApi = { focus: () => void };
const rowEls = ref<(RowApi | null)[]>([]);

function setRow(i: number, el: unknown) {
	rowEls.value[i] = (el as RowApi | null) ?? null;
}

function isEditableTarget(t: EventTarget | null): boolean {
	if (!(t instanceof HTMLElement)) return false;
	const tag = t.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable;
}

const palette = usePalette();

function onKey(e: KeyboardEvent) {
	if (palette.isPaletteOpen()) return;
	if (isEditableTarget(e.target)) return;
	const n = SITE.projects.length;
	if (n === 0) return;
	if (e.key === "ArrowDown") {
		e.preventDefault();
		activate((selectedIndex.value + 1) % n);
	} else if (e.key === "ArrowUp") {
		e.preventDefault();
		activate((selectedIndex.value - 1 + n) % n);
	}
}

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
	<TtyChrome
		:title="route.titleBarText"
		status-path="projects"
		active-id="projects"
		:accent="route.accent"
	>
		<ContentPane :padding-x="34" :padding-y="30" :gap="20">
			<SectionHeader n="02" accent="amber">
				./projects<span class="text-tty-green">/*</span>
			</SectionHeader>

			<div class="text-tty-dim text-[11.5px]">
				<Prompt cmd="find . -type d -maxdepth 1 | sort -r" route="projects"/>
			</div>

			<DataTable :columns="COLUMNS" :headers="['№', 'NAME', 'SUMMARY', 'YEAR', 'STATUS']">
				<ProjectRow
					v-for="(p, i) in SITE.projects"
					:key="p.id"
					:ref="(el: unknown) => setRow(i, el)"
					:project="p"
					:index="i"
					:accent="ROW_ACCENTS[i % ROW_ACCENTS.length]"
					:columns="COLUMNS"
					:expanded="i === selectedIndex"
					@select="activate(i)"
				/>
			</DataTable>

			<ReadmeCard
				v-if="selected"
				class="mt-1"
				:project="selected"
			/>

			<div class="mt-auto text-tty-dim text-[11.5px]">
				{{ SITE.projects.length }} entries · git status:
				<span class="text-tty-green">clean</span>
				· ↑/↓ navigate
			</div>
		</ContentPane>
	</TtyChrome>
</template>
