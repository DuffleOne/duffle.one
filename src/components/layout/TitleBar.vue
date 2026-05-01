<script setup lang="ts">
/*
  Top window chrome: traffic lights · title (host:cwd — process) · kbd hints.

  The kbd group is interactive — ⌘K opens the palette, ? jumps to guide.
*/
import TrafficLights from "./TrafficLights.vue";
import Kbd from "../atoms/Kbd.vue";
import { usePalette } from "../../composables/usePalette";
import { useRouter } from "vue-router";
import { findRouteById } from "../../site/routes";

defineProps<{ title: string }>();

const palette = usePalette();
const router = useRouter();

function handleHelp() {
	const guide = findRouteById("guide");
	if (guide) router.push(guide.path);
}
</script>

<template>
	<header
		class="tty-content flex items-center gap-3 px-[14px] py-2 border-b border-tty-border bg-tty-bg2 text-[12px] shrink-0 min-w-0"
	>
		<TrafficLights/>
		<span class="text-tty-dim ml-1 truncate min-w-0">{{ title }}</span>
		<span class="ml-auto flex gap-[6px] items-center shrink-0">
			<button
				type="button"
				class="cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-tty-cyan inline-flex items-center justify-center min-h-[32px] min-w-[32px] md:min-h-0 md:min-w-0 px-1 md:px-0"
				aria-label="open command palette"
				@click="palette.open()"
			>
				<Kbd>⌘K</Kbd>
			</button>
			<button
				type="button"
				class="cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-tty-cyan inline-flex items-center justify-center min-h-[32px] min-w-[32px] md:min-h-0 md:min-w-0 px-1 md:px-0"
				aria-label="open user guide"
				@click="handleHelp"
			>
				<Kbd>?</Kbd>
			</button>
			<span class="hidden md:inline"><Kbd>esc</Kbd></span>
		</span>
	</header>
</template>
