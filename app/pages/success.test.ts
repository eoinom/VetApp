import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import Success from './success.vue';

// Mock global objects
const getItemMock = vi.fn();
const setLocationMock = vi.fn();

// @ts-expect-error: Nuxt auto-imports useHead, but we must define it in tests for mocking
globalThis.useHead = vi.fn();

const stubs = {
	'nord-stack': { template: '<slot />' },
	'nord-icon': { template: '<span />' },
	'nord-button': { template: '<button><slot /></button>' },
	NuxtLink: { template: '<a><slot /></a>' },
};

describe('Success.vue', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		// Mock the href property for redirection
		Object.defineProperty(window.location, 'href', {
			configurable: true,
			enumerable: true,
			get() {
				return '';
			},
			set(val: string) {
				setLocationMock(val);
			},
		});

		// Mock localStorage.getItem
		Object.defineProperty(window.localStorage, 'getItem', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: getItemMock,
		});
	});

	it('renders email and update message when data is present', async () => {
		getItemMock.mockImplementation((key: string) => {
			if (key === 'signup-email') return 'test@example.com';
			if (key === 'signup-updates') return 'true';
			return null;
		});

		const wrapper = mount(Success, {
			attachTo: document.body,
			global: {
				stubs,
			},
		});

		await flushPromises();

		expect(wrapper.text()).toContain("You're signed up!");
		expect(wrapper.text()).toContain('test@example.com');
		expect(wrapper.text()).toContain(
			"You'll soon start receiving occasional updates and product news."
		);
	});

	it('does not show updates message if receiveUpdates is false', async () => {
		getItemMock.mockImplementation((key: string) => {
			if (key === 'signup-email') return 'test2@example.com';
			if (key === 'signup-updates') return 'false';
			return null;
		});

		const wrapper = mount(Success, {
			attachTo: document.body,
			global: {
				stubs,
			},
		});

		await flushPromises();

		expect(wrapper.text()).toContain('test2@example.com');
		expect(wrapper.text()).not.toContain(
			"You'll soon start receiving occasional updates and product news."
		);
	});

	it('redirects to / if no email is found', async () => {
		getItemMock.mockReturnValue(null);

		mount(Success, {
			attachTo: document.body,
			global: {
				stubs,
			},
		});

		await flushPromises();

		expect(setLocationMock).toHaveBeenCalledWith('/');
	});
});
