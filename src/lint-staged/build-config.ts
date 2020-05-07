import { dependencies } from '../core';

export interface LintStagedConfig {
  [matcher: string]: string | string[];
}

const buildConfig = (): LintStagedConfig => {
  const config: LintStagedConfig = {};
  const extensions = ['js'];
  const commands = [];

  if (dependencies.has('eslint', 'dev')) {
    commands.push('eslint');
  }

  if (dependencies.has('jest', 'dev')) {
    commands.push('jest --bail --findRelatedTests');
  }

  if (dependencies.has('react') || dependencies.has('react', 'peer')) {
    extensions.push('jsx');
  }

  if (dependencies.has('typescript', 'dev')) {
    extensions.push('ts');

    if (dependencies.has('react') || dependencies.has('react', 'peer')) {
      extensions.push('tsx');
    }
  }

  if (commands.length > 0) {
    const matcher = `*.{${extensions.join(',')}}`;
    config[matcher] = commands;
  }

  return config;
};

export default buildConfig;
