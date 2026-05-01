<script setup lang="ts">
/*
  Right-column hero on home: display name, tagline, rotating quote
  callout (driven by useQuoteRotation), social grid.

  The "go run quote.go" prompt is part of the joke: the quote isn't a
  static cat; there's a tiny program rotating the pool every few seconds.
*/
import { SITE } from "../../site/data";
import type { Accent } from "../../types/accent";
import Prompt from "../../components/atoms/Prompt.vue";
import Callout from "../../components/cards/Callout.vue";
import SocialCard from "./SocialCard.vue";
import { useQuoteRotation } from "../../composables/useQuoteRotation";

const { quote, attribution, tick } = useQuoteRotation();

const socialAccents: Accent[] = ["green", "cyan", "amber", "pink", "violet"];
</script>

<template>
	<div class="min-w-0">
		<h1
			class="hero-name font-display text-tty-fg m-0"
		>
			Laura Miller<span class="text-tty-green tty-glow-g">.</span>
		</h1>
		<p class="mt-[18px] text-tty-fg">
			founding eng · photographer · 3d-print enthusiast.
		</p>

		<div class="mt-[22px] text-tty-dim">
			<Prompt cmd="go run quote.go" route="home" :glow="true"/>
		</div>
		<Callout class="mt-[10px]" accent="amber">
			<Transition name="quote" mode="out-in">
				<div :key="tick">
					<span class="text-tty-amber">“</span>{{ quote }}<span class="text-tty-amber">”</span>
					<div class="text-tty-faint text-[11px] mt-1">via {{ attribution }}</div>
				</div>
			</Transition>
		</Callout>

		<div class="mt-5">
			<Prompt cmd="cat ./links.json" route="home"/>
		</div>
		<div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-[22px] gap-y-2">
			<SocialCard
				v-for="(s, i) in SITE.socials"
				:key="s.id"
				:social="s"
				:accent="socialAccents[i % socialAccents.length]"
			/>
		</div>
	</div>
</template>

<style scoped>
.hero-name {
	font-size: 40px;
	line-height: 0.96;
	letter-spacing: -1.2px;
	font-weight: 500;
}
@media (min-width: 768px) {
	.hero-name {
		font-size: 68px;
		letter-spacing: -1.8px;
	}
}

.quote-enter-active,
.quote-leave-active {
	transition: opacity 220ms ease, transform 220ms ease;
}
.quote-enter-from {
	opacity: 0;
	transform: translateY(4px);
}
.quote-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}
@media (prefers-reduced-motion: reduce) {
	.quote-enter-active,
	.quote-leave-active {
		transition: none;
	}
	.quote-enter-from,
	.quote-leave-to {
		transform: none;
	}
}
</style>
