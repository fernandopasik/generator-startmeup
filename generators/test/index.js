const Base = require('../base');

module.exports = class extends Base {
  initializing() {
    this.jestConfig = {};
  }

  configuring() {
    const { dependencies = {}, devDependencies = {} } = this.pkgJson;
    const hasReact = dependencies.react || devDependencies.react;

    this.devDependencies.push('jest');

    this.jestConfig.collectCoverageFrom = [];
    this.jestConfig.testEnvironment = 'node';

    if (this.willInstall('typescript')) {
      this.jestConfig.collectCoverageFrom.push('src/**/*.ts');
    } else {
      this.jestConfig.collectCoverageFrom.push('src/**/*.js');
    }

    if (hasReact) {
      this.jestConfig.collectCoverageFrom.push(`${this.jestConfig.collectCoverageFrom[0]}x`);
    }

    if (this.willInstall('@babel/core')) {
      this.devDependencies.push('babel-jest');
      this.jestConfig.transform = {
        [`^.+\\.js${hasReact ? 'x?' : ''}$`]: 'babel-jest',
      };
    }

    if (this.willInstall('typescript')) {
      this.devDependencies.push('ts-jest', '@types/jest');
      this.jestConfig.transform = {
        [`^.+\\.ts${hasReact ? 'x?' : ''}$`]: 'ts-jest',
      };
    }

    if (hasReact) {
      this.devDependencies.push(
        'enzyme',
        'enzyme-adapter-react-16',
        'jest-environment-enzyme',
        'jest-enzyme',
      );
      this.jestConfig.setupFilesAfterEnv = ['jest-enzyme'];
      this.jestConfig.testEnvironment = 'enzyme';
    }
  }

  writing() {
    this.fs.write(
      this.destinationPath('jest.config.js'),
      this.formatJsConfig(this.jestConfig),
    );
  }

  install() {
    this.yarnInstall(this.devDependencies, { dev: true });
  }
};
