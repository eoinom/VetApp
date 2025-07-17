import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: './app/tests/setup.ts',
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'html'],
		},
		include: ['**/*.spec.ts', '**/*.test.ts'],
	},
});
