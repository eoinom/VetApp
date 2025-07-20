<script setup lang="ts">
import SignupForm from '@/components/SignupForm.vue';

definePageMeta({
	title: 'Sign Up',
	meta: [{ name: 'description', content: 'Create your account to access our product.' }],
});
</script>

<template>
	<SignupForm />
</template>
