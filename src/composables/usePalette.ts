/*
  Command palette state. App-singleton via module-scope refs so any
  component can open/close it (sidebar shortcuts, ⌘K, etc).

  Commands cover the 6 routes plus a handful of static actions.
  Fuzzy match is naive: subsequence-of-characters; cheap and good enough.
*/

import { computed, ref } from "vue";
import type { Router } from "vue-router";
import { routes } from "../site/routes";
import type { Accent } from "../types/accent";

export type PaletteCommand = {
	id: string;
	label: string;
	hotkey: string;
	glyph: string;
	accent: Accent;
	run: (router: Router) => void;
};

export const STATIC_COMMANDS: PaletteCommand[] = [
	{
		id: "theme",
		label: "toggle theme",
		hotkey: "t",
		glyph: "☼",
		accent: "amber",
		run: () => {
			// out-of-scope for v1; light theme would just invert surfaces.
			console.info("[palette] theme toggle not implemented yet");
		},
	},
	{
		id: "fortune",
		label: "fortune",
		hotkey: "f",
		glyph: "♣",
		accent: "pink",
		run: () => {
			const sayings = [
				"build the small thing first.",
				"the bug is where you've already looked.",
				"close one tab.",
				"go outside.",
			];
			const pick = sayings[Math.floor(Math.random() * sayings.length)];
			console.info(`[fortune] ${pick}`);
		},
	},
	{
		id: "email",
		label: "sudo email me",
		hotkey: "⌘E",
		glyph: "✉",
		accent: "cyan",
		run: () => {
			location.href = "mailto:laura@duffle.one";
		},
	},
	{
		id: "egg3",
		label: "easter egg #3",
		hotkey: "?!",
		glyph: "✦",
		accent: "violet",
		run: (router) => router.push("/sudo"),
	},
];

export function buildAllCommands(): PaletteCommand[] {
	const routeCommands: PaletteCommand[] = routes.map((r, i) => ({
		id: `go-${r.id}`,
		label: r.id === "guide" ? "open user-guide" : `go ${r.label}`,
		hotkey: `g ${r.id[0]}`,
		// glyph cycles through a small set; visually the design uses one
		// per command but they're playful, not semantic.
		glyph: ["▸", "λ", "◐", "▦", "§", "ƒ"][i] ?? "▸",
		accent: "green",
		run: (router) => router.push(r.path),
	}));
	return [...routeCommands, ...STATIC_COMMANDS];
}

const isOpen = ref(false);
const query = ref("");
const selectedIndex = ref(0);
const allCommands = ref<PaletteCommand[]>(buildAllCommands());

const filtered = computed(() => {
	const q = query.value.trim().toLowerCase();
	if (!q) return allCommands.value;
	return allCommands.value.filter((c) => fuzzyMatch(c.label, q));
});

function fuzzyMatch(label: string, q: string): boolean {
	const s = label.toLowerCase();
	let i = 0;
	for (const ch of s) {
		if (ch === q[i]) i++;
		if (i === q.length) return true;
	}
	return i === q.length;
}

export function usePalette() {
	function open() {
		isOpen.value = true;
		query.value = "";
		selectedIndex.value = 0;
	}
	function close() {
		isOpen.value = false;
	}
	function moveSelection(delta: number) {
		const n = filtered.value.length;
		if (n === 0) return;
		selectedIndex.value = (selectedIndex.value + delta + n) % n;
	}
	function selectFirst() {
		selectedIndex.value = 0;
	}
	function execute(router: Router) {
		const cmd = filtered.value[selectedIndex.value];
		if (!cmd) return;
		close();
		cmd.run(router);
	}
	function setQuery(q: string) {
		query.value = q;
		selectedIndex.value = 0;
	}
	function isPaletteOpen() {
		return isOpen.value;
	}

	return {
		isOpen,
		query,
		selectedIndex,
		filtered,
		open,
		close,
		moveSelection,
		selectFirst,
		execute,
		setQuery,
		isPaletteOpen,
	};
}
