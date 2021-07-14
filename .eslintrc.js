module.exports = {
  root: true,

  env: {
    node: true,
    browser: true
  },

  extends: ['plugin:vue/base'],

  parserOptions: {
    ecmaVersion: 2020,
    // parser: '@typescript-eslint/parser'
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', {
      named: 'never'
    }],
    // '@typescript-eslint/no-explicit-any': 'off'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // '@typescript-eslint/explicit-module-boundary-types': ['error']
      }
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {
        // "@typescript-eslint/no-var-requires": "off",
      }
    }
  ]
};

