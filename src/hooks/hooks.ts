import Generator from 'yeoman-generator';
import { dependencies, configs } from '../core';
import { buildConfig as buildLintStagedConfig, LintStagedConfig } from './lint-staged';

interface Hooks {
  [name: string]: string;
}

export default class HooksGenerator extends Generator {
  private lintStagedConfig: LintStagedConfig = {};

  public initializing(): void {
    dependencies.importFrom(this.fs.readJSON('package.json'));
  }

  public configuring(): void {
    this.lintStagedConfig = buildLintStagedConfig();
  }

  public async writing(): Promise<void> {
    if (Object.keys(this.lintStagedConfig).length > 0) {
      await configs.save('.lintstagedrc.json', this.lintStagedConfig);

      dependencies.add('lint-staged', 'devDependencies');
    }

    const config: { hooks: Hooks } = { hooks: {} };

    if (dependencies.has('@commitlint/cli', 'devDependencies')) {
      config.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
    }

    if (dependencies.has('lint-staged', 'devDependencies')) {
      config.hooks['pre-commit'] = 'lint-staged';
    }

    config.hooks['pre-push'] = 'yarn verify';

    if (Object.keys(config.hooks).length > 0) {
      await configs.save('.huskyrc.json', config);

      dependencies.add('husky', 'devDependencies');
    }
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
