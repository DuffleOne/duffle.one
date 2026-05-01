<script setup lang="ts">
/*
  Generic table-like grid. Header row in faint caps + data rows with
  dashed bottom borders. Caller passes `columns` (CSS grid template)
  and `headers` (string[]); rows go in the default slot.

  Each row should be wrapped by the caller in a div with the same grid
  template so cells align — DataTableRow exists for that.
*/
defineProps<{ columns: string; headers: string[] }>();
</script>

<template>
	<div class="flex flex-col">
		<div
			class="hidden md:grid gap-[14px] py-[6px] text-[10px] tracking-[2px] text-tty-faint border-b border-tty-border"
			:style="{ gridTemplateColumns: columns }"
		>
			<span v-for="h in headers" :key="h">{{ h }}</span>
		</div>
		<slot/>
	</div>
</template>
