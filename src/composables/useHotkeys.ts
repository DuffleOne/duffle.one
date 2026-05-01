/*
  Global keybindings. Mounted once in App.vue.

  - 1..6           : jump to route
  - ⌘K / Ctrl+K    : open palette
  - Esc            : close palette (or unfocus)
  - ?              : open user-guide
  - sudo (typed)   : easter egg

  Skipped while typing into inputs/textareas.
*/

import { onBeforeUnmount, onMounted } from "vue";
import type { Router } from "vue-router";
import { findRouteByKey, findRouteById } from "../site/routes";

export type HotkeyHandlers = {
	openPalette: () => void;
	closePalette: () => void;
	isPaletteOpen: () => boolean;
};

const SUDO_BUFFER_RESET_MS = 1500;

export function useHotkeys(router: Router, handlers: HotkeyHandlers) {
	let sudoBuffer = "";
	let sudoTimer: ReturnType<typeof setTimeout> | null = null;

	function isEditableTarget(t: EventTarget | null): boolean {
		if (!(t instanceof HTMLElement)) return false;
		const tag = t.tagName;
		return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable;
	}

	function onKeyDown(e: KeyboardEvent) {
		// ⌘K / Ctrl+K opens palette regardless of focus.
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
			e.preventDefault();
			handlers.isPaletteOpen() ? handlers.closePalette() : handlers.openPalette();
			return;
		}

		// Esc closes palette (regardless of focus).
		if (e.key === "Escape") {
			if (handlers.isPaletteOpen()) {
				e.preventDefault();
				handlers.closePalette();
			}
			return;
		}

		// All other shortcuts skip when typing.
		if (isEditableTarget(e.target)) return;

		// Number-key route jumps.
		if (/^[1-6]$/.test(e.key)) {
			const r = findRouteByKey(e.key);
			if (r) {
				e.preventDefault();
				router.push(r.path);
			}
			return;
		}

		// "?" opens user-guide.
		if (e.key === "?") {
			const guide = findRouteById("guide");
			if (guide) {
				e.preventDefault();
				router.push(guide.path);
			}
			return;
		}

		// Type "sudo" for the easter egg.
		if (/^[a-zA-Z]$/.test(e.key)) {
			sudoBuffer += e.key.toLowerCase();
			if (sudoBuffer.length > 4) sudoBuffer = sudoBuffer.slice(-4);
			if (sudoTimer) clearTimeout(sudoTimer);
			sudoTimer = setTimeout(() => { sudoBuffer = ""; }, SUDO_BUFFER_RESET_MS);
			if (sudoBuffer === "sudo") {
				sudoBuffer = "";
				router.push("/sudo");
			}
		}
	}

	onMounted(() => window.addEventListener("keydown", onKeyDown));
	onBeforeUnmount(() => {
		window.removeEventListener("keydown", onKeyDown);
		if (sudoTimer) clearTimeout(sudoTimer);
	});
}
