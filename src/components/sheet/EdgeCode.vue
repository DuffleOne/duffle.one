<script setup lang="ts">
/*
  One code printed on the film edge: the label above, the handle below
  in accent. Routes internally when `to` is set, otherwise an external
  link carrying rel="me" so the socials verify back.
*/
defineProps<{
	label: string;
	text: string;
	href?: string;
	to?: string;
	external?: boolean;
}>();
</script>

<template>
	<div class="flex flex-col gap-2.5 border-t border-rule py-4">
		<span class="edge-caps text-ink-faint">{{ label }}</span>
		<RouterLink
			v-if="to"
			:to="to"
			class="font-display text-[clamp(17px,2vw,23px)] leading-none"
		>{{ text }}</RouterLink>
		<a
			v-else
			:href="href"
			:target="external ? '_blank' : undefined"
			:rel="external ? 'me noopener' : undefined"
			class="font-display text-[clamp(17px,2vw,23px)] leading-none"
		>{{ text }}</a>
	</div>
</template>
