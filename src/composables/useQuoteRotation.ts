/*
  Quote rotation. Shuffles the pool once at session start (Fisher-Yates),
  then walks the shuffled order, never repeating until the whole list
  has been seen; reshuffles and goes again when it runs dry.

  Rotation pauses while the tab is hidden — throttled renderers just
  pile up unfinished fade transitions otherwise.
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

export function useQuoteRotation(intervalMs = 8_000) {
	const nextQuote = cycler(SITE.quotePool);
	const quote = ref(nextQuote());
	const tick = ref(0);
	let timer: ReturnType<typeof setInterval> | null = null;

	function rotate() {
		if (typeof document !== "undefined" && document.hidden) return;
		quote.value = nextQuote();
		tick.value += 1;
	}

	onMounted(() => {
		timer = setInterval(rotate, intervalMs);
	});

	onBeforeUnmount(() => {
		if (timer) clearInterval(timer);
	});

	return { quote, tick, rotate };
}
