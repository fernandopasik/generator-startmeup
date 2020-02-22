import Generator from 'yeoman-generator';
import prettier from 'prettier';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Linter } from 'eslint';

import { addDev, getDev, has, hasDev, addFromPkg } from '../app/dependencies/index';

export default class LintGenerator extends Generator {
  private eslintConfig: Linter.Config = {};

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json', {}));
    this.eslintConfig = this.fs.readJSON(this.destinationPath('.eslintrc.json'), {});
  }

  public configuring(): void {
    const plugins: string[] = [];
    addDev(['eslint']);

    this.eslintConfig.extends = [];

    if (has('react')) {
      addDev([
        'eslint-config-airbnb',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
      ]);
      plugins.push('import', 'jsx-a11y', 'react');
      this.eslintConfig.extends.push('airbnb');
    } else {
      addDev(['eslint-config-airbnb-base', 'eslint-plugin-import']);
      plugins.push('import');
      this.eslintConfig.extends.push('airbnb-base');
    }

    if (hasDev('typescript')) {
      addDev(['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']);
      plugins.push('typescript');
      this.eslintConfig.extends.push(
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
      );
    } else if (hasDev('@babel/core')) {
      addDev(['babel-eslint']);
      this.eslintConfig.parser = 'babel-eslint';
    }

    if (has('lit-html')) {
      addDev(['eslint-plugin-lit']);
      plugins.push('lit');
      this.eslintConfig.extends.push('plugin:lit/all');
    }

    if (hasDev('jest')) {
      addDev(['eslint-plugin-jest']);
      plugins.push('jest');
      this.eslintConfig.extends.push('plugin:jest/all');
      this.eslintConfig.rules = {
        ...this.eslintConfig.rules,
        'jest/no-hooks': 'off',
        'jest/prefer-expect-assertions': 'off',
      };
    }

    if (hasDev('flow-bin')) {
      addDev(['eslint-plugin-flowtype']);
      plugins.push('flowtype');
      this.eslintConfig.extends.push('plugin:flowtype/recommended');
    }

    if (hasDev('prettier')) {
      addDev(['eslint-config-prettier', 'eslint-plugin-prettier']);
      plugins.push('prettier');

      if (this.eslintConfig.rules) {
        delete this.eslintConfig.rules['prettier/prettier'];
      }

      this.eslintConfig.extends.push('plugin:prettier/recommended');

      if (hasDev('typescript')) {
        this.eslintConfig.extends.push('prettier/@typescript-eslint');
      }
    }

    if (this.eslintConfig.plugins) {
      this.eslintConfig.plugins = this.eslintConfig.plugins.filter(
        (plugin) => !plugins.includes(plugin),
      );

      if (this.eslintConfig.plugins.length === 0) {
        delete this.eslintConfig.plugins;
      }
    }
  }

  public writing(): void {
    const eslintConfigJson = prettier.format(JSON.stringify(this.eslintConfig), {
      parser: 'json',
      arrowParens: 'always',
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'all',
    });
    this.fs.write(this.destinationPath('.eslintrc.json'), eslintConfigJson);
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
