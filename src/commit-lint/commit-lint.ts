import Generator from 'yeoman-generator';
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

  public writing(): void {
    if (this.confirm) {
      const config = {
        extends: ['@commitlint/config-conventional'],
      };
      this.fs.writeJSON(this.destinationPath('.commitlintrc.json'), config);

      const huskyConfig = this.fs.readJSON(this.destinationPath('.huskyrc.json'));
      huskyConfig.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
      this.fs.writeJSON(this.destinationPath('.huskyrc.json'), huskyConfig);
    }
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
