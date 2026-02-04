import config from '@gilbarbara/eslint-config';
import testingLibrary from '@gilbarbara/eslint-config/testing-library';
import vitest from '@gilbarbara/eslint-config/vitest';

export default [
  ...config,
  ...vitest,
  ...testingLibrary,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    rules: {
      'react-compiler/react-compiler': 'off',
    },
  },
  {
    files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    rules: {
      'no-console': 'off',
      'testing-library/no-container': 'off',
      'testing-library/no-node-access': 'off',
    },
  },
];
