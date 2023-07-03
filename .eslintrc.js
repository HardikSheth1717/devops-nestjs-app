module.exports = {
	env: 'es2017',
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'array-callback-return': 'error',
		'no-await-in-loop': 'error',
		'no-constructor-return': 'error',
		'no-duplicate-imports': 'error',
		'no-promise-executor-return': 'error',
		'no-self-compare': 'error',
		'no-template-curly-in-string': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unreachable-loop': 'error',
		'no-unsafe-negation': 'error',
		'no-use-before-define': 'error',
		'arrow-body-style': ['error', 'as-needed'],
		'block-scoped-var': 'error',
		camelcase: 'error',
		'capitalized-comments': ['error', 'always'],
		'consistent-return': 'error',
		curly: 'error',
		'default-case': 'error',
		'default-case-last': 'error',
		'default-param-last': 'error',
		eqeqeq: 'error',
		'dot-notation': 'error',
		'func-name-matching': 'error',
		'func-names': 'error',
		'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
		'guard-for-in': 'error'
	}
};
