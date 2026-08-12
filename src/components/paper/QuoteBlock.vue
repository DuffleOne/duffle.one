<script setup lang="ts">
/*
  The rotating testimonial, set between hairlines as an Alcyone
  italic display line. Fades between quotes unless the visitor
  prefers reduced motion.
*/
import { useQuoteRotation } from "../../composables/useQuoteRotation";
import { useReducedMotion } from "../../composables/useReducedMotion";

const { quote, tick } = useQuoteRotation(8_000);
const { reduced } = useReducedMotion();
</script>

<template>
	<div class="border-y border-rule py-6 text-center">
		<Transition :name="reduced ? '' : 'quote-fade'" mode="out-in">
			<div :key="tick" class="font-display font-light italic text-[clamp(24px,4vw,34px)] leading-[1.3]">“{{ quote }}”</div>
		</Transition>
	</div>
</template>

<style scoped>
.quote-fade-enter-active,
.quote-fade-leave-active {
	transition: opacity 0.45s ease;
}
.quote-fade-enter-from,
.quote-fade-leave-to {
	opacity: 0;
}
</style>
