<script setup lang="ts">
/*
  /guide: a user guide to me. The about story, then one labelled
  section per topic, then the values, two up from 720px.
*/
import { SITE } from "../site/data";
import DotPage from "../components/dot/DotPage.vue";
import DotHeading from "../components/dot/DotHeading.vue";
import DotSection from "../components/dot/DotSection.vue";

const sections = [{ h: "About", body: SITE.guide.about }, ...SITE.guide.sections];
</script>

<template>
	<DotPage>
		<template #intro>
			<DotHeading title="user guide">{{ SITE.guide.intro }}</DotHeading>
		</template>

		<DotSection v-for="s in sections" :key="s.h" :label="s.h">
			<div class="prose">
				<p v-for="(p, i) in s.body" :key="i">{{ p }}</p>
			</div>
		</DotSection>

		<DotSection label="values">
			<dl class="values">
				<div v-for="v in SITE.guide.values" :key="v.h">
					<dt class="value-name">{{ v.h }}</dt>
					<dd class="value-text">{{ v.b }}</dd>
				</div>
			</dl>
		</DotSection>
	</DotPage>
</template>

<style scoped>
.prose {
	display: flex;
	flex-direction: column;
	gap: 16px;
	line-height: 1.6;
}

.values {
	display: grid;
	gap: 20px;
}
.value-name {
	font-weight: 500;
	text-transform: lowercase;
}
.value-text {
	margin-top: 4px;
	line-height: 1.5;
	color: var(--muted);
}

@media (min-width: 720px) {
	.values {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px;
	}
}
</style>
