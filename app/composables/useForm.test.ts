import { describe, it, expect, beforeEach } from 'vitest';
import { useForm } from './useForm';

describe('useForm', () => {
	let formComposable: ReturnType<typeof useForm>;

	beforeEach(() => {
		formComposable = useForm();
		formComposable.reset();
	});

	it('should initialize form and errors with default values', () => {
		expect(formComposable.form.email).toBe('');
		expect(formComposable.form.password).toBe('');
		expect(formComposable.form.confirmPassword).toBe('');
		expect(formComposable.form.receiveUpdates).toBe(false);

		expect(formComposable.errors.email).toBe('');
		expect(formComposable.errors.password).toBe('');
		expect(formComposable.errors.confirmPassword).toBe('');
	});

	it('should validate required email', () => {
		formComposable.form.email = '';
		formComposable.validate();
		expect(formComposable.errors.email).toBe('Email is required');
	});

	it('should validate invalid email format', () => {
		formComposable.form.email = 'invalid-email';
		formComposable.validate();
		expect(formComposable.errors.email).toBe('Please enter a valid email address');
	});

	it('should accept valid email', () => {
		formComposable.form.email = 'test@example.com';
		formComposable.validate();
		expect(formComposable.errors.email).toBe('');
	});

	it('should validate required password', () => {
		formComposable.form.password = '';
		formComposable.validate();
		expect(formComposable.errors.password).toBe('Password is required');
	});

	it('should validate password complexity', () => {
		formComposable.form.password = 'simple';
		formComposable.validate();
		expect(formComposable.errors.password).toContain(
			'Please enter a password at least 8 characters long'
		);
	});

	it('should accept valid password', () => {
		formComposable.form.password = 'Valid1!';
		formComposable.form.password = 'ValidPass1!';
		formComposable.validate();
		expect(formComposable.errors.password).toBe('');
	});

	it('should validate required confirmPassword', () => {
		formComposable.form.password = 'ValidPass1!';
		formComposable.form.confirmPassword = '';
		formComposable.validate();
		expect(formComposable.errors.confirmPassword).toBe('Please confirm your password');
	});

	it('should validate password and confirmPassword mismatch', () => {
		formComposable.form.password = 'ValidPass1!';
		formComposable.form.confirmPassword = 'DifferentPass1!';
		formComposable.validate();
		expect(formComposable.errors.confirmPassword).toBe('Passwords do not match');
	});

	it('should accept matching passwords', () => {
		formComposable.form.password = 'ValidPass1!';
		formComposable.form.confirmPassword = 'ValidPass1!';
		formComposable.validate();
		expect(formComposable.errors.confirmPassword).toBe('');
	});

	it('should return true from validate when all fields are valid', () => {
		formComposable.form.email = 'test@example.com';
		formComposable.form.password = 'ValidPass1!';
		formComposable.form.confirmPassword = 'ValidPass1!';
		const result = formComposable.validate();
		expect(result).toBe(true);
		expect(formComposable.errors.email).toBe('');
		expect(formComposable.errors.password).toBe('');
		expect(formComposable.errors.confirmPassword).toBe('');
	});

	it('should reset form and errors', () => {
		formComposable.form.email = 'test@example.com';
		formComposable.form.password = 'ValidPass1!';
		formComposable.form.confirmPassword = 'ValidPass1!';
		formComposable.form.receiveUpdates = true;
		formComposable.errors.email = 'error';
		formComposable.errors.password = 'error';
		formComposable.errors.confirmPassword = 'error';

		formComposable.reset();

		expect(formComposable.form.email).toBe('');
		expect(formComposable.form.password).toBe('');
		expect(formComposable.form.confirmPassword).toBe('');
		expect(formComposable.form.receiveUpdates).toBe(false);
		expect(formComposable.errors.email).toBe('');
		expect(formComposable.errors.password).toBe('');
		expect(formComposable.errors.confirmPassword).toBe('');
	});

	it('isValid should be true when there are no email or password errors', () => {
		formComposable.form.email = 'test@example.com';
		formComposable.form.password = 'ValidPass1!';
		formComposable.form.confirmPassword = 'ValidPass1!';
		formComposable.validate();
		expect(formComposable.isValid.value).toBe(true);
	});

	it('isValid should be false when there are email or password errors', () => {
		formComposable.form.email = '';
		formComposable.form.password = '';
		formComposable.validate();
		expect(formComposable.isValid.value).toBe(false);
	});
});
