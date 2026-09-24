<script setup lang="ts">
/*
  /cv/:slug: one role in full. The company's the title, with the role,
  place, years and its site under it; then the stack, everything I did
  there, and the roles either side of it.
*/
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { SITE } from "../site/data";
import DotPage from "../components/dot/DotPage.vue";
import DotHeading from "../components/dot/DotHeading.vue";
import DotSection from "../components/dot/DotSection.vue";

const route = useRoute();

const slug = computed(() => String(route.params.slug ?? ""));
const role = computed(() => SITE.cv.experience.find((e) => e.slug === slug.value));

// The cv runs newest first, so the one before is newer.
const idx = computed(() => SITE.cv.experience.findIndex((e) => e.slug === slug.value));
const newer = computed(() => (idx.value > 0 ? SITE.cv.experience[idx.value - 1] : null));
const older = computed(() =>
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
	<DotPage>
		<template #intro>
			<DotHeading v-if="role" :title="role.co">
				{{ role.role }} · {{ role.loc }} · {{ role.years }}<template v-if="role.href"> · <a :href="role.href" target="_blank" rel="noopener">{{ siteLabel }}</a></template>
			</DotHeading>
			<DotHeading v-else title="not found">
				nothing on the cv called “{{ slug }}”. <RouterLink to="/cv">back to the cv</RouterLink>
			</DotHeading>
		</template>

		<template v-if="role">
			<DotSection v-if="role.tech?.length" label="stack">
				<p class="stack">{{ role.tech.join(", ") }}</p>
			</DotSection>

			<DotSection label="what I did">
				<ul class="did">
					<li v-for="(b, i) in role.bullets" :key="i">{{ b }}</li>
				</ul>
			</DotSection>

			<nav v-if="newer || older" class="pager" aria-label="Other roles">
				<RouterLink v-if="newer" :to="`/cv/${newer.slug}`" class="pager-link">
					<span class="pager-label">newer</span>
					<span class="pager-name">{{ newer.co }}</span>
				</RouterLink>
				<RouterLink v-if="older" :to="`/cv/${older.slug}`" class="pager-link older">
					<span class="pager-label">older</span>
					<span class="pager-name">{{ older.co }}</span>
				</RouterLink>
			</nav>
		</template>
	</DotPage>
</template>

<style scoped>
.stack {
	line-height: 1.5;
}

.did {
	display: flex;
	flex-direction: column;
	gap: 12px;
	line-height: 1.6;
}

.pager {
	display: flex;
	justify-content: space-between;
	gap: 24px;
	margin-top: var(--gap-section);
}
.pager-link {
	display: flex;
	flex-direction: column;
	gap: 2px;
}
.pager-link.older {
	margin-left: auto;
	text-align: right;
}
.pager-label {
	font-size: 13px;
	letter-spacing: 0.2px;
	color: var(--muted);
}
.pager-name {
	font-weight: 500;
}
.pager-link:hover .pager-name {
	text-decoration-line: underline;
	text-decoration-thickness: 1px;
	text-underline-offset: 2px;
}
</style>
