/*
  Theme switching. "system" follows the OS preference and updates live
  when it changes; that's where everyone starts, until they pick light
  or dark with the switch in the nav. The pick is persisted in
  localStorage.

  We write `data-theme` to <html> for the explicit choices and leave it
  off for "system" so the OS preference takes over.
*/

import { onBeforeUnmount, onMounted, ref, watch } from "vue";

export type ThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "duffle:theme";

function readStored(): ThemeChoice {
	if (typeof localStorage === "undefined") return "system";
	const v = localStorage.getItem(STORAGE_KEY);
	if (v === "light" || v === "dark" || v === "system") return v;
	return "system";
}

function apply(choice: ThemeChoice) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	if (choice === "system") {
		root.removeAttribute("data-theme");
	} else {
		root.setAttribute("data-theme", choice);
	}
}

export function useTheme() {
	const choice = ref<ThemeChoice>(readStored());
	apply(choice.value);

	watch(choice, (v) => {
		apply(v);
		try { localStorage.setItem(STORAGE_KEY, v); } catch { /* ignore */ }
	});

	// Resolved theme — what's actually on screen right now, even in "system".
	const resolved = ref<"light" | "dark">("light");

	function recomputeResolved() {
		if (choice.value !== "system") {
			resolved.value = choice.value;
			return;
		}
		if (typeof matchMedia === "function") {
			resolved.value = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
	}

	let mql: MediaQueryList | null = null;
	function onMqlChange() { recomputeResolved(); }

	onMounted(() => {
		recomputeResolved();
		if (typeof matchMedia === "function") {
			mql = matchMedia("(prefers-color-scheme: dark)");
			mql.addEventListener?.("change", onMqlChange);
		}
	});

	onBeforeUnmount(() => {
		mql?.removeEventListener?.("change", onMqlChange);
	});

	watch(choice, recomputeResolved);

	function toggle() {
		choice.value = resolved.value === "dark" ? "light" : "dark";
	}

	return { choice, resolved, toggle };
}
