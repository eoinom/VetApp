import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './app/tests/e2e',
	timeout: 30 * 1000, // 30s per test
	retries: 1, // retry once on failure
	reporter: [['list'], ['html']],
	use: {
		headless: true,
		viewport: { width: 1280, height: 720 },
		actionTimeout: 5000,
		ignoreHTTPSErrors: true,
		video: 'retain-on-failure',
	},
	projects: [
		{ name: 'chromium', use: { browserName: 'chromium' } },
		{ name: 'firefox', use: { browserName: 'firefox' } },
		{ name: 'webkit', use: { browserName: 'webkit' } },
	],
});
