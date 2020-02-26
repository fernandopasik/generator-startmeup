import { Config } from '@jest/types';
import { has, hasDev } from '../app/dependencies/index';

export const generateCoveragePattern = (
  hasTypescript: boolean = false,
  hasReact: boolean = false,
): string => `src/**/*.${hasTypescript ? '{j,t}' : 'j'}s${hasReact ? '{,x}' : ''}`;

export const generateTransformPattern = (
  hasTypescript: boolean = false,
  hasReact: boolean = false,
): string => `^.+\\.${hasTypescript ? '[j|t]' : 'j'}s${hasReact ? 'x?' : ''}$`;

export const buildConfig = (existingConfig: Config.InitialOptions = {}): Config.InitialOptions => {
  const hasTypescript = hasDev('typescript');
  const hasReact = has('react');
  const collectCoverageFrom = [generateCoveragePattern(hasTypescript, hasReact)];
  const transformPattern = generateTransformPattern(hasTypescript, hasReact);

  const config: Config.InitialOptions = {
    collectCoverageFrom,
    testEnvironment: hasDev('enzyme') ? 'enzyme' : 'node',
    ...existingConfig,
  };

  if (hasDev('typescript')) {
    config.transform = { [transformPattern]: 'ts-jest' };
  } else if (hasDev('@babel/core')) {
    config.transform = { [transformPattern]: 'babel-jest' };
  }

  return config;
};
