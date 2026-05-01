<script setup lang="ts">
/*
  Single command row inside the palette modal. `selected` paints the
  active row (bg3 + 2px green left-border). Hover previews selection.
*/
import type { PaletteCommand } from "../../composables/usePalette";
import Glyph from "../atoms/Glyph.vue";

defineProps<{ cmd: PaletteCommand; selected: boolean }>();
defineEmits<{ (e: "hover"): void; (e: "execute"): void }>();
</script>

<template>
	<button
		type="button"
		class="row-hover w-full flex items-center gap-3 px-[14px] py-3 md:py-2 min-h-[44px] md:min-h-0 text-left border-l-2 cursor-pointer focus:outline-none"
		:class="selected
			? 'bg-tty-bg3 text-tty-fg border-tty-green'
			: 'text-tty-dim border-transparent hover:bg-tty-bg3 hover:text-tty-fg hover:border-tty-green'"
		@mouseenter="$emit('hover')"
		@click="$emit('execute')"
	>
		<Glyph :accent="cmd.accent" :width="14">{{ cmd.glyph }}</Glyph>
		<span class="flex-1">{{ cmd.label }}</span>
		<span class="text-tty-faint text-[10.5px]">{{ cmd.hotkey }}</span>
	</button>
</template>
