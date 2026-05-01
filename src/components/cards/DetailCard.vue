<script setup lang="ts">
/*
  Bordered card on bg2 with an optional header strip. Used by:
    - Projects: easycal/README.md preview card
    - Photo: EXIF panel
    - any future "expanded row" pattern.

  `header` slot replaces the built-in title strip; `title` is a quick
  default. `glyph` shows a leading ▸-style indicator in green.
*/
import Glyph from "../atoms/Glyph.vue";

withDefaults(
	defineProps<{ title?: string; trailing?: string; glyph?: string }>(),
	{}
);
</script>

<template>
	<div class="border border-tty-border-hi bg-tty-bg2 flex flex-col">
		<div
			v-if="$slots.header || title"
			class="flex items-center gap-[10px] px-3 py-2 border-b border-tty-border text-[11px] text-tty-dim tracking-[1px]"
		>
			<slot name="header">
				<Glyph v-if="glyph" accent="green">{{ glyph }}</Glyph>
				<span class="text-tty-fg">{{ title }}</span>
				<span v-if="trailing" class="ml-auto text-tty-faint">{{ trailing }}</span>
			</slot>
		</div>
		<div class="flex-1">
			<slot/>
		</div>
	</div>
</template>
