import { Config } from '@jest/types';
import { dependencies } from '../core';

export const generateCoveragePattern = (
  hasTypescript: boolean = false,
  hasReact: boolean = false,
): string => `src/**/*.${hasTypescript ? '{j,t}' : 'j'}s${hasReact ? '{,x}' : ''}`;

export const generateTransformPattern = (
  hasTypescript: boolean = false,
  hasReact: boolean = false,
): string => `^.+\\.${hasTypescript ? '[j|t]' : 'j'}s${hasReact ? 'x?' : ''}$`;

export const buildConfig = (
  existingConfig: Readonly<Config.InitialOptions> = {},
): Config.InitialOptions => {
  const hasTypescript = dependencies.has('typescript', 'dev');
  const hasBabel = dependencies.has('@babel/core', 'dev');
  const hasReact = dependencies.has('react') || dependencies.has('react', 'peer');
  const hasPuppeteer = dependencies.has('puppeteer', 'dev');
  const hasWebComponents = dependencies.has('lit-html', 'all');
  const hasStorybook =
    dependencies.has('@storybook/react', 'dev') ||
    dependencies.has('@storybook/web-components', 'dev');
  const collectCoverageFrom = [generateCoveragePattern(hasTypescript, hasReact)];
  const transformPattern = generateTransformPattern(hasTypescript, hasReact);

  const config: Config.InitialOptions = {
    collectCoverageFrom,
    ...existingConfig,
  };

  if (dependencies.has('enzyme', 'dev')) {
    config.testEnvironment = 'enzyme';
    if (hasTypescript) {
      config.setupFilesAfterEnv = ['jest-enzyme'];
    }
  } else if (!hasWebComponents) {
    config.testEnvironment = 'node';
  }

  if (hasWebComponents) {
    config.transformIgnorePatterns = [
      '/node_modules/(?!(lit-html|lit-element|webcomponents|@open-wc)/).*/',
    ];
  }

  if (hasPuppeteer || hasStorybook) {
    const extensions = [];
    config.coveragePathIgnorePatterns = ['/node_modules/'];

    if (hasPuppeteer) {
      extensions.push('e2e');
    }

    if (hasStorybook) {
      config.coveragePathIgnorePatterns.push('/__stories__/');
      extensions.push('stories');
    }

    config.coveragePathIgnorePatterns.push(`(${extensions.join('|')})\\.[jt]sx?$`);
  }

  if (hasTypescript) {
    dependencies.add('@types/jest', 'dev');
    config.globals = { 'ts-jest': { tsConfig: 'tsconfig.all.json' } };
    config.transform = { [transformPattern]: 'ts-jest' };
  } else if (hasBabel) {
    config.transform = { [transformPattern]: 'babel-jest' };
  }

  return config;
};
