import Generator from 'yeoman-generator';
import { dependencies, configs } from '../core';

export default class CommitLintGenerator extends Generator {
  private confirm: boolean = true;

  public initializing(): void {
    dependencies.importFrom(this.fs.readJSON('package.json'));
  }

  public async prompting(): Promise<void> {
    const { confirm } = await this.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        default: true,
        message: 'Do you want to use commit lint with conventional commits format?',
      },
    ]);
    this.confirm = confirm;
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

      const huskyConfig = this.fs.readJSON(this.destinationPath('.huskyrc.json'));
      const { hooks } = huskyConfig;
      hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';

      const sortedHooks = Object.keys(hooks)
        .sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .reduce(
          (sorted: Record<string, string | string[]>, key: string) => ({
            ...sorted,
            [key]: hooks[key],
          }),
          {} as Record<string, string | string[]>,
        );

      await configs.save('.huskyrc.json', { hooks: sortedHooks });
    }
  }

  public install(): void {
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
