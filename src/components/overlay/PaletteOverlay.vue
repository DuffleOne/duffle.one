<script setup lang="ts">
/*
  Backdrop + centered modal. Sits on top of the chrome at fixed position
  so it can darken everything (including the title/status bars).

  Click outside the modal closes it.
*/
import { usePalette } from "../../composables/usePalette";
import PaletteModal from "./PaletteModal.vue";

const palette = usePalette();
</script>

<template>
	<Transition name="palette">
		<div
			v-if="palette.isOpen.value"
			class="fixed inset-0 z-50 flex justify-center pt-[8vh] md:pt-[15vh] px-3 md:px-0"
			style="background: rgba(10,12,16,0.6); backdrop-filter: blur(2px);"
			@click.self="palette.close()"
		>
			<PaletteModal/>
		</div>
	</Transition>
</template>

<style scoped>
.palette-enter-active,
.palette-leave-active {
	transition: opacity 100ms ease-out;
}
.palette-enter-from,
.palette-leave-to {
	opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
	.palette-enter-active,
	.palette-leave-active {
		transition: none;
	}
}
</style>
