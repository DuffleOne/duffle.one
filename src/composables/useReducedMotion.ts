import { onBeforeUnmount, onMounted, ref } from "vue";

export function useReducedMotion() {
	const reduced = ref(false);
	let mq: MediaQueryList | null = null;
	const onChange = () => {
		if (mq) reduced.value = mq.matches;
	};

	onMounted(() => {
		if (typeof window === "undefined") return;
		mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		reduced.value = mq.matches;
		mq.addEventListener("change", onChange);
	});

	onBeforeUnmount(() => {
		mq?.removeEventListener("change", onChange);
	});

	return { reduced };
}
