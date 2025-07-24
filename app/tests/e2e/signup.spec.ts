import { test, expect } from '@playwright/test';

test.describe('Signup flow', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://vetapp-signup.netlify.app/');
	});

	test('shows validation errors when submitting empty form', async ({ page }) => {
		await page.click('nord-button[type="submit"]');

		await expect(page.locator('text=Email is required')).toBeVisible();
		await expect(page.locator('text=Password is required')).toBeVisible();
	});

	test('toggles password visibility', async ({ page }) => {
		const passwordInput = page.locator('nord-input[name="new-password"]');
		const toggleButton = page.locator(
			'nord-input[name="new-password"] nord-button.password-toggle'
		);

		await expect(passwordInput).toHaveAttribute('type', 'password');

		await toggleButton.click();
		await expect(passwordInput).toHaveAttribute('type', 'text');

		await toggleButton.click();
		await expect(passwordInput).toHaveAttribute('type', 'password');
	});

	test('shows invalid email error', async ({ page }) => {
		await page.fill('nord-input[name="email"] input', 'invalid-email');
		await page.click('nord-button[type="submit"]');
		await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
	});

	test('shows weak password error', async ({ page }) => {
		await page.fill('nord-input[name="email"] input', 'test@example.com');
		await page.fill('nord-input[name="new-password"] input', 'password123');
		await page.fill('nord-input[name="confirm-password"] input', 'password123');
		await page.click('nord-button[type="submit"]');
		await expect(
			page.locator(
				'text=Please enter a password at least 8 characters long which contains an upper and lower case letter, a number and a symbol.'
			)
		).toBeVisible();
	});

	test('shows confirm password required error', async ({ page }) => {
		await page.fill('nord-input[name="email"] input', 'test@example.com');
		await page.fill('nord-input[name="new-password"] input', 'Supersecr3t!');
		await page.click('nord-button[type="submit"]');
		await expect(page.locator('text=Please confirm your password')).toBeVisible();
	});

	test('shows password mismatch error', async ({ page }) => {
		await page.fill('nord-input[name="email"] input', 'test@example.com');
		await page.fill('nord-input[name="new-password"] input', 'Supersecr3t!');
		await page.fill('nord-input[name="confirm-password"] input', 'DifferentPassword!');
		await page.click('nord-button[type="submit"]');
		await expect(page.locator('text=Passwords do not match')).toBeVisible();
	});

	test('successful signup navigates to success page', async ({ page }) => {
		await page.fill('nord-input[name="email"] input', 'test@example.com');
		await page.fill('nord-input[name="new-password"] input', 'Supersecr3t!');
		await page.fill('nord-input[name="confirm-password"] input', 'Supersecr3t!');
		await page.check('nord-checkbox input[type="checkbox"]'); // Accept terms and conditions

		await page.click('nord-button[type="submit"]');

		await page.waitForURL('**/success');

		await expect(page.locator("text=You're signed up!")).toBeVisible();
		await expect(page.locator('text=test@example.com')).toBeVisible();
	});
});
