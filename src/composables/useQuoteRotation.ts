/*
  Quote rotation. The pool is shuffled once per visit, so it starts
  somewhere new each time and nothing repeats until the lot has been
  round. `step` counts through that order, round and round, and runs
  negative when someone goes back past the start. go() moves it by
  hand.

  The timer holds while the tab is hidden and while `held` is true (the
  landing holds it on hover and focus), and a quote always gets its full
  interval once it lets go or after a move by hand. Under
  prefers-reduced-motion it never runs by itself at all.
*/

import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";
import { useReducedMotion } from "./useReducedMotion";

function shuffle<T>(input: readonly T[]): T[] {
	const arr = [...input];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export function useQuoteRotation(pool: readonly string[], held: Ref<boolean>, intervalMs = 6_000) {
	const order = shuffle(pool);
	const step = ref(0);
	const quote = computed(() => order[((step.value % order.length) + order.length) % order.length]);
	const { reduced } = useReducedMotion();
	let timer: ReturnType<typeof setTimeout> | undefined;

	function schedule() {
		clearTimeout(timer);
		timer = undefined;
		if (reduced.value || held.value || document.hidden) return;
		timer = setTimeout(() => {
			step.value += 1;
			schedule();
		}, intervalMs);
	}

	function go(delta: number) {
		step.value += delta;
		schedule();
	}

	watch([reduced, held], schedule);

	onMounted(() => {
		document.addEventListener("visibilitychange", schedule);
		schedule();
	});

	onBeforeUnmount(() => {
		clearTimeout(timer);
		document.removeEventListener("visibilitychange", schedule);
	});

	return { quote, step, go };
}
