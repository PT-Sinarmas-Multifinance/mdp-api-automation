import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginCypress from 'eslint-plugin-cypress';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['node_modules', 'allure-report', 'allure-results', 'test-results', 'dist'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
      cypress: eslintPluginCypress,
    },
    rules: {
      // 🔹 Prettier integration
      'prettier/prettier': 'error',

      // 🔹 TypeScript & general
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'off',

      // 🔹 Cypress
      'cypress/no-unnecessary-waiting': 'warn',
    },
  },
];
