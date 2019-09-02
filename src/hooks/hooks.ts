import Generator from 'yeoman-generator';
import { addDev, getDev, has, addFromPkg } from '../app/dependencies/index';

interface Hooks {
  [name: string]: string;
}

export default class HooksGenerator extends Generator {
  confirm?: boolean;

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
      const commitLintConfig = {
        extends: ['@commitlint/config-conventional'],
      };

      this.fs.writeJSON(this.destinationPath('.commitlintrc.json'), commitLintConfig);
    }

    const commands = [];
    const extensions = [];

    if (has('eslint')) {
      commands.push('eslint');
    }

    if (has('jest')) {
      commands.push('jest --bail --findRelatedTests');
    }

    if (has('typescript')) {
      extensions.push('ts');

      if (has('react')) {
        extensions.push('tsx');
      }
    } else {
      extensions.push('js');

      if (has('react')) {
        extensions.push('jsx');
      }
    }

    if (commands.length > 0) {
      this.fs.writeJSON(this.destinationPath('.lintstagedrc.json'), {
        [`*.{${extensions.join(',')}}`]: commands,
      });

      addDev(['lint-staged']);
    }

    const config: { hooks: Hooks } = { hooks: {} };

    if (has('@commitlint/cli')) {
      config.hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
    }

    if (has('lint-staged')) {
      config.hooks['pre-commit'] = 'lint-staged';
    }

    config.hooks['pre-push'] = 'yarn preversion';

    if (Object.keys(config.hooks).length > 0) {
      this.fs.writeJSON(this.destinationPath('.huskyrc.json'), config);

      addDev(['husky']);
    }
  }

  public install(): void {
    this.yarnInstall(getDev(), { dev: true });
  }
}
