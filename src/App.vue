<script setup lang="ts">
/*
  Root component. Hosts the routed screen, the palette overlay, and
  registers global hotkeys. Mode + accent + statusPath flow from the
  current route's meta into the chrome via the screens themselves —
  App.vue stays thin.
*/
import { useRouter } from "vue-router";
import { useHotkeys } from "./composables/useHotkeys";
import { usePalette } from "./composables/usePalette";
import PaletteOverlay from "./components/overlay/PaletteOverlay.vue";

const router = useRouter();
const palette = usePalette();

useHotkeys(router, {
	openPalette: () => palette.open(),
	closePalette: () => palette.close(),
	isPaletteOpen: () => palette.isPaletteOpen(),
});
</script>

<template>
	<RouterView v-slot="{ Component }">
		<component :is="Component"/>
	</RouterView>
	<PaletteOverlay/>
</template>
