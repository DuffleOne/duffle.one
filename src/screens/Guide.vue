<script setup lang="ts">
/*
  /guide — "A user guide to me". Centred opening, the About story in
  hairline-parted newspaper columns, then one row per section in the
  CV's label-and-prose pattern, closing with the values two-up.
*/
import { SITE } from "../site/data";
import PaperSheet from "../components/paper/PaperSheet.vue";
import PageMasthead from "../components/paper/PageMasthead.vue";
import PageTitle from "../components/paper/PageTitle.vue";
</script>

<template>
	<PaperSheet>
		<div class="px-5 py-6 sm:px-8 md:px-14 md:py-12">
			<PageMasthead active="guide"/>

			<div class="mx-auto max-w-[880px] pt-8">
				<PageTitle title="A user guide to me" :subtitle="SITE.guide.intro"/>

				<div class="guide-cols py-7 border-b border-rule">
					<p
						v-for="(p, i) in SITE.guide.about"
						:key="i"
						class="m-0 mb-3.5 last:mb-0 text-[15.5px] leading-[1.75] prose-just"
					>{{ p }}</p>
				</div>

				<div
					v-for="s in SITE.guide.sections"
					:key="s.h"
					class="grid md:grid-cols-[200px_1fr] gap-3 md:gap-[30px] py-7 border-b border-rule"
				>
					<div class="font-display font-medium text-[24px] leading-tight">{{ s.h }}</div>
					<div class="flex flex-col gap-[9px]">
						<p
							v-for="(p, i) in s.body"
							:key="i"
							class="m-0 text-[15px] leading-[1.7] text-ink-soft"
						>{{ p }}</p>
					</div>
				</div>

				<div class="grid md:grid-cols-[200px_1fr] gap-3 md:gap-[30px] py-7">
					<div class="meta-caps text-accent-ink pt-1">Values</div>
					<div class="grid sm:grid-cols-2 gap-x-[30px] gap-y-5">
						<div v-for="v in SITE.guide.values" :key="v.h">
							<div class="font-display font-medium text-[19px] leading-tight">{{ v.h }}</div>
							<div class="mt-1 text-[14px] leading-[1.65] text-ink-soft">{{ v.b }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</PaperSheet>
</template>

<style scoped>
/* About reads as parted columns on wide sheets, one flow on mobile. */
@media (min-width: 768px) {
	.guide-cols {
		columns: 2;
		column-gap: 38px;
		column-rule: 1px solid var(--color-rule);
	}
}
</style>
