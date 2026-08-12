<script setup lang="ts">
/*
  The broadsheet page: full-bleed paper with the content column
  centred at 1180px. Inner padding belongs to each screen since the
  landing and subpages differ.
*/
</script>

<template>
	<div class="min-h-screen bg-paper text-ink">
		<main class="mx-auto max-w-[1180px]">
			<slot/>
		</main>
	</div>
</template>
