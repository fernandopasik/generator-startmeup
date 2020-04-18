import Generator from 'yeoman-generator';
import { ask, dependencies, configs } from '../core';

export default class CommitLintGenerator extends Generator {
  private confirm: boolean = true;

  public async initializing(): Promise<void> {
    await dependencies.importAll();
  }

  public async prompting(): Promise<void> {
    const { commitLint } = await ask([
      {
        type: 'confirm',
        name: 'commitLint',
        default: true,
        message: 'Do you want to use commit lint with conventional commits format?',
      },
    ]);

    this.confirm = commitLint as boolean;

    if (this.confirm) {
      dependencies.add('@commitlint/cli', 'devDependencies');
      dependencies.add('@commitlint/config-conventional', 'devDependencies');
    }
  }

  public async writing(): Promise<void> {
    if (this.confirm) {
      const config = {
        extends: ['@commitlint/config-conventional'],
      };

      await configs.save('.commitlintrc.json', config);
    }
  }

  public install(): void {
    if (!(this.options['skip-install'] as boolean)) {
      dependencies.install();
    }
  }
}
