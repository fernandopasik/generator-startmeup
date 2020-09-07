import type { Config } from '@jest/types';
import Generator from 'yeoman-generator';
import { configs, dependencies } from '../core';
import { buildConfig } from './config';

export default class JestGenerator extends Generator {
  private jestConfig: Config.InitialOptions = {};

  public async initializing(): Promise<void> {
    await dependencies.importAll();

    this.jestConfig = (await configs.load('jest.config.js')) as Config.InitialOptions;
  }

  public prompting(): void {
    dependencies.add('jest', 'dev');
  }

  public configuring(): void {
    if (dependencies.has('typescript', 'dev')) {
      dependencies.add('ts-jest', 'dev');
    } else if (dependencies.has('@babel/core', 'dev')) {
      dependencies.add('babel-jest', 'dev');
    }

    this.jestConfig = buildConfig(this.jestConfig);

    configs.set('jest.config.js', configs.sortProps(this.jestConfig));
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
