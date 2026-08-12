<script setup lang="ts">
/*
  /cv/:slug — one role in full: title row with the role/years/site
  block, the stack, every bullet as prose, and prev/next along the
  bottom rule.
*/
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { SITE } from "../site/data";
import PaperSheet from "../components/paper/PaperSheet.vue";
import PageMasthead from "../components/paper/PageMasthead.vue";

const route = useRoute();

const slug = computed(() => String(route.params.slug ?? ""));
const role = computed(() => SITE.cv.experience.find((e) => e.slug === slug.value));

const idx = computed(() => SITE.cv.experience.findIndex((e) => e.slug === slug.value));
const prev = computed(() => (idx.value > 0 ? SITE.cv.experience[idx.value - 1] : null));
const next = computed(() =>
	idx.value >= 0 && idx.value < SITE.cv.experience.length - 1
		? SITE.cv.experience[idx.value + 1]
		: null,
);

const siteLabel = computed(() => role.value?.href?.replace(/^https?:\/\//, "") ?? "");

watchEffect(() => {
	if (typeof document === "undefined") return;
	if (role.value) document.title = `${role.value.co} · duffle.one`;
});
</script>

<template>
	<PaperSheet>
		<div class="px-5 py-6 sm:px-8 md:px-14 md:py-12">
			<PageMasthead active="cv"/>

			<template v-if="role">
				<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b-2 border-ink pb-4 pt-8">
					<h2 class="m-0 font-display font-light text-[clamp(40px,6vw,64px)] leading-none">{{ role.co }}</h2>
					<div class="text-right text-[12px] tracking-[0.14em] uppercase text-ink-faint leading-[1.9] tnum">
						{{ role.role }}<br>
						{{ role.years }} · {{ role.loc }}<br>
						<a
							v-if="role.href"
							:href="role.href"
							target="_blank"
							rel="noopener"
						>{{ siteLabel }}</a>
					</div>
				</div>

				<div v-if="role.tech?.length" class="grid md:grid-cols-[200px_1fr] gap-3 md:gap-[30px] py-7 border-b border-rule">
					<div class="meta-caps text-accent-ink">Stack</div>
					<div class="text-[14px] italic leading-[1.9] text-ink-mute">{{ role.tech.join(" · ") }}</div>
				</div>

				<div class="grid md:grid-cols-[200px_1fr] gap-3 md:gap-[30px] py-7">
					<div class="meta-caps text-accent-ink">What I did</div>
					<div class="flex flex-col gap-[9px]">
						<p
							v-for="(b, i) in role.bullets"
							:key="i"
							class="m-0 text-[15px] leading-[1.7] text-ink-soft"
						>{{ b }}</p>
					</div>
				</div>

				<nav class="flex flex-wrap justify-between gap-4 border-t border-rule pt-4 meta-caps">
					<RouterLink v-if="prev" :to="`/cv/${prev.slug}`">← {{ prev.co }}</RouterLink>
					<span v-else></span>
					<RouterLink v-if="next" :to="`/cv/${next.slug}`">{{ next.co }} →</RouterLink>
				</nav>
			</template>

			<template v-else>
				<div class="flex flex-col items-center pt-14 pb-10 text-center">
					<h2 class="m-0 font-display font-light text-[clamp(40px,6vw,64px)] leading-none">Not found</h2>
					<p class="mt-4 font-display font-light italic text-[clamp(18px,2.4vw,25px)] text-ink-soft">No entry under "{{ slug }}".</p>
					<RouterLink to="/cv" class="mt-6 text-[15.5px]">Back to the CV →</RouterLink>
				</div>
			</template>
		</div>
	</PaperSheet>
</template>
