import { ref, computed } from 'vue';

export const usePasswordToggle = () => {
	const visible = ref(false);

	const toggle = () => {
		visible.value = !visible.value;
	};

	const inputType = computed(() => (visible.value ? 'text' : 'password'));
	const toggleLabel = computed(() => (visible.value ? 'Hide password' : 'Show password'));

	return {
		visible,
		toggle,
		inputType,
		toggleLabel,
	};
};
