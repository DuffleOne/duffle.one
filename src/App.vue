<script setup lang="ts">
/*
  Root: theme bootstrap + router outlet. Everything else lives in the
  individual screens — App.vue stays thin so the home page can own its
  full-viewport layout without fighting a wrapper.
*/
import { useTheme } from "./composables/useTheme";

useTheme();
</script>

<template>
	<RouterView v-slot="{ Component, route }">
		<component :is="Component" :key="route.fullPath"/>
	</RouterView>
</template>
