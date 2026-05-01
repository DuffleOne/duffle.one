<script setup lang="ts">
/*
  Numbered value row in the user-guide VALUES section. Mirrors the §N
  pattern from CV's SectionHeader but with a positional number.
*/
import type { Accent } from "../../types/accent";
import { accentText } from "../../types/accent";

defineProps<{ n: number; heading: string; body: string; accent: Accent }>();
</script>

<template>
	<div>
		<div class="font-display tracking-[-0.2px]" style="font-size: 16px;">
			<span class="font-mono text-[11px] mr-2" :class="accentText(accent)">{{ n }}.</span>
			<span class="text-tty-fg">{{ heading }}</span>
		</div>
		<div class="text-tty-fg text-[12.5px] mt-[2px]">{{ body }}</div>
	</div>
</template>
