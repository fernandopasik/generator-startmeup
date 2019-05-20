const Base = require('../base');
const dependencies = require('../app/dependencies');
const util = require('../app/util');

module.exports = class extends Base {
  initializing() {
    this.jestConfig = {};
  }

  configuring() {
    const hasReact = dependencies.has('react');

    dependencies.addDev(['jest']);

    this.jestConfig.collectCoverageFrom = [];
    this.jestConfig.testEnvironment = 'node';

    if (dependencies.has('typescript')) {
      this.jestConfig.collectCoverageFrom.push('src/**/*.ts');
    } else {
      this.jestConfig.collectCoverageFrom.push('src/**/*.js');
    }

    if (hasReact) {
      this.jestConfig.collectCoverageFrom.push(`${this.jestConfig.collectCoverageFrom[0]}x`);
    }

    if (dependencies.has('@babel/core')) {
      dependencies.addDev(['babel-jest']);
      this.jestConfig.transform = {
        [`^.+\\.js${hasReact ? 'x?' : ''}$`]: 'babel-jest',
      };
    }

    if (dependencies.has('typescript')) {
      dependencies.addDev(['ts-jest', '@types/jest']);
      this.jestConfig.transform = {
        [`^.+\\.ts${hasReact ? 'x?' : ''}$`]: 'ts-jest',
      };
    }

    if (hasReact) {
      dependencies.addDev([
        'enzyme',
        'enzyme-adapter-react-16',
        'jest-environment-enzyme',
        'jest-enzyme',
      ]);
      this.jestConfig.setupFilesAfterEnv = ['jest-enzyme'];
      this.jestConfig.testEnvironment = 'enzyme';
    }
  }

  writing() {
    this.fs.write(
      this.destinationPath('jest.config.js'),
      util.formatJsConfig(this.jestConfig),
    );
  }

  install() {
    this.yarnInstall(dependencies.getDev(), { dev: true });
  }
};
