<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@nordhealth/components/lib/Button';
import '@nordhealth/components/lib/Icon';
import '@nordhealth/components/lib/Stack';

useHead({
	title: 'Success',
});

const email = ref<string | null>(null);
const receiveUpdates = ref(false);

onMounted(() => {
	// Simulate retrieving signup data from localStorage
	email.value = localStorage.getItem('signup-email');
	receiveUpdates.value = localStorage.getItem('signup-updates') === 'true';

	if (!email.value) {
		// redirect to signup if no email is found
		window.location.href = '/';
	}
});
</script>

<template>
	<nord-stack class="success-content n-align-center n-justify-center n-padding-xl">
		<nord-stack class="n-stack-horizontal n-justify-center">
			<nord-icon name="interface-checked-circle" size="xl" class="n-color-text-success" />
			<h1 class="n-align-center">You're signed up!</h1>
		</nord-stack>

		<p class="n-align-center">
			Thanks for signing up with your email,
			<strong class="n-font-weight-strong">{{ email }}</strong
			>.
		</p>

		<p v-if="receiveUpdates" class="n-align-center">
			You'll soon start receiving occasional updates and product news.
		</p>

		<NuxtLink to="/">
			<nord-button variant="default">Back to sign-up</nord-button>
		</NuxtLink>
	</nord-stack>
</template>

<style lang="scss" scoped>
.success-content {
	min-height: calc(100vh - 52px); // 52px is the header's height
}
</style>
