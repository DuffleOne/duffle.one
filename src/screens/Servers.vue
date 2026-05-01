<script setup lang="ts">
/*
  Servers route: section header + systemctl prompt + table + 3-up
  stat grid footer.

  Live data flows from the AMP cloudflare worker via useServers(); the
  static SITE.gaming acts as a build-time placeholder so the page is
  never empty.
*/
import { computed } from "vue";
import { findRouteById } from "../site/routes";
import type { Accent } from "../types/accent";
import TtyChrome from "../components/layout/TtyChrome.vue";
import ContentPane from "../components/layout/ContentPane.vue";
import SectionHeader from "../components/headers/SectionHeader.vue";
import Prompt from "../components/atoms/Prompt.vue";
import DataTable from "../components/data/DataTable.vue";
import StatGrid from "../components/cards/StatGrid.vue";
import ServerRow from "./servers/ServerRow.vue";
import { useServers } from "../composables/useServers";

const route = findRouteById("gaming")!;
const COLUMNS = "30px 1.4fr 1.6fr 90px 90px 80px";

const { servers, loading, error, isLive, stats } = useServers();

function pad(n: number): string {
	return String(n).padStart(2, "0");
}

const statBoxes = computed(() => [
	{
		label: "HOSTED",
		// Spaced ratio + an explicit "live · total" sub-label so the
		// two numbers can't be misread as a single value.
		value: `${pad(stats.value.live)} / ${pad(stats.value.hosted)}`,
		sub: "live · total",
		accent: "green" as Accent,
	},
	{
		label: "ONLINE",
		value: pad(stats.value.online),
		sub: "with players",
		accent: "cyan" as Accent,
	},
	{
		label: "REGION",
		value: "London",
		accent: "amber" as Accent,
	},
]);
</script>

<template>
	<TtyChrome
		:title="route.titleBarText"
		status-path="servers"
		active-id="gaming"
		:accent="route.accent"
	>
		<ContentPane :padding-x="34" :padding-y="30" :gap="22">
			<SectionHeader n="04" accent="cyan" :live="isLive"/>

			<div class="text-tty-dim text-[11.5px]">
				<Prompt cmd="systemctl --user status game-*.service" route="servers"/>
				<div class="text-tty-faint mt-1 flex items-center gap-2">
					<span>game servers I host for friends · join any with the address shown</span>
					<span v-if="loading" class="text-tty-cyan">· refreshing</span>
					<span v-else-if="error && !isLive" class="text-tty-pink">· {{ error }} (showing cached)</span>
					<span v-else-if="error" class="text-tty-amber">· {{ error }} (last good)</span>
				</div>
			</div>

			<DataTable
				:columns="COLUMNS"
				:headers="['№', 'HOST', 'SERVICE', 'PLAYERS', 'UPTIME', 'STATUS']"
			>
				<ServerRow
					v-for="(s, i) in servers"
					:key="s.id"
					:server="s"
					:index="i"
					:columns="COLUMNS"
				/>
			</DataTable>

			<div class="mt-auto">
				<StatGrid :stats="statBoxes" :columns="3"/>
			</div>
		</ContentPane>
	</TtyChrome>
</template>
