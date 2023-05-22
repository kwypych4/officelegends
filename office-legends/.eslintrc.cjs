module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        semi: true,
        printWidth: 120,
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-no-comment-textnodes': 0,
    'react/button-has-type': 0,
    '@typescript-eslint/no-shadow': 0,
    'import/prefer-default-export': 0,
    'react/function-component-definition': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/naming-convention': 0,
    'react/require-default-props': 0,
    'import/no-cycle': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['src/', 'node_modules'],
      },
    },
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
  },
};
