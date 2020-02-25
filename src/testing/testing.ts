import Generator from 'yeoman-generator';
import { format, resolveConfig } from 'prettier';
import { Config } from '@jest/types';

import { addDev, getDev, hasDev, addFromPkg } from '../app/dependencies/index';
import setJestConfig from './jest-config';

export default class TestingGenerator extends Generator {
  private jestConfig: Config.InitialOptions = {};

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public configuring(): void {
    addDev(['jest']);

    if (hasDev('typescript')) {
      addDev(['ts-jest']);
    } else if (hasDev('@babel/core')) {
      addDev(['babel-jest']);
    }

    this.jestConfig = setJestConfig();
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
