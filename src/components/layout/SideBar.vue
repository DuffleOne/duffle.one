<script setup lang="ts">
/*
  Left sidebar: routes + sys monitor. Composed so each section can
  evolve independently.
*/
import RouteList from "./RouteList.vue";
import SysMonitor from "./SysMonitor.vue";
import type { RouteId } from "../../site/routes";

defineProps<{ activeId: RouteId | "sudo" }>();
</script>

<template>
	<aside
		class="w-[200px] shrink-0 bg-tty-bg2 border-r border-tty-border flex-col py-5 text-[12.5px] hidden md:flex"
	>
		<RouteList :active-id="activeId"/>
		<SysMonitor/>
	</aside>
</template>
