import { onBeforeUnmount, ref } from "vue";

// Read straight away rather than on mount, so the first render already
// knows whether things are allowed to move.
export function useReducedMotion() {
	const mq = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
	const reduced = ref(mq?.matches ?? false);
	const onChange = () => {
		if (mq) reduced.value = mq.matches;
	};

	mq?.addEventListener("change", onChange);
	onBeforeUnmount(() => {
		mq?.removeEventListener("change", onChange);
	});

	return { reduced };
}
