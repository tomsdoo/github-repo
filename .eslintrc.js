module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    './.eslintrc-love-temp.cjs',
    'prettier',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.base.json',
  },
  rules: {
  }
}
