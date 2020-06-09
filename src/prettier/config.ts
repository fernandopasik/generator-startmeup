export default {
  configFilename: '.prettierrc.json',
  configContent: {
    arrowParens: 'always',
    printWidth: 100,
    proseWrap: 'never',
    singleQuote: true,
    trailingComma: 'all',
  },
  confirm: true,
  confirmMessage: 'Do you want to use prettier to format files?',
  name: 'prettier',
  mainDependencies: [
    {
      name: 'prettier',
      type: 'dev',
    },
    {
      name: 'prettier-plugin-organize-imports',
      type: 'dev',
    },
    {
      name: 'prettier-plugin-packagejson',
      type: 'dev',
    },
  ],
  replaceConfig: true,
};
