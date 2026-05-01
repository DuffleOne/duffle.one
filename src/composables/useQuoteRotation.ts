/*
  Rotating quote + attribution. Picks a fresh quote from SITE.quotePool
  every `intervalMs`, never repeats the previous one. Picks a random
  attribution alongside it from SITE.quoteAttributions.

  Reduced motion suppresses the fade transition (handled by the
  consumer via CSS); the rotation itself still happens on schedule.
*/

import { onBeforeUnmount, onMounted, ref } from "vue";
import { SITE } from "../site/data";

function pickDifferent(pool: string[], prev: string): string {
	if (pool.length <= 1) return pool[0];
	let next = pool[Math.floor(Math.random() * pool.length)];
	let guard = 0;
	while (next === prev && guard < 8) {
		next = pool[Math.floor(Math.random() * pool.length)];
		guard++;
	}
	return next;
}

export function useQuoteRotation(intervalMs = 5_000) {
	const quote = ref(pickDifferent(SITE.quotePool, ""));
	const attribution = ref(pickDifferent(SITE.quoteAttributions, ""));
	const tick = ref(0);
	let timer: ReturnType<typeof setInterval> | null = null;

	function rotate() {
		quote.value = pickDifferent(SITE.quotePool, quote.value);
		attribution.value = pickDifferent(SITE.quoteAttributions, attribution.value);
		tick.value += 1;
	}

	onMounted(() => {
		timer = setInterval(rotate, intervalMs);
	});

	onBeforeUnmount(() => {
		if (timer) clearInterval(timer);
	});

	return { quote, attribution, tick, rotate };
}
