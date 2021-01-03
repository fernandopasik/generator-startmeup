import buildConfig from './build-config';
import buildTaks from './build-tasks';

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
  tasks: buildTaks,
  replaceConfig: false,
};
