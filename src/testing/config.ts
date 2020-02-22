import { Config } from '@jest/types';
import { has, hasDev } from '../app/dependencies/index';

export const getCoveragePattern = (
  hasTypescript: boolean = false,
  hasReact: boolean = false,
): string => `src/**/*.${hasTypescript ? 't' : 'j'}s${hasReact ? '{,x}' : ''}`;

export const getTransformPattern = (
  hasTypescript: boolean = false,
  hasReact: boolean = false,
): string => `^.+\\.${hasTypescript ? '[t|j]' : 'j'}s${hasReact ? 'x?' : ''}$`;

const setJestConfig = (existingConfig: Config.InitialOptions = {}): Config.InitialOptions => {
  const config: Config.InitialOptions = {
    collectCoverageFrom: [getCoveragePattern(hasDev('typescript'), has('react'))],
    testEnvironment: 'node',
    ...existingConfig,
  };

  if (hasDev('typescript')) {
    config.transform = { '^.+\\.[t|j]sx?$': 'ts-jest' };
  } else if (hasDev('@babel/core')) {
    config.transform = { '^.+\\.[t|j]sx?$': 'babel-jest' };
  }

  return config;
};

export default setJestConfig;
