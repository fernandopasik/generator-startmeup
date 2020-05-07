export default {
  configFilename: '.commitlintrc.json',
  configContent: {
    extends: ['@commitlint/config-conventional'],
  },
  confirm: true,
  confirmMessage: 'Do you want to use commit lint with conventional commits format?',
  name: 'commitlint',
  mainDependencies: [
    {
      name: '@commitlint/cli',
      type: 'dev',
    },
    {
      name: '@commitlint/config-conventional',
      type: 'dev',
    },
  ],
  replaceConfig: true,
};
