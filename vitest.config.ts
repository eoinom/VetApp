import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'app'),
		},
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: './app/tests/setup.ts',
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'html'],
		},
		include: ['**/*.test.ts'],
	},
});
