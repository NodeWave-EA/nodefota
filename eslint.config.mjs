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
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_' },
    ],
  },
})
