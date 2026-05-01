<script setup lang="ts">
/*
  Manpage rule: 3-column flex with faint mono caps + bottom or top
  border. `position="top"` adds bottom-border + bottom padding;
  `position="bottom"` adds top-border + top padding.
*/
withDefaults(
	defineProps<{ left: string; mid: string; right: string; position?: "top" | "bottom" }>(),
	{ position: "top" }
);
</script>

<template>
	<div
		class="flex justify-between text-tty-faint text-[10.5px] tracking-[2px] gap-2"
		:class="position === 'top' ? 'pb-[6px] border-b border-tty-border' : 'pt-[12px] border-t border-tty-border'"
	>
		<span class="truncate">{{ left }}</span>
		<span class="hidden sm:inline truncate">{{ mid }}</span>
		<span class="truncate">{{ right }}</span>
	</div>
</template>
