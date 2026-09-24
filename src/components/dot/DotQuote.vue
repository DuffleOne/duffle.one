<script setup lang="ts">
/*
  The landing's rotating quote. One shows at a time and it moves on by
  itself every six seconds. The dots under it are a window of seven onto
  the list rather than the whole of it: the yellow one is the quote
  showing and always sits in the middle, and the window slides along a
  dot at a time. Any dot jumps to its quote, so the ones on the left go
  back and the ones on the right go forward. With the quote focused the
  arrow keys do the same, and so does a sideways swipe. Hovering or
  focusing it holds the rotation.
*/
import { computed, nextTick, onBeforeUnmount, onBeforeUpdate, onMounted, ref, watch } from "vue";
import { useQuoteRotation } from "../../composables/useQuoteRotation";

const props = defineProps<{ quotes: readonly string[] }>();

const hovered = ref(false);
const focused = ref(false);
const held = computed(() => hovered.value || focused.value);
const { quote, step, go } = useQuoteRotation(props.quotes, held);

// Keyed off step, which only ever counts, so the dots slide rather than
// repaint. `place` is a dot's quote's number in this visit's order.
const dots = computed(() => Array.from({ length: 7 }, (_, i) => step.value + i - 3));
const count = props.quotes.length;
const place = (k: number) => (((k % count) + count) % count) + 1;

// Every quote sits stacked in the one grid cell, so the block is always
// as tall as the longest and the page under it never jumps. The dots
// get lifted to sit under the one showing, gliding when it changes.
// Under the pointer they only ever move down, out of a longer quote's
// way, so the dot you're about to click stays put.
const stack = ref<HTMLElement | null>(null);
const lift = ref(0);
const settled = ref(false);

function measure() {
	const current = stack.value?.querySelector<HTMLElement>(".is-current");
	if (!stack.value || !current) return;
	const fit = stack.value.offsetHeight - current.offsetHeight;
	lift.value = hovered.value ? Math.min(lift.value, fit) : fit;
}

watch(quote, () => nextTick(measure));
watch(hovered, (now) => {
	if (!now) measure();
});

function onFocusOut(e: FocusEvent) {
	const figure = e.currentTarget as HTMLElement;
	if (!figure.contains(e.relatedTarget as Node | null)) focused.value = false;
}

function onKey(e: KeyboardEvent) {
	const delta = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
	if (!delta) return;
	e.preventDefault();
	go(delta);
}

// A sideways swipe on a touch screen. Up and down still scrolls.
let swipe: { id: number; x: number; y: number } | null = null;

function onPointerDown(e: PointerEvent) {
	if (e.pointerType !== "mouse") swipe = { id: e.pointerId, x: e.clientX, y: e.clientY };
}

function onPointerUp(e: PointerEvent) {
	if (swipe?.id !== e.pointerId) return;
	const dx = e.clientX - swipe.x;
	const dy = e.clientY - swipe.y;
	swipe = null;
	if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
}

function cancelSwipe() {
	swipe = null;
}

// A dot on its way out leaves the flow so the rest can slide over. Pin
// it where it was before the update, or it jumps to the start of the
// row (and, with others leaving alongside it, to where they were).
const figure = ref<HTMLElement | null>(null);
const lefts = new WeakMap<Element, number>();

onBeforeUpdate(() => {
	figure.value?.querySelectorAll<HTMLElement>(".quote-dot").forEach((d) => lefts.set(d, d.offsetLeft));
});

function pin(el: Element) {
	(el as HTMLElement).style.left = `${lefts.get(el) ?? 0}px`;
}

let resize: ResizeObserver | undefined;

onMounted(() => {
	measure();
	resize = new ResizeObserver(measure);
	if (stack.value) resize.observe(stack.value);
	document.fonts.ready.then(measure);
	// Glide from here on; the first placement shouldn't animate.
	requestAnimationFrame(() => requestAnimationFrame(() => (settled.value = true)));
});

onBeforeUnmount(() => resize?.disconnect());
</script>

<template>
	<figure
		ref="figure"
		class="quote"
		tabindex="0"
		aria-label="Quote"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false"
		@focusin="focused = true"
		@focusout="onFocusOut"
		@keydown="onKey"
		@pointerdown="onPointerDown"
		@pointerup="onPointerUp"
		@pointercancel="cancelSwipe"
	>
		<div ref="stack" class="quote-stack" :aria-live="held ? 'polite' : 'off'">
			<blockquote
				v-for="q in quotes"
				:key="q"
				class="quote-text"
				:class="{ 'is-current': q === quote }"
			>“{{ q }}”</blockquote>
		</div>

		<div class="quote-lift" :class="{ settled }" :style="{ translate: `0 ${-lift}px` }">
			<TransitionGroup tag="div" name="slide" class="quote-dots" @before-leave="pin">
				<button
					v-for="k in dots"
					:key="k"
					type="button"
					tabindex="-1"
					class="quote-dot"
					:class="{ 'is-current': k === step }"
					:aria-label="`Quote ${place(k)} of ${count}`"
					:aria-current="k === step || undefined"
					@click="go(k - step)"
				></button>
			</TransitionGroup>
			<span class="quote-hint">
				<span aria-hidden="true">← →</span>
				<span class="sr-only">The left and right arrow keys move between quotes.</span>
			</span>
		</div>
	</figure>
</template>

<style scoped>
.quote {
	touch-action: pan-y pinch-zoom;
}
.quote:focus-visible {
	outline-offset: 8px;
	border-radius: 2px;
}

.quote-stack {
	display: grid;
	align-items: start;
}
.quote-text {
	grid-area: 1 / 1;
	font-size: 24px;
	line-height: 31px;
	letter-spacing: -0.3px;
	opacity: 0;
	visibility: hidden;
	transition: opacity 250ms ease, visibility 0s linear 250ms;
}
.quote-text.is-current {
	opacity: 1;
	visibility: visible;
	transition: opacity 250ms ease;
}

.quote-lift {
	display: flex;
	align-items: center;
	gap: 16px;
	height: 8px;
	margin-top: 20px;
}
.quote-lift.settled {
	transition: translate 250ms ease;
}

/* Each dot is a 14px-wide button, so there's something to hit, with
   the dot drawn in the middle of it: laid out at 8px and the idle ones
   scaled to 6px, which keeps the slide an even step (scale, not
   transform, which the slide itself uses). The yellow one's button is
   16px so every gap stays 8px, and the row sits 4px left so the first
   dot lands on the column edge. */
.quote-dots {
	position: relative;
	display: flex;
	align-items: center;
	height: 8px;
	margin-left: -4px;
}
.quote-dot {
	position: relative;
	flex: none;
	width: 14px;
	height: 24px;
	margin-block: -8px;
	cursor: pointer;
	transition: transform 300ms ease, opacity 300ms ease;
}
.quote-dot::before {
	content: "";
	position: absolute;
	top: 8px;
	left: 3px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: var(--idle);
	scale: 0.75;
	transition: scale 300ms ease, background-color 300ms ease;
}
.quote-dot.is-current {
	width: 16px;
	cursor: default;
}
.quote-dot.is-current::before {
	left: 4px;
	background: var(--yellow);
	scale: 1;
}
.slide-enter-from,
.slide-leave-to {
	opacity: 0;
}
.slide-enter-from::before,
.slide-leave-to::before {
	scale: 0;
}
.slide-leave-active {
	position: absolute;
}

/* Only there for the keyboard: it shows while the quote has focus. */
.quote-hint {
	font-size: 13px;
	color: var(--muted);
	opacity: 0;
}
.quote:focus-visible .quote-hint {
	opacity: 1;
}

@media (min-width: 720px) {
	.quote-text {
		font-size: 30px;
		line-height: 39px;
		letter-spacing: -0.4px;
	}
	.quote-lift {
		margin-top: 28px;
	}
}

@media (min-width: 1440px) {
	.quote-text {
		font-size: 46px;
		line-height: 56px;
		letter-spacing: -0.9px;
	}
	.quote-lift {
		margin-top: 36px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.quote-text,
	.quote-lift.settled,
	.quote-dot,
	.quote-dot::before {
		transition: none;
	}
}
</style>
