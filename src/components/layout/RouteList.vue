<script setup lang="ts">
/*
  Six route rows, plus a ROUTES eyebrow.
*/
import { routes, type RouteId } from "../../site/routes";
import RouteRow from "./RouteRow.vue";

defineProps<{ activeId: RouteId | "sudo" }>();
</script>

<template>
	<nav aria-label="primary">
		<div class="px-[18px] pb-3 text-tty-faint text-[10px] tracking-[2px]">ROUTES</div>
		<RouteRow
			v-for="r in routes"
			:key="r.id"
			:route="r"
			:active="activeId === r.id"
		/>
	</nav>
</template>
