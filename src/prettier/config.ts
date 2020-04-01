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
  replaceConfig: true,
};
