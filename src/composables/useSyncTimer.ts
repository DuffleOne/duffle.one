/*
  "synced X ago" timer in the status bar. The TTY conceit is that the
  page is a long-running shell session that's syncing to a remote — so
  the timer counts up from page load.
*/

import { onBeforeUnmount, onMounted, ref } from "vue";

export function useSyncTimer(intervalMs = 30_000) {
	const startedAt = Date.now();
	const label = ref("synced just now");
	let timer: ReturnType<typeof setInterval> | null = null;

	function update() {
		const elapsedMs = Date.now() - startedAt;
		label.value = `synced ${formatRelative(elapsedMs)}`;
	}

	onMounted(() => {
		update();
		timer = setInterval(update, intervalMs);
	});

	onBeforeUnmount(() => {
		if (timer) clearInterval(timer);
	});

	return { label };
}

function formatRelative(ms: number): string {
	const s = Math.floor(ms / 1000);
	if (s < 30) return "just now";
	if (s < 90) return "1m ago";
	const m = Math.floor(s / 60);
	if (m < 60) return `${m}m ago`;
	const h = Math.floor(m / 60);
	if (h < 24) return `${h}h ago`;
	const d = Math.floor(h / 24);
	return `${d}d ago`;
}
