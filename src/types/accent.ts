/*
  Accent system. Six hues at near-identical chroma + lightness so they
  harmonize. Defined as Tailwind theme tokens in input.css; this module
  is the typed bridge between TS code and CSS.
*/

export type Accent = "green" | "pink" | "amber" | "cyan" | "violet" | "yellow";

export const ACCENTS: Accent[] = ["green", "pink", "amber", "cyan", "violet", "yellow"];

/** CSS var name for an accent — matches `--color-tty-{accent}` from input.css */
export function accentVar(a: Accent): string {
	return `var(--color-tty-${a})`;
}

/** Tailwind text class for an accent */
export function accentText(a: Accent): string {
	return `text-tty-${a}`;
}

/** Tailwind bg class for an accent */
export function accentBg(a: Accent): string {
	return `bg-tty-${a}`;
}

/** Tailwind border class for an accent */
export function accentBorder(a: Accent): string {
	return `border-tty-${a}`;
}

/** Glow utility class for accents that have one defined in input.css */
export function accentGlow(a: Accent): string | undefined {
	const map: Partial<Record<Accent, string>> = {
		green: "tty-glow-g",
		amber: "tty-glow-a",
		pink: "tty-glow-p",
		cyan: "tty-glow-c",
		violet: "tty-glow-v",
	};
	return map[a];
}
