import { modules } from '../core';

export default {
  configFilename: '.prettierrc.json',
  configContent: {
    arrowParens: 'always',
    printWidth: 100,
    proseWrap: 'never',
    singleQuote: true,
    trailingComma: 'all',
  },
  mainDependencies: [
    {
      name: 'prettier',
      type: 'devDependencies',
    },
  ],
  questions: [
    {
      type: 'confirm',
      name: 'prettier',
      default: (): boolean => modules.isPresent('prettier'),
      message: 'Do you want to use prettier to format files?',
    },
  ],
  replaceConfig: true,
};
