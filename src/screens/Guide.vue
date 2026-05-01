<script setup lang="ts">
/*
  User guide route - manpage layout. Top + bottom rules + sections
  driven by SITE.guide. NAME / ABOUT / N freeform sections /
  VALUES / EXIT STATUS.
*/
import { SITE } from "../site/data";
import { findRouteById } from "../site/routes";
import type { Accent } from "../types/accent";
import TtyChrome from "../components/layout/TtyChrome.vue";
import ContentPane from "../components/layout/ContentPane.vue";
import ManPageRule from "../components/headers/ManPageRule.vue";
import ManSection from "../components/headers/ManSection.vue";
import ValueRow from "./guide/ValueRow.vue";

const route = findRouteById("guide")!;

const VALUE_ACCENTS: Accent[] = ["green", "amber", "pink", "cyan", "violet"];

// Split "laura - rest of name line" so the leading word can stay green.
const nameParts = (() => {
	const raw = SITE.guide.name;
	const sepIdx = raw.indexOf(" ");
	if (sepIdx === -1) return { head: raw, tail: "" };
	return { head: raw.slice(0, sepIdx), tail: raw.slice(sepIdx) };
})();
</script>

<template>
	<TtyChrome
		:title="route.titleBarText"
		status-path="guide"
		active-id="guide"
		:accent="route.accent"
	>
		<ContentPane :padding-x="26" :padding-y="22" :gap="12">
			<ManPageRule left="LAURA(1)" mid="USER COMMANDS" right="LAURA(1)" position="top"/>

			<ManSection heading="NAME">
				<div class="text-tty-fg">
					<span class="text-tty-green">{{ nameParts.head }}</span>{{ nameParts.tail }}
				</div>
			</ManSection>

			<ManSection heading="ABOUT">
				<div class="flex flex-col gap-[8px] text-tty-fg text-[12.5px]">
					<p v-for="(p, i) in SITE.guide.about" :key="i" class="m-0">{{ p }}</p>
				</div>
			</ManSection>

			<ManSection
				v-for="(s, i) in SITE.guide.sections"
				:key="i"
				:heading="`── ${s.h.toUpperCase()}`"
			>
				<div class="flex flex-col gap-[8px] text-tty-fg text-[12.5px]">
					<p v-for="(p, j) in s.body" :key="j" class="m-0">{{ p }}</p>
				</div>
			</ManSection>

			<ManSection heading="VALUES">
				<div class="flex flex-col gap-[10px]">
					<ValueRow
						v-for="(v, i) in SITE.guide.values"
						:key="i"
						:n="i + 1"
						:heading="v.h"
						:body="v.b"
						:accent="VALUE_ACCENTS[i % VALUE_ACCENTS.length]"
					/>
				</div>
			</ManSection>

			<ManSection heading="EXIT STATUS">
				<div class="text-tty-dim text-[12px]">
					<span class="text-tty-green">0</span> all good ·
					<span class="text-tty-amber">1</span> needs a walk ·
					<span class="text-tty-pink">2</span> needs feedback ·
					<span class="text-tty-violet">137</span> meeting ran over
				</div>
			</ManSection>

			<div class="mt-auto">
				<ManPageRule left="DUFFLE.ONE" mid="v26.4 · 2026-04" right="LAURA(1)" position="bottom"/>
			</div>
		</ContentPane>
	</TtyChrome>
</template>
