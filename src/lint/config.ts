import buildConfig from './build-config';

export default {
  configFilename: '.eslintrc.json',
  configContent: buildConfig,
  confirm: false,
  name: 'lint',
  mainDependencies: [
    {
      name: 'eslint',
      type: 'dev',
    },
  ],
  replaceConfig: false,
};
