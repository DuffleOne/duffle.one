/*
  Tailwind v4 safelist. The accent helpers in accent.ts compose class
  names with template literals (`text-tty-${accent}`), which the JIT
  string-scanner sometimes misses. Listing every concrete combo here
  guarantees they survive the build.

  This file is imported nowhere — Tailwind reads it as source text.
*/

export const SAFELIST = [
	// accent text
	"text-tty-green", "text-tty-pink", "text-tty-amber",
	"text-tty-cyan", "text-tty-violet", "text-tty-yellow",
	// accent bg
	"bg-tty-green", "bg-tty-pink", "bg-tty-amber",
	"bg-tty-cyan", "bg-tty-violet", "bg-tty-yellow",
	// accent border
	"border-tty-green", "border-tty-pink", "border-tty-amber",
	"border-tty-cyan", "border-tty-violet", "border-tty-yellow",
	// surfaces (used through helpers in some cases)
	"bg-tty-bg", "bg-tty-bg2", "bg-tty-bg3", "bg-tty-bg4",
	"text-tty-fg", "text-tty-dim", "text-tty-faint",
	"border-tty-border", "border-tty-border-hi",
];
