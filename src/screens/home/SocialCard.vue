<script setup lang="ts">
/*
  Single social link card on the home page. Accent letter glyph
  + label/handle stack + ↗ arrow.
*/
import type { Social } from "../../site/data";
import type { Accent } from "../../types/accent";
import { accentBorder } from "../../types/accent";
import Glyph from "../../components/atoms/Glyph.vue";

defineProps<{ social: Social; accent: Accent }>();
</script>

<template>
	<a
		:href="social.href"
		target="_blank"
		rel="noopener noreferrer"
		class="row-hover flex items-center gap-[10px] px-3 py-3 md:py-2 min-h-[44px] md:min-h-0 bg-tty-bg2 border-l-2 hover:bg-tty-bg3 group"
		:class="accentBorder(accent)"
	>
		<Glyph :accent="accent" :width="18" :size="18" family="display">
			{{ social.label[0] }}
		</Glyph>
		<div class="flex-1 min-w-0">
			<div class="text-tty-fg text-[12px]">{{ social.label }}</div>
			<div class="text-tty-dim text-[10.5px]">{{ social.handle }}</div>
		</div>
		<span class="text-tty-faint text-[11px] group-hover:text-tty-fg transition-colors">↗</span>
	</a>
</template>
