// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*', '/node_modules/*'],
  rules: {
    // Add any custom rules here
    'no-unused-vars': 'warn',
    'react/no-unescaped-entities': 'off',
  },
};