<script setup lang="ts">
/*
  /photo — the plates. Each frame sits matted with its caption and
  date, EXIF condensed to one italic line. Closes with the Glass link.
*/
import { SITE } from "../site/data";
import PaperSheet from "../components/paper/PaperSheet.vue";
import PageMasthead from "../components/paper/PageMasthead.vue";
import PageTitle from "../components/paper/PageTitle.vue";
import PlateFigure from "../components/paper/PlateFigure.vue";

// "2026-02-07" → "07.02.2026", matching the site's dotted datelines.
function fmtDate(iso: string): string {
	return iso.split("-").reverse().join(".");
}

const glass = SITE.socials.find((s) => s.id === "glass");
</script>

<template>
	<PaperSheet>
		<div class="px-5 py-6 sm:px-8 md:px-14 md:py-12">
			<PageMasthead active="photo"/>

			<div class="pt-8">
				<PageTitle title="Photographs" subtitle="Real frames from the camera roll."/>

				<div class="grid sm:grid-cols-2 gap-x-8 gap-y-9 py-8">
					<PlateFigure
						v-for="p in SITE.photography"
						:key="p.id"
						:src="p.src"
						:alt="p.title"
						:caption="p.title"
						:meta="fmtDate(p.taken)"
					>
						<template #extra>
							<div class="text-[13px] italic text-ink-mute">
								{{ p.camera }} · {{ p.focal }} · {{ p.aperture }} · {{ p.shutter }} · ISO {{ p.iso }}
							</div>
						</template>
					</PlateFigure>
				</div>

				<footer class="flex flex-wrap justify-between gap-2 pt-4 border-t border-rule meta-caps text-ink-faint">
					<span>{{ SITE.photography.length }} plates</span>
					<a v-if="glass" :href="glass.href">More on Glass →</a>
				</footer>
			</div>
		</div>
	</PaperSheet>
</template>
