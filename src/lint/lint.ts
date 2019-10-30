import Generator from 'yeoman-generator';
import prettier from 'prettier';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Linter } from 'eslint';

import { addDev, getDev, has, addFromPkg } from '../app/dependencies/index';

export default class LintGenerator extends Generator {
  private eslintConfig: Linter.Config = {};

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json', {}));
    this.eslintConfig = this.fs.readJSON(this.destinationPath('.eslintrc.json'), {});
  }

  public configuring(): void {
    addDev(['eslint']);

    this.eslintConfig.extends = [];

    if (has('react')) {
      addDev([
        'eslint-config-airbnb',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
      ]);
      this.eslintConfig.extends.push('airbnb');
    } else {
      addDev(['eslint-config-airbnb-base', 'eslint-plugin-import']);
      this.eslintConfig.extends.push('airbnb-base');
    }

    if (has('typescript')) {
      addDev(['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']);
      this.eslintConfig.extends.push(
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
      );
    } else if (has('@babel/core')) {
      addDev(['babel-eslint']);
      this.eslintConfig.parser = 'babel-eslint';
    }

    if (has('lit-html')) {
      addDev(['eslint-plugin-lit']);
      this.eslintConfig.extends.push('plugin:lit/all');
    }

    if (has('jest')) {
      addDev(['eslint-plugin-jest']);
      this.eslintConfig.extends.push('plugin:jest/all');
      this.eslintConfig.rules = {
        ...this.eslintConfig.rules,
        'jest/no-hooks': 'off',
        'jest/prefer-expect-assertions': 'off',
      };
    }

    if (has('flow-bin')) {
      addDev(['eslint-plugin-flowtype']);
      this.eslintConfig.extends.push('plugin:flowtype/recommended');
    }

    if (has('prettier')) {
      addDev(['eslint-config-prettier', 'eslint-plugin-prettier']);
      this.eslintConfig.extends.push('plugin:prettier/recommended');

      if (has('typescript')) {
        this.eslintConfig.extends.push('prettier/@typescript-eslint');
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
