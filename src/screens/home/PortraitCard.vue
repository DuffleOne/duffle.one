<script setup lang="ts">
/*
  Home portrait: striped placeholder (or a real photo at /img/laura.jpg)
  framed with green corner crop-marks, plus the STATUS / CITY / WX
  meta table beneath. Weather pulls from Open-Meteo.
*/
import { ref } from "vue";
import CornerFrame from "../../components/cards/CornerFrame.vue";
import StripedPlaceholder from "../../components/placeholders/StripedPlaceholder.vue";
import DottedRow from "../../components/data/DottedRow.vue";
import { useWeather } from "../../composables/useWeather";

const portraitFailed = ref(false);
const { label: weatherLabel } = useWeather();
</script>

<template>
	<div class="flex flex-col items-center md:items-stretch md:block">
		<CornerFrame accent="green" :size="10" :weight="1.5">
			<div
				class="w-[160px] h-[200px] border border-tty-border-hi bg-tty-bg2 relative overflow-hidden"
				style="background-image: repeating-linear-gradient(135deg, var(--color-tty-bg3) 0 6px, var(--color-tty-bg2) 6px 12px);"
			>
				<img
					v-if="!portraitFailed"
					src="/img/laura.jpg"
					alt="Laura Miller"
					class="absolute inset-0 w-full h-full object-cover"
					style="object-position: center 28%"
					@error="portraitFailed = true"
				/>
				<template v-else>
					<StripedPlaceholder :seed="0" :angle="135" ratio="160 / 200"/>
					<div class="absolute inset-0 flex items-center justify-center text-tty-faint text-[10.5px] tracking-[1px] text-center pointer-events-none">
						[ portrait.jpg ]<br/>
						<span class="text-[9px]">1024×1280</span>
					</div>
				</template>
				<div class="absolute left-[6px] top-[6px] text-[9px] text-tty-green tracking-[1px] tty-glow-g">◉ FRAME 01</div>
			</div>
		</CornerFrame>

		<div class="mt-3 w-full md:w-auto text-[10.5px] text-tty-dim leading-[2] max-w-[280px] md:max-w-none">
			<DottedRow label="STATUS"><span class="text-tty-green">● online</span></DottedRow>
			<DottedRow label="CITY"><span>London, UK</span></DottedRow>
			<DottedRow label="WX" :last="true"><span>{{ weatherLabel }}</span></DottedRow>
		</div>
	</div>
</template>
