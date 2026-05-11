/*
  Today's date in the browser's local timezone. Re-evaluates on mount
  and at midnight (well, every 30 minutes — close enough, no timezone
  edge cases worth handling).

  Format: "11.05.2026" — day.month.year, zero-padded, matches the
  design comp.
*/

import { onBeforeUnmount, onMounted, ref } from "vue";

function format(d: Date): string {
	const dd = String(d.getDate()).padStart(2, "0");
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const yyyy = d.getFullYear();
	return `${dd}.${mm}.${yyyy}`;
}

export function useToday() {
	const today = ref(format(new Date()));
	let timer: ReturnType<typeof setInterval> | null = null;

	function refresh() {
		today.value = format(new Date());
	}

	onMounted(() => {
		refresh();
		timer = setInterval(refresh, 30 * 60 * 1000);
	});

	onBeforeUnmount(() => {
		if (timer) clearInterval(timer);
	});

	return { today };
}
