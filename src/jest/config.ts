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

export const generateFilename = (isModuleType: boolean = false): string =>
  `jest.config.${isModuleType ? 'cjs' : 'js'}`;

export const buildConfig = (
  existingConfig: Readonly<Config.InitialOptions> = {},
): Config.InitialOptions => {
  const hasTypescript = dependencies.has('typescript', 'dev');
  const hasReact = dependencies.has('react') || dependencies.has('react', 'peer');
  const collectCoverageFrom = [generateCoveragePattern(hasTypescript, hasReact)];
  const transformPattern = generateTransformPattern(hasTypescript, hasReact);

  const config: Config.InitialOptions = {
    collectCoverageFrom,
    testEnvironment: dependencies.has('enzyme', 'dev') ? 'enzyme' : 'node',
    ...existingConfig,
  };

  if (dependencies.has('typescript', 'dev')) {
    config.transform = { [transformPattern]: 'ts-jest' };
  } else if (dependencies.has('@babel/core', 'dev')) {
    config.transform = { [transformPattern]: 'babel-jest' };
  }

  return config;
};
