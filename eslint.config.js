// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // Disallow console.log/console.debug in code; allow warnings and errors
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
]);
