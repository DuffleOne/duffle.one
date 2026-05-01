/*
  Live London weather from Open-Meteo. Keyless, free, generous rate
  limits (10k req/day per IP). Refreshes every 15 minutes; no fetch on
  load if the cache is still fresh.

  Returned label is short — "11° drizzle" style — so it slots into the
  PortraitCard meta table without overflowing.
*/

import { onBeforeUnmount, onMounted, ref } from "vue";

const URL =
	"https://api.open-meteo.com/v1/forecast" +
	"?latitude=51.5074&longitude=-0.1278" +
	"&current=temperature_2m,weather_code" +
	"&timezone=Europe/London";

const REFRESH_MS = 15 * 60 * 1000;

type Current = {
	temperature_2m: number;
	weather_code: number;
};

// WMO weather codes -> short lowercase labels. Open-Meteo uses these
// codes verbatim. Anything we don't recognise renders as "outside".
function describeCode(code: number): string {
	if (code === 0) return "clear";
	if (code === 1) return "fair";
	if (code === 2) return "partly cloudy";
	if (code === 3) return "overcast";
	if (code >= 45 && code <= 48) return "fog";
	if (code >= 51 && code <= 57) return "drizzle";
	if (code >= 61 && code <= 67) return "rain";
	if (code >= 71 && code <= 77) return "snow";
	if (code >= 80 && code <= 82) return "showers";
	if (code >= 85 && code <= 86) return "sleet";
	if (code === 95) return "storm";
	if (code === 96 || code === 99) return "hailstorm";
	return "outside";
}

export function useWeather() {
	const label = ref<string>("…");
	const error = ref<string | null>(null);
	let timer: ReturnType<typeof setInterval> | null = null;
	let aborter: AbortController | null = null;

	async function fetchOnce() {
		aborter?.abort();
		aborter = new AbortController();
		try {
			const res = await fetch(URL, { signal: aborter.signal });
			if (!res.ok) throw new Error(`status ${res.status}`);
			const json = (await res.json()) as { current: Current };
			const t = Math.round(json.current.temperature_2m);
			const desc = describeCode(json.current.weather_code);
			label.value = `${t}° ${desc}`;
			error.value = null;
		} catch (err) {
			if ((err as { name?: string }).name === "AbortError") return;
			error.value = (err as Error).message;
			// Keep whatever we had; first-load failures surface as the seed
			// "..." which reads fine in context.
		}
	}

	onMounted(() => {
		fetchOnce();
		timer = setInterval(fetchOnce, REFRESH_MS);
	});

	onBeforeUnmount(() => {
		if (timer) clearInterval(timer);
		aborter?.abort();
	});

	return { label, error, refresh: fetchOnce };
}
