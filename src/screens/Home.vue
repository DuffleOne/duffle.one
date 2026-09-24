<script setup lang="ts">
/*
  The landing: the wordmark and its yellow dot, one line about me, then
  the links, high up because sending people on is the page's main job.
  Below them the rotating quote, what I've made and where I've worked.
  From 1440px the wordmark, about and links take the left column.
*/
import { SITE } from "../site/data";
import DotPage from "../components/dot/DotPage.vue";
import DotHeading from "../components/dot/DotHeading.vue";
import DotQuote from "../components/dot/DotQuote.vue";
import DotSection from "../components/dot/DotSection.vue";
import DotRow from "../components/dot/DotRow.vue";

const links = [
	...SITE.socials.map((s) => ({ label: s.label.toLowerCase(), handle: s.handle, href: s.href, external: true })),
	{ label: "email", handle: SITE.email, href: `mailto:${SITE.email}`, external: false },
];
</script>

<template>
	<DotPage class="landing">
		<template #intro>
			<DotHeading title="Duffle" wordmark>{{ SITE.about }}</DotHeading>

			<ul class="links">
				<li v-for="l in links" :key="l.label">
					<a
						:href="l.href"
						:target="l.external ? '_blank' : undefined"
						:rel="l.external ? 'me noopener' : undefined"
						class="link"
					>
						<span class="link-name">{{ l.label }}</span>
						<span class="link-handle">{{ l.handle }}</span>
					</a>
				</li>
			</ul>
		</template>

		<DotQuote :quotes="SITE.quotePool"/>

		<DotSection label="made" class="made">
			<ul class="made-list">
				<li v-for="p in SITE.projects" :key="p.id">
					<DotRow :name="p.name" :meta="p.blurb" :href="p.href"/>
				</li>
			</ul>
		</DotSection>

		<DotSection label="work">
			<p class="work">{{ SITE.work }}</p>
		</DotSection>
	</DotPage>
</template>

<style scoped>
/* The quote's cap height roughly meets the wordmark's in two columns. */
.landing {
	--content-offset: 28px;
}

.links {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 20px 16px;
	margin-top: 40px;
}
.link {
	display: flex;
	flex-direction: column;
	gap: 2px;
}
.link-name {
	font-weight: 500;
}
.link:hover .link-name {
	text-decoration-line: underline;
	text-decoration-thickness: 1px;
	text-underline-offset: 2px;
}
.link-handle {
	font-size: 14px;
	color: var(--muted);
}

.made {
	margin-top: var(--gap-block);
}
.made-list {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.work {
	line-height: 23px;
}

@media (min-width: 720px) {
	.links {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		margin-top: 56px;
	}
	.made-list {
		gap: 12px;
	}
	.work {
		line-height: 1.2;
	}
}

@media (min-width: 1440px) {
	.links {
		margin-top: 72px;
	}
}
</style>
