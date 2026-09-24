<script setup lang="ts">
/*
  A page's name, big, with the yellow dot after it like a heavy full
  stop, and the lede under it in muted. `wordmark` is the landing's
  Duffle, a size up from every other page's title.

  The dot is its own element, not a full stop. Its bottom sits 26px up
  from the foot of the 112px line (18 of 68, 12 of 44), just clear of
  the baseline; it's raised from the baseline rather than set on the
  line box so a title that wraps keeps it after the last word.
*/
defineProps<{ title: string; wordmark?: boolean }>();
</script>

<template>
	<h1 class="title" :class="{ wordmark }">{{ title }}<span class="title-dot" aria-hidden="true"></span></h1>
	<p v-if="$slots.default" class="lede"><slot/></p>
</template>

<style scoped>
.title {
	font-size: 44px;
	font-weight: 500;
	line-height: 1;
	letter-spacing: -0.8px;
	text-wrap: balance;
}
.title-dot {
	display: inline-block;
	width: 10px;
	height: 10px;
	margin-left: 3px;
	border-radius: 50%;
	background: var(--yellow);
	vertical-align: 5px;
}

.wordmark {
	font-size: 68px;
	letter-spacing: -1.2px;
}
.wordmark .title-dot {
	width: 15px;
	height: 15px;
	margin-left: 4px;
	vertical-align: 8px;
}

.lede {
	margin-top: 16px;
	font-size: 17px;
	line-height: 25px;
	color: var(--muted);
	text-transform: lowercase;
}
.lede :slotted(a) {
	color: var(--ink);
}
.lede :slotted(a:hover) {
	text-decoration-line: underline;
	text-decoration-thickness: 1px;
	text-underline-offset: 2px;
}

@media (min-width: 720px) {
	.title {
		font-size: 68px;
		letter-spacing: -1.2px;
	}
	.title-dot {
		width: 15px;
		height: 15px;
		margin-left: 4px;
		vertical-align: 8px;
	}
	.wordmark {
		font-size: 112px;
		letter-spacing: -2px;
	}
	.wordmark .title-dot {
		width: 24px;
		height: 24px;
		margin-left: 6px;
		vertical-align: 9px;
	}
	.lede {
		margin-top: 20px;
		font-size: 20px;
		line-height: 1.2;
	}
}
</style>
