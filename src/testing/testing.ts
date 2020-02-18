import Generator from 'yeoman-generator';
import prettier from 'prettier';
import { Config } from '@jest/types';

import { addDev, getDev, has, addFromPkg } from '../app/dependencies/index';
import setJestConfig from './config';

export default class TestingGenerator extends Generator {
  private jestConfig: Config.InitialOptions = {};

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public configuring(): void {
    addDev(['jest']);

    if (has('@babel/core')) {
      addDev(['babel-jest']);
    } else if (has('typescript')) {
      addDev(['ts-jest']);
    }

    if (has('typescript')) {
      addDev(['@types/jest']);
    }

    this.jestConfig = setJestConfig();
  }

  public writing(): void {
    const jestConfigJs = prettier.format(`module.exports=${JSON.stringify(this.jestConfig)}`, {
      arrowParens: 'always',
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'all',
    });
    this.fs.write(this.destinationPath('jest.config.js'), jestConfigJs);
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
