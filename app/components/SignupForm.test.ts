import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

const routerMock = { push: vi.fn() };
vi.mock('vue-router', () => ({
	useRouter: () => routerMock,
}));

describe('SignupForm', () => {
	const NordInputStub = {
		name: 'nord-input',
		props: ['value', 'name', 'type', 'error'],
		emits: ['input'],
		template: `
	  <div>
		<input
		  :value="internalValue"
		  :type="typeof type === 'object' && type !== null && 'value' in type ? type.value : type"
		  :name="name"
		  @input="onInput"
		  data-testid="nord-input"
		/>
		<span v-if="error" class="error">{{ error }}</span>
		<slot></slot>
		<slot name='end'></slot>
	  </div>
	`,
		methods: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onInput(this: any, event: Event) {
				const target = event.target as HTMLInputElement;
				this.internalValue = target.value;
				this.$emit('input', event); // emit the real event
			},
		},
	};

	const stubs = {
		'nord-button': { template: '<button><slot /></button>' },
		'nord-card': { template: '<div><slot /></div>' },
		'nord-checkbox': {
			template: '<input type="checkbox" v-bind="$attrs" @change="$emit(\'change\', $event)" />',
			props: ['name'],
		},
		'nord-icon': { template: '<span></span>' },
		'nord-input': NordInputStub,
		'nord-spinner': { template: '<span></span>' },
		'nord-stack': { template: '<div><slot /></div>' },
	};

	it('renders form fields', async () => {
		const { default: SignupForm } = await import('./SignupForm.vue');
		const wrapper = mount(SignupForm, {
			global: {
				stubs,
				renderStubDefaultSlot: true,
			},
		});
		expect(wrapper.find('input[name="email"]').exists()).toBe(true);
		expect(wrapper.find('input[name="new-password"]').exists()).toBe(true);
		expect(wrapper.find('input[name="confirm-password"]').exists()).toBe(true);
		expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
	});

	it('validates and submits the form', async () => {
		vi.useFakeTimers();
		vi.resetModules();
		const { default: SignupForm } = await import('./SignupForm.vue');
		const localWrapper = mount(SignupForm, {
			global: {
				stubs,
				renderStubDefaultSlot: true,
			},
		});

		const emailInput = localWrapper.find('input[name="email"]');
		const passwordInput = localWrapper.find('input[name="new-password"]');
		const confirmInput = localWrapper.find('input[name="confirm-password"]');

		await emailInput.setValue('test@example.com');
		await passwordInput.setValue('Pa$$w0rd1!');
		await confirmInput.setValue('Pa$$w0rd1!');

		const localStorageSpy = vi.spyOn(Storage.prototype, 'setItem');

		await localWrapper.find('form').trigger('submit.prevent');
		vi.runAllTimers();
		await flushPromises();

		expect(localStorageSpy).toHaveBeenCalledWith('signup-email', 'test@example.com');
		expect(localStorageSpy).toHaveBeenCalledWith('signup-updates', 'false');
	});

	it('disables submit button while submitting', async () => {
		vi.resetModules();
		vi.doMock('@/composables/useForm', () => ({
			useForm: () => ({
				form: {
					email: '',
					password: '',
					confirmPassword: '',
					receiveUpdates: false,
				},
				errors: {},
				validate: () => true,
				reset: vi.fn(),
			}),
		}));
		const { default: SignupForm } = await import('./SignupForm.vue');
		const localWrapper = mount(SignupForm, {
			global: {
				stubs,
				renderStubDefaultSlot: true,
			},
		});

		const submitBtn = localWrapper.find('button[type="submit"]');
		expect(submitBtn.attributes('disabled')).toBeUndefined();

		await localWrapper.find('form').trigger('submit.prevent');
		await flushPromises();
		expect(submitBtn.attributes('disabled')).toBeDefined();
	});

	it('shows validation errors if fields are empty on submit', async () => {
		vi.resetModules();

		// Mock useForm to return errors and validate false for this test only
		vi.doMock('@/composables/useForm', () => ({
			useForm: () => ({
				form: {
					email: '',
					password: '',
					confirmPassword: '',
					receiveUpdates: false,
				},
				errors: {
					email: 'Email is required',
					password: 'Password is required',
					confirmPassword: '',
				},
				validate: () => false,
				reset: vi.fn(),
			}),
		}));

		const { default: SignupForm } = await import('./SignupForm.vue');
		const localWrapper = mount(SignupForm, {
			global: {
				stubs,
				renderStubDefaultSlot: true,
			},
		});

		await localWrapper.find('form').trigger('submit.prevent');
		await flushPromises();

		expect(localWrapper.text()).toContain('Email is required');
		expect(localWrapper.text()).toContain('Password is required');
	});

	it('toggles password visibility', async () => {
		const { default: SignupForm } = await import('./SignupForm.vue');
		const localWrapper = mount(SignupForm, {
			global: {
				stubs,
				renderStubDefaultSlot: true,
			},
		});

		// Find password and confirm password input fields
		const passwordInput = localWrapper.find('input[name="new-password"]');
		const confirmInput = localWrapper.find('input[name="confirm-password"]');
		expect(passwordInput.exists()).toBe(true);
		expect(confirmInput.exists()).toBe(true);

		// Both should be type="password" initially
		expect((passwordInput.element as HTMLInputElement).type).toBe('password');
		expect((confirmInput.element as HTMLInputElement).type).toBe('password');

		// Find toggle buttons
		const toggleBtns = localWrapper.findAll('.password-toggle');
		expect(toggleBtns.length).toBe(2);

		// Toggle password visibility btn to show both
		await toggleBtns[0]?.trigger('click');
		await localWrapper.vm.$nextTick();
		expect((passwordInput.element as HTMLInputElement).type).toBe('text');
		expect((confirmInput.element as HTMLInputElement).type).toBe('text');

		// Toggle confirm password btn to hide both
		await toggleBtns[1]?.trigger('click');
		await localWrapper.vm.$nextTick();
		expect((passwordInput.element as HTMLInputElement).type).toBe('password');
		expect((confirmInput.element as HTMLInputElement).type).toBe('password');
	});

	it('checks receiveUpdates checkbox', async () => {
		const { default: SignupForm } = await import('./SignupForm.vue');
		const wrapper = mount(SignupForm, {
			global: {
				stubs,
				renderStubDefaultSlot: true,
			},
		});
		const checkbox = wrapper.find('input[type="checkbox"][name="receive-updates"]');
		if (checkbox.exists()) {
			await checkbox.setValue(true);
			await wrapper.find('form').trigger('submit.prevent');
			await flushPromises();
			expect(localStorage.getItem('signup-updates')).toBe('true');
		}
	});

	it('calls router.push after successful submit', async () => {
		vi.useFakeTimers();
		const { default: SignupForm } = await import('./SignupForm.vue');
		const localWrapper = mount(SignupForm, {
			global: {
				stubs,
				renderStubDefaultSlot: true,
			},
		});

		const emailInput = localWrapper.find('input[name="email"]');
		const passwordInput = localWrapper.find('input[name="new-password"]');
		const confirmInput = localWrapper.find('input[name="confirm-password"]');

		await emailInput.setValue('route@example.com');
		await passwordInput.setValue('Pa$$w0rd1!');
		await confirmInput.setValue('Pa$$w0rd1!');

		await localWrapper.find('form').trigger('submit.prevent');
		vi.runAllTimers();
		await flushPromises();

		expect(routerMock.push).toHaveBeenCalled();
	});
});
