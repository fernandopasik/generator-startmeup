import type { Linter } from 'eslint';
import { dependencies } from '../core';

export const buildOverrides = (config: Readonly<Linter.Config>): Linter.Config => {
  const files: string[] = [];
  const rules: Linter.RulesRecord = {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  };

  if (
    dependencies.has('@storybook/react', 'dev') ||
    dependencies.has('@storybook/web-components', 'dev')
  ) {
    files.push('*.stories.*', '.storybook/**');
  }

  if (dependencies.has('typescript', 'dev') && dependencies.has('jest', 'dev')) {
    files.push('*.spec.*');
    rules['@typescript-eslint/no-magic-numbers'] = 'off';
  }

  if (dependencies.has('puppeteer', 'dev')) {
    files.push('*.e2e.*');
  }

  return {
    ...config,
    overrides: [
      ...(config.overrides ?? []),
      {
        files,
        rules,
      },
    ],
  };
};

const buildConfig = (): Linter.Config => {
  let config: Linter.Config = {};
  const plugins: string[] = [];
  config.extends = [];

  if (dependencies.has('react') || dependencies.has('react', 'peer')) {
    dependencies.add('eslint-config-airbnb', 'dev');
    dependencies.add('eslint-plugin-import', 'dev');
    dependencies.add('eslint-plugin-jsx-a11y', 'dev');
    dependencies.add('eslint-plugin-react', 'dev');

    plugins.push('import', 'jsx-a11y', 'react');
    config.extends.push('airbnb');
    config.env = { browser: true };

    if (dependencies.has('typescript', 'dev')) {
      config.rules = {
        ...config.rules,
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      };
    }
  } else {
    dependencies.add('eslint-config-airbnb-base', 'dev');
    dependencies.add('eslint-plugin-import', 'dev');
    plugins.push('import');
    config.extends.push('airbnb-base');
  }

  if (dependencies.has('typescript', 'dev')) {
    dependencies.add('@typescript-eslint/eslint-plugin', 'dev');
    dependencies.add('@typescript-eslint/parser', 'dev');
    plugins.push('typescript');
    config.extends.push('plugin:import/typescript', 'plugin:@typescript-eslint/all');
    config.overrides = config.overrides ?? [];

    config.rules = {
      ...config.rules,
      'import/extensions': ['error', 'never'],
    };

    config.rules = {
      ...config.rules,
      '@typescript-eslint/no-magic-numbers': ['error', { ignore: [0] }],
    };
    config.parserOptions = { project: './tsconfig.all.json' };
  } else if (dependencies.has('@babel/core', 'dev')) {
    dependencies.add('babel-eslint', 'dev');
    config.parser = 'babel-eslint';
  }

  if (dependencies.has('lit-html') || dependencies.has('lit-html', 'peer')) {
    dependencies.add('eslint-plugin-lit', 'dev');
    dependencies.add('eslint-plugin-lit-a11y', 'dev');
    dependencies.add('eslint-plugin-wc', 'dev');
    plugins.push('lit');
    config.extends.push('plugin:lit/all');
    config.extends.push('plugin:lit-a11y/recommended');
    config.extends.push('plugin:wc/best-practice');
    config.env = { browser: true };
    config.rules = {
      ...config.rules,
      '@typescript-eslint/unbound-method': 'off',
      'class-methods-use-this': 'off',
    };
  }

  if (dependencies.has('jest', 'dev')) {
    dependencies.add('eslint-plugin-jest', 'dev');
    plugins.push('jest');
    config.extends.push('plugin:jest/all');
    config.rules = {
      ...config.rules,
      'jest/no-hooks': 'off',
      'jest/prefer-expect-assertions': 'off',
    };
  }

  if (dependencies.has('flow-bin', 'dev') && !dependencies.has('flowgen', 'dev')) {
    dependencies.add('eslint-plugin-flowtype', 'dev');
    plugins.push('flowtype');
    config.extends.push('plugin:flowtype/recommended');
  }

  if (dependencies.has('prettier', 'dev')) {
    dependencies.add('eslint-config-prettier', 'dev');
    dependencies.add('eslint-plugin-prettier', 'dev');
    plugins.push('prettier');

    if (typeof config.rules !== 'undefined') {
      delete config.rules['prettier/prettier'];
    }

    config.extends.push('plugin:prettier/recommended');

    if (dependencies.has('typescript', 'dev')) {
      config.extends.push('prettier/@typescript-eslint');
    }
  }

  if (dependencies.has('puppeteer', 'dev')) {
    config.overrides = config.overrides ?? [];
    config.overrides.push({
      files: ['*.e2e.*'],
      env: { jest: true },
      globals: { page: true, browser: true, context: true, jestPuppeteer: true },
    });
  }

  if (typeof config.plugins !== 'undefined') {
    config.plugins = config.plugins.filter((plugin: string) => !plugins.includes(plugin));

    if (config.plugins.length === 0) {
      delete config.plugins;
    }
  }

  config.rules = {
    ...config.rules,
    'max-lines': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['error', { max: 20, skipBlankLines: true, skipComments: true }],
  };

  config = buildOverrides(config);

  return config;
};

export default buildConfig;
