<script setup lang="ts">
/*
  404, the catch-all.
*/
import DotPage from "../components/dot/DotPage.vue";
import DotHeading from "../components/dot/DotHeading.vue";
</script>

<template>
	<DotPage>
		<template #intro>
			<DotHeading title="404">nothing lives here. <RouterLink to="/">go home</RouterLink></DotHeading>
		</template>
	</DotPage>
</template>
