<script setup lang="ts">
/*
  Inline keyboard pill. Used in the title bar (⌘K, ?, esc), photo
  shortcuts row, palette footer, etc.
*/
withDefaults(defineProps<{ size?: "sm" | "xs" }>(), { size: "sm" });
</script>

<template>
	<span
		class="inline-block border border-tty-border bg-tty-bg3 text-tty-dim font-mono"
		:class="size === 'xs'
			? 'text-[9.5px] px-[5px] py-[1px] tracking-[0.5px]'
			: 'text-[10.5px] px-[7px] py-[1px] tracking-[0.5px]'"
	>
		<slot/>
	</span>
</template>
