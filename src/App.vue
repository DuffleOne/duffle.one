<script setup lang="ts">
/*
  Root component. The screens own their whole layout (each renders a
  paper sheet on the ground), so this stays a bare router outlet.
*/
</script>

<template>
	<RouterView v-slot="{ Component }">
		<component :is="Component"/>
	</RouterView>
</template>
