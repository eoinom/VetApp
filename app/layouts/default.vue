<script setup lang="ts">
import '@nordhealth/components/lib/TopBar';
</script>

<template>
	<nord-top-bar>
		<span>VetApp</span>
	</nord-top-bar>

	<main class="n-stack-horizontal">
		<Transition name="fade" mode="out-in" appear>
			<NuxtPage />
		</Transition>
	</main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
