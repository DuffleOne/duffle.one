<script setup lang="ts">
/*
  The palette modal box: search row, results count, command list, footer.
  Standalone so future overlays (eg. a "share" or "shortcuts cheatsheet")
  can reuse the visual treatment.
*/
import { nextTick, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { usePalette } from "../../composables/usePalette";
import Kbd from "../atoms/Kbd.vue";
import Caret from "../atoms/Caret.vue";
import PaletteRow from "./PaletteRow.vue";

const palette = usePalette();
const router = useRouter();
const inputRef = ref<HTMLInputElement | null>(null);

watch(
	() => palette.isOpen.value,
	async (open) => {
		if (open) {
			await nextTick();
			inputRef.value?.focus();
		}
	},
	{ immediate: true }
);

function onKey(e: KeyboardEvent) {
	if (e.key === "ArrowDown") { e.preventDefault(); palette.moveSelection(1); }
	else if (e.key === "ArrowUp") { e.preventDefault(); palette.moveSelection(-1); }
	else if (e.key === "Enter") { e.preventDefault(); palette.execute(router); }
}
</script>

<template>
	<div
		role="dialog"
		aria-label="command palette"
		class="w-[480px] max-w-[calc(100vw-1.5rem)] bg-tty-bg2 border border-tty-green text-[12.5px]"
		style="
			box-shadow:
				0 30px 80px rgba(0,0,0,0.6),
				0 0 0 4px oklch(82% 0.20 145 / 0.08);
		"
		@keydown="onKey"
	>
		<div class="flex gap-[10px] items-center px-[14px] py-3 border-b border-tty-border">
			<span class="text-tty-green">›</span>
			<input
				ref="inputRef"
				:value="palette.query.value"
				class="flex-1 bg-transparent outline-none text-tty-fg placeholder:text-tty-faint font-mono"
				placeholder="open"
				autocomplete="off"
				spellcheck="false"
				@input="(e) => palette.setQuery((e.target as HTMLInputElement).value)"
			/>
			<Caret/>
			<button type="button" class="ml-2" @click="palette.close()" aria-label="close">
				<Kbd>esc</Kbd>
			</button>
		</div>
		<div class="text-[10.5px] px-[14px] py-[5px] text-tty-faint tracking-[1.5px] uppercase">
			Routes &amp; commands · {{ palette.filtered.value.length }} result{{ palette.filtered.value.length === 1 ? "" : "s" }}
		</div>
		<div class="max-h-[60vh] overflow-y-auto">
			<PaletteRow
				v-for="(c, i) in palette.filtered.value"
				:key="c.id"
				:cmd="c"
				:selected="i === palette.selectedIndex.value"
				@hover="palette.selectedIndex.value = i"
				@execute="palette.execute(router)"
			/>
			<div
				v-if="palette.filtered.value.length === 0"
				class="px-[14px] py-3 text-tty-faint text-[11px]"
			>no matches.</div>
		</div>
		<div class="px-[14px] py-2 border-t border-tty-border text-tty-faint text-[11px] flex justify-between items-center">
			<span class="flex items-center gap-1">
				<Kbd>↑</Kbd><Kbd>↓</Kbd>
				<span class="ml-1">nav</span>
				<span class="mx-1">·</span>
				<Kbd>↵</Kbd>
				<span class="ml-1">select</span>
			</span>
			<span>fuzzy match enabled</span>
		</div>
	</div>
</template>
