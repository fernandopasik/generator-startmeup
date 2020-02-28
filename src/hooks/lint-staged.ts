import { has, hasDev } from '../app/dependencies/index';

export interface LintStagedConfig {
  [matcher: string]: string | string[];
}

export const sourceFilesConfig = (): LintStagedConfig => {
  const config: LintStagedConfig = {};
  const extensions = ['js'];
  const commands = [];

  if (hasDev('eslint')) {
    commands.push('eslint');
  }

  if (hasDev('jest')) {
    commands.push('jest --bail --findRelatedTests');
  }

  if (has('react')) {
    extensions.push('jsx');
  }

  if (hasDev('typescript')) {
    extensions.push('ts');

    if (has('react')) {
      extensions.push('tsx');
    }
  }

  if (commands.length > 0) {
    const matcher = `*.{${extensions.join(',')}}`;
    config[matcher] = commands;
  }

  return config;
};

export const buildConfig = (): LintStagedConfig => ({
  ...sourceFilesConfig(),
});
