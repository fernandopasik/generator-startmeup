import Generator from 'yeoman-generator';
import prettier from 'prettier';
import { addDev, getDev, addFromPkg } from '../app/dependencies/index';

export default class CommitLintGenerator extends Generator {
  private confirm?: boolean;

  public initializing(): void {
    addFromPkg(this.fs.readJSON('package.json'));
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
      addDev(['@commitlint/cli', '@commitlint/config-conventional']);
    }
  }

  public async writing(): Promise<void> {
    if (this.confirm) {
      const prettierConfig = await prettier.resolveConfig(process.cwd());

      const config = {
        extends: ['@commitlint/config-conventional'],
      };

      this.fs.writeJSON(
        this.destinationPath('.commitlintrc.json'),
        JSON.parse(prettier.format(JSON.stringify(config), { ...prettierConfig, parser: 'json' })),
      );

      const huskyConfig = this.fs.readJSON(this.destinationPath('.huskyrc.json'));
      const { hooks } = huskyConfig;
      hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';

      const sortedHooks = Object.keys(hooks)
        .sort()
        .reduce((sorted, key) => ({ ...sorted, [key]: hooks[key] }), {});

      this.fs.writeJSON(
        this.destinationPath('.huskyrc.json'),
        JSON.parse(
          prettier.format(JSON.stringify({ hooks: sortedHooks }), {
            ...prettierConfig,
            parser: 'json',
          }),
        ),
      );
    }
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
