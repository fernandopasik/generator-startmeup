import Generator from 'yeoman-generator';
import { format, resolveConfig } from 'prettier';
import { Config } from '@jest/types';

import { addDev, getDev, hasDev, addFromPkg } from '../app/dependencies/index';
import { buildConfig } from './jest-config';

export default class TestingGenerator extends Generator {
  private jestConfig: Config.InitialOptions = {};

  public async initializing(): Promise<void> {
    addFromPkg(this.fs.readJSON('package.json'));

    ['jest.config.cjs', 'jest.config.js'].forEach(async (configFile) => {
      if (this.fs.exists(configFile)) {
        this.jestConfig = await import(this.destinationPath(configFile));
      }
    });
  }

  public configuring(): void {
    addDev(['jest']);

    if (hasDev('typescript')) {
      addDev(['ts-jest']);
    } else if (hasDev('@babel/core')) {
      addDev(['babel-jest']);
    }

    this.jestConfig = buildConfig(this.jestConfig);
  }

  public async writing(): Promise<void> {
    const prettierConfig = (await resolveConfig(process.cwd())) || {};

    const jestConfigJs = format(
      `module.exports=${JSON.stringify(this.jestConfig)}`,
      prettierConfig,
    );

    this.fs.write(this.destinationPath('jest.config.cjs'), jestConfigJs);
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
