import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  jsonc: true,
  yaml: true,
  toml: true,
  markdown: true,
  antislop: true,
  formatters: true,
  lintStaged: true,
  rules: {
    'no-console': 'off',
    'ts/consistent-type-imports': 'off',
    'ts/no-unused-vars': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
}, {
  ignores: [
    '**/browserconfig.*',
  ],
})
