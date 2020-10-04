module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks'],
  extends: ['@react-native-community'],
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-shadow': 'off',
  },
};
