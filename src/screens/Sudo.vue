<script setup lang="ts">
/*
  Sudo / 404 easter egg. Mounted directly via the catch-all route
  (any unknown URL lands here) and from the in-app "egg #3" shortcut.
*/
import TtyChrome from "../components/layout/TtyChrome.vue";
import ContentPane from "../components/layout/ContentPane.vue";
import Prompt from "../components/atoms/Prompt.vue";
import Caret from "../components/atoms/Caret.vue";
import Callout from "../components/cards/Callout.vue";
import Kbd from "../components/atoms/Kbd.vue";
import Tag from "../components/atoms/Tag.vue";

const ascii = ` ┌─────────────────────────┐
 │   ERR · NOT THAT EASY   │
 └────────────┬────────────┘
              │
       ╔══════▼══════╗
       ║   404·ish   ║
       ╚═════════════╝`;
</script>

<template>
	<TtyChrome
		title="laura@duffle: ~ · sudo: an error has occurred"
		status-path="sudo"
		active-id="sudo"
		accent="pink"
	>
		<ContentPane :padding-x="28" :padding-y="26" :gap="14">
			<Prompt cmd="sudo hire laura" route="sudo"/>

			<div class="text-tty-pink text-[12px] tty-glow-p">
				[sudo] password for guest: <span class="text-tty-fg">•••••••••</span>
			</div>
			<div class="text-tty-amber text-[12px] tty-glow-a">Sorry, try again.</div>
			<div class="text-tty-amber text-[12px] tty-glow-a">Sorry, try again.</div>
			<div class="text-tty-pink text-[12px] tty-glow-p">
				sudo: 3 incorrect password attempts
			</div>

			<pre
				class="text-tty-pink m-0 my-3 tty-glow-p whitespace-pre overflow-x-auto"
				style="font-size: 11px; line-height: 1.18;"
			>{{ ascii }}</pre>

			<Callout accent="amber" :weight="3" padding="14px 16px">
				<div class="text-tty-amber text-[11px] tracking-[2px] mb-1">── ALTERNATIVE ROUTES</div>
				<div class="text-tty-fg text-[12.5px] leading-[1.7]">
					<div>
						<span class="text-tty-green">1.</span>
						draft a real email at
						<a class="text-tty-cyan hover:underline" href="mailto:laura@duffle.one">laura@duffle.one</a>
					</div>
					<div>
						<span class="text-tty-green">2.</span>
						dm me on instagram, but be cute about it
					</div>
					<div>
						<span class="text-tty-green">3.</span>
						press <Kbd>?</Kbd> for the user guide first
					</div>
				</div>
			</Callout>

			<div class="mt-auto flex gap-[14px] items-center">
				<Tag accent="pink" :filled="true">EASTER EGG · 03</Tag>
				<span class="text-tty-faint text-[11px]">9 more hidden in the shell. good luck.</span>
			</div>

			<div class="flex items-baseline">
				<Prompt route="sudo" :glow="true"/>
				<Caret/>
			</div>
		</ContentPane>
	</TtyChrome>
</template>
