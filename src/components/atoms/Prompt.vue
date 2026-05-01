<script setup lang="ts">
/*
  Shell prompt line: host : ~/route $ command

  The "$" can glow (used on home + 404). Command is rendered in fg; the
  caller can pass nothing and append a <Caret/> after for an empty prompt.
*/
import type { Accent } from "../../types/accent";
import { accentGlow } from "../../types/accent";

const props = withDefaults(
	defineProps<{
		host?: string;
		route?: string;
		cmd?: string;
		glow?: boolean;
		dollarAccent?: Accent;
	}>(),
	{
		host: "laura@duffle",
		route: "home",
		cmd: "",
		glow: false,
		dollarAccent: "green",
	}
);
</script>

<template>
	<span class="inline-flex items-baseline gap-[6px] flex-wrap font-mono">
		<span class="text-tty-dim">{{ props.host }}</span>
		<span class="text-tty-faint">:</span>
		<span class="text-tty-cyan">~/{{ props.route }}</span>
		<span
			:class="['text-tty-' + props.dollarAccent, props.glow && accentGlow(props.dollarAccent)]"
		>$</span>
		<span v-if="props.cmd" class="text-tty-fg">{{ props.cmd }}</span>
		<slot/>
	</span>
</template>
