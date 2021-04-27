import type { PackageJson } from 'type-fest';
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
    const { devDependencies = {} } = this.readDestinationJSON('package.json') as PackageJson;

    if ('@commitlint/cli' in devDependencies) {
      this.copyTemplate('commit-msg', '.husky/commit-msg');
    }

    if ('lint-staged' in devDependencies) {
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
