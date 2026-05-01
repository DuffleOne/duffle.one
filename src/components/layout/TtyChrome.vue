<script setup lang="ts">
/*
  Outer terminal window: titlebar + sidebar + body + statusbar.
  Used by every screen. Reads accent + activeId from props rather than
  the route record, so easter-egg / overlay screens can pass arbitrary
  values.
*/
import TitleBar from "./TitleBar.vue";
import SideBar from "./SideBar.vue";
import StatusBar from "./StatusBar.vue";
import MobileTabBar from "./MobileTabBar.vue";
import type { Accent } from "../../types/accent";
import type { RouteId } from "../../site/routes";

withDefaults(
	defineProps<{
		title: string;
		statusPath: string;
		activeId: RouteId | "sudo";
		accent?: Accent;
		mode?: string;
	}>(),
	{ accent: "green", mode: "NORMAL" }
);
</script>

<template>
	<div
		class="tty tty-scan tty-vig flex flex-col h-full w-full bg-tty-bg text-tty-fg font-mono text-[13px] leading-[1.7] overflow-hidden border border-tty-border"
		style="box-shadow: inset 0 0 120px rgba(0,0,0,0.4)"
	>
		<TitleBar :title="title"/>
		<div class="tty-content flex flex-1 min-h-0 relative">
			<SideBar :active-id="activeId"/>
			<div class="flex-1 min-w-0 flex flex-col relative overflow-hidden">
				<slot/>
			</div>
		</div>
		<MobileTabBar :active-id="activeId"/>
		<StatusBar :route="statusPath" :accent="accent" :mode="mode"/>
	</div>
</template>
