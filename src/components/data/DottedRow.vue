<script setup lang="ts">
/*
  k/v row separated by a dotted bottom border. Used for the home meta
  table, the EXIF panel, the project stats card, etc.

  `last` drops the bottom border for the last row in a list.
*/
withDefaults(
	defineProps<{ label: string; last?: boolean }>(),
	{ last: false }
);
</script>

<template>
	<div
		class="flex justify-between gap-3"
		:class="{ 'border-b border-dotted border-tty-border': !last }"
	>
		<span class="text-tty-faint">{{ label }}</span>
		<span class="text-right">
			<slot/>
		</span>
	</div>
</template>
