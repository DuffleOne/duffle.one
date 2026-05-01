/*
  Live clock for the status bar. Fixed to Europe/London (Laura is in
  London — see SITE.cv.experience[0].loc) per the design's "london · 16:42"
  cell. Tick every 30s; minute precision means we don't need 1s.
*/

import { onBeforeUnmount, onMounted, ref } from "vue";

const FORMATTER = new Intl.DateTimeFormat("en-GB", {
	timeZone: "Europe/London",
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
});

export function useClock(intervalMs = 30_000) {
	const time = ref(FORMATTER.format(new Date()));
	let timer: ReturnType<typeof setInterval> | null = null;

	onMounted(() => {
		// Align the first tick to the next 30s boundary so the displayed
		// minute matches the wall clock as closely as possible.
		const now = Date.now();
		const drift = intervalMs - (now % intervalMs);
		const align = setTimeout(() => {
			time.value = FORMATTER.format(new Date());
			timer = setInterval(() => {
				time.value = FORMATTER.format(new Date());
			}, intervalMs);
		}, drift);
		// store the timeout id under timer so the unmount hook can clear it
		// before it fires
		timer = align as unknown as ReturnType<typeof setInterval>;
	});

	onBeforeUnmount(() => {
		if (timer) {
			clearInterval(timer);
			clearTimeout(timer as unknown as ReturnType<typeof setTimeout>);
		}
	});

	return { time };
}
