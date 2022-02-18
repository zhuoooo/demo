module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'prettier',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint'
	],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 2017
	},
	rules: {
		'prettier/prettier': 'error',
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off'
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				mocha: true
			}
		}
	],
	globals: {
		defineProps: 'readonly'
	}
};