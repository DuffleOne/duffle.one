<script setup lang="ts">
/*
  /cv: what I'm most proud of, then the jobs, newest first, each with
  its years, the role and the first thing I did there. The rest of a
  role is a click away on /cv/:slug. Volunteering sits apart from the
  jobs, and the skills close it out.
*/
import { SITE } from "../site/data";
import DotPage from "../components/dot/DotPage.vue";
import DotHeading from "../components/dot/DotHeading.vue";
import DotSection from "../components/dot/DotSection.vue";
import DotRow from "../components/dot/DotRow.vue";

const groups = [
	{ label: "work", roles: SITE.cv.experience.filter((e) => !e.volunteer) },
	{ label: "volunteering", roles: SITE.cv.experience.filter((e) => e.volunteer) },
];
</script>

<template>
	<DotPage>
		<template #intro>
			<DotHeading title="cv">{{ SITE.cv.lede }} <a :href="`mailto:${SITE.cv.email}`">{{ SITE.cv.email }}</a></DotHeading>
		</template>

		<DotSection label="most proud of">
			<p class="proud">{{ SITE.cv.proudOf }}</p>
		</DotSection>

		<DotSection v-for="g in groups" :key="g.label" :label="g.label">
			<ul class="roles">
				<li v-for="e in g.roles" :key="e.slug">
					<DotRow :name="e.co" :meta="e.years" :to="`/cv/${e.slug}`" inline>
						<p class="role">{{ e.role }} · {{ e.loc }}</p>
						<p class="standfirst">{{ e.bullets[0] }}</p>
					</DotRow>
				</li>
			</ul>
		</DotSection>

		<DotSection label="skills">
			<p class="skills">{{ SITE.cv.skills.join(", ") }}</p>
		</DotSection>
	</DotPage>
</template>

<style scoped>
.proud {
	font-size: 17px;
	line-height: 25px;
}

.roles {
	display: flex;
	flex-direction: column;
	gap: 28px;
}
.role {
	margin-top: 2px;
	font-size: 14px;
	color: var(--muted);
	text-transform: lowercase;
}
.standfirst {
	margin-top: 8px;
	line-height: 1.5;
	color: var(--muted);
}

.skills {
	line-height: 1.5;
}

@media (min-width: 720px) {
	.proud {
		font-size: 20px;
		line-height: 1.45;
	}
}
</style>
