<script setup lang="ts">
/*
  Home route: ASCII wordmark (ANSI Shadow style), login meta with
  document.lastModified for the "last login" timestamp, hairline,
  two-col body (portrait + hero), trailing empty prompt + caret.
*/
import { computed } from "vue";
import { findRouteById } from "../site/routes";
import TtyChrome from "../components/layout/TtyChrome.vue";
import ContentPane from "../components/layout/ContentPane.vue";
import Prompt from "../components/atoms/Prompt.vue";
import Caret from "../components/atoms/Caret.vue";
import Hairline from "../components/atoms/Hairline.vue";
import PortraitCard from "./home/PortraitCard.vue";
import HeroBlock from "./home/HeroBlock.vue";

const route = findRouteById("home")!;

// ANSI Shadow rendering of "DUFFLE" — sharper edges than the half-block
// variant, reads cleanly with the layered .tty-bloom-g phosphor glow.
const wordmark = `██████╗ ██╗   ██╗███████╗███████╗██╗     ███████╗
██╔══██╗██║   ██║██╔════╝██╔════╝██║     ██╔════╝
██║  ██║██║   ██║█████╗  █████╗  ██║     █████╗
██║  ██║██║   ██║██╔══╝  ██╔══╝  ██║     ██╔══╝
██████╔╝╚██████╔╝██║     ██║     ███████╗███████╗
╚═════╝  ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚══════╝`;

// document.lastModified format: "MM/DD/YYYY HH:MM:SS" or RFC1123 depending
// on browser. Parse and render as "tue 16:38". In SSR / vite-build this
// runs at hydration, so the timestamp tracks the last deploy of the
// rendered HTML.
const lastLogin = computed(() => {
	if (typeof document === "undefined") return "—";
	const d = new Date(document.lastModified);
	if (isNaN(d.getTime())) return "—";
	const dow = d.toLocaleDateString("en-GB", { weekday: "short" }).toLowerCase();
	const time = d.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
	return `${dow} ${time}`;
});
</script>

<template>
	<TtyChrome
		:title="route.titleBarText"
		status-path="home"
		active-id="home"
		:accent="route.accent"
	>
		<ContentPane :padding-x="34" :padding-y="30" :gap="18">
			<pre
				class="wordmark text-tty-green m-0 tty-bloom-g whitespace-pre overflow-x-auto"
			>{{ wordmark }}</pre>

			<div class="text-tty-dim text-[10.5px] md:text-[11.5px] tracking-[1.5px] truncate">
				DUFFLE.ONE · v26.4 · last login: {{ lastLogin }} from 10.0.0.42
			</div>

			<Hairline/>

			<div class="home-grid items-start">
				<PortraitCard/>
				<HeroBlock/>
			</div>

			<div class="mt-auto text-tty-dim flex items-baseline">
				<Prompt route="home" :glow="true"/>
				<Caret/>
			</div>
		</ContentPane>
	</TtyChrome>
</template>

<style scoped>
.wordmark {
	font-size: 9px;
	line-height: 1.05;
	letter-spacing: 0;
}
@media (min-width: 768px) {
	.wordmark {
		font-size: 12px;
	}
}

.home-grid {
	display: flex;
	flex-direction: column;
	gap: 22px;
}
@media (min-width: 768px) {
	.home-grid {
		display: grid;
		grid-template-columns: 160px 1fr;
		gap: 32px;
	}
}
</style>
