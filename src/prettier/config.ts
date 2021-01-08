export default {
  configFilename: '.prettierrc.json',
  configContent: {
    arrowParens: 'always',
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
  },
  confirm: true,
  confirmMessage: 'Do you want to use prettier to format files?',
  confirmDefault: true,
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
  tasks: {
    format: 'prettier --write ** ./* ./.??*',
  },
  replaceConfig: true,
};
