import { reactive, computed } from 'vue';

export const useForm = () => {
	const form = reactive({
		email: '',
		password: '',
		confirmPassword: '',
		receiveUpdates: false,
	});

	const errors = reactive({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const validate = () => {
		errors.email = '';
		errors.password = '';
		errors.confirmPassword = '';

		if (!form.email) {
			errors.email = 'Email is required';
		} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!form.password) {
			errors.password = 'Password is required';
		} else if (
			form.password.length < 8 ||
			!/[A-Z]/.test(form.password) ||
			!/[a-z]/.test(form.password) ||
			!/[0-9]/.test(form.password) ||
			!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)
		) {
			errors.password =
				'Please enter a password at least 8 characters long which contains an upper and lower case letter, a number and a symbol.';
		}

		if (!form.confirmPassword) {
			errors.confirmPassword = 'Please confirm your password';
		} else if (form.password !== form.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return !errors.email && !errors.password && !errors.confirmPassword;
	};

	const isValid = computed(() => {
		return !errors.email && !errors.password;
	});

	const reset = () => {
		form.email = '';
		form.password = '';
		form.confirmPassword = '';
		form.receiveUpdates = false;
		errors.email = '';
		errors.password = '';
		errors.confirmPassword = '';
	};

	return {
		form,
		errors,
		validate,
		reset,
		isValid,
	};
};
