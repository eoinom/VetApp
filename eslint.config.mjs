// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import * as eslintPluginPrettierImport from 'eslint-plugin-prettier';
import * as eslintConfigPrettier from 'eslint-config-prettier';

const eslintPluginPrettier =
	/** @type {any} */ (eslintPluginPrettierImport).default ?? eslintPluginPrettierImport;

export default withNuxt({
	plugins: {
		prettier: {
			rules: {
				prettier: eslintPluginPrettier.rules.prettier,
			},
		},
	},
	rules: {
		'prettier/prettier': 'error',
		...eslintConfigPrettier.rules,
		'vue/no-deprecated-slot-attribute': 'off', // Disable as conflicting with web components
	},
});
