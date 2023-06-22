module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['airbnb-typescript', 'eslint:recommended', 'next/core-web-vitals', 'prettier'],
  rules: {
    '@typescript-eslint/no-implicit-any-catch': 1,
    '@typescript-eslint/no-unsafe-return': 2,
    '@typescript-eslint/no-unnecessary-type-assertion': 1,
    complexity: [2, { max: 18 }],
    'import/no-extraneous-dependencies': 0,
    'no-console': [2, { allow: ['error', 'warn'] }],
    'no-param-reassign': [2, { props: true, ignorePropertyModificationsForRegex: ['Ref$'] }],
    'prefer-const': 2,
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }],
    'sort-imports': 0,
    'spaced-comment': [2, 'always', { markers: ['/'] }],
  },
};
