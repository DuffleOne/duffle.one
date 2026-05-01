<script setup lang="ts">
/*
  Single game-server table row. Status colour cascades to the leading
  ●, the host, and the right-most Tag. Offline rows render in faint
  per the design ("Status color: online=green, idle=amber, offline=faint").
*/
import type { GameServer } from "../../site/data";
import type { Accent } from "../../types/accent";
import { accentText } from "../../types/accent";
import { computed } from "vue";
import Tag from "../../components/atoms/Tag.vue";

const props = defineProps<{ server: GameServer; index: number; columns: string }>();

const accent = computed<Accent | null>(() => {
	switch (props.server.status) {
		case "online": return "green";
		case "idle": return "amber";
		case "offline": return null; // rendered in faint, not via an accent
	}
});

const statusClass = computed(() =>
	accent.value ? accentText(accent.value) : "text-tty-faint"
);

// Only online servers get a thumbnail; idle/offline keep the dot.
const showImage = computed(() =>
	props.server.status === "online" && !!props.server.imageUrl
);
</script>

<template>
	<div
		class="server-row border-b border-dashed border-tty-border row-hover"
		:style="{ '--row-cols-md': columns } as any"
	>
		<span class="row-num text-tty-faint">{{ String(index + 1).padStart(2, "0") }}</span>
		<span class="row-host font-mono text-[12.5px] inline-flex items-center min-w-0" :class="statusClass">
			<img
				v-if="showImage"
				:src="server.imageUrl!"
				alt=""
				class="mr-[8px] block object-cover border border-tty-border shrink-0"
				style="width: 32px; height: 32px;"
			/>
			<span v-else class="mr-[6px] shrink-0" :class="statusClass">●</span>
			<span class="truncate">{{ server.title }}</span>
		</span>
		<span class="row-game text-tty-fg font-display tracking-[-0.2px] truncate" style="font-size: 15px;">
			{{ server.game }}
		</span>
		<span class="row-players text-tty-dim tnum">
			<span class="md:hidden text-tty-faint mr-1">players</span>{{ server.players }}
		</span>
		<span class="row-uptime text-tty-dim tnum">
			<span class="md:hidden text-tty-faint mr-1">uptime</span>{{ server.uptime }}
		</span>
		<span class="row-status">
			<!-- Offline status renders as a plain caps label in faint, not a coloured Tag. -->
			<Tag v-if="accent" :accent="accent">{{ server.status }}</Tag>
			<span
				v-else
				class="text-tty-faint text-[10px] tracking-[1.5px] uppercase"
			>{{ server.status }}</span>
		</span>
	</div>
</template>

<style scoped>
/*
  Mobile: stacked card. Top: status dot + host + status pill. Then game.
  Then players · uptime in a meta row.
  Desktop (md+): the original 6-column grid.
*/
.server-row {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-areas:
		"host    status"
		"game    game"
		"players uptime";
	column-gap: 10px;
	row-gap: 4px;
	align-items: center;
	padding: 12px 0;
}
.server-row .row-num { display: none; }
.server-row .row-host { grid-area: host; min-width: 0; }
.server-row .row-game { grid-area: game; }
.server-row .row-status { grid-area: status; justify-self: end; }
.server-row .row-players {
	grid-area: players;
	justify-self: start;
	font-size: 11px;
}
.server-row .row-uptime {
	grid-area: uptime;
	justify-self: end;
	font-size: 11px;
}

@media (min-width: 768px) {
	.server-row {
		grid-template-columns: var(--row-cols-md);
		grid-template-areas: none;
		column-gap: 14px;
		row-gap: 0;
		padding: 12px 0;
	}
	.server-row .row-num { display: inline; }
	.server-row .row-host,
	.server-row .row-game,
	.server-row .row-players,
	.server-row .row-uptime,
	.server-row .row-status {
		grid-area: auto;
		justify-self: stretch;
		font-size: inherit;
	}
}
</style>
