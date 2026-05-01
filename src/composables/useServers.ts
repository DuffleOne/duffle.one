/*
  Live game-server status from the AMP worker (worker-amp/src/index.js).

  Worker returns:
    { name, game, running, players, maxPlayers, port, imageSource }[]

  We normalise it into the same GameServer shape the static fallback
  uses, so the table component is identical regardless of source.

  - Polls every 30s while the page is visible.
  - Falls back to SITE.gaming on initial-load error so the page is
    never empty.
  - Endpoint configured via VITE_SERVERS_API; if unset, no fetch.
*/

import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { SITE, type GameServer } from "../site/data";

type AmpServer = {
	name: string;
	game: string;
	running: boolean;
	players: number | null;
	maxPlayers: number | null;
	port: number | null;
	imageSource: string | null;
};

export type ServerStats = {
	hosted: number;
	// "live" = the daemon is up (running). Includes both online (with
	// players) and idle (running but empty). Matches the conversational
	// sense of "X out of Y servers are live right now."
	live: number;
	// "online" = running AND at least one player connected.
	online: number;
	offline: number;
	uptimePct: number;
};

const REFRESH_MS = 30_000;

function endpoint(): string | undefined {
	return import.meta.env.VITE_SERVERS_API as string | undefined;
}

export function useServers() {
	const servers = ref<GameServer[]>(SITE.gaming);
	const loading = ref(false);
	const error = ref<string | null>(null);
	const lastFetchedAt = ref<number | null>(null);
	const isLive = ref(false);
	let timer: ReturnType<typeof setInterval> | null = null;
	let aborter: AbortController | null = null;

	const stats = computed<ServerStats>(() => {
		const total = servers.value.length;
		const online = servers.value.filter((s) => s.status === "online").length;
		const live = servers.value.filter((s) => s.status === "online" || s.status === "idle").length;
		const offline = servers.value.filter((s) => s.status === "offline").length;
		return {
			hosted: total,
			live,
			online,
			offline,
			uptimePct: total === 0 ? 0 : Math.round((live / total) * 100),
		};
	});

	function resolveImage(src: string | null): string | null {
		if (!src) return null;
		if (src.startsWith("url:")) return src.slice(4);
		if (src.startsWith("steam:")) {
			const id = src.slice(6);
			return `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/library_hero.jpg`;
		}
		return null;
	}

	function mapServer(s: AmpServer): GameServer {
		const status: GameServer["status"] = !s.running
			? "offline"
			: (s.players ?? 0) > 0
				? "online"
				: "idle";
		const players = s.players != null && s.maxPlayers != null
			? `${s.players} / ${s.maxPlayers}`
			: s.running ? "—" : "—";
		return {
			id: `amp-${s.name}`,
			title: s.name,
			game: s.game,
			status,
			players,
			// AMP doesn't expose per-instance uptime through this endpoint;
			// leaving as a placeholder keeps the table shape consistent.
			uptime: s.running ? "live" : "—",
			imageUrl: resolveImage(s.imageSource),
		};
	}

	// Online (with players) first by player count desc, then idle alpha,
	// then offline alpha. Treat null/undefined player counts as 0.
	function sortRank(s: AmpServer): number {
		if (!s.running) return 2;
		return (s.players ?? 0) > 0 ? 0 : 1;
	}
	function sortServers(list: AmpServer[]): AmpServer[] {
		return [...list].sort((a, b) => {
			const ra = sortRank(a);
			const rb = sortRank(b);
			if (ra !== rb) return ra - rb;
			if (ra === 0) return (b.players ?? 0) - (a.players ?? 0);
			return a.name.localeCompare(b.name);
		});
	}

	async function fetchOnce() {
		const url = endpoint();
		if (!url) return;
		aborter?.abort();
		aborter = new AbortController();
		loading.value = true;
		try {
			const res = await fetch(url, {
				signal: aborter.signal,
				headers: { Accept: "application/json" },
			});
			if (!res.ok) throw new Error(`status ${res.status}`);
			const json: AmpServer[] = await res.json();
			servers.value = sortServers(json).map(mapServer);
			isLive.value = true;
			error.value = null;
			lastFetchedAt.value = Date.now();
		} catch (err) {
			if ((err as { name?: string }).name === "AbortError") return;
			console.error("[servers] fetch failed:", err);
			error.value = (err as Error).message ?? "fetch failed";
			// Keep whatever we have. If we never succeeded, this is still
			// the static SITE.gaming we initialised with.
		} finally {
			loading.value = false;
		}
	}

	function start() {
		const url = endpoint();
		if (!url) {
			console.warn("[servers] VITE_SERVERS_API not set; using static fallback. Add it to .env.local and restart `npm run dev`.");
			return;
		}
		console.info(`[servers] polling ${url} every ${REFRESH_MS / 1000}s`);
		fetchOnce();
		timer = setInterval(fetchOnce, REFRESH_MS);
	}
	function stop() {
		if (timer) clearInterval(timer);
		timer = null;
		aborter?.abort();
	}

	onMounted(start);
	onBeforeUnmount(stop);

	return { servers, loading, error, lastFetchedAt, isLive, stats, refresh: fetchOnce };
}
