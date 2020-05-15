import { dependencies } from '../core';

export interface HooksConfig {
  hooks: Record<string, string>;
}

const buildConfig = (): HooksConfig => {
  const config: HooksConfig = { hooks: {} };

  if (dependencies.has('@commitlint/cli', 'dev')) {
    config.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
  }

  if (dependencies.has('lint-staged', 'dev')) {
    config.hooks['pre-commit'] = 'lint-staged';
  }

  config.hooks['pre-push'] = 'yarn verify';

  return config;
};

export default buildConfig;
