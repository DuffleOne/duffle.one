<script setup lang="ts">
/*
  Bottom status bar: vim-style mode pill, path, branch, sync, file
  meta, clock. The mode pill background tracks the route accent.
*/
import type { Accent } from "../../types/accent";
import { accentBg } from "../../types/accent";
import { useClock } from "../../composables/useClock";
import { useSyncTimer } from "../../composables/useSyncTimer";
import { useZoom } from "../../composables/useZoom";
import AccentDot from "../atoms/AccentDot.vue";

const props = withDefaults(
	defineProps<{ route: string; accent?: Accent; mode?: string; branch?: string }>(),
	{ accent: "green", mode: "NORMAL", branch: "main" }
);

const { time } = useClock();
const { label: syncLabel } = useSyncTimer();
const { percent: zoomPercent } = useZoom();
</script>

<template>
	<footer
		class="tty-content flex items-stretch border-t border-tty-border text-[11px] bg-tty-bg2 shrink-0 min-w-0"
	>
		<span
			class="px-[10px] py-[4px] font-bold tracking-[0.5px] transition-colors duration-100 shrink-0"
			:class="accentBg(props.accent)"
			style="color:#001b00"
		>{{ props.mode }}</span>
		<span class="px-[10px] py-[4px] text-tty-dim border-r border-tty-border truncate min-w-0">~/{{ props.route }}</span>
		<span class="hidden md:inline px-[10px] py-[4px] text-tty-faint border-r border-tty-border">{{ props.branch }}</span>
		<span class="hidden md:flex px-[10px] py-[4px] text-tty-dim items-center gap-[6px]">
			<AccentDot accent="green"/>
			<span>{{ syncLabel }}</span>
		</span>
		<span class="hidden md:inline ml-auto px-[10px] py-[4px] text-tty-faint">utf-8 · {{ zoomPercent }}% · ln 1, col 1</span>
		<span class="ml-auto md:ml-0 px-[10px] py-[4px] text-tty-amber border-l border-tty-border shrink-0">{{ time }}</span>
	</footer>
</template>
