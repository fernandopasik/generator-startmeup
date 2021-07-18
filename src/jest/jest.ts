import Generator from '../generator';

export default class JestGenerator extends Generator {
  public async configuring(): Promise<void> {
    this.packageJson.merge({
      scripts: {
        test: 'jest',
        'test:coverage': 'jest --coverage',
      },
    });

    await this.addDevDependencies(['jest']);
  }

  public async writing(): Promise<void> {
    const options = {
      axe: this.hasDevDependency('jest-axe'),
      babel: this.hasDevDependency('@babel/core'),
      collectExtensions: 'js',
      lit: this.hasAnyDependency('lit') || this.hasAnyDependency('lit-html'),
      module: this.packageJson.get('type') === 'module',
      enzyme: this.hasDevDependency('enzyme'),
      puppeteer: this.hasDevDependency('puppeteer'),
      react: this.hasAnyDependency('react'),
      storybook:
        this.hasDevDependency('@storybook/react') ||
        this.hasDevDependency('@storybook/web-components'),
      transformExtensions: 'js',
      typescript: this.hasDevDependency('typescript'),
      transform: '',
    };

    if (options.typescript) {
      await this.addDevDependencies(['@types/jest', 'ts-jest']);
      options.transform = 'ts-jest';
      options.collectExtensions = '{j,t}s';
      options.transformExtensions = '[j|t]s';
    }

    if (options.babel) {
      await this.addDevDependencies(['babel-jest']);
      options.transform = 'babel-jest';
    }

    if (options.react) {
      await this.addDevDependencies(['jest-environment-enzyme', 'jest-enzyme']);
      options.collectExtensions += '{,x}';
      options.transformExtensions += 'x?';
    }

    if (options.puppeteer) {
      await this.addDevDependencies(['@types/jest-environment-puppeteer', 'jest-puppeteer']);
    }

    await this.renderTpl('jest.config.js', 'jest.config.js', options, { rmWhitespace: true });
  }
}
