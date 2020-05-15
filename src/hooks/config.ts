import buildConfig from './build-config';

export default {
  configFilename: '.huskyrc.json',
  configContent: buildConfig,
  confirm: false,
  name: 'hooks',
  mainDependencies: [
    {
      name: 'husky',
      type: 'dev',
    },
  ],
  replaceConfig: true,
};
