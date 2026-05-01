<script setup lang="ts">
/*
  1px divider. `weight="hi"` uses the stronger inset border.
  `direction="vertical"` flips the axis.
*/
withDefaults(
	defineProps<{
		weight?: "default" | "hi";
		direction?: "horizontal" | "vertical";
		dashed?: boolean;
		dotted?: boolean;
	}>(),
	{ weight: "default", direction: "horizontal", dashed: false, dotted: false }
);
</script>

<template>
	<span
		class="block"
		:class="[
			direction === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
			dashed
				? (weight === 'hi' ? 'border-t border-dashed border-tty-border-hi' : 'border-t border-dashed border-tty-border')
				: dotted
					? (weight === 'hi' ? 'border-t border-dotted border-tty-border-hi' : 'border-t border-dotted border-tty-border')
					: (weight === 'hi' ? 'bg-tty-border-hi' : 'bg-tty-border'),
		]"
		aria-hidden="true"
	/>
</template>
