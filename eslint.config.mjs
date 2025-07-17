// @ts-check
// import withNuxt from './.nuxt/eslint.config.mjs';

// export default (async () => {
//   const eslintPluginPrettier = await import('eslint-plugin-prettier');
//   const prettierConfig = await import('eslint-config-prettier');

//   return withNuxt({
//     plugins: {
//       prettier: eslintPluginPrettier,
//     },
//     rules: {
//       'prettier/prettier': 'error',
//     },
//     ...prettierConfig
//   });
// })();

// import withNuxt from './.nuxt/eslint.config.mjs';

// const config = withNuxt({
//   plugins: {
//     prettier: await import('eslint-plugin-prettier')
//   },
//   rules: {
//     'prettier/prettier': 'error'
//   },
//   extends: ['prettier']  // This is key
// });

// export default config;

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
	},
});
