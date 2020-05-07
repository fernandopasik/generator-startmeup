import Generator from 'yeoman-generator';
import { Config } from '@jest/types';

import { dependencies, configs } from '../core';
import { buildConfig, generateFilename } from './config';

export default class JestGenerator extends Generator {
  private jestConfig: Config.InitialOptions = {};

  public async initializing(): Promise<void> {
    await dependencies.importAll();

    if (configs.fileExists('jest.config.cjs')) {
      this.jestConfig = (await configs.load('jest.config.cjs')) as Config.InitialOptions;
    }

    if (configs.fileExists('jest.config.js')) {
      this.jestConfig = (await configs.load('jest.config.js')) as Config.InitialOptions;
    }
  }

  public configuring(): void {
    dependencies.add('jest', 'dev');

    if (dependencies.has('typescript', 'dev')) {
      dependencies.add('ts-jest', 'dev');
    } else if (dependencies.has('@babel/core', 'dev')) {
      dependencies.add('babel-jest', 'dev');
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

    await configs.save(filename, this.jestConfig);
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
