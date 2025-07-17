// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint'],
	ssr: false,
	typescript: {
		tsConfig: {
			compilerOptions: {
				target: 'ES2020',
				module: 'Node16',
				moduleResolution: 'Node',
				esModuleInterop: true,
				types: ['node', '@nordhealth/components/lib/vue.d.ts'],
			},
		},
	},
});
