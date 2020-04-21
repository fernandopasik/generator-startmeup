import { dependencies } from '../core';

export interface LintStagedConfig {
  [matcher: string]: string | string[];
}

const buildConfig = (): LintStagedConfig => {
  const config: LintStagedConfig = {};
  const extensions = ['js'];
  const commands = [];

  if (dependencies.has('eslint', 'devDependencies')) {
    commands.push('eslint');
  }

  if (dependencies.has('jest', 'devDependencies')) {
    commands.push('jest --bail --findRelatedTests');
  }

  if (dependencies.has('react')) {
    extensions.push('jsx');
  }

  if (dependencies.has('typescript', 'devDependencies')) {
    extensions.push('ts');

    if (dependencies.has('react')) {
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
