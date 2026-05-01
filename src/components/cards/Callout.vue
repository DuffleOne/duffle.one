<script setup lang="ts">
/*
  Left-bordered card on bg2. Used for the home quote, house rules,
  CV summary, alternative-routes block on the easter egg.

  Border thickness defaults to 2px; set 3 for the heavier emphasis the
  easter-egg uses.
*/
import type { Accent } from "../../types/accent";
import { accentBorder } from "../../types/accent";

withDefaults(
	defineProps<{ accent?: Accent; weight?: 2 | 3; padding?: string }>(),
	{ accent: "amber", weight: 2, padding: "14px 18px" }
);
</script>

<template>
	<div
		class="bg-tty-bg2"
		:class="[
			accentBorder(accent),
			weight === 3 ? 'border-l-[3px]' : 'border-l-2',
		]"
		:style="{ padding }"
	>
		<slot/>
	</div>
</template>
