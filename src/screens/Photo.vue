<script setup lang="ts">
/*
  Photo route: section header + exiftool prompt + 3-col contact sheet
  + EXIF side panel + footer hints. Click a cell or press ←/→ to cycle.
*/
import { onBeforeUnmount, onMounted, ref } from "vue";
import { SITE } from "../site/data";
import { findRouteById } from "../site/routes";
import TtyChrome from "../components/layout/TtyChrome.vue";
import ContentPane from "../components/layout/ContentPane.vue";
import SectionHeader from "../components/headers/SectionHeader.vue";
import Prompt from "../components/atoms/Prompt.vue";
import Kbd from "../components/atoms/Kbd.vue";
import PhotoCell from "./photo/PhotoCell.vue";
import ExifPanel from "./photo/ExifPanel.vue";

const route = findRouteById("photo")!;
const selected = ref(1); // matches the design's "▸ SEL" on the second cell

function onKey(e: KeyboardEvent) {
	const editable = e.target instanceof HTMLElement
		&& (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable);
	if (editable) return;

	if (e.key === "ArrowRight") {
		e.preventDefault();
		selected.value = (selected.value + 1) % SITE.photography.length;
	} else if (e.key === "ArrowLeft") {
		e.preventDefault();
		selected.value = (selected.value - 1 + SITE.photography.length) % SITE.photography.length;
	}
}

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
	<TtyChrome
		:title="route.titleBarText"
		status-path="photo"
		active-id="photo"
		:accent="route.accent"
	>
		<ContentPane :padding-x="26" :padding-y="22" :gap="12">
			<SectionHeader n="03" accent="pink">
				./photo<span class="text-tty-pink">.roll</span>
			</SectionHeader>

			<div class="text-tty-dim text-[11.5px]">
				<Prompt cmd="exiftool ./*.{raw,jpg} | head -40" route="photo"/>
			</div>

			<div class="photo-layout gap-[14px] flex-1 min-h-0">
				<div class="contact-sheet gap-[10px]">
					<PhotoCell
						v-for="(p, i) in SITE.photography"
						:key="p.id"
						:photo="p"
						:index="i"
						:selected="i === selected"
						@select="selected = i"
					/>
				</div>
				<ExifPanel :photo="SITE.photography[selected]" :index="selected"/>
			</div>

			<div class="text-tty-faint text-[11px]">
				←/→ navigate ·
				<Kbd>f</Kbd> fullscreen ·
				<Kbd>i</Kbd> exif ·
				<Kbd>r</Kbd> roll-mode
			</div>
		</ContentPane>
	</TtyChrome>
</template>

<style scoped>
.photo-layout {
	display: flex;
	flex-direction: column;
}
@media (min-width: 768px) {
	.photo-layout {
		display: grid;
		grid-template-columns: 1fr 240px;
	}
}

.contact-sheet {
	display: grid;
	grid-template-columns: 1fr;
}
@media (min-width: 480px) {
	.contact-sheet {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}
@media (min-width: 768px) {
	.contact-sheet {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
}
</style>
