import Generator from 'yeoman-generator';
import prettier from 'prettier';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Linter } from 'eslint';

import { dependencies } from '../core';
import prettifyJson from '../prettier/prettify-json';

export default class LintGenerator extends Generator {
  private eslintConfig: Linter.Config = {};

  public initializing(): void {
    dependencies.importFromPkg(this.fs.readJSON('package.json'));
    this.eslintConfig = this.fs.readJSON(this.destinationPath('.eslintrc.json'), {});
  }

  public configuring(): void {
    const plugins: string[] = [];
    dependencies.add('eslint', 'devDependencies');

    this.eslintConfig.extends = [];

    if (dependencies.has('react') || dependencies.has('react', 'peerDependencies')) {
      dependencies.add('eslint-config-airbnb', 'devDependencies');
      dependencies.add('eslint-plugin-import', 'devDependencies');
      dependencies.add('eslint-plugin-jsx-a11y', 'devDependencies');
      dependencies.add('eslint-plugin-react', 'devDependencies');

      plugins.push('import', 'jsx-a11y', 'react');
      this.eslintConfig.extends.push('airbnb');
    } else {
      dependencies.add('eslint-config-airbnb-base', 'devDependencies');
      dependencies.add('eslint-plugin-import', 'devDependencies');
      plugins.push('import');
      this.eslintConfig.extends.push('airbnb-base');
    }

    if (dependencies.has('typescript', 'devDependencies')) {
      dependencies.add('@typescript-eslint/eslint-plugin', 'devDependencies');
      dependencies.add('@typescript-eslint/parser', 'devDependencies');
      plugins.push('typescript');
      this.eslintConfig.extends.push('plugin:import/typescript', 'plugin:@typescript-eslint/all');
      this.eslintConfig.overrides = this.eslintConfig.overrides ?? [];
      this.eslintConfig.overrides.push({
        files: ['*.spec.*'],
        rules: { '@typescript-eslint/no-magic-numbers': 'off' },
      });
    } else if (dependencies.has('@babel/core', 'devDependencies')) {
      dependencies.add('babel-eslint', 'devDependencies');
      this.eslintConfig.parser = 'babel-eslint';
    }

    if (dependencies.has('lit-html') || dependencies.has('lit-html', 'peerDependencies')) {
      dependencies.add('eslint-plugin-lit', 'devDependencies');
      plugins.push('lit');
      this.eslintConfig.extends.push('plugin:lit/all');
    }

    if (dependencies.has('jest', 'devDependencies')) {
      dependencies.add('eslint-plugin-jest', 'devDependencies');
      plugins.push('jest');
      this.eslintConfig.extends.push('plugin:jest/all');
      this.eslintConfig.rules = {
        ...this.eslintConfig.rules,
        'jest/no-hooks': 'off',
        'jest/prefer-expect-assertions': 'off',
      };
    }

    if (
      dependencies.has('flow-bin', 'devDependencies') &&
      !dependencies.has('flowgen', 'devDependencies')
    ) {
      dependencies.add('eslint-plugin-flowtype', 'devDependencies');
      plugins.push('flowtype');
      this.eslintConfig.extends.push('plugin:flowtype/recommended');
    }

    if (dependencies.has('prettier', 'devDependencies')) {
      dependencies.add('eslint-config-prettier', 'devDependencies');
      dependencies.add('eslint-plugin-prettier', 'devDependencies');
      plugins.push('prettier');

      if (typeof this.eslintConfig.rules !== 'undefined') {
        delete this.eslintConfig.rules['prettier/prettier'];
      }

      this.eslintConfig.extends.push('plugin:prettier/recommended');

      if (dependencies.has('typescript', 'devDependencies')) {
        this.eslintConfig.extends.push('prettier/@typescript-eslint');
      }
    }

    if (typeof this.eslintConfig.plugins !== 'undefined') {
      this.eslintConfig.plugins = this.eslintConfig.plugins.filter(
        (plugin: string) => !plugins.includes(plugin),
      );

      if (this.eslintConfig.plugins.length === 0) {
        delete this.eslintConfig.plugins;
      }
    }
  }

  public async writing(): Promise<void> {
    const prettierConfig = (await prettier.resolveConfig(process.cwd())) ?? {};

    this.fs.write(
      this.destinationPath('.eslintrc.json'),
      prettifyJson(this.eslintConfig, prettierConfig),
    );
  }

  public install(): void {
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
