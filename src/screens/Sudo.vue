<script setup lang="ts">
/*
  404 — the catch-all. A page that never made this edition.
*/
import PaperSheet from "../components/paper/PaperSheet.vue";
import PageMasthead from "../components/paper/PageMasthead.vue";
</script>

<template>
	<PaperSheet>
		<div class="px-5 py-6 sm:px-8 md:px-14 md:py-12">
			<PageMasthead/>

			<div class="flex flex-col items-center text-center pt-14 pb-12">
				<div class="meta-caps text-ink-faint">duffle.one</div>
				<h2 class="m-0 mt-6 font-display font-light text-[clamp(96px,20vw,146px)] leading-none tnum">404</h2>
				<div class="mt-4 font-display font-light italic text-[clamp(20px,3vw,28px)] text-ink-soft">This page was never typeset.</div>

				<div class="flex items-center gap-3.5 my-8">
					<span class="h-px w-[90px] bg-rule-dot"></span>
					<span class="h-[5px] w-[5px] rotate-45 bg-accent"></span>
					<span class="h-px w-[90px] bg-rule-dot"></span>
				</div>

				<RouterLink to="/" class="text-[15.5px]">Back to the index →</RouterLink>
			</div>
		</div>
	</PaperSheet>
</template>
