import Generator from 'yeoman-generator';
import { format, resolveConfig } from 'prettier';
import { Config } from '@jest/types';

import { addDev, getDev, hasDev, addFromPkg } from '../app/dependencies/index';
import { buildConfig, generateFilename } from './config';

export default class JestGenerator extends Generator {
  private jestConfig: Config.InitialOptions = {};

  public async initializing(): Promise<void> {
    addFromPkg(this.fs.readJSON('package.json'));

    ['jest.config.cjs', 'jest.config.js'].forEach(async (configFile) => {
      if (this.fs.exists(configFile)) {
        const file = await import(this.destinationPath(configFile));
        this.jestConfig = file.default;
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

    const jestConfigJs = format(`module.exports=${JSON.stringify(this.jestConfig)}`, {
      ...prettierConfig,
      parser: 'babel',
    });

    const pkg = this.fs.readJSON('package.json');

    const wrongFilename = generateFilename(pkg.type !== 'module');

    if (this.fs.exists(this.destinationPath(wrongFilename))) {
      this.fs.delete(this.destinationPath(wrongFilename));
    }

    const filename = generateFilename(pkg.type === 'module');

    this.fs.write(this.destinationPath(filename), jestConfigJs);
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
