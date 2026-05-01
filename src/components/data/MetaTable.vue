<script setup lang="ts">
/*
  Stack of DottedRows from a {label, value, slot?} array. For the simple
  case; for the home portrait table we render rows directly with custom
  value styling.
*/
import DottedRow from "./DottedRow.vue";

type Row = { label: string; value: string };

defineProps<{ rows: Row[] }>();
</script>

<template>
	<div class="text-[10.5px] text-tty-dim leading-[2]">
		<DottedRow
			v-for="(r, i) in rows"
			:key="r.label"
			:label="r.label"
			:last="i === rows.length - 1"
		>
			{{ r.value }}
		</DottedRow>
	</div>
</template>
