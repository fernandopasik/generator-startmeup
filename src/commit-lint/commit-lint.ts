import Generator from 'yeoman-generator';
import { ask, dependencies, configs } from '../core';

export default class CommitLintGenerator extends Generator {
  private confirm: boolean = true;

  public initializing(): void {
    dependencies.importFrom(this.fs.readJSON('package.json'));
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
    this.confirm = commitLint;
  }

  public configuring(): void {
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
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
