import Generator from 'yeoman-generator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Linter } from 'eslint';
import { dependencies, configs } from '../core';

export default class LintGenerator extends Generator {
  private eslintConfig: Linter.Config = {};

  public async initializing(): Promise<void> {
    await dependencies.importAll();
    this.eslintConfig = this.fs.readJSON(
      this.destinationPath('.eslintrc.json'),
      {},
    ) as Linter.Config;
  }

  public configuring(): void {
    const plugins: string[] = [];
    dependencies.add('eslint', 'dev');

    this.eslintConfig.extends = [];

    if (dependencies.has('react') || dependencies.has('react', 'peer')) {
      dependencies.add('eslint-config-airbnb', 'dev');
      dependencies.add('eslint-plugin-import', 'dev');
      dependencies.add('eslint-plugin-jsx-a11y', 'dev');
      dependencies.add('eslint-plugin-react', 'dev');

      plugins.push('import', 'jsx-a11y', 'react');
      this.eslintConfig.extends.push('airbnb');
      this.eslintConfig.env = { browser: true };
    } else {
      dependencies.add('eslint-config-airbnb-base', 'dev');
      dependencies.add('eslint-plugin-import', 'dev');
      plugins.push('import');
      this.eslintConfig.extends.push('airbnb-base');
    }

    if (dependencies.has('typescript', 'dev')) {
      dependencies.add('@typescript-eslint/eslint-plugin', 'dev');
      dependencies.add('@typescript-eslint/parser', 'dev');
      plugins.push('typescript');
      this.eslintConfig.extends.push('plugin:import/typescript', 'plugin:@typescript-eslint/all');
      this.eslintConfig.overrides = this.eslintConfig.overrides ?? [];

      this.eslintConfig.rules = {
        ...this.eslintConfig.rules,
        'import/extensions': ['error', 'never'],
      };

      if (
        typeof this.eslintConfig.overrides.find((override: Readonly<Linter.ConfigOverride>) =>
          override.files.includes('*.spec.*'),
        ) === 'undefined'
      ) {
        this.eslintConfig.overrides.push({
          files: ['*.spec.*'],
          rules: { '@typescript-eslint/no-magic-numbers': 'off' },
        });
      }
      this.eslintConfig.rules = {
        ...this.eslintConfig.rules,
        '@typescript-eslint/no-magic-numbers': ['error', { ignore: [0] }],
      };
      this.eslintConfig.parserOptions = { project: './tsconfig.all.json' };
    } else if (dependencies.has('@babel/core', 'dev')) {
      dependencies.add('babel-eslint', 'dev');
      this.eslintConfig.parser = 'babel-eslint';
    }

    if (dependencies.has('lit-html') || dependencies.has('lit-html', 'peer')) {
      dependencies.add('eslint-plugin-lit', 'dev');
      plugins.push('lit');
      this.eslintConfig.extends.push('plugin:lit/all');
      this.eslintConfig.env = { browser: true };
    }

    if (dependencies.has('jest', 'dev')) {
      dependencies.add('eslint-plugin-jest', 'dev');
      plugins.push('jest');
      this.eslintConfig.extends.push('plugin:jest/all');
      this.eslintConfig.rules = {
        ...this.eslintConfig.rules,
        'jest/no-hooks': 'off',
        'jest/prefer-expect-assertions': 'off',
      };
    }

    if (dependencies.has('flow-bin', 'dev') && !dependencies.has('flowgen', 'dev')) {
      dependencies.add('eslint-plugin-flowtype', 'dev');
      plugins.push('flowtype');
      this.eslintConfig.extends.push('plugin:flowtype/recommended');
    }

    if (dependencies.has('prettier', 'dev')) {
      dependencies.add('eslint-config-prettier', 'dev');
      dependencies.add('eslint-plugin-prettier', 'dev');
      plugins.push('prettier');

      if (typeof this.eslintConfig.rules !== 'undefined') {
        delete this.eslintConfig.rules['prettier/prettier'];
      }

      this.eslintConfig.extends.push('plugin:prettier/recommended');

      if (dependencies.has('typescript', 'dev')) {
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
    await configs.save('.eslintrc.json', this.eslintConfig);
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
