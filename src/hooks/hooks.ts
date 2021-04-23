import Generator from 'yeoman-generator';
import { dependencies } from '../core';

export default class HooksGenerator extends Generator {
  public async initializing(): Promise<void> {
    await dependencies.importAll();
  }

  public configuring(): void {
    dependencies.add('husky', 'dev');
    dependencies.add('pinst', 'dev');
  }

  public writing(): void {
    if (dependencies.has('@commitlint/cli', 'dev')) {
      this.copyTemplate('commit-msg', '.husky/commit-msg');
    }

    if (dependencies.has('lint-staged', 'dev')) {
      this.copyTemplate('pre-commit', '.husky/pre-commit');
    }

    this.copyTemplate('pre-push', '.husky/pre-push');
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
