<script setup lang="ts">
/*
  Row partner for DataTable. Same `columns` template; default slot for
  the cells. `interactive` adds the row-hover preview treatment.
*/
withDefaults(
	defineProps<{ columns: string; interactive?: boolean; padding?: string }>(),
	{ interactive: false, padding: "16px 0" }
);
</script>

<template>
	<div
		class="grid gap-[14px] items-center border-b border-dashed border-tty-border row-hover"
		:class="interactive ? 'cursor-pointer hover:bg-tty-bg2' : ''"
		:style="{ gridTemplateColumns: columns, padding }"
	>
		<slot/>
	</div>
</template>
