import buildConfig from './build-config';

export default {
  configFilename: '.lintstagedrc.json',
  configContent: buildConfig,
  confirm: true,
  confirmMessage: 'Do you want to use lint-staged for pre-commit hook?',
  name: 'lintStaged',
  mainDependencies: [
    {
      name: 'lint-staged',
      type: 'dev',
    },
  ],
  replaceConfig: true,
};
