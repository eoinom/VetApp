import { describe, it, expect } from 'vitest';
import { usePasswordToggle } from './usePasswordToggle';

describe('usePasswordToggle', () => {
	it('should initialize with password hidden', () => {
		const { visible, inputType, toggleLabel } = usePasswordToggle();
		expect(visible.value).toBe(false);
		expect(inputType.value).toBe('password');
		expect(toggleLabel.value).toBe('Show password');
	});

	it('should toggle visibility to show password', () => {
		const { visible, toggle, inputType, toggleLabel } = usePasswordToggle();
		toggle();
		expect(visible.value).toBe(true);
		expect(inputType.value).toBe('text');
		expect(toggleLabel.value).toBe('Hide password');
	});

	it('should toggle visibility back to hidden', () => {
		const { visible, toggle, inputType, toggleLabel } = usePasswordToggle();
		toggle(); // show
		toggle(); // hide
		expect(visible.value).toBe(false);
		expect(inputType.value).toBe('password');
		expect(toggleLabel.value).toBe('Show password');
	});
});
