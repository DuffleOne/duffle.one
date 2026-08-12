<script setup lang="ts">
/*
  Root: theme bootstrap + router outlet. Everything else lives in the
  individual screens, so this stays thin.
*/
import { useTheme } from "./composables/useTheme";

useTheme();
</script>

<template>
	<RouterView v-slot="{ Component, route }">
		<component :is="Component" :key="route.fullPath"/>
	</RouterView>
</template>
