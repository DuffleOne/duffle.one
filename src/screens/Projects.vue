<script setup lang="ts">
/*
  /projects — numbered entries in the catalogue style: big gilt
  numeral, Alcyone project name with a small-caps status, justified
  description, italic tech line.
*/
import { SITE } from "../site/data";
import PaperSheet from "../components/paper/PaperSheet.vue";
import PageMasthead from "../components/paper/PageMasthead.vue";
import PageTitle from "../components/paper/PageTitle.vue";

function status(tag: string, year: string): string {
	return `${tag.charAt(0).toUpperCase()}${tag.slice(1)} · ${year}`;
}
</script>

<template>
	<PaperSheet>
		<div class="px-5 py-6 sm:px-8 md:px-14 md:py-12">
			<PageMasthead active="projects"/>

			<div class="mx-auto max-w-[880px] pt-8">
				<PageTitle title="Projects"/>

				<div
					v-for="(p, i) in SITE.projects"
					:key="p.id"
					class="grid grid-cols-[40px_1fr] sm:grid-cols-[56px_1fr] gap-4 sm:gap-[26px] py-[30px] border-b border-rule last:border-b-0"
				>
					<div class="font-display font-light text-[38px] leading-none text-accent tnum pt-1">{{ String(i + 1).padStart(2, "0") }}</div>
					<div class="flex flex-col gap-2">
						<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
							<a :href="p.href" class="font-display font-medium text-[32px] leading-tight text-ink hover:text-accent-hover">{{ p.name }}</a>
							<span class="meta-caps text-ink-faint">{{ status(p.tag, p.year) }}</span>
						</div>
						<p class="m-0 text-[15.5px] leading-[1.75] prose-just text-ink-soft">{{ p.description ?? p.blurb }}</p>
						<div v-if="p.tech?.length" class="text-[13px] italic text-ink-mute">{{ p.tech.join(" · ") }}</div>
					</div>
				</div>
			</div>
		</div>
	</PaperSheet>
</template>
