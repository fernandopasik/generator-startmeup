import Generator from '../generator.ts';

export default class JestGenerator extends Generator {
  public async configuring(): Promise<void> {
    if (!this.hasFiles('**/*.{js,jsx,ts,tsx}')) {
      return;
    }

    const taskEnv = this.hasAnyDependency('typescript')
      ? ''
      : 'NODE_OPTIONS=--experimental-vm-modules ';
    this.packageJson.merge({
      scripts: {
        test: `${taskEnv}jest`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'test:coverage': `${taskEnv}jest --coverage`,
      },
    });

    await this.addDevDependencies(['jest']);
  }

  // eslint-disable-next-line max-lines-per-function
  public async writing(): Promise<void> {
    if (!this.hasFiles('**/*.{js,jsx,ts,tsx}')) {
      return;
    }

    const options = {
      axe: this.hasDevDependency('jest-axe'),
      babel: this.hasDevDependency('@babel/core'),
      collectExtensions: 'js',
      lit: this.hasAnyDependency('lit') || this.hasAnyDependency('lit-html'),
      module: this.packageJson.get('type') === 'module',
      puppeteer: this.hasDevDependency('puppeteer'),
      react: this.hasAnyDependency('react'),
      storybook:
        this.hasDevDependency('@storybook/react') ||
        this.hasDevDependency('@storybook/web-components'),
      transform: '',
      transformExtensions: 'js',
      typescript: this.hasAnyDependency('typescript'),
    };

    if (options.typescript) {
      await this.addDevDependencies(['@types/jest', 'ts-jest']);
      options.collectExtensions = '{j,t}s';
      options.transformExtensions = '[j|t]s';
    }

    if (options.babel) {
      await this.addDevDependencies(['babel-jest']);
      options.transform = 'babel-jest';
    }

    if (options.react) {
      options.collectExtensions += '{,x}';
      options.transformExtensions += 'x?';
    }

    if (options.puppeteer) {
      await this.addDevDependencies(['@types/jest-environment-puppeteer', 'jest-puppeteer']);
    }

    await this.renderTpl('jest.config.js', 'jest.config.js', options, { rmWhitespace: true });
  }
}
