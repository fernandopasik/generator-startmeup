import Generator from 'yeoman-generator';
import { Config } from '@jest/types';

import { dependencies, configs } from '../core';
import { buildConfig, generateFilename } from './config';

export default class JestGenerator extends Generator {
  private jestConfig: Config.InitialOptions = {};

  public async initializing(): Promise<void> {
    dependencies.importFromPkg(this.fs.readJSON('package.json'));

    ['jest.config.cjs', 'jest.config.js'].forEach(async (filename) => {
      if (configs.fileExists(filename)) {
        this.jestConfig = (await configs.load(filename)) as Config.InitialOptions;
      }
    });
  }

  public configuring(): void {
    dependencies.add('jest', 'devDependencies');

    if (dependencies.has('typescript', 'devDependencies')) {
      dependencies.add('ts-jest', 'devDependencies');
    } else if (dependencies.has('@babel/core', 'devDependencies')) {
      dependencies.add('babel-jest', 'devDependencies');
    }

    this.jestConfig = buildConfig(this.jestConfig);
  }

  public async writing(): Promise<void> {
    const pkg = (await configs.load('package.json')) ?? {};

    const wrongFilename = generateFilename(pkg.type !== 'module');

    if (configs.fileExists(wrongFilename)) {
      this.fs.delete(this.destinationPath(wrongFilename));
    }

    const filename = generateFilename(pkg.type === 'module');

    configs.save(filename, this.jestConfig, 'js');
  }

  public install(): void {
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
