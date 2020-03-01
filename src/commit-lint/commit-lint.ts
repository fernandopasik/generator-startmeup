import Generator from 'yeoman-generator';
import prettier from 'prettier';

import { dependencies } from '../core';
import prettifyJson from '../prettier/prettify-json';

export default class CommitLintGenerator extends Generator {
  private confirm?: boolean;

  public initializing(): void {
    dependencies.importFromPkg(this.fs.readJSON('package.json'));
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
      const prettierConfig = (await prettier.resolveConfig(process.cwd())) ?? {};

      const config = {
        extends: ['@commitlint/config-conventional'],
      };

      this.fs.write(
        this.destinationPath('.commitlintrc.json'),
        prettifyJson(config, prettierConfig),
      );

      const huskyConfig = this.fs.readJSON(this.destinationPath('.huskyrc.json'));
      const { hooks } = huskyConfig;
      hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';

      const sortedHooks = Object.keys(hooks)
        .sort()
        .reduce((sorted, key) => ({ ...sorted, [key]: hooks[key] }), {});

      this.fs.write(this.destinationPath('.huskyrc.json'), prettifyJson({ hooks: sortedHooks }));
    }
  }

  public install(): void {
    this.yarnInstall(dependencies.get('devDependencies'), { dev: true });
  }
}
