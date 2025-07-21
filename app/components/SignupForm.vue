<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { SITE_TITLE } from '~/constants';
import '@nordhealth/components/lib/Button';
import '@nordhealth/components/lib/Card';
import '@nordhealth/components/lib/Checkbox';
import '@nordhealth/components/lib/Icon';
import '@nordhealth/components/lib/Input';
import '@nordhealth/components/lib/Spinner';
import '@nordhealth/components/lib/Stack';
import { useForm } from '@/composables/useForm';
import { usePasswordToggle } from '@/composables/usePasswordToggle';

const router = useRouter();
const { form, errors, validate, reset } = useForm();
const {
	inputType: passwordInputType,
	toggle: toggleShowPassword,
	toggleLabel,
} = usePasswordToggle();
const isSubmitting = ref(false);

const handleSubmit = async () => {
	if (!validate()) return;

	isSubmitting.value = true;

	// Simulate async process (e.g., API call)
	await new Promise((resolve) => setTimeout(resolve, 1000));

	reset();
	isSubmitting.value = false;
	router.push('/success');
};
</script>

<template>
	<nord-stack class="stack">
		<nord-card padding="l">
			<template #header>
				<h1>Sign in to Nord</h1>
			</template>
			<form novalidate @submit.prevent="handleSubmit">
				<nord-stack gap="m" direction="vertical" align-items="stretch">
					<nord-input
						:value="form.email"
						type="email"
						name="email"
						autocomplete="email"
						label="Email address"
						placeholder="you@example.com"
						size="m"
						expand
						required
						hide-required
						:error="errors.email"
						@input="form.email = ($event.target as HTMLInputElement).value"
					/>

					<nord-input
						:value="form.password"
						:type="passwordInputType"
						name="new-password"
						autocomplete="new-password"
						label="Password"
						placeholder="••••••••"
						size="m"
						expand
						required
						hide-required
						:error="errors.password"
						@input="form.password = ($event.target as HTMLInputElement).value"
					>
						<nord-button
							slot="end"
							square
							size="s"
							:title="toggleLabel"
							class="password-toggle"
							@click="toggleShowPassword"
						>
							<nord-icon
								:name="
									passwordInputType === 'password' ? 'interface-edit-off' : 'interface-edit-on'
								"
								size="s"
							/>
						</nord-button>
					</nord-input>

					<nord-input
						:value="form.confirmPassword"
						:type="passwordInputType"
						name="confirm-password"
						label="Confirm password"
						placeholder="••••••••"
						size="m"
						expand
						required
						hide-required
						:error="errors.confirmPassword"
						@input="form.confirmPassword = ($event.target as HTMLInputElement).value"
					>
						<nord-button
							slot="end"
							square
							size="s"
							:title="toggleLabel"
							class="password-toggle"
							@click="toggleShowPassword"
						>
							<nord-icon
								:name="
									passwordInputType === 'password' ? 'interface-edit-off' : 'interface-edit-on'
								"
								size="s"
							/>
						</nord-button>
					</nord-input>

					<nord-checkbox
						:checked="form.receiveUpdates"
						type="checkbox"
						label="I'd like to receive occasional product updates and announcements."
						class="mt-4"
						:disabled="isSubmitting"
						@change="form.receiveUpdates = ($event.target as HTMLInputElement).checked"
					/>

					<nord-button
						type="submit"
						variant="primary"
						:loading="isSubmitting"
						size="m"
						expand
						:disabled="isSubmitting"
					>
						Sign up
					</nord-button>
				</nord-stack>
			</form>
		</nord-card>
	</nord-stack>
</template>

<style lang="scss" scoped>
.stack {
	inline-size: 90%;
	max-inline-size: 340px;
	margin: var(--n-space-xl) auto;
}

:root .password-toggle {
	--n-button-background-color: transparent !important;
	--n-button-border-color: transparent !important;
}
</style>
