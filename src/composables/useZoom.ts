/*
  Live browser-zoom indicator. There's no canonical JS API for "user
  zoom level" — devicePixelRatio reflects system DPR plus zoom mixed
  together. So we capture the DPR at mount as our 100% baseline, then
  any subsequent change in DPR is interpreted as zoom delta.

  Caveat: if the page first loads at non-100% zoom we report that as
  100%. Honest tradeoff; the indicator is meant to react to changes.
*/

import { onBeforeUnmount, onMounted, ref } from "vue";

export function useZoom() {
	const percent = ref(100);
	let baseline: number | null = null;
	let mql: MediaQueryList | null = null;

	function update() {
		if (typeof window === "undefined") return;
		if (baseline == null) baseline = window.devicePixelRatio || 1;
		const ratio = window.devicePixelRatio || baseline;
		percent.value = Math.round((ratio / baseline) * 100);
		// Re-attach the MQ at the new ratio so we keep getting changes.
		watchAtCurrentRatio();
	}

	function watchAtCurrentRatio() {
		if (typeof window === "undefined") return;
		mql?.removeEventListener("change", update);
		const ratio = window.devicePixelRatio || 1;
		mql = window.matchMedia(`(resolution: ${ratio}dppx)`);
		mql.addEventListener("change", update);
	}

	function onResize() {
		// Resizes can also reflect zoom on some browsers; cheap to recompute.
		update();
	}

	onMounted(() => {
		baseline = window.devicePixelRatio || 1;
		percent.value = 100;
		watchAtCurrentRatio();
		window.addEventListener("resize", onResize);
	});

	onBeforeUnmount(() => {
		mql?.removeEventListener("change", update);
		window.removeEventListener("resize", onResize);
	});

	return { percent };
}
