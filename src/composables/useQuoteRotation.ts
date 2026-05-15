/*
  Quote rotation. Shuffles the pool once at session start (Fisher-Yates),
  then walks through the shuffled order, never repeating until the whole
  list has been seen. When the cycle ends, reshuffle and start again.

  Attributions cycle independently so the same line gets a different
  source on the next pass through.
*/

import { onBeforeUnmount, onMounted, ref } from "vue";
import { SITE } from "../site/data";

function shuffle<T>(input: readonly T[]): T[] {
	const arr = [...input];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function cycler<T>(source: readonly T[]) {
	let queue: T[] = shuffle(source);
	let idx = 0;
	return () => {
		if (idx >= queue.length) {
			queue = shuffle(source);
			idx = 0;
		}
		return queue[idx++];
	};
}

export function useQuoteRotation(intervalMs = 7_000) {
	const nextQuote = cycler(SITE.quotePool);
	const nextAttr = cycler(SITE.quoteAttributions);

	const quote = ref(nextQuote());
	const attribution = ref(nextAttr());
	const tick = ref(0);
	let timer: ReturnType<typeof setInterval> | null = null;

	function rotate() {
		quote.value = nextQuote();
		attribution.value = nextAttr();
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
