import Generator from 'yeoman-generator';
import prettier from 'prettier';
import { addDev, getDev, has, addFromPkg } from '../app/dependencies/index';

export default class TestingGenerator extends Generator {
  jestConfig: jest.InitialOptions = {};

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
  }

  public configuring(): void {
    addDev(['jest']);

    this.jestConfig.collectCoverageFrom = [
      `src/**/*.${has('typescript') ? 't' : 'j'}s${has('react') ? '{,x}' : ''}`,
    ];

    this.jestConfig.testEnvironment = 'node';

    if (has('@babel/core')) {
      this.jestConfig.transform = { '^.+\\.[t|j]sx?$': 'babel-jest' };
      addDev(['babel-jest']);
    } else if (has('typescript')) {
      this.jestConfig.transform = { '^.+\\.[t|j]sx?$': 'ts-jest' };
      addDev(['ts-jest']);
    }
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
