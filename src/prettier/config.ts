export default {
  mainDependencies: [
    {
      name: 'prettier',
      type: 'devDependencies',
    },
  ],
  configFilename: '.prettierrc.json',
  configContent: {
    arrowParens: 'always',
    printWidth: 100,
    proseWrap: 'never',
    singleQuote: true,
    trailingComma: 'all',
  },
  replaceConfig: true,
};
